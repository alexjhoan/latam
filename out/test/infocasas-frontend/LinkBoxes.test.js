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

describe("<LinkBoxes>: También te puede interesar", () => {
  const data = [
    {
      text: "Alquiler en Montevideo",
      category: "Alquileres y Ventas",
      expect: { status: "OK", assert: "/alquiler/inmuebles/montevideo" },
    },
    {
      text: "Alquiler en Pocitos",
      category: "Alquileres y Ventas",
      expect: {
        status: "OK",
        assert: "/alquiler/inmuebles/montevideo/pocitos",
      },
    },
    {
      text: "Alquiler en Parque Rodó",
      category: "Alquileres y Ventas",
      expect: { status: "OK", assert: "/alquiler/inmuebles/montevideo" },
    },
    {
      text: "Alquiler en Ciudad Vieja",
      category: "Alquileres y Ventas",
      expect: {
        status: "OK",
        assert: "/alquiler/inmuebles/montevideo/ciudad-vieja",
      },
    },
    {
      text: "Alquiler en Canelones",
      category: "Alquileres y Ventas",
      expect: { status: "OK", assert: "/alquiler/inmuebles/canelones" },
    },
    {
      text: "Venta en Montevideo",
      category: "Alquileres y Ventas",
      expect: {
        status: "OK",
        assert: "/venta/inmuebles/montevideo",
      },
    },
    {
      text: "Venta en Pocitos",
      category: "Alquileres y Ventas",
      expect: {
        status: "OK",
        assert: "/venta/inmuebles/montevideo/pocitos",
      },
    },
    {
      text: "Venta en Carrasco",
      category: "Alquileres y Ventas",
      expect: {
        status: "OK",
        assert: "/venta/inmuebles/montevideo/carrasco",
      },
    },
    {
      text: "Venta en Canelones",
      category: "Alquileres y Ventas",
      expect: { status: "OK", assert: "/venta/inmuebles/canelones" },
    },
    {
      text: "Alquiler de casas en Montevideo",
      category: "Alquileres",
      expect: {
        status: "OK",
        assert: "/alquiler/casas/montevideo",
      },
    },
    {
      text: "Alquiler de casas en Pocitos",
      category: "Alquileres",
      expect: {
        status: "OK",
        assert: "/alquiler/casas/montevideo/pocitos",
      },
    },
    {
      text: "Alquiler de casas en Parque Rodó",
      category: "Alquileres",
      expect: {
        status: "OK",
        assert: "/alquiler/casas/montevideo/parque-rodo",
      },
    },
    {
      text: "Alquiler de casas en Ciudad Vieja",
      category: "Alquileres",
      expect: {
        status: "OK",
        assert: "/alquiler/casas/montevideo/ciudad-vieja",
      },
    },
    {
      text: "Alquiler de casas en Canelones",
      category: "Alquileres",
      expect: {
        status: "OK",
        assert: "/alquiler/casas/canelones",
      },
    },
    {
      text: "Alquiler de apartamentos en Montevideo",
      category: "Alquileres",
      expect: {
        status: "OK",
        assert: "/alquiler/apartamentos/montevideo",
      },
    },
    {
      text: "Alquiler de apartamentos en Pocitos",
      category: "Alquileres",
      expect: {
        status: "OK",
        assert: "/alquiler/apartamentos/montevideo/pocitos",
      },
    },
    {
      text: "Alquiler de apartamentos en Parque Rodó",
      category: "Alquileres",
      expect: {
        status: "OK",
        assert: "/alquiler/apartamentos/montevideo/parque-rodo",
      },
    },
    {
      text: "Alquiler de apartamentos en Ciudad Vieja",
      category: "Alquileres",
      expect: {
        status: "OK",
        assert: "/alquiler/apartamentos/montevideo/ciudad-vieja",
      },
    },
    {
      text: "Alquiler de apartamentos en Canelones",
      category: "Alquileres",
      expect: {
        status: "OK",
        assert: "/alquiler/apartamentos/canelones",
      },
    },
    {
      text: "Alquiler de casas en Ciudad Vieja",
      category: "Alquileres",
      expect: {
        status: "OK",
        assert: "/alquiler/casas/montevideo/ciudad-vieja",
      },
    },
    {
      text: "Venta de casas en Montevideo",
      category: "Ventas",
      expect: {
        status: "OK",
        assert: "/venta/casas/montevideo",
      },
    },
    {
      text: "Venta de casas en Pocitos",
      category: "Ventas",
      expect: {
        status: "OK",
        assert: "/venta/casas/montevideo/pocitos",
      },
    },
    {
      text: "Venta de casas en Buceo",
      category: "Ventas",
      expect: {
        status: "OK",
        assert: "/venta/casas/montevideo/buceo",
      },
    },
    {
      text: "Venta de casas en Carrasco",
      category: "Ventas",
      expect: {
        status: "OK",
        assert: "/venta/casas/montevideo/carrasco",
      },
    },
    {
      text: "Venta de casas en Canelones",
      category: "Ventas",
      expect: {
        status: "OK",
        assert: "/venta/casas/canelones",
      },
    },
    {
      text: "Venta de apartamentos en Montevideo",
      category: "Ventas",
      expect: {
        status: "OK",
        assert: "/venta/apartamentos/montevideo",
      },
    },
    {
      text: "Venta de apartamentos en Pocitos",
      category: "Ventas",
      expect: {
        status: "OK",
        assert: "/venta/apartamentos/montevideo/pocitos",
      },
    },
    {
      text: "Venta de apartamentos en Buceo",
      category: "Ventas",
      expect: {
        status: "OK",
        assert: "/venta/apartamentos/montevideo/buceo",
      },
    },
    {
      text: "Venta de apartamentos en Carrasco",
      category: "Ventas",
      expect: {
        status: "OK",
        assert: "/venta/apartamentos/montevideo/carrasco",
      },
    },
    {
      text: "Venta de apartamentos en Canelones",
      category: "Ventas",
      expect: {
        status: "OK",
        assert: "/venta/apartamentos/canelones",
      },
    },
    {
      text: "Alojamientos en Punta del Este",
      category: "Alojamientos",
      expect: {
        status: "OK",
        assert: "/alquiler-temporal/inmuebles/maldonado/punta-del-este",
      },
    },
    {
      text: "Alojamientos en Piriápolis",
      category: "Alojamientos",
      expect: {
        status: "OK",
        assert: "/alquiler-temporal/inmuebles/maldonado/piriapolis",
      },
    },
    {
      text: "Alojamientos en Punta Ballena",
      category: "Alojamientos",
      expect: {
        status: "OK",
        assert: "/alquiler-temporal/inmuebles/maldonado/punta-ballena",
      },
    },
    {
      text: "Alojamientos en José Ignacio",
      category: "Alojamientos",
      expect: {
        status: "OK",
        assert: "/alquiler-temporal/inmuebles/maldonado/jose-ignacio",
      },
    },
    {
      text: "Alojamientos en La Barra",
      category: "Alojamientos",
      expect: {
        status: "OK",
        assert: "/alquiler-temporal/inmuebles/maldonado/la-barra",
      },
    },
    {
      text: "Alojamientos en San Francisco",
      category: "Alojamientos",
      expect: {
        status: "OK",
        assert: "/alquiler-temporal/inmuebles/maldonado/san-francisco",
      },
    },
    {
      text: "Alojamientos en Rocha",
      category: "Alojamientos",
      expect: {
        status: "OK",
        assert: "/alquiler-temporal/inmuebles/rocha",
      },
    },
    {
      text: "Alojamientos en La Paloma",
      category: "Alojamientos",
      expect: {
        status: "OK",
        assert: "/alquiler-temporal/inmuebles/rocha/la-paloma",
      },
    },
    {
      text: "Alojamientos en Punta del Diablo",
      category: "Alojamientos",
      expect: {
        status: "OK",
        assert: "/alquiler-temporal/inmuebles/rocha/punta-del-diablo",
      },
    },
    {
      text: "Alojamientos en La Pedrera",
      category: "Alojamientos",
      expect: {
        status: "OK",
        assert: "/alquiler-temporal/inmuebles/rocha/la-pedrera",
      },
    },
  ].map((t) => LinkBoxesTest(t));

  function LinkBoxesTest(t, p) {
    test.only(
      "El botón [" +
        t.text +
        "] deberia [" +
        (t.expect.status === "OK" ? "EXISTIR" : "NO EXISTIR") +
        "]",
      async (done) => {
        const p = page;
        await p.goto(appUrlBase);

        const selector = t.category
          .toLowerCase()
          .split(" ")
          .join("-");

        // abro seccion en mobile
        await p.click("." + selector + " " + ".BlockCollapse");
        const links = await p.$$(".LinkBox a");
        const link = await (async () => {
          for (const i in links) {
            const l = links[i];
            try {
              const text = await l.$eval("span", (e) => {
                return e.innerText;
              });
              if (text.toUpperCase().includes(t.text.toUpperCase())) {
                return l;
              }
            } catch (e) {}
          }
          return null;
        })();
        if (link && t.expect.status === "ERROR") {
          throw new Error("Assert should be [NO EXISTIR] but it is [EXISTIR]");
        } else if (!link && t.expect.status === "OK") {
          throw new Error("Assert should be [EXISTIR] but it is [NO EXISTIR]");
        } else if (link && t.expect.status === "OK") {
          await link.click();
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
