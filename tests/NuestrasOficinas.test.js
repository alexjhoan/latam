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

describe("<NuestrasOficinas>: Oficinas", () => {
  const data = [
    {
      country: "Uruguay",
      expect: {
        status: "OK",
        phone: "(+598) 2605 5555",
        email: "info@infocasas.com.uy",
      },
    },
    {
      country: "Paraguay",
      expect: {
        status: "OK",
        phone: "(+595) 981 424 876",
        email: "info@infocasas.com.py",
      },
    },
    {
      country: "Bolivia",
      expect: {
        status: "OK",
        phone: "(+591) 75 007 272",
        email: "info@infocasas.com.bo",
      },
    },
    {
      country: "Perú",
      expect: {
        status: "OK",
        phone: "(+51) 951 760 125",
        email: "info@infocasas.com.pe",
      },
    },
    {
      country: "Casas en el Este",
      expect: {
        status: "ERROR",
      },
    },
  ].map((t) => LinkBoxesTest(t));

  function LinkBoxesTest(t, p) {
    test.only(
      "La oficina [" +
        t.country +
        "] deberia [" +
        (t.expect.status === "OK" ? "EXISTIR" : "NO EXISTIR") +
        "]",
      async (done) => {
        const p = page;
        await p.goto(appUrlBase);

        let name;
        let phone;
        let email;
        const selector = ".office." + t.country.toLowerCase() + " .text ";

        try {
          name = await p.$eval(selector + "h3", (e) => {
            return e.innerText;
          });
          name = name === t.country;

          phone = await p.$eval(selector + ".phone span", (e) => {
            return e.innerText;
          });
          phone = phone.includes(t.expect.phone);

          email = await p.$eval(selector + ".email span", (e) => {
            return e.innerText;
          });
          email = email === t.expect.email;
        } catch (e) {}

        const valid = name && phone && email;

        if (valid && t.expect.status === "ERROR") {
          throw new Error("Assert should be [NO EXISTIR] but it is [EXISTIR]");
        } else if (!valid && t.expect.status === "OK") {
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
