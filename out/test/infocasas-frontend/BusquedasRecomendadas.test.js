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

describe("<BusquedasRecomendadas>: Busqueda recomendada", () => {
  const data = [
    {
      text: "Alquiler de Apartamentos",
      onlyDesktop: true,
      expect: { status: "OK", assert: "/alquiler/apartamentos" },
    },
    {
      text: "Venta de Casas",
      onlyDesktop: true,
      expect: { status: "OK", assert: "/venta/casas" },
    },
    {
      text: "Alquiler en Montevideo",
      onlyDesktop: true,
      expect: { status: "OK", assert: "/alquiler/inmuebles/montevideo" },
    },
    {
      text: "Alquiler en Pocitos",
      onlyDesktop: true,
      expect: {
        status: "OK",
        assert: "/alquiler/inmuebles/montevideo/pocitos",
      },
    },
    {
      text: "Venta en Montevideo",
      onlyDesktop: true,
      expect: { status: "OK", assert: "/venta/inmuebles/montevideo" },
    },
    {
      text: "Venta en Pocitos",
      onlyDesktop: true,
      expect: { status: "OK", assert: "/venta/inmuebles/montevideo/pocitos" },
    },
    {
      text: "Venta en Carrasco",
      onlyDesktop: true,
      expect: { status: "OK", assert: "/venta/inmuebles/montevideo/carrasco" },
    },
    {
      text: "Venta en Canelones",
      onlyDesktop: true,
      expect: { status: "OK", assert: "/venta/inmuebles/canelones" },
    },
    {
      text: "Alojamientos en Punta del Este",
      onlyDesktop: true,
      expect: {
        status: "OK",
        assert: "/alquiler-temporal/casas/maldonado/punta-del-este",
      },
    },
    {
      text: "Alquiler en Santa Cruz",
      expect: {
        status: "ERROR",
      },
    },
    {
      text: "Venta en Santa Cruz",
      expect: {
        status: "ERROR",
      },
    },
    {
      text: "Alquiler en Paraguay",
      expect: {
        status: "ERROR",
      },
    },
    {
      text: "Venta en Paraguay",
      expect: {
        status: "ERROR",
      },
    },
    {
      text: "Alquileres en Punta Ballena",
      expect: {
        status: "ERROR",
      },
    },
    {
      text: "Alquileres en La Barra",
      expect: {
        status: "ERROR",
      },
    },
    {
      text: "Alquileres en Atlántida",
      expect: {
        status: "ERROR",
      },
    },
  ].map((t) => BusquedaRecomendadaTest(t));

  function BusquedaRecomendadaTest(t, p) {
    test.only(
      "El botón [" +
        t.text +
        "] deberia [" +
        (t.expect.status === "OK" ? "EXISTIR" : "NO EXISTIR") +
        "]",
      async (done) => {
        const p = page;
        await p.goto(appUrlBase);

        let link = void 0;
        try {
          link = await page.waitForSelector("a[title='" + t.text + "]", {
            visible: true,
          });
        } catch (e) {
          // link = void 0;
        }

        // BusquedasRecomendas

        if (link && t.expect.status === "ERROR") {
          throw new Error("Assert should be [NO EXISTIR] but it is [EXISTIR]");
        } else if (!link && t.expect.status === "OK" && !t.onlyDesktop) {
          throw new Error("Assert should be [EXISTIR] but it is [NO EXISTIR]");
        } else if (link && t.expect.status === "OK") {
          await link.click();
          await p.waitForNavigation({ timeout: 10000 });
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
