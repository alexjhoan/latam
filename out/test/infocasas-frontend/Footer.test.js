const playwright = require("playwright");
const settings = loadTestSettings();

var browserDriver;
var browser;
let page;

const appUrlBase = settings.baseUrl;
const routes = {
  public: {
    home: appUrlBase,
  },
  private: {
    home: `${appUrlBase}/dashboard`,
  },
};

beforeAll(async () => {
  // launch browser
  browserDriver = await playwright[settings.browser].launch({
    headless: settings.headless,
    slowMo: settings.slowmotion,
  });
  await new Promise((r) => setTimeout(r, 5000));
  browser = await browserDriver.newContext({ ...settings.device });
  await new Promise((r) => setTimeout(r, 5000));
  // creates a new page in the opened browser
  page = await browser.newPage();
});

async function foundInArray(array, texto) {
  for (let i = 0; i < array.length; i++) {
    const a = array[i];
    try {
      const text = await a.evaluate((e) => e.innerText);
      if (
        text
          .toUpperCase()
          .split(" ")
          .join("") ==
        texto
          .toUpperCase()
          .split(" ")
          .join("")
      ) {
        return a;
      }
    } catch (e) {}
  }
  return null;
}

async function foundInArrayByTitle(array, pais) {
  // array: son todos los "a" tags, con los titles tipo 'InfoCasas Uruguay'
  // pais: es solo el nombre, ej: "Uruguay"

  // recorre todas las banderas (array)
  // y lo compara contra el pais que estoy testeando
  for (let i = 0; i < array.length; i++) {
    const a = array[i];
    try {
      const title = await a.evaluate((e) => e.title); // title es 'InfoCasas Uruguay'
      const _pais = pais !== "Casas en el Este" ? "InfoCasas " + pais : pais; // si no es CEEE, le agregamos la palabra 'InfoCasas '

      if (title === _pais) {
        return a;
      }
    } catch (e) {}
  }
  return null;
}
async function foundInArrayIcon(array, texto, icono) {
  for (let i = 0; i < array.length; i++) {
    const a = array[i];
    try {
      const icon = await a.$eval("i", (e) => e.className);
      const text = await a.evaluate((e) => e.innerText);

      if (text === texto && icon.includes(icono)) {
        return a;
      }
    } catch (e) {}
  }
  return null;
}

describe("<Footer>: Links", () => {
  const data = [
    { text: "Inicio", expect: { status: "OK", assert: "/portada" } },
    // { text: "Inicio", expect: { status: "ERROR", assert: "/portada" } }, // deberia dar error
    { text: "Portada", expect: { status: "ERROR", assert: "/portada" } },
    // { text: "Portada", expect: { status: "OK", assert: "/portada" } }, // deberia dar error
    { text: "Revista", expect: { status: "OK", assert: "/revista" } },
    { text: "Blog", expect: { status: "OK", assert: "/blog" } },
    {
      text: "Directorio Inmobiliario",
      expect: { status: "OK", assert: "/inmobiliarias" },
    },
    { text: "FAQs", expect: { status: "OK", assert: "/faq" } },
    {
      text: "Términos y condiciones",
      expect: { status: "OK", assert: "/faq#boxtc" },
    },
  ];

  data.map((l) => checkLinkExist(l));
  function checkLinkExist(link) {
    test(
      "Check Link: " +
        link.text.toUpperCase() +
        " should " +
        (link.expect.status == "OK" ? "EXIST" : "NOT EXIST"),
      async (done) => {
        const p = page; //reutilize same page

        await p.goto(appUrlBase);
        await closePopupDestacadosIfExists(p);

        const links = await p.$$("footer .links a");
        const found = await foundInArray(links, link.text);

        if (found == null) {
          if (link.expect.status == "OK") {
            throw new Error(
              "Link " + link.text.toUpperCase() + " should EXIST"
            );
          }
        } else {
          if (link.expect.status == "ERROR") {
            throw new Error(
              "Link " + link.text.toUpperCase() + " should NOT EXIST"
            );
          }
          await found.click();
          await p.waitForNavigation();
          // await p.waitForNavigation({ timeout: 10000 });
          // if (!p.url().includes(link.expect.assert)) {
          const url = await p.url();
          if (!url.includes(link.expect.assert)) {
            throw new Error(
              "Assert should have [" +
                link.expect.assert +
                "] but it is [" +
                p.url() +
                "]"
            );
          }
        }

        done();
        //await p.close();
      },
      1600000
    );
  }
});

const randomStringGenerator = (length) => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

describe("<Footer>: Redes", () => {
  const data = [
    {
      text: "InfoCasasUY",
      icon: "icon-facebook-1",
      onlyDesktop: true,
      expect: { status: "OK", assert: "https://www.facebook.com/InfoCasasUY" },
    },
    {
      text: "InfoCasasUY",
      icon: "icon-twitter",
      onlyDesktop: true,
      expect: { status: "OK", assert: "https://twitter.com/infocasasuy" },
    },
    // { // linkedin esta bloqueando las conecciones desde chrominium
    //   text: "InfoCasas",
    //   icon: "icon-linkedin",
    //   onlyDesktop: false,
    //   expect: {
    //     status: "OK",
    //     assert: "https://www.linkedin.com/company/infocasas"
    //   }
    // }
    {
      text: "InfoCasas",
      icon: "icon-youtube",
      onlyDesktop: true,
      expect: {
        status: "OK",
        assert: "https://www.youtube.com/channel/UCRyu3-zzPAY0yTYeC9Uzhvw",
      },
    },
    {
      text: "InfoCasas",
      icon: "icon-instagram",
      onlyDesktop: true,
      expect: { status: "OK", assert: "https://www.instagram.com/infocasas/" },
    },
    {
      text: "facebook",
      icon: "icon-facebook-1",
      onlyDesktop: false,
      expect: {
        status: "ERROR",
        assert: "https://www.facebook.com/InfoCasasUY",
      },
    },
    {
      text: "twitter",
      icon: "icon-twitter",
      onlyDesktop: false,
      expect: { status: "ERROR", assert: "https://twitter.com/infocasasuy" },
    },
    {
      text: "linkedin",
      icon: "icon-linkedin",
      onlyDesktop: false,
      expect: {
        status: "ERROR",
        assert: "https://www.linkedin.com/company/infocasas",
      },
    },
    {
      text: "youtube",
      icon: "icon-youtube",
      onlyDesktop: false,
      expect: {
        status: "ERROR",
        assert: "https://www.youtube.com/channel/UCRyu3-zzPAY0yTYeC9Uzhvw",
      },
    },
    {
      text: "instagram",
      icon: "icon-instagram",
      onlyDesktop: false,
      expect: {
        status: "ERROR",
        assert: "https://www.instagram.com/infocasas/",
      },
    },
  ];

  data.map((r) => checkLinkExist(r));
  function checkLinkExist(red) {
    test(
      "Check Redes: " +
        red.text +
        " should " +
        (red.expect.status == "OK" ? "EXIST" : "NOT EXIST"),
      async (done) => {
        const p = page; //reutilize same page

        await p.goto(appUrlBase);
        await closePopupDestacadosIfExists(p);

        const redes = await p.$$("footer .redes a");
        const found = await foundInArrayIcon(redes, red.text, red.icon);

        if (found == null) {
          // si no lo encuentro
          if (red.expect.status == "OK") {
            throw new Error("Link " + red.text + " should EXIST");
          }
        } else if (!red.onlyDesktop) {
          if (red.expect.status == "ERROR") {
            throw new Error("Link " + red.text + " should NOT EXIST");
          }
          await found.click();
          // await p.waitForNavigation({ timeout: 10000 });
          await p.waitForNavigation();
          const url = await p.url();
          // if (!p.url().includes(red.expect.assert)) {
          if (!url.includes(red.expect.assert)) {
            throw new Error(
              "Assert should have [" +
                red.expect.assert +
                "] but it is [" +
                p.url() +
                "]"
            );
          }
        }

        done();
        //await p.close();
      },
      1600000
    );
  }
});

describe("<Footer>: Newsletter Form", () => {
  const randomGenerateName = randomStringGenerator(6);

  [
    {
      nombre: "",
      email: "prueba_" + randomGenerateName + "@infocasas.com.uy",
      expect: {
        status: "ERROR",
        assert: "* Este campo es obligatorio",
      },
    },
    {
      nombre: randomGenerateName,
      email: "",
      expect: {
        status: "ERROR",
        assert: "* Este campo es obligatorio",
      },
    },
    {
      nombre: randomGenerateName,
      email: "prueba_" + randomGenerateName,
      expect: {
        status: "ERROR",
        assert: "* Correo Inválido",
      },
    },
    {
      nombre: randomGenerateName,
      email: "prueba_" + randomGenerateName + "@i.c",
      expect: {
        status: "ERROR",
        assert: "* Correo Inválido",
      },
    },
    {
      nombre: randomGenerateName,
      email: "prueba_" + randomGenerateName + "@infocasas.com.uy",
      expect: {
        status: "OK",
        assert: "La suscripción se realizó correctamente.",
      },
    },
    {
      nombre: randomGenerateName,
      email: "prueba_" + randomGenerateName + "@infocasas.com.uy",
      expect: {
        status: "ERROR",
        assert: "Este email ya fue suscripto",
      },
    },
    {
      nombre: randomStringGenerator(6),
      email: "prueba_" + randomStringGenerator(6) + "@infocasas.com.uy",
      expect: {
        status: "OK",
        assert: "La suscripción se realizó correctamente.",
      },
    },
  ].map((t) => NewsletterFormTest(t));

  function NewsletterFormTest(s) {
    test(
      "Newsletter Subscription: [" +
        s.nombre +
        " - " +
        s.email +
        "], should be " +
        s.expect.status,
      async (done) => {
        const p = page; //reutilize same page

        await p.goto(appUrlBase);
        await closePopupDestacadosIfExists(p);
        await page.evaluate(() =>
          window.scrollBy(0, document.body.scrollHeight)
        );

        await p.type(".newsletterForSubscription input[name=name]", s.nombre, {
          delay: 100,
        });
        await p.type(".newsletterForSubscription input[name=email]", s.email, {
          delay: 100,
        });
        await p.click(".newsletterForSubscription input[type=submit]");

        const OK = new Promise(function(resolve, reject) {
          p.waitForSelector(".newsletterSuccess", { timeout: 10000 })
            .then((e) => {
              e.evaluate((i) => i.innerText).then((f) => {
                resolve({ status: "OK", assert: f });
              });
            })
            .catch((e) => {
              reject({ status: "ERROR 2", ...e });
            });
        });

        const ERROR = new Promise(function(resolve, reject) {
          p.waitForSelector(".newsletterForSubscription .error", {
            timeout: 10000,
          })
            .then((e) => {
              e.evaluate((i) => i.innerText).then((f) => {
                resolve({ status: "ERROR", assert: f });
              });
            })
            .catch((e) => {
              reject({ status: "ERROR 2", ...e });
            });
        });

        await Promise.race([OK, ERROR]).then((o) => {
          console.log("Race result: " + JSON.stringify(o));
          if (o.status !== s.expect.status) {
            throw new Error(
              "Status should be [" +
                s.expect.status +
                "] but it is [" +
                o.status +
                "] "
            );
          }
          if (!o.assert.includes(s.expect.assert)) {
            throw new Error(
              "Assert should have [" +
                t.expect.assert +
                "] but it is [" +
                p.url() +
                "]"
            );
          }
        });
        done();
        //await p.close();
      },
      1600000
    );
  }
});

describe("<Footer>", () => {
  [
    {
      pais: "Uruguay",
      expect: {
        status: "OK",
        bandera_img: "https://cdn2.infocasas.com.uy/web/bandera_uy_op4.png",
        title: "InfoCasas Uruguay",
        assert: "https://www.infocasas.com.uy",
      },
    },
    {
      pais: "Paraguay",
      expect: {
        status: "OK",
        bandera_img: "https://cdn2.infocasas.com.uy/web/bandera_py_op4.png",
        title: "InfoCasas Paraguay",
        assert: "https://www.infocasas.com.py/",
      },
    },
    {
      pais: "Colombia",
      expect: {
        status: "OK",
        bandera_img: "https://cdn2.infocasas.com.uy/web/bandera_co_op4.png",
        title: "InfoCasas Colombia",
        assert: "https://www.infocasas.com.co/",
      },
    },
    {
      pais: "Perú",
      expect: {
        status: "OK",
        bandera_img: "https://cdn2.infocasas.com.uy/web/bandera_pe_op4.png",
        title: "InfoCasas Perú",
        assert: "https://www.infocasas.com.pe/",
      },
    },
    {
      pais: "Bolivia",
      expect: {
        status: "OK",
        bandera_img: "https://cdn2.infocasas.com.uy/web/bandera_bo_op4.png",
        title: "InfoCasas Bolivia",
        assert: "https://www.infocasas.com.bo/",
      },
    },
    {
      pais: "Casas en el Este",
      expect: {
        status: "OK",
        bandera_img: "https://cdn2.infocasas.com.uy/web/ceee-flag-2.jpg",
        title: "Casas en el Este",
        assert: "https://www.casaseneleste.com/",
      },
    },
  ].map((b) => testBanderaFooter(b));

  function testBanderaFooter(b) {
    test(
      "Bandera de " +
        b.pais +
        " deberia " +
        (b.expect.status == "OK" ? "EXISTIR" : "NO EXISTIR"),
      async (done) => {
        const p = page; //reutilize same page

        await p.goto(appUrlBase);
        await closePopupDestacadosIfExists(p);

        // agarro todos los selectores "a"
        const banderas = await p.$$("footer .banderas a");

        // busco la bandera por titulo
        // y lo compara contra el pais que estoy testeando
        const found = await foundInArrayByTitle(banderas, b.pais);

        if (found == null) {
          // chequeo si deberia estar
          if (b.expect.status === "OK") {
            throw new Error(
              "La bandera de " + b.pais + " debería EXISTIR pero NO EXISTE"
            );
          }
        } else {
          // chequeo si no deberia estar
          if (b.expect.status === "ERROR") {
            throw new Error(
              "La bandera de " + b.pais + " debería NO EXISTIR pero EXISTE"
            );
          }

          // chequeo la img de la bandera
          const found_img = await found.$eval("img", (e) => e.src);
          if (found_img != b.expect.bandera_img) {
            throw new Error(
              "La bandera de " +
                b.pais +
                " debería ser la la imagen [" +
                b.expect.bandera_img +
                "] pero es [" +
                found_img +
                "]"
            );
          }

          // chequeo el alt de la img de la bandera
          const found_img_alt = await found.$eval("img", (e) => e.alt);
          if (found_img_alt != b.expect.title) {
            throw new Error(
              "La bandera de " +
                b.pais +
                " debería tener el title [" +
                b.expect.title +
                "] pero tiene [" +
                found_img_alt +
                "]"
            );
          }

          // chequeo el title de la bandera
          const found_title = await found.evaluate((e) => e.title);
          if (found_title != b.expect.title) {
            throw new Error(
              "La bandera de " +
                b.pais +
                " debería tener el title [" +
                b.expect.title +
                "] pero tiene [" +
                found_title +
                "]"
            );
          }

          // chequeo el link
          await found.click();
          await p.waitForNavigation();
          const url = await p.url();
          if (!url.includes(b.expect.assert)) {
            throw new Error(
              "Assert should have [" +
                b.expect.assert +
                "] but it is [" +
                p.url() +
                "]"
            );
          }
        }

        done();
        //await p.close();
      },
      1600000
    );
  }
});

afterAll(async () => {
  try {
    await page.close();
  } catch (e) {}

  try {
    await browserDriver.close();
  } catch (e) {}
});
