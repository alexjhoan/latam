const playwright = require("playwright");
const settings = loadTestSettings();

var browserDriver;
var browser;
let page;

const appUrlBase = settings.baseUrl;
const routes = {
  public: {
    home: appUrlBase
  },
  private: {
    home: `${appUrlBase}/dashboard`
  }
};

beforeAll(async () => {
  // launch browser
  browserDriver = await playwright[settings.browser].launch({
    headless: settings.headless,
    slowMo: settings.slowmotion
  });
  await new Promise(r => setTimeout(r, 5000));
  browser = await browserDriver.newContext({ ...settings.device });
  await new Promise(r => setTimeout(r, 5000));
  // creates a new page in the opened browser
  page = await browser.newPage();
});

describe("<NuestrasOficinas>: Oficinas", () => {
  const data = [
    {
      name: "Portal & Apps",
      onlyDesktop: true,
      expect: {
        status: "OK",
        text:
          "Portal multiplataforma con tecnología avanzada de búsqueda y funcionalidades únicas para inmobiliarias, propietarios y usuarios. Contamos con más de 150.000 propiedades publicadas y 60.000 descargas de nuestras aplicaciones móviles."
      }
    },
    {
      name: "Agencia",
      onlyDesktop: true,
      expect: {
        status: "OK",
        text:
          "Somos la única agencia digital especializada en Real Estate de LatAm. Desarrollamos estrategias de comunicación y soluciones tecnológicas a medida (Apps, Diseño Web, Social Media, Campañas Digitales y más) para empresas afines al rubro inmobiliario que deseen aumentar sus resultados."
      }
    },
    {
      name: "Big Data",
      onlyDesktop: true,
      expect: {
        status: "OK",
        text:
          "Tenemos acceso a un enorme caudal de datos y métricas en tiempo real acerca del comportamiento del mercado. Esto nos permite desarrollar informes y herramientas para ayudar a nuestros clientes a tomar las mejores decisiones."
      }
    },
    {
      name: "Revista",
      onlyDesktop: true,
      expect: {
        status: "OK",
        text:
          "Revista impresa y digital con un alcance de 320.000 lectores. Apuntamos a la máxima calidad de diseño e impresión, presentes con nuestras tres ediciones en puntos de distribución estratégicos de las principales ciudades de Uruguay, Paraguay y Bolivia."
      }
    },
    {
      name: "Casas en el Este",
      onlyDesktop: false,
      expect: {
        status: "ERROR"
      }
    }
  ].map(t => QuienesSomosTest(t));

  function QuienesSomosTest(t, p) {
    test.only(
      "La seccion [" +
        t.name +
        "] deberia [" +
        (t.expect.status === "OK" ? "EXISTIR" : "NO EXISTIR") +
        "]",
      async done => {
        const p = page;
        await p.goto(appUrlBase);
        await closePopupDestacadosIfExists(p);

        let paragraph;
        let isParagraphValid = false;

        try {
          const [button] = await page.$x(
            "//span[contains(., '" + t.name + "')]"
          );
          await button.click();

          paragraph = await p.$eval(".contentQuienesSection p", e => {
            return e.innerText;
          });
          isParagraphValid = paragraph === t.expect.text;
        } catch (e) {}

        if (isParagraphValid && t.expect.status === "ERROR") {
          throw new Error("Assert should be [NO EXISTIR] but it is [EXISTIR]");
        } else if (
          !isParagraphValid &&
          t.expect.status === "OK" &&
          !t.onlyDesktop
        ) {
          throw new Error("Assert should be [EXISTIR] but it is [NO EXISTIR]");
        }

        done();
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
