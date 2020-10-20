const playwright =  require('playwright');
const settings = loadTestSettings();


var browserDriver;
var browser;
let page;

const appUrlBase = settings.baseUrl ;
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
browser = await browserDriver.newContext({...settings.device});
await new Promise(r => setTimeout(r, 5000));
  // creates a new page in the opened browser
  page = await browser.newPage();
});

describe("<InmobiliariasDestacadas>: Inmobiliarias Destacadas", () => {
  test("Banners deberian de cambiar de orden al refrescar", async done => {
    const p = page; //reutilize same page
    await p.goto(routes.public.home);

    await closePopupDestacadosIfExists(p);

    // obtengo todos los banners que se muestran
    const logosFirstVisit = await p.$$eval(
      ".InmobiliariasDestacadas .inmoLogo img",
      el => el.map(x => x.getAttribute("src"))
    );

    // recargo la pagina
    await p.reload();

    // obtengo los banners de nuevo, luego de recargar
    const logosSecondVisit = await p.$$eval(
      ".InmobiliariasDestacadas .inmoLogo img",
      el => el.map(x => x.getAttribute("src"))
    );

    const sonIguales =
      JSON.stringify(logosFirstVisit) === JSON.stringify(logosSecondVisit);

    // los banners deberian de NO mostrarse en el mismo orden las dos veces
    expect(sonIguales).toBeFalsy();

    done();
    //await p.close();
  }, 1600000);
});

afterAll(async () => {
  try {
    await page.close();
  }catch(e) {}

  try {
    await browserDriver.close();
  }catch(e) {}
});
