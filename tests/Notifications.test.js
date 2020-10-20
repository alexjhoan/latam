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

describe("Notificaciones", () => {
  test.only("test", async done => {
    const p = page;
    await p.goto(appUrlBase);
    await closePopupDestacadosIfExists(page);

    const isMobile = await p.context()._options.viewport.isMobile;

    // con esta cuenta al menos voy a tener 1 notificacion
    await login(
      { email: "augusto@infocasas.com.uy", pass: "itunes" },
      p,
      isMobile
    );

    // en mobile: abro el drawer
    if (isMobile) {
      await p.click("#iconMenu");
      // muestra el popup
      await p.click(".notificaciones");
      await p.waitForNavigation();
      const url = await p.url();
      if (!url.includes("/notificaciones")) {
        throw new Error("Error URL notificaciones");
      }
    } else {
      // es desktop

      // click en la campanita
      await p.click(".notificaciones");

      // muestra el popup
      await p.waitForSelector(".notifiactions", { visible: true });

      // marco todas como leidas
      await p.click("#todasLeidas");

      await p.waitFor(1000);

      // ahora no tendria que estar la campanita visible, porque se borraron todas
      await p.waitForSelector(".notificaciones_ball", { hidden: true });

      // agarro una notificacion y la marco como "sin leer"
      await p.click(".emergentBubble .mark_unseen");

      // espero luego de clickear
      await p.waitFor(1000);

      // ahora la campanita tendria que verse y decir "1" en el innerHtml
      const notiCount = await p.$eval(".notificaciones_ball", element => {
        return element.innerText;
      });

      // tendria que tener una ("1") notificacion
      expect(notiCount).toBe("1");
    }

    done();
  }, 1600000);
});

afterAll(async () => {
  try {
    await page.close();
  } catch (e) {}

  try {
    await browserDriver.close();
  } catch (e) {}
});
