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

async function selectOperationType(operation, p) {
  await p.click(".operation-type-container .header");
  const options = await p.$$(".operation-type-container .option");
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

async function selectPropertyType(types, p) {
  await p.click(".property-type-container .header");
  const options = await p.$$(".property-type-container .option");
  await (async () => {
    for (let o = 0; o < options.length; o++) {
      const opt = options[o];
      try {
        const text = await opt.$eval(".text", (e) => e.innerText);
        const found = types.find(
          (elem) => elem.toUpperCase() === text.toUpperCase()
        );
        const className = await opt.evaluate((el) => el.className);
        const isChecked = className.indexOf("checked") >= 0;
        if (
          (typeof found != "undefined" && !isChecked) ||
          (typeof found == "undefined" && isChecked)
        ) {
          await opt.click();
        }
      } catch (e) {}
    }
  })();
  await p.click(".property-type-container .header");
}

async function selectDateOnCalendar(date, p, calendar) {
  const fecha = new Date(date).toDateString();
  await p.click(
    ".search-date-container .DatePickerContainer." +
      calendar +
      " .DayPickerInput"
  );
  let contador = 1;
  let option = null;
  while (option == null && contador <= 20) {
    const options = await p.$$(
      ".search-date-container .DatePickerContainer." +
        calendar +
        " .DayPicker-Day"
    );

    option = await (async () => {
      for (let o = 0; o < options.length; o++) {
        const opt = options[o];
        try {
          const date = await opt.evaluate((el) =>
            el.getAttribute("aria-label")
          );
          if (date === fecha) {
            return opt;
          }
        } catch (e) {}
      }
      return null;
    })();

    if (option == null) {
      if (
        new Date(date) <
        new Date(
          await options[0].evaluate((el) => el.getAttribute("aria-label"))
        )
      ) {
        await p.click(
          ".search-date-container .DatePickerContainer." +
            calendar +
            " .DayPicker-NavButton.DayPicker-NavButton--prev"
        );
      } else {
        await p.click(
          ".search-date-container .DatePickerContainer." +
            calendar +
            " .DayPicker-NavButton.DayPicker-NavButton--next"
        );
      }
    }
    contador++;
  }

  if (option != null) {
    await option.click();
  } else if (contador > 20) throw new Error("Error: couldn't found Date");
}

async function selectDates(date, p) {
  let waitSelector = null;
  try {
    waitSelector = await p.waitForSelector(".search-date-container", {
      timeout: 4000,
    });
  } catch (e) {}

  if (waitSelector == null) await p.click(".button_byTemporada");
  if (typeof date.start != "undefined")
    await selectDateOnCalendar(date.start, p, "start");

  if (typeof date.end != "undefined")
    await selectDateOnCalendar(date.end, p, "end");
}

async function selectSeason(season, p) {
  let waitSelector = null;
  try {
    waitSelector = await p.waitForSelector(".temporadas-box-container", {
      timeout: 4000,
    });
  } catch (e) {}

  if (waitSelector == null) await p.click(".button_byTemporada");

  await p.click(".temporadas-box-container .header");
  const options = await p.$$(".temporadas-box-container .option");
  const option = await (async () => {
    for (let o = 0; o < options.length; o++) {
      const opt = options[o];
      try {
        const text = await opt.$eval(".text", (e) => {
          return e.innerText;
        });
        if (text.toUpperCase() === season.toUpperCase()) {
          return opt;
        }
      } catch (e) {}
    }
  })();
  await option.click();
}

async function selectZones(search, p) {
  if (!Array.isArray(search)) search = [search];
  const selectBusqueda = await p.$(".search-box-container");
  const inputBusqueda = await p.$(".search-box-container input");

  for (let index = 0; index < search.length; index++) {
    await selectBusqueda.click();

    const s = search[index];
    await inputBusqueda.type(s, { delay: 100 });
    const options = await selectBusqueda.$$(".search");

    const option = options[0];
    await option.click();
    if (index < search.length - 1) {
      await p.click("main h1");
    }
  }
}

async function unselectZones(p) {
  const selectBusqueda = await p.$(".search-box-container");
  await selectBusqueda.click();
  try {
    await p.click(".search-box-container .deseleccionar");
  } catch (e) {}
}

async function acceptZones(p) {
  const selectBusqueda = await p.$(".search-box-container");
  await selectBusqueda.click();
  try {
    await p.click(".search-box-container .aceptar");
  } catch (e) {}
}

async function doSearch(input, value, p, status) {
  switch (input) {
    case "operation":
      await selectOperationType(value, p);
      break;
    case "property":
      let waitPropertySelector = null;
      try {
        waitPropertySelector = await p.waitForSelector(
          ".property-type-container",
          {
            timeout: 4000,
          }
        );
      } catch (e) {}
      if (waitPropertySelector == null) {
        if (typeof status != "undefined") {
          return {
            status: "ERROR",
            message:
              "No se puede seleccionar Temporada, el tipo de operacion deberia ser Venta",
          };
        }
        await selectOperationType("Venta", p);
      }
      await selectPropertyType(value, p);
      break;
    case "zones":
      await selectZones(value, p);
      let redirect;
      if (typeof status != "undefined") {
        try {
          redirect = await p.waitForNavigation({ timeout: 10000 });
        } catch (e) {}
        // console.log("typeo redirect", typeof redirect);
        if (typeof redirect != "undefined") {
          return { status: "ERROR", assert: p.url() };
        } else if (Array.isArray(value) && value.length > 1) {
          await p.click(".search-box-container .aceptar");
        }
      }
      break;
    case "zones_unselect":
      await unselectZones(p);
      break;
    case "zones_accept":
      await acceptZones(p);
      break;
    case "click_outside":
      await p.click("main h1");
      break;
    case "dates":
      let waitDateSelector = null;
      try {
        waitDateSelector = await p.waitForSelector(".search-date-container", {
          timeout: 4000,
        });
      } catch (e) {}
      if (waitDateSelector == null) {
        if (typeof status != "undefined") {
          return {
            status: "ERROR",
            message:
              "No se puede seleccionar fechas, el tipo de operacion deberia ser Alquiler Temporal",
          };
        }
        await selectOperationType("Alquiler Temporal", p);
      }
      await selectDates(value, p);
      break;
    case "season":
      let waitSeasonSelector = null;
      try {
        waitSeasonSelector = await p.waitForSelector(".search-date-container", {
          timeout: 4000,
        });
      } catch (e) {}

      if (waitSeasonSelector == null) {
        if (typeof status != "undefined") {
          return {
            status: "ERROR",
            message:
              "No se puede seleccionar Temporada, el tipo de operacion deberia ser Alquiler Temporal",
          };
        }
        await selectOperationType("Alquiler Temporal", p);
      }

      await selectSeason(value, p);
      break;
  }
  return null;
}

async function getSearchValue(input, p) {
  switch (input) {
    case "operation":
      return await getSelectorText(".operation-type-container .header span", p);
      break;
    case "property":
      let waitPropertySelector = null;
      try {
        waitPropertySelector = await p.waitForSelector(
          ".property-type-container",
          {
            timeout: 4000,
          }
        );
      } catch (e) {}
      if (waitPropertySelector == null) await selectOperationType("Venta", p);

      return await getSelectorText(".property-type-container .header span", p);

      break;
    case "zones":
      return await getInputValue(".search-box-container input", p);
      break;
    case "dates":
      let waitDateSelector = null;
      try {
        waitDateSelector = await p.waitForSelector(".search-date-container", {
          timeout: 4000,
        });
      } catch (e) {}
      if (waitDateSelector == null)
        await selectOperationType("Alquiler Temporal", p);

      waitDateSelector = null;
      try {
        waitDateSelector = await p.waitForSelector(".search-date-container", {
          timeout: 4000,
        });
      } catch (e) {}

      if (waitDateSelector == null) await p.click(".button_byTemporada");

      let result = {};
      result["start"] = await getInputValue(
        ".DatePickerContainer.start input",
        p
      );
      result["end"] = await getInputValue(".DatePickerContainer.end input", p);

      return result;

      break;
    case "season":
      let waitSeasonSelector = null;
      try {
        waitSeasonSelector = await p.waitForSelector(".search-date-container", {
          timeout: 4000,
        });
      } catch (e) {}

      if (waitSeasonSelector == null)
        await selectOperationType("Alquiler Temporal", p);

      waitSeasonSelector = null;
      try {
        waitSeasonSelector = await p.waitForSelector(
          ".temporadas-box-container",
          {
            timeout: 4000,
          }
        );
      } catch (e) {}

      if (waitSeasonSelector == null) await p.click(".button_byTemporada");

      return await getSelectorText(".temporadas-box-container .header span", p);
      break;
  }
}

async function getInputValue(selector, p) {
  const text = await p.$eval(selector, (e) => {
    return e.value;
  });
  return text;
}

async function getSelectorText(selector, p) {
  const text = await p.$eval(selector, (e) => {
    return e.innerText;
  });
  return text;
}

describe("<Buscador Home>: searches", () => {
  data = [
    {
      operationType: "Venta",
      propertyType: ["Casas", "Terrenos"],
      zone: ["holahola"],
      expect: {
        status: "OK",
        assert: "/venta?&searchstring=holahola",
      },
    },
    {
      operationType: "Venta",
      propertyType: ["Casas", "Terrenos"],
      zone: ["holahola"],
      dates: { start: "4/12/2020", end: "5/15/2020" },
      expect: {
        status: "ERROR",
      },
    },
    {
      operationType: "Alquiler",
      propertyType: ["Casas"],
      zone: ["La Paloma Rocha"],
      expect: {
        status: "OK",
        assert: "/alquiler/casas/rocha/la-paloma",
      },
    },
    {
      operationType: "Alquiler",
      propertyType: ["Casas"],
      zone: ["La Paloma Rochaaa"],
      expect: {
        status: "ERROR",
        assert: "/alquiler/casas/rocha/la-paloma",
      },
    },
    {
      operationType: "Alquiler Temporal",
      propertyType: ["Casas"],
      zone: ["La Paloma Rocha"],
      expect: {
        status: "ERROR",
      },
    },
    {
      operationType: "Alquiler Temporal",
      zone: ["La Paloma Rocha"],
      dates: { start: "4/12/2020", end: "5/15/2020" },
      expect: {
        status: "ERROR",
        assert:
          "/alquiler-temporal/casas/rocha/la-paloma?&fechaDesde=2020-04-12&fechaHasta=2020-05-15",
      },
    },
    {
      operationType: "Alquiler",
      propertyType: ["Casas"],
      zone: ["La Paloma Rocha"],
      season: "febrero",
      expect: {
        status: "ERROR",
        assert: "/alquiler-temporal/casas/rocha/la-paloma?&temporada=febrero",
      },
    },
    {
      operationType: "Alquiler",
      propertyType: ["Casas"],
      expect: {
        status: "FORM_ERROR",
      },
    },
    {
      operationType: "Venta",
      propertyType: [],
      zona: "Malvin",
      expect: {
        status: "FORM_ERROR",
      },
    },
  ];
  data.map((search) => checkSearch(search));
  function checkSearch(search) {
    test(
      (typeof search.operationType != "undefined" ? search.operationType : "") +
        (typeof search.propertyType != "undefined"
          ? search.propertyType.map((e) => " de " + e)
          : "") +
        (typeof search.zone != "undefined"
          ? search.zone.map((z) => " en " + z)
          : ""),
      async (done) => {
        const p = page; //reutilize same page
        const isMobile = await p.context()._options.viewport.isMobile;
        if (isMobile) {
          done();
          return;
        }
        await p.goto(appUrlBase);
        const isMobile = await p.context()._options.viewport.isMobile;
        if (isMobile) {
          done();
          return;
        }
        await closePopupDestacadosIfExists(p);

        // OPERATION TYPE
        await selectOperationType(search.operationType, p);

        // PROPERTY TYPE
        if (typeof search.propertyType != "undefined") {
          let waitSelector = null;
          try {
            waitSelector = await p.waitForSelector(".property-type-container", {
              timeout: 4000,
            });
          } catch (e) {
            if (search.expect.status != "ERROR") {
              throw new Error(
                "Status expected to be 'Error'. Property types can't be selected because selector is not display"
              );
            }
          }
          if (waitSelector != null)
            await selectPropertyType(search.propertyType, p);
        }

        // DATES SEARCH or SELECT SEASON
        if (
          typeof search.dates != "undefined" ||
          typeof search.season != "undefined"
        ) {
          // check if dates or season is display (.search-date-container)
          let waitSelectorDates = null;
          try {
            waitSelectorDates = await p.waitForSelector(
              ".search-date-container",
              {
                timeout: 4000,
              }
            );
          } catch (e) {
            if (search.expect.status != "ERROR") {
              throw new Error(
                "Status expected to be 'Error'. Dates can't be selected because selector is not display"
              );
            }
          }

          if (waitSelectorDates != null) {
            if (typeof search.season != "undefined")
              await selectSeason(search.season, p);

            if (typeof search.dates != "undefined")
              await selectDates(search.dates, p);
          }
        }

        // SEARCH INPUT
        if (typeof search.zone != "undefined")
          await selectZones(search.zone, p);

        // DO SEARCH

        let waitSearchSelector = null;
        try {
          waitSearchSelector = await p.waitForSelector(".submit-search-input", {
            timeout: 4000,
          });
        } catch (e) {}

        if (waitSearchSelector != null) await waitSearchSelector.click();

        const p_navigated = new Promise(async (resolve, reject) => {
          try {
            await p.waitForNavigation({ timeout: 20000 });
          } catch (e) {
            reject("TIMEOUT");
          }
          resolve("REDIRECTED");
        });
        const p_error = new Promise(async (resolve, reject) => {
          p.waitForSelector(".filters-form .error", {
            timeout: 20000,
          })
            .then((a) => {
              resolve("FORM_ERROR");
            })
            .catch(() => {
              reject("ERROR");
            });
        });

        const RESULT = await Promise.race([p_navigated, p_error]);

        if (RESULT === "FORM_ERROR") {
          if (search.expect.status !== "FORM_ERROR") {
            throw new Error(
              "Search status should have [" +
                search.expect.status +
                "] but it is [ERROR]. There was a form error."
            );
          }
        } else if (RESULT === "REDIRECTED") {
          if (!p.url().includes(search.expect.assert)) {
            if (search.expect.status !== "ERROR") {
              throw new Error(
                "Assert should have [" +
                  search.expect.assert +
                  "] but it is [" +
                  p.url() +
                  "]"
              );
            }
          } else if (search.expect.status !== "OK") {
            throw new Error("Redirect Not Expected");
          }
        }

        done();
        //await p.close();
      },
      1600000
    );
  }
});

describe("<BuscadorHome>: Operation Type Selector", () => {
  beforeAll(async () => {
    await page.goto(appUrlBase);
    await closePopupDestacadosIfExists(page);
  }, 150000);

  const data = [
    { operation: "Venta", expect: { status: "OK" } },
    { operation: "Venta y Alquiler", expect: { status: "ERROR" } },
    { operation: "Alquiler", expect: { status: "OK" } },
    { operation: "Alquiler Temporal", expect: { status: "OK" } },
    { operation: "Remates", expect: { status: "ERROR" } },
  ].map((o) => checkIfInSelectorOperation(o));

  function checkIfInSelectorOperation(op) {
    test(
      "La operación " +
        op.operation +
        " deberia " +
        (op.expect.status === "OK" ? "EXISTIR" : "NO EXISTIR") +
        " en el selector de operaciones",
      async (done) => {
        const p = page; //reutilize same page
        const isMobile = await p.context()._options.viewport.isMobile;
        if (isMobile) {
          done();
          return;
        }
        await p.click(".operation-type-container .header");
        const options = await page.$$(".operation-type-container .option");

        const option = await (async () => {
          for (let o = 0; o < options.length; o++) {
            const opt = options[o];
            try {
              const text = await opt.$eval(".text", (e) => e.innerText);
              if (text.toUpperCase() === op.operation.toUpperCase()) {
                return opt;
              }
            } catch (e) {}
          }
        })();

        if (option != null) {
          if (op.expect.status == "ERROR") {
            await p.click(".operation-type-container .header");
            throw new Error(
              "La operación " +
                op.operation.toUpperCase() +
                " deberia NO EXISTIR pero EXISTE en el selector de operación"
            );
          }
          await option.click();
          const textInputHeader = await p.$eval(
            ".operation-type-container .header span",
            (e) => {
              return e.innerText;
            }
          );
          if (textInputHeader.toUpperCase() != op.operation.toUpperCase()) {
            throw new Error(
              'El Cabezal del selector debería decir "' +
                op.operation +
                '" pero dice "' +
                textInputHeader +
                '"'
            );
          }
        } else if (option == null) {
          if (op.expect.status == "OK")
            throw new Error(
              "La operación " +
                op.operation.toUpperCase() +
                " deberia EXISTIR pero NO EXISTE en el selector de operación"
            );
          await p.click(".operation-type-container .header");
        }

        done();
      },
      1600000
    );
  }
});

describe("<BuscadorHome>: Property Type Selector", () => {
  beforeAll(async () => {
    await page.goto(appUrlBase);
    await closePopupDestacadosIfExists(page);
  }, 150000);

  const data = [
    { text: "Casas", expect: "OK" },
    { text: "Casa", expect: "ERROR" },
    { text: "Apartamentos", expect: "OK" },
    { text: "Apartamento", expect: "ERROR" },
    { text: "Terrenos", expect: "OK" },
    { text: "Terreno", expect: "ERROR" },
    { text: "Locales Comerciales", expect: "OK" },
    { text: "Local Comercial", expect: "ERROR" },
    { text: "Oficinas", expect: "OK" },
    { text: "Oficina", expect: "ERROR" },
    { text: "Chacras o Campos", expect: "OK" },
    { text: "Garaje o Cocheras", expect: "OK" },
    { text: "Negocios Especiales", expect: "ERROR" },
    { text: "Negocio Especial", expect: "OK" },
    { text: "Edificios", expect: "OK" },
    { text: "Edificio", expect: "ERROR" },
    { text: "Hoteles", expect: "OK" },
    { text: "Hotel", expect: "ERROR" },
    { text: "Local industrial o galpón", expect: "OK" },
    { text: "Estancia", expect: "ERROR" },
    { text: "Motel", expect: "ERROR" },
    { text: "Hostel", expect: "ERROR" },
  ];

  data.map((pt) => checkIfInSelectorPropertyType(pt));
  function checkIfInSelectorPropertyType(type) {
    test(
      "El tipo de propiedad " +
        type.text.toUpperCase() +
        " deberia " +
        (type.expect === "OK" ? "EXISTIR" : "NO EXISTIR") +
        " en el selector de tipo de propiedad",
      async (done) => {
        const p = page; //reutilize same page
        const isMobile = await p.context()._options.viewport.isMobile;
        if (isMobile) {
          done();
          return;
        }
        await p.click(".property-type-container .header");
        const options = await page.$$(".property-type-container .option");
        const option = await (async () => {
          for (let o = 0; o < options.length; o++) {
            const opt = options[o];
            try {
              const text = await opt.$eval(".text", (e) => e.innerText);
              if (
                text
                  .split(" ")
                  .join("")
                  .toUpperCase() ===
                type.text
                  .split(" ")
                  .join("")
                  .toUpperCase()
              ) {
                return opt;
              }
            } catch (e) {}
          }
          return null;
        })();

        if (option != null) {
          if (type.expect == "ERROR") {
            throw new Error(
              "El tipo de propiedad " +
                type.text +
                " EXISTE y deberia NO EXISTIR"
            );
          }
          const isShowing = await option.evaluate(
            (elem) =>
              window.getComputedStyle(elem).getPropertyValue("display") !=
              "none"
          );
          if (!isShowing && type.expect == "OK") {
            throw new Error(
              "El tipo de propiedad " + type.text + " EXISTE pero no es VISIBLE"
            );
          }
        } else if (type.expect == "OK") {
          throw new Error(
            "El tipo de propiedad " + type.text + " NO EXISTE y deberia EXISTIR"
          );
        }
        await p.click(".property-type-container .header");

        done();
      },
      1600000
    );
  }

  const data1 = [
    ["Casas", "Apartamentos", "Terrenos", "Hoteles"],
    ["Casas", "Oficinas", "Chacras o Campos", "Hoteles"],
    ["Casas", "Oficinas", "Terrenos"],
    ["Casas", "Edificios", "Terrenos"],
    ["Casas", "Apartamentos", "Edificios", "Hoteles"],
    ["Casas", "Apartamentos", "Terrenos", "Hoteles"],
    ["Casas", "Apartamentos", "Terrenos", "Hoteles"],
    ["Casas", "Apartamentos", "Terrenos", "Hoteles"],
    ["Casas", "Hoteles", "Terrenos", "Hoteles"],
  ];
  data1.map((types) => checkIfSelectedOperationType(types));
  function checkIfSelectedOperationType(types) {
    test(
      types.map((t) => t.toUpperCase()) +
        " deberian estar seleccionados en el selector de tipo de propiedad",
      async (done) => {
        const p = page; //reutilize same page
        const isMobile = await p.context()._options.viewport.isMobile;
        if (isMobile) {
          done();
          return;
        }
        await selectPropertyType(types, p);

        await p.click(".property-type-container .header");
        const options = await page.$$(".property-type-container .option");

        for (let i = 0; i < types.length; i++) {
          const type = types[i];
          const option = await (async () => {
            for (let o = 0; o < options.length; o++) {
              const opt = options[o];
              try {
                const text = await opt.$eval(".text", (e) => e.innerText);
                if (
                  text
                    .split(" ")
                    .join("")
                    .toUpperCase() ===
                  type
                    .split(" ")
                    .join("")
                    .toUpperCase()
                ) {
                  return opt;
                }
              } catch (e) {}
            }
            return null;
          })();

          if (option != null) {
            const isChecked = await option.$eval(
              ".check i",
              (e) =>
                window.getComputedStyle(e).getPropertyValue("display") != "none"
            );
            if (!isChecked) throw new Error(type + " no esta seleccionado");
          } else {
            throw new Error("Option " + type + " not found");
          }
        }
        await p.click(".property-type-container .header");

        done();
      },
      1600000
    );
  }

  const data2 = [
    {
      types: ["Casas", "Apartamentos", "Terrenos"],
      text: "Casas, Apartamentos, Terrenos",
    },
    {
      types: ["Terrenos", "Casas", "Apartamentos"],
      text: "Casas, Apartamentos, Terrenos",
    },
    {
      types: ["Locales Comerciales", "Oficinas", "Chacras o Campos"],
      text: "Locales Comerciales, Oficinas, Chacras o Campos",
    },
    {
      types: ["Locales Comerciales", "Casas", "Oficinas", "Apartamentos"],
      text: "Casas, Apartamentos, Locales Comerciales, Oficinas",
    },
    {
      types: [
        "Locales Comerciales",
        "Oficinas",
        "Chacras o Campos",
        "Local Industrial o Galpón",
      ],
      text:
        "Locales Comerciales, Oficinas, Chacras o Campos, Local Industrial o Galpón",
    },
    {
      types: ["Hoteles", "Oficinas", "Casas", ""],
      text: "Casas, Oficinas, Hoteles",
    },
    {
      types: ["Edificios", "Hoteles", "Casas", "Terrenos"],
      text: "Casas, Terrenos, Edificios, Hoteles",
    },
    {
      types: [],
      text: "Tipo de propiedad",
    },
    {
      types: [
        "Edificios",
        "Hoteles",
        "Locales Comerciales",
        "Oficinas",
        "Chacras o Campos",
      ],
      text:
        "Locales Comerciales, Oficinas, Chacras o Campos, Edificios, Hoteles",
    },
    {
      types: ["Edificios", "Hoteles", "Chacras o Campos"],
      text: "Chacras o Campos, Edificios, Hoteles",
    },
  ];
  data2.map((item) => checkTextSelectorTypeText(item));
  function checkTextSelectorTypeText(item) {
    test(
      "Para las property types: " +
        item.types.map((t) => t.toUpperCase()) +
        " el selector deberia decir: " +
        item.text,
      async (done) => {
        const p = page; //reutilize same page
        const isMobile = await p.context()._options.viewport.isMobile;
        if (isMobile) {
          done();
          return;
        }
        await selectPropertyType(item.types, p);

        const selectorText = await p.$eval(
          ".property-type-container .header span",
          (e) => e.innerText
        );

        if (
          selectorText
            .toUpperCase()
            .split(" ")
            .join("") !=
          item.text
            .toUpperCase()
            .split(" ")
            .join("")
        ) {
          throw new Error(
            "El texto del Selector de Tipos de propiedad es " +
              selectorText.toUpperCase() +
              " pero deberia ser " +
              item.text.toUpperCase()
          );
        }

        done();
      },
      1600000
    );
  }
});

describe("<BuscadorHome>: Input Busqueda", () => {
  const zonesToFound = [
    {
      zone: "Artigas",
      expect: { status: "OK", assert: "Artigas (Departamento)" },
    },
    {
      zone: "Artigas (Departamento)",
      expect: { status: "OK", assert: "Artigas (Departamento)" },
    },
    {
      zone: "Artigas, Artigas",
      expect: { status: "OK", assert: "Artigas" },
    },
    {
      zone: "holahola",
      expect: { status: "ERROR", assert: "/venta?&searchstring=holahola" },
    },
    {
      zone: "infocasas",
      expect: { status: "ERROR", assert: "/venta?&searchstring=infocasas" },
    },
    {
      zone: "Maldonado (Departamento)",
      expect: { status: "OK", assert: "Maldonado (Departamento)" },
    },
    {
      zone: "Internacional",
      expect: { status: "OK", assert: "Internacional (Departamento)" },
    },
    {
      zone: "Miami, Internacional",
      expect: { status: "OK", assert: "Miami" },
    },
    {
      zone: "Florida",
      expect: { status: "OK", assert: "Florida (Departamento)" },
    },
    {
      zone: "Rocha",
      expect: { status: "OK", assert: "Rocha (Departamento)" },
    },
    {
      zone: "Josefina",
      expect: { status: "ERROR", assert: "/venta?&searchstring=josefina" },
    },
    {
      zone: ["Malvin", "Buceo", "Punta Gorda", "Carrasco", "Malvin Norte"],
      expect: {
        status: "OK",
        assert: "Bañados de Carrasco, Buceo, Malvín, Malvín Norte, Punta Gorda",
      },
    },
  ];
  zonesToFound.map((z) => foundZona(z));
  function foundZona(z) {
    test(
      "Zone " +
        (Array.isArray(z.zone)
          ? z.zone.map((a) => a.toUpperCase())
          : z.zone.toUpperCase()) +
        " should " +
        (z.expect.status == "OK" ? "EXISTIR" : "REDIRECT") +
        " and do " +
        z.expect.assert,
      async (done) => {
        const p = page; //reutilize same page
        await p.goto(appUrlBase);
        const isMobile = await p.context()._options.viewport.isMobile;
        if (isMobile) {
          done();
          return;
        }
        await closePopupDestacadosIfExists(p);

        const result = await doSearch("zones", z.zone, p, z.expect.status);
        // console.log("result", result);
        if (result == null) {
          if (z.expect.status != "OK") {
            throw new Error(
              z.zone.toUpperCase() +
                " deberia EXISTIR pero NO EXISTE, redirige."
            );
          }
          const inputValue = await getSearchValue("zones", page);
          if (inputValue != z.expect.assert) {
            throw new Error(
              "Value Input Busqueda expected to be [" +
                z.expect.assert +
                "] but is [" +
                inputValue +
                "]"
            );
          }
        } else {
          if (z.expect.status != "ERROR") {
            throw new Error(
              z.zone.toUpperCase() +
                " NO deberia EXISTIR pero EXISTE, selecciono."
            );
          }

          if (!p.url().includes(z.expect.assert)) {
            throw new Error(
              "Assert should have [" +
                z.expect.assert +
                "] but it is [" +
                p.url() +
                "]"
            );
          }
        }

        done();
        //await p.close();
      },
      1600000
    );
  }

  [
    {
      zones: ["Punta Gorda", "Malvinddd "],
      expect: {
        status: "OK",
      },
    },
    {
      zones: ["Malvin", "Punta Gorda", "Mal"],
      expect: {
        status: "ERROR",
      },
    },
    {
      zones: ["Malvin", "Punta Gorda", "Malv"],
      expect: {
        status: "OK",
      },
    },
    {
      zones: ["Carra"],
      expect: {
        status: "OK",
      },
    },
  ].map((z) => testStringSearch(z));

  function testStringSearch(z) {
    test(
      "Test Search by string [" +
        z.zones[z.zones.length - 1] +
        "] should " +
        (z.expect.status == "OK" ? "" : "NOT ") +
        "be DISPLAY",
      async (done) => {
        const p = page; //reutilize same page
        await p.goto(appUrlBase);
        const isMobile = await p.context()._options.viewport.isMobile;
        if (isMobile) {
          done();
          return;
        }
        await closePopupDestacadosIfExists(p);
        const selectBusqueda = await p.$(".search-box-container");
        const inputBusqueda = await p.$(".search-box-container input");

        let options = [];
        for (let index = 0; index < z.zones.length; index++) {
          await selectBusqueda.click();
          const s = z.zones[index];
          await inputBusqueda.type(s, { delay: 100 });
          options = await selectBusqueda.$$(".search");
          if (options.length > 0 && index < z.zones.length - 1) {
            const option = options[0];
            await option.click();
          }
          if (index < z.zones.length - 1) {
            await p.click("main h1");
          }
        }

        const option = await (async () => {
          for (let i = 0; i < options.length; i++) {
            const search = options[i];
            const text = await search.$eval(".text", (e) => e.innerHTML);
            if (text.includes("Buscar inmuebles relacionados a "))
              return search;
          }
          return null;
        })();

        if (option != null) {
          if (z.expect.status == "ERROR") {
            throw new Error(
              "La busqueda por string relacionados NO deberia estar disponible para el string " +
                z.zones[z.zones.length - 1]
            );
          }
        } else {
          if (z.expect.status == "OK") {
            throw new Error(
              "La busqueda por string relacionados deberia estar disponible para el string " +
                z.zones[z.zones.length - 1]
            );
          }
        }

        done();
      },
      1600000
    );
  }
});

describe("<Buscador Home>: Preserve", () => {
  const data = [
    { input: "operation", value: "Venta", expect: { status: "OK" } },
    {
      input: "property",
      value: ["Terrenos", "Casas"],
      expect: { status: "OK" },
    },
    { input: "zones", value: ["Malvin", "Buceo"], expect: { status: "ERROR" } },
    {
      input: "dates",
      value: { start: "4/15/2020", end: "4/18/2020" },
      expect: { status: "OK" },
    },
    { input: "season", value: "Enero", expect: { status: "OK" } },
  ];

  data.map((search) => checkIfPreservedOnReload(search));

  function checkIfPreservedOnReload(search) {
    test(
      search.input +
        " input " +
        (search.expect.status == "OK" ? "DEBERIA" : "NO DEBERIA") +
        " preservar la busqueda al recargar",
      async (done) => {
        const p = page; //reutilize same page
        await p.goto(appUrlBase);
        const isMobile = await p.context()._options.viewport.isMobile;
        if (isMobile) {
          done();
          return;
        }
        await closePopupDestacadosIfExists(p);

        await doSearch(search.input, search.value, page);
        const value = await getSearchValue(search.input, page);
        await new Promise((r) => setTimeout(r, 1000)); // time to update apollo
        await p.goto(appUrlBase);
        const reloadValue = await getSearchValue(search.input, page);
        let change;
        if (search.input == "dates") {
          change =
            value.start != reloadValue.start || value.end != reloadValue.end;
        } else {
          change = value != reloadValue;
        }

        if (!change && search.expect.status == "ERROR") {
          throw new Error(search.input + " input SHOULDN'T be preserved");
        } else if (change && search.expect.status == "OK") {
          throw new Error(search.input + " input SHOULD be preserved");
        }
        done();
      },
      1600000
    );
  }
});

describe("<Buscador Home>: flows", () => {
  const flows = [
    {
      flow: [
        { input: "operation", value: "Venta" },
        {
          input: "property",
          value: ["Terrenos", "Casas", "Apartamentos"],
        },
        { input: "zones", value: ["Malvin", "Buceo"] },
        { input: "zones_accept", value: null },
        { input: "zones", value: ["Punta Gorda", "Malvin Norte"] },
        { input: "click_outside", value: null },
      ],
      describe: "Select multiple zones",
      expect: {
        status: "OK",
        assert:
          "/venta/casas-y-apartamentos-y-terrenos/montevideo/buceo-y-en-malvin-y-en-punta-gorda-y-en-malvin-norte",
      }, // should not redirect
    },
    {
      flow: [
        {
          input: "property",
          value: ["Casas", "Apartamentos"],
        },
        { input: "zones", value: ["Malvin", "Buceo"] },
        { input: "click_outside", value: null },
      ],
      describe: "Select multiple zones and click outside",
      expect: {
        status: "OK",
        assert: "/venta/casas-y-apartamentos/montevideo/buceo-y-en-malvin",
      }, // should not redirect
    },
    {
      flow: [
        {
          input: "property",
          value: ["Casas", "Apartamentos"],
        },
        { input: "zones", value: ["Malvin", "Buceo"] },
        { input: "zones_accept", value: null },
      ],
      describe: "Select multiple zones and 'aceptar'",
      expect: {
        status: "OK",
        assert: "/venta/casas-y-apartamentos/montevideo/buceo-y-en-malvin",
      }, // should not redirect
    },
    {
      flow: [
        { input: "zones", value: ["Malvin", "Buceo"] },
        { input: "zones_unselect", value: null },
      ],
      describe: "Vaciar Select Zonas despues de seleccionar algun zona",
      expect: { status: "ERROR" }, // should not redirect
    },
    {
      flow: [
        { input: "operation", value: "Alquiler Temporal" },
        {
          input: "property",
          value: ["Terrenos", "Casas"],
        },
      ],
      describe: "Busqueda vacia en Alquiler Temporal",
      expect: { status: "ERROR" },
    },
    {
      flow: [
        { input: "operation", value: "Venta" },
        {
          input: "property",
          value: ["Terrenos", "Casas"],
        },
      ],
      describe: "Busqueda vacia en Venta",
      expect: { status: "ERROR" },
    },
    {
      flow: [
        { input: "operation", value: "Alquiler Temporal" },
        {
          input: "property",
          value: ["Terrenos", "Casas"],
        },
        { input: "zones", value: ["Malvin", "Buceo"] },
      ],
      describe: "Selección de Property Type en Alquiler Temporal",
      expect: { status: "ERROR" },
    },
    {
      flow: [
        { input: "operation", value: "Alquiler" },
        {
          input: "property",
          value: ["Terrenos", "Casas"],
        },
        { input: "zones", value: ["Malvin", "Buceo"] },
        { input: "click_outside", value: null },
      ],
      describe: "Selección de Property Type en Alquiler",
      expect: {
        status: "OK",
        assert: "/alquiler/casas-y-terrenos/montevideo/buceo-y-en-malvin",
      },
    },
    {
      flow: [
        { input: "operation", value: "Venta" },
        { input: "property", value: ["Terrenos"] },
        {
          input: "zones",
          value: ["Malvin", "Buceo", "Punta Gorda", "Malvin Norte"],
        },
        { input: "zones_accept", value: null },
        { input: "zones", value: ["Malvin", "Malvin Norte"] },
        { input: "zones_accept", value: null },
      ],
      describe: "Selección de Zonas y despues deselecciono algunas",
      expect: {
        status: "OK",
        assert: "/venta/terrenos/montevideo/buceo-y-en-punta-gorda",
      },
    },
    // {
    //   flow: [
    //     { input: "operation", value: "Alquiler Temporal" },
    //     { input: "zones", value: ["La paloma,Rocha"] },
    //     {
    //       input: "dates",
    //       value: { start: "4/15/2020", end: "4/18/2020" },
    //     },
    //   ],
    //   describe: "Selección de Fechas en Alquiler Temporal",
    //   expect: {
    //     status: "OK",
    //     assert:
    //       "/alquiler-temporal/terrenos/rocha/la-paloma?&fechaDesde=2020-04-15&fechaHasta=2020-04-18",
    //   },
    // },
    // {
    //   flow: [
    //     { input: "operation", value: "Venta" },
    //     { input: "season", value: "Semana Santa" },
    //   ],
    //   describe: "Selección de Temporada en Venta",
    //   expect: {
    //     status: "ERROR",
    //   },
    // },
    // {
    //   flow: [
    //     { input: "operation", value: "Alquiler Temporal" },
    //     { input: "zones", value: ["La paloma,Rocha"] },
    //     { input: "season", value: "Semana Santa" },
    //   ],
    //   describe: "Selección de Fechas en Alquiler Temporal",
    //   expect: {
    //     status: "OK",
    //     assert: "/alquiler-temporal/terrenos/rocha/la-paloma?&temporada=santa",
    //   },
    // },
    // {
    //   flow: [
    //     { input: "zones", value: ["holahola"] },
    //     { input: "operation", value: "Alquiler Temporal" },
    //     {
    //       input: "property",
    //       value: ["Terrenos", "Casas"],
    //     },
    //     { input: "zones", value: ["Malvin", "Buceo"] },
    //   ],
    //   describe: "Redirección con el input busqueda",
    //   expect: { status: "ERROR", assert: "/venta?&searchstring=holahola" },
    // },
  ];

  flows.map((f) => doFlow(f));

  function doFlow(f) {
    test(
      "Flow Test " +
        f.describe.toUpperCase() +
        " deberia dar " +
        f.expect.status,
      async (done) => {
        const p = page;

        await p.goto(appUrlBase);
        const isMobile = await p.context()._options.viewport.isMobile;
        if (isMobile) {
          done();
          return;
        }
        const startURL = p.url();
        let currentStatus = null;
        await closePopupDestacadosIfExists(p);

        for (let i = 0; i < f.flow.length; i++) {
          if (currentStatus == null) {
            const search = f.flow[i];
            currentStatus = await doSearch(
              search.input,
              search.value,
              p,
              f.expect.status
            );
          }
        }

        if (currentStatus == null) {
          // no redirigio , hago click en buscar
          await p.click(".submit-search-input");
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
            p.waitForSelector(".filters-form .error", { timeout: 10000 })
              .then((e) => {
                e.evaluate((i) => i.innerText).then((f) => {
                  resolve({ status: "ERROR", assert: f });
                });
              })
              .catch((e) => {
                console.error(e);
                reject({ status: "ERROR 2", ...e });
              });
          });

          await Promise.race([OK, ERROR]).then((o) => {
            console.log("Race result: " + JSON.stringify(o));
            currentStatus = o;
          });
        }

        if (currentStatus.status !== f.expect.status) {
          throw new Error(
            "Status should be [" +
              f.expect.status +
              "] but it is [" +
              currentStatus.status +
              "] "
          );
        }

        if (!p.url().includes(f.expect.assert) && f.expect.status != "ERROR") {
          throw new Error(
            "Assert should have [" +
              f.expect.assert +
              "] but it is [" +
              p.url() +
              "]"
          );
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
