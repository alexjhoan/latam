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

async function logout(page) {
  console.log("start log out");
  page
    .waitForSelector(".user_profile", { timeout: 100000 })
    .then(async e => {
      if (e == null) {
        await e.hover();
        await page.click(".cerrar_sesion");
      } else {
        await e.hover();
        await page.click(".cerrar_sesion");
      }
    })
    .catch(e => {
      console.log("Already logged out");
    });
}
function CheckHeaderLink(t, p) {
  test(
    "El botón [" +
      t.text +
      "] deberia [" +
      (t.expect.status === "OK" ? "EXISTIR" : "NO EXISTIR") +
      "]",
    async done => {
      const p = page;
      await p.goto(appUrlBase);
      const isMobile = await p.context()._options.viewport.isMobile;

      // en mobile: abro el drawer, porque algunos links los tengo que clickear
      if (isMobile) {
        await p.click("#iconMenu");
      }

      let link = void 0;
      try {
        link = await page.waitForSelector("a." + t.btnClass, {
          visible: true
        });
      } catch (e) {
        // link = void 0;
      }

      if (link != null && t.expect.status === "ERROR") {
        throw new Error("Assert should be [NO EXISTIR] but it is [EXISTIR]");
      } else if (link == null && t.expect.status === "OK" && !t.onlyDesktop) {
        throw new Error("Assert should be [EXISTIR] but it is [NO EXISTIR]");
      }

      // si el link es nullo entonces aca tendria q pasar (creo q esto no esta bien)
      if (link != null) {
        //
        // si le paso el parent en el expect
        if (typeof t.expect.parent != "undefined") {
          if (t.expect.parent.action == "hover") {
            await page.hover(t.expect.parent.element);
          } else if (t.expect.parent.action == "click") {
            await page.click(t.expect.parent.element);
          }
          await link.click();
        } else {
          // si no tiene parent
          await link.click();
        }

        if (t.expect.type == "navigation") {
          // await p.waitForNavigation({ timeout: 10000 });
          await p.waitForNavigation();
          const url = await p.url();
          if (!url.includes(t.expect.assert)) {
            throw new Error(
              "Assert should have [" +
                t.expect.assert +
                "] but it is [" +
                url +
                "]"
            );
          }
        } else if (t.expect.type == "toggle") {
          const display = await page.$eval(t.expect.assert, elem => {
            return window.getComputedStyle(elem).getPropertyValue("display");
          });

          if (display == "none") {
            throw new Error(
              t.expect.assert + " is not display block, is " + display
            );
          } else if (typeof t.expect.message != "undefined") {
            const messageToggle = await page.$eval(
              t.expect.assert + " .messages",
              elem => {
                return elem.innerText;
              }
            );
            if (messageToggle != t.expect.message) {
              throw new Error(
                "Message " + messageToggle + " should be  " + t.expect.message
              );
            }
          }
        }
      }

      done();
    },
    1600000
  );
}

describe("<Header>: Header tests Visuales", () => {
  test("DESKTOP: Cuadraditos del logo aparecen y desaparecen segun scroll", async done => {
    const p = page; //reutilize same page
    await p.goto(appUrlBase);
    let opacity = 0;

    await closePopupDestacadosIfExists(p);
    opacity = Number.parseInt(
      await page.evaluate(() => {
        const btn = document.querySelector("#header #squares");
        return JSON.parse(JSON.stringify(getComputedStyle(btn))).opacity;
      })
    );
    if (opacity !== 1) {
      throw new Error("#header #squares opacity is not 1, is " + opacity);
    }
    await page.evaluate(() => {
      window.scrollBy(0, 500);
    });
    await new Promise(r => setTimeout(r, 2000)); //wait for animation ends

    opacity = Number.parseInt(
      await page.evaluate(() => {
        const btn = document.querySelector("#header #squares");
        return JSON.parse(JSON.stringify(getComputedStyle(btn))).opacity;
      })
    );
    if (opacity !== 0) {
      throw new Error("#header #squares opacity is not 0");
    }

    await page.evaluate(() => {
      window.scrollBy(0, -1000);
    });
    await new Promise(r => setTimeout(r, 2000)); //wait for animation ends

    opacity = Number.parseInt(
      await page.evaluate(() => {
        const btn = document.querySelector("#header #squares");
        return JSON.parse(JSON.stringify(getComputedStyle(btn))).opacity;
      })
    );
    if (opacity !== 1) {
      throw new Error("#header #squares opacity is not 1");
    }

    done();
    //await p.close();
  }, 1600000);
});

describe("<Header>: Header links usuario NO logueado", () => {
  beforeAll(async () => {
    await page.goto(appUrlBase);
    await logout(page);
    console.log("logged out");
  }, 150000);
  const btnClassPrefix = "header-btn-";
  const data = [
    {
      text: "VENTA",
      btnClass: btnClassPrefix + "venta",
      expect: { status: "OK", type: "navigation", assert: "/venta" }
    },
    {
      text: "ALQUILER",
      btnClass: btnClassPrefix + "alquiler",
      expect: { status: "OK", type: "navigation", assert: "/alquiler" }
    },
    {
      text: "PROYECTOS",
      btnClass: btnClassPrefix + "proyectos",
      expect: { status: "OK", type: "navigation", assert: "/proyectos" }
    },
    {
      text: "REMATES",
      btnClass: btnClassPrefix + "remates",
      expect: { status: "OK", type: "navigation", assert: "/remates" }
    },
    {
      text: "INMOBILIARIAS",
      btnClass: btnClassPrefix + "inmobiliarias",
      expect: { status: "OK", type: "navigation", assert: "/inmobiliarias" }
    },
    {
      text: "EVENTOS",
      btnClass: btnClassPrefix + "eventos",
      expect: { status: "OK", type: "navigation", assert: "/eventos" }
    },
    {
      text: "REVISTA",
      btnClass: btnClassPrefix + "revista",
      expect: { status: "ERROR" }
    },
    {
      text: "ANTICRÉTICO",
      btnClass: btnClassPrefix + "anticretico",
      expect: { status: "ERROR" }
    },
    {
      text: "PUBLICAR",
      btnClass: btnClassPrefix + "publicar",
      expect: {
        status: "OK",
        type: "toggle",
        assert: ".dropdown.publish"
      }
    },
    {
      text: "INMOBILIARIA",
      btnClass: btnClassPrefix + "inmobiliaria",
      expect: {
        status: "OK",
        type: "navigation",
        assert: "/soyinmobiliaria",
        parent: { element: ".publish", action: "click" }
      }
    },
    {
      text: "Dueño Vende",
      btnClass: btnClassPrefix + "dueno-vende",
      expect: {
        status: "OK",
        type: "navigation",
        assert: "/publicar",
        parent: { element: ".publish", action: "click" }
      }
    },
    {
      text: "Dueño Vende Anual",
      btnClass: btnClassPrefix + "dueno-vende-anual",
      onlyDesktop: true,
      expect: {
        status: "OK",
        type: "navigation",
        assert: "/publicar",
        parent: { element: ".publish", action: "click" }
      }
    },
    {
      text: "Dueño Vende Temporal",
      btnClass: btnClassPrefix + "dueno-vende-temporal",
      onlyDesktop: true,
      expect: {
        status: "OK",
        type: "navigation",
        assert: "/publicar-alquiler-temporario",
        parent: { element: ".publish", action: "click" }
      }
    },
    {
      text: "INICIAR SESIÓN",
      btnClass: btnClassPrefix + "iniciar-sesion",
      expect: {
        status: "OK",
        type: "toggle",
        assert: "#login-with-pop",
        message: "¡Bienvenido!"
      }
    },
    {
      text: "registrarse",
      btnClass: btnClassPrefix + "registrarse",
      expect: {
        status: "OK",
        type: "toggle",
        assert: "#login-with-pop",
        message: "Regístrate en InfoCasas"
      }
    }
  ].map(t => CheckHeaderLink(t));
});

describe("<Header>: Header links usuario logueado como particular", () => {
  beforeAll(async () => {
    await page.goto(appUrlBase);
    await closePopupDestacadosIfExists(page);
    await login(
      { email: "augusto@infocasas.com.uy", pass: "itunes" },
      page,
      true
    );
    console.log("LOGGED");
  }, 1500000);

  const btnClassPrefix = "header-btn-";
  const data = [
    {
      text: "VENTA",
      btnClass: btnClassPrefix + "venta",
      expect: { status: "OK", type: "navigation", assert: "/venta" }
    },
    {
      text: "PROYECTOS",
      btnClass: btnClassPrefix + "proyectos",
      expect: { status: "OK", type: "navigation", assert: "/proyectos" }
    },
    {
      text: "REMATES",
      btnClass: btnClassPrefix + "remates",
      expect: { status: "OK", type: "navigation", assert: "/remates" }
    },
    {
      text: "INMOBILIARIAS",
      btnClass: btnClassPrefix + "inmobiliarias",
      expect: { status: "OK", type: "navigation", assert: "/inmobiliarias" }
    },
    {
      text: "EVENTOS",
      btnClass: btnClassPrefix + "eventos",
      expect: { status: "OK", type: "navigation", assert: "/eventos" }
    },
    {
      text: "REVISTA",
      btnClass: btnClassPrefix + "revista",
      expect: { status: "ERROR" }
    },
    {
      text: "ANTICRÉTICO",
      btnClass: btnClassPrefix + "anticretico",
      expect: { status: "ERROR" }
    },
    {
      text: "PUBLICAR",
      btnClass: btnClassPrefix + "publicar",
      onlyDesktop: true,
      expect: {
        status: "OK",
        type: "toggle",
        assert: ".dropdown.publish"
      }
    },
    {
      text: "INMOBILIARIA",
      expect: {
        status: "ERROR"
      }
    }
    // {
    //   text: "Dueño Vende",
    //   // onlyDesktop: true,
    //   btnClass: btnClassPrefix + "header-btn-dueno-vende",
    //   expect: {
    //     status: "OK",
    //     type: "navigation",
    //     assert: "/publicar",
    //     parent: { element: ".publish", action: "click" }
    //   }
    // }
    // {
    //   text: "Dueño Vende Temporal",
    //   onlyDesktop: true,
    //   expect: {
    //     status: "OK",
    //     type: "navigation",
    //     assert: "/publicar",
    //     parent: { element: ".publish", action: "click" }
    //   }
    // },
    // {
    //   text: "Dueño Vende Anual",
    //   onlyDesktop: true,
    //   expect: {
    //     status: "OK",
    //     type: "navigation",
    //     assert: "/publicar",
    //     parent: { element: ".publish", action: "click" }
    //   }
    // },
    // {
    //   text: "Notificaciones",
    //   onlyDesktop: true,
    //   expect: {
    //     status: "OK",
    //     type: "toggle",
    //     assert: ".notificaciones .notifiactions"
    //   }
    // },
    // {
    //   text: "User",
    //   expect: {
    //     status: "OK",
    //     type: "navigation",
    //     assert: "/sitio/index.php?mid=inmobiliarias&func=panelPropiedades"
    //   }
    // },
    // {
    //   text: "Mi cuenta",
    //   expect: {
    //     status: "OK",
    //     type: "navigation",
    //     assert: "/sitio/index.php?mid=inmobiliarias&func=panelPropiedades",
    //     parent: { element: ".user_profile", action: "hover" }
    //   }
    // },
    // {
    //   text: "Cerrar sesión",
    //   expect: {
    //     status: "OK",
    //     type: "navigation",
    //     assert: "/",
    //     parent: { element: ".user_profile", action: "hover" }
    //   }
    // }
  ].map(t => CheckHeaderLink(t));
});

// describe("<Header>: Header links usuario logueado como inmobiliaria", () => {
//   beforeAll(async () => {
//     await page.goto(appUrlBase);
//     await closePopupDestacadosIfExists(page);
//     await login({ email: "kosak@kosak.com.uy", pass: "itunes" }, page);
//     console.log("LOGGED");
//   }, 1500000);

//   const btnClassPrefix = "header-btn-";
//   const data = [
//     {
//       text: "VENTA",
//       btnClass: btnClassPrefix + "venta",
//       expect: { status: "OK", type: "navigation", assert: "/venta" }
//     },
//     {
//       text: "PROYECTOS",
//       btnClass: btnClassPrefix + "proyectos",
//       expect: { status: "OK", type: "navigation", assert: "/proyectos" }
//     },
//     {
//       text: "REMATES",
//       btnClass: btnClassPrefix + "remates",
//       expect: { status: "OK", type: "navigation", assert: "/remates" }
//     },
//     {
//       text: "INMOBILIARIAS",
//       btnClass: btnClassPrefix + "inmobiliarias",
//       expect: { status: "OK", type: "navigation", assert: "/inmobiliarias" }
//     },
//     {
//       text: "EVENTOS",
//       btnClass: btnClassPrefix + "eventos",
//       expect: { status: "OK", type: "navigation", assert: "/eventos" }
//     },
//     {
//       text: "REVISTA",
//       btnClass: btnClassPrefix + "revista",
//       expect: { status: "ERROR" }
//     },
//     {
//       text: "ANTICRÉTICO",
//       btnClass: btnClassPrefix + "anticretico",
//       expect: { status: "ERROR" }
//     },
//     {
//       text: "PUBLICAR",
//       btnClass: btnClassPrefix + "publicar",
//       expect: {
//         status: "OK",
//         type: "toggle",
//         assert: ".dropdown.publish"
//       }
//     },
//     {
//       text: "INMOBILIARIA",
//       btnClass: btnClassPrefix + "inmobiliaria",
//       expect: {
//         status: "ERROR"
//       }
//     },
//     {
//       text: "Dueño Vende",
//       btnClass: btnClassPrefix + "dueno-vende",
//       expect: {
//         status: "OK",
//         type: "navigation",
//         assert: "/publicar",
//         parent: { element: ".publish", action: "click" }
//       }
//     },
//     {
//       text: "Dueño Vende Anual",
//       btnClass: btnClassPrefix + "dueno-vende-anual",
//       expect: {
//         status: "OK",
//         type: "navigation",
//         assert: "/publicar",
//         parent: { element: ".publish", action: "click" }
//       }
//     },
//     {
//       text: "Dueño Vende Temporal",
//       btnClass: btnClassPrefix + "dueno-vende-temporal",
//       expect: {
//         status: "OK",
//         type: "navigation",
//         assert: "/publicar",
//         parent: { element: ".publish", action: "click" }
//       }
//     }
//     // {
//     //   text: "Notificaciones",
//     //   btnClass: btnClassPrefix + "notificaciones",
//     //   expect: {
//     //     status: "OK",
//     //     type: "toggle",
//     //     assert: ".notificaciones .notifiactions"
//     //   }
//     // },
//     // {
//     //   text: "User",
//     //   expect: {
//     //     status: "OK",
//     //     type: "navigation",
//     //     assert: "/sitio/index.php?mid=inmobiliarias&func=panelPropiedades"
//     //   }
//     // },
//     // {
//     //   text: "Panel Inmobiliario",
//     //   expect: {
//     //     status: "OK",
//     //     type: "navigation",
//     //     assert: "/sitio/index.php?mid=inmobiliarias&amp;func=panelPropiedades",
//     //     parent: { element: ".user_profile", action: "hover" }
//     //   }
//     // },
//     // {
//     //   text: "Alquileres Temporales",
//     //   expect: {
//     //     status: "OK",
//     //     type: "navigation",
//     //     assert: "/sitio/index.php?mid=inmobiliarias&func=panelPropiedades",
//     //     parent: { element: ".user_profile", action: "hover" }
//     //   }
//     // },
//     // {
//     //   text: "Panel de Pagos",
//     //   expect: {
//     //     status: "OK",
//     //     type: "navigation",
//     //     assert: "/sitio/index.php?mid=pagos",
//     //     parent: { element: ".user_profile", action: "hover" }
//     //   }
//     // },
//     // {
//     //   text: "Tarjetas de Credito",
//     //   expect: {
//     //     status: "OK",
//     //     type: "navigation",
//     //     assert: "/sitio/index.php?mid=pagos&func=view_administrar_tarjeta",
//     //     parent: { element: ".user_profile", action: "hover" }
//     //   }
//     // },
//     // {
//     //   text: "Mi cuenta",
//     //   expect: {
//     //     status: "ERROR"
//     //   }
//     // },
//     // {
//     //   text: "Cerrar sesión",
//     //   expect: {
//     //     status: "OK",
//     //     type: "navigation",
//     //     parent: { element: ".user_profile", action: "hover" },
//     //     assert: "/"
//     //   }
//     // }
//   ].map(t => CheckHeaderLink(t));
// });

afterAll(async () => {
  try {
    await page.close();
  } catch (e) {}

  try {
    await browserDriver.close();
  } catch (e) {}
});
