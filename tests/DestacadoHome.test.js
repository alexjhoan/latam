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

function getRandomIntBetween(min, max) {
  min = Math.floor(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

async function changeOperationTo(page, operation) {
  await page.click(".operation-type-container .header");
  const options = await page.$$(".operation-type-container .option");
  const option = await (async () => {
    for (let o = 0; o < options.length; o++) {
      const opt = options[o];
      try {
        const text = await opt.$eval(".text", (e) => {
          return e.innerText;
        });
        if (text.toUpperCase() === operation.toUpperCase()) {
          return opt;
        }
      } catch (e) {}
    }
  })();
  await option.click();
}

async function changePropertyTypeTo(page, type) {
  await page.click(".property-type-container .header");
  const options = await page.$$(".property-type-container .option");
  const option = await (async () => {
    for (let o = 0; o < options.length; o++) {
      const opt = options[o];
      try {
        const text = await opt.$eval(".text", (e) => {
          return e.innerText;
        });
        if (text.toUpperCase() === type.toUpperCase()) {
          return opt;
        }
      } catch (e) {
        throw new Error("option not found");
      }
    }
  })();
  await option.click();
  await page.click(".property-type-container .header");
}

async function selectOperationTypeMobile(operation, p) {
  await p.click(".operation-type-container .header");
  const options = await p.$$(".operation-type-container select option");
  const option = await (async () => {
    for (let o = 0; o < options.length; o++) {
      const opt = options[o];
      try {
        const text = await opt.evaluate((e) => e.innerText);
        if (text.toUpperCase() === operation.toUpperCase()) {
          return opt;
        }
      } catch (e) {}
    }
  })();
  const opt_value = await option.evaluate((elem) => elem.value);
  await p.select(".operation-type-container select", opt_value);
}

async function selectPropertyTypeMobile(types, p) {
  types = [types];
  await p.click(".property-type-container .header");
  const options = await p.$$(".property-type-container select option");
  await (async () => {
    let options_to_select = [];
    for (let o = 0; o < options.length; o++) {
      const opt = options[o];
      try {
        const text = await opt.evaluate((e) => e.innerText);
        const opt_value = await opt.evaluate((e) => e.value);
        const found = types.find(
          (elem) => elem.toUpperCase() === text.toUpperCase()
        );
        if (typeof found != "undefined") options_to_select.push(opt_value);
      } catch (e) {}
    }
    await p.select(".property-type-container select", options_to_select);
  })();
}

describe("<DestacadoHome>", () => {
  test("Check if banner exist", async (done) => {
    const p = page; //reutilize same page

    await p.goto(routes.public.home);
    await closePopupDestacadosIfExists(p);

    await p
      .waitForSelector(".destacadoHome", { timeout: 10000 })
      .then(async (e) => {
        // si existe checkeo que haya cargado ".background-logo"ç
        if (
          (await p.$(".destacadoHome .background-logo")) != null ||
          (await p.$(".destacadoHome.ERROR_LOADING_DESTACADO_HOME")) != null
        ) {
          console.log("Destacado Home - Found");
        } else {
          throw new Error("Destacado Home - Error Query");
        }
      })
      .catch((e) => {
        throw new Error("Destacado Home - Not Loaded");
      });

    done();
    //await p.close();
  }, 1600000);

  test("Check if changes on reload", async (done) => {
    const p = page; //reutilize same page
    await p.goto(routes.public.home);
    await closePopupDestacadosIfExists(p);

    const MAX_AMOUNT_RELOADS = 10;

    let destacado = await p.waitForSelector(".destacadoHome", {
      timeout: 10000,
    });

    const banner_image = await destacado.$eval(".background", (e) => {
      return e.src;
    });
    let contador = 1;
    let isDifferent = false;

    while (!isDifferent && contador <= MAX_AMOUNT_RELOADS) {
      await p.reload(routes.public.home, {
        timeout: 10000,
      });

      const reload_image = await p.$eval(".destacadoHome .background", (e) => {
        return e.src;
      });

      isDifferent = banner_image != reload_image;
      contador++;
    }

    if (!isDifferent && contador <= MAX_AMOUNT_RELOADS)
      throw new Error("Destacado Home - Banner Not Changes On Reload");

    done();
  }, 1600000);

  // test("Check if changes on resize", async (done) => {
  //   const p = page; //reutilize same page
  //   await p.goto(routes.public.home);
  //   await closePopupDestacadosIfExists(p);

  //   const MAX_AMOUNT_RESIZE = 10;

  //   let destacado = await p.waitForSelector(".destacadoHome", {
  //     timeout: 10000,
  //   });

  //   const banner_image = await destacado.$eval(".background", (e) => {
  //     return e.src;
  //   });
  //   let contador = 1;
  //   let isDifferent = false;

  //   while (!isDifferent && contador <= MAX_AMOUNT_RESIZE) {
  //     await p.setViewport({
  //       width: getRandomIntBetween(280, 2500),
  //       height: getRandomIntBetween(280, 2000),
  //     });
  //     await new Promise((r) => setTimeout(r, 2000)); //wait for animation ends
  //     const reload_image = await p.$eval(".destacadoHome .background", (e) => {
  //       return e.src;
  //     });

  //     isDifferent = banner_image != reload_image;
  //     contador++;
  //   }

  //   if (!isDifferent && contador <= MAX_AMOUNT_RESIZE)
  //     throw new Error("Destacado Home - Banner Changed on Resize");

  //   done();
  // }, 1600000);

  test("Check if changes on modal sign up open", async (done) => {
    const p = page; //reutilize same page
    await p.goto(routes.public.home);
    await closePopupDestacadosIfExists(p);
    const isMobile = await p.context()._options.viewport.isMobile;

    if (!isMobile) {
      const MAX_AMOUNT_RELOADS = 12;

      let destacado = await p.waitForSelector(".destacadoHome", {
        timeout: 10000,
      });
      const banner_image = await destacado.$eval(".background", (e) => {
        return e.src;
      });

      let contador = 1;
      let isDifferent = false;

      while (!isDifferent && contador <= MAX_AMOUNT_RELOADS) {
        if (contador % 2 == 0) {
          await p.click("#login-with-pop .cerrar_consultar");
        } else if (contador % 4 == 1) {
          await p.click("#header .register");
        } else {
          await p.click("#header .iniciar_sesion");
        }

        await new Promise((r) => setTimeout(r, 2000)); //wait for animation ends
        const reload_image = await p.$eval(
          ".destacadoHome .background",
          (e) => {
            return e.src;
          }
        );
        isDifferent = banner_image != reload_image;

        contador++;
      }

      if (!isDifferent && contador <= MAX_AMOUNT_RELOADS)
        throw new Error("Destacado Home - Banner Not Changes On Reload");
    }

    done();
  }, 1600000);
});

describe("<DestacadoHome>: Check if changes on buscador change", () => {
  const data = [
    { action: "operation-type", option: "Alquiler", change: true },
    { action: "operation-type", option: "Alquiler", change: true },
    { action: "search-box", option: "Malvin", change: false },
    { action: "search-box", option: "Buceo", change: false },
    { action: "operation-type", option: "Alquiler Temporal", change: true },
    // { action: "operation-type", option: "Venta", change: true },
    { action: "operation-type", option: "Alquiler Temporal", change: true },
    // { action: "operation-type", option: "Venta", change: true },
    // { action: "property-type", option: "Terreno", change: false },
    { action: "search-box", option: "Buceo", change: false },
    // { action: "property-type", option: "Terreno", change: false },
  ];
  data.map((act) => {
    switch (act.action) {
      case "operation-type":
        test_operation_change(act);
        break;
      case "property-type":
        test_property_type_change(act);
        break;
      case "search-box":
        test_search_change(act);
        break;
      default:
        break;
    }
  });

  function test_operation_change(a) {
    test(
      "Change operation type to " +
        a.option +
        " should " +
        (a.change ? "change" : "not change"),
      async (done) => {
        const p = page; //reutilize same page
        await p.goto(routes.public.home);
        await closePopupDestacadosIfExists(p);

        const isMobile = await p.context()._options.viewport.isMobile;

        if (isMobile) selectOperationTypeMobile("Venta", p);
        else await changeOperationTo(p, "Venta");

        let destacado = await p.waitForSelector(".destacadoHome", {
          timeout: 10000,
        });
        let banner_image = await destacado.$eval(".background", (e) => {
          return e.src;
        });

        if (isMobile) selectOperationTypeMobile(a.option, p);
        else await changeOperationTo(p, a.option);

        await new Promise((r) => setTimeout(r, 2000)); //wait for animation ends
        const change_image = await p.$eval(
          ".destacadoHome .background",
          (e) => {
            return e.src;
          }
        );

        if (banner_image == change_image && a.change) {
          throw new Error("Banner Change Expected");
          // puede que falle por el random
        } else if (banner_image != change_image && !a.change) {
          throw new Error("Banner Change Not Expected");
        } else {
          console.log("Banner OK");
        }

        done();
      },
      1600000
    );
  }

  function test_property_type_change(a) {
    test(
      "Change propery type to " +
        a.option +
        " should " +
        (a.change ? "change" : "not change"),
      async (done) => {
        const p = page; //reutilize same page
        await p.goto(routes.public.home);
        await closePopupDestacadosIfExists(p);
        const isMobile = await p.context()._options.viewport.isMobile;

        const operations_to_test = ["Venta", "Alquiler"];
        for (let i = 0; i < operations_to_test.length; i++) {
          if (isMobile) selectOperationTypeMobile(operations_to_test[i], p);
          else await changeOperationTo(p, operations_to_test[i]);
          await new Promise((r) => setTimeout(r, 2000)); //wait for animation ends
          const banner_image = await p.$eval(
            ".destacadoHome .background",
            (e) => {
              return e.src;
            }
          );
          if (isMobile) selectPropertyTypeMobile(operations_to_test[i], p);
          else await changePropertyTypeTo(p, a.option);

          await new Promise((r) => setTimeout(r, 2000)); //wait for animation ends
          const change_image = await p.$eval(
            ".destacadoHome .background",
            (e) => {
              return e.src;
            }
          );
          if (banner_image == change_image && a.change) {
            throw new Error("Banner Change Expected");
            // puede que falle por el random
          } else if (banner_image != change_image && !a.change) {
            throw new Error("Banner Change Not Expected");
          } else {
            console.log("Banner OK");
          }
        }

        done();
      },
      1600000
    );
  }

  function test_search_change(a) {
    test(
      "Change Search to " +
        a.option +
        " should " +
        (a.change ? "change" : "not change"),
      async (done) => {
        const p = page; //reutilize same page
        await p.goto(routes.public.home);
        await closePopupDestacadosIfExists(p);

        let destacado = await p.waitForSelector(".destacadoHome", {
          timeout: 10000,
        });
        let banner_image = await destacado.$eval(".background", (e) => {
          return e.src;
        });

        await p.click(".search-box-container .rbt-input-hint-container");
        await p.keyboard.type(a.option);
        const options = await p.$$(".search-box-container .search");
        if (options.length <= 0) throw new Error("Option not found");
        const option = options[0];
        await option.click();

        await new Promise((r) => setTimeout(r, 3000)); //wait for animation ends
        const change_image = await p.$eval(
          ".destacadoHome .background",
          (e) => {
            return e.src;
          }
        );

        if (banner_image == change_image && a.change) {
          throw new Error("Banner Change Expected");
          // puede que falle por el random
        } else if (banner_image != change_image && !a.change) {
          throw new Error("Banner Change Not Expected");
        } else {
          console.log("Banner OK");
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
