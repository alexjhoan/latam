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

describe("<BuscarPorReferencia>: Busqueda por referencia", () => {
  const data = [
    {
      ref: "P14724",
      expect: { status: "OK", type: "PROYECTO", assert: "town-park" },
    },

    {
      ref: "ZA5FA",
      expect: { status: "OK", type: "VENTA", assert: "/186294292" },
    },
    {
      ref: "ZDFC7",
      expect: { status: "OK", type: "ALQUILER", assert: "/186312202" },
    },
    {
      ref: "AC124",
      expect: { status: "OK", type: "DESHABILITADA", assert: "/185768820" },
    },
    {
      ref: "42C3A",
      expect: { status: "OK", type: "OTRO_PAIS", assert: "/185984076" },
    },
    {
      ref: "",
      expect: {
        status: "ERROR",
        type: "VALIDACION",
        assert: "Debe ingresar una referencia",
      },
    },
    {
      ref: "AAA",
      expect: {
        status: "ERROR",
        type: "VALIDACION",
        assert: "Referencia inválida",
      },
    },
    {
      ref: "AAAAAA",
      expect: {
        status: "ERROR",
        type: "VALIDACION",
        assert: "Referencia inválida",
      },
    },
    {
      ref: "CA CAC",
      expect: {
        status: "ERROR",
        type: "VALIDACION",
        assert: "Referencia inválida",
      },
    },
    {
      ref: "CA'CAC",
      expect: {
        status: "ERROR",
        type: "VALIDACION",
        assert: "Referencia inválida",
      },
    },
    {
      ref: "CA;CAC",
      expect: {
        status: "ERROR",
        type: "VALIDACION",
        assert: "Referencia inválida",
      },
    },
    {
      ref: 'CA"CAC',
      expect: {
        status: "ERROR",
        type: "VALIDACION",
        assert: "Referencia inválida",
      },
    },
  ].map((t) => BusquedaPorReferenciaTest(t));

  function BusquedaPorReferenciaTest(t) {
    test(
      "Buqueda por referencia [" +
        t.ref +
        "]: Should be [" +
        t.expect.status +
        "_" +
        t.expect.type +
        "]",
      async (done) => {
        const p = page; //reutilize same page
        await p.goto(routes.public.home);

        await closePopupDestacadosIfExists(p);

        await p.click("#buscarref");
        await p.keyboard.type(t.ref);
        await p.click("#botonreferencia");

        //expect to: cambiar de URL (OK?) o aparece alertError(ERROR?)
        const OK = new Promise(function(resolve, reject) {
          p.waitForNavigation({ timeout: 10000 })
            .then((e) => {
              resolve({ status: "OK", assert: e.url() });
            })
            .catch((e) => {
              reject({ status: "ERROR A" });
            });
        });

        const ERROR = new Promise(function(resolve, reject) {
          p.waitForSelector("#buscarReferencia .error", { timeout: 10000 })
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
          if (o.status !== t.expect.status) {
            throw new Error(
              "Status should be [" +
                t.expect.status +
                "] but it is [" +
                o.status +
                "] "
            );
          }
          if (!o.assert.includes(t.expect.assert)) {
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

afterAll(async () => {
  try {
    await page.close();
  } catch (e) {}

  try {
    await browserDriver.close();
  } catch (e) {}
});
