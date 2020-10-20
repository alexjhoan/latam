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

describe("<PopupDestacado>", () => {
  test("check if close button exist and close", async (done) => {
    const p = page; //reutilize same page
    await p.goto(appUrlBase);

    // borro localstorage para asegurarme que se va a mostrar el popup al recargar
    await page.evaluate(() => localStorage.removeItem("popup_destacado"));

    await p.goto(appUrlBase);

    let popupSelector = null;
    try {
      popupSelector = await p.waitForSelector("#popupDestacado", {
        timeout: 10000,
      });
    } catch (e) {}

    if (popupSelector != null) {
      let btn_cerrar = null;
      try {
        btn_cerrar = await p.waitForSelector("#popupDestacado .cerrar_popup");
      } catch (er) {}

      if (btn_cerrar == null)
        throw new Error(
          "PopUp destacado se muestra pero no tiene botón de CERRAR"
        );

      await btn_cerrar.click();
      await new Promise((r) => setTimeout(r, 2000)); // espero que cierro el popoup

      popupSelector = null;
      try {
        popupSelector = await p.waitForSelector("#popupDestacado", {
          timeout: 10000,
        });
      } catch (e) {}
      if (popupSelector != null)
        throw new Error("El botón de cerrar no cierra el PopUp");
    }

    done();
  }, 1600000);

  test("check if open on reload after one time opeen", async (done) => {
    const p = page; //reutilize same page
    await p.goto(appUrlBase);
    // borro localstorage para asegurarme que se va a mostrar el popup al recargar
    await page.evaluate(() => localStorage.removeItem("popup_destacado"));
    await p.goto(appUrlBase);

    // check if popup open one time
    let popupSelector = null;
    try {
      popupSelector = await p.waitForSelector("#popupDestacado", {
        timeout: 10000,
      });
    } catch (e) {}

    if (popupSelector != null) {
      await p.goto(appUrlBase);

      popupSelector = null;
      try {
        popupSelector = await p.waitForSelector("#popupDestacado", {
          timeout: 10000,
        });
      } catch (e) {}

      if (popupSelector != null) {
        throw new Error(
          "El popup destacado no deberia mostrarse al recargar la página"
        );
      }
    } else {
      console.error("No hay popup.");
    }

    done();
  }, 1600000);
});

describe.only("<PopupDestacado>: Variando Fecha", () => {
  [
    // { time: 1582858800000, expect: { status: "OK" } }, // 28 de Febrero 2020
    // { time: Date.now() - 2 * 24 * 60 * 60 * 1000, expect: { status: "OK" } }, // ahora menos dos dias
    // { time: Date.now() - (24 * 60 * 60 * 1000 + 1), expect: { status: "OK" } }, // ahora menos un dia

    { time: Date.now(), expect: { status: "ERROR" } }, // ahora
    { time: Date.now() + 24 * 60 * 60 * 1000, expect: { status: "ERROR" } }, // mañana
    { time: Date.now() - 2 * 60 * 60 * 1000, expect: { status: "ERROR" } }, // ahora menos dos horas
  ].map((time) => checkifPopupOpen(time));

  function checkifPopupOpen(t) {
    test(
      "If last popup open was on [" +
        new Date(t.time).toString() +
        "] it should " +
        (t.expect.status == "OK" ? "" : "NOT ") +
        "OPEN",
      async (done) => {
        const p = page; //reutilize same page
        await p.goto(appUrlBase);

        // actualizo localstorage para fecha que quiero controlar
        await p.evaluate((t) => {
          localStorage.setItem("popup_destacado", t.time);
        }, t);

        await p.goto(appUrlBase);

        let popupSelector = null;
        try {
          popupSelector = await p.waitForSelector("#popupDestacado", {
            timeout: 10000,
          });
        } catch (e) {}

        if (popupSelector == null) {
          if (t.expect.status == "OK") {
            throw new Error(
              "For date [" +
                new Date(t.time).toString() +
                "] popup destacado expected to OPEN but it DIDN'T"
            );
          }
        } else {
          if (t.expect.status == "ERROR") {
            throw new Error(
              "For date [" +
                new Date(t.time).toString() +
                "] popup destacado expected to NOT OPEN but it OPEN"
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
