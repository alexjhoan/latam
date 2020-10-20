const { devices } = require("playwright");

global.mockFetchJsonResponse = () => {
  return true;
};

global.randomStringGenerator = length => {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

global.registerTestUser = async (email, password, page) => {
  await page.goto(appUrlBase);
  // ciero el popup de transaccional
  await closePopupDestacadosIfExists(page);

  // SIEMPRE al refrescar tendria que estar cerrado,
  // no importa si quedo abierto en algun caso de email incorrecto
  await checkForLoginPopup(page);

  // cierro sesion si quedo logueado de otro test
  await cerrarSesion(page);

  // abro el modal
  const modalName = "#login-with-pop";
  await page.click(".iniciar_sesion");
  await page.waitForSelector(modalName);

  // ingreso el email
  //const firtStepModalName = "#ingresoCorreoDeUsuario";
  await page.focus(modalName + " " + 'input[name="usuario"]');
  await page.keyboard.type(email);
  await page.click(modalName + " " + ".ingresarContraseña");

  // llego al 2do paso
  const secondStepModalName = "#ingresoUsarioNuevo";
  await page.waitForSelector(secondStepModalName, {
    visible: true,
    timeout: 10000
  });

  // Escribo mi contraseña
  await page.focus(secondStepModalName + " " + 'input[name="password"]');
  await page.keyboard.type(password);

  // Click en continuar
  await page.click(secondStepModalName + " " + ".ingresarContraseña");

  assert = await checkearElNombreDeUsuario(page, t);
};

global.closePopupDestacadosIfExists = async page => {
  const exists = new Promise(function(resolve, reject) {
    page
      .waitForSelector("#popupDestacado", { timeout: 10000 })
      .then(e => {
        page.click("#popupDestacado" + " .cerrar_popup").then(j => {
          resolve("Found Popup");
        });
      })
      .catch(e => {
        reject("ERROR");
      });
  });

  const dosnt_exist = new Promise(function(resolve, reject) {
    page
      .waitForSelector("#popupDestacado_void", { timeout: 10000 })
      .then(e => {
        resolve("Not Found Popup");
      })
      .catch(e => {
        reject("ERROR2");
      });
  });

  return Promise.race([exists, dosnt_exist]).then(o =>
    console.log("Race result: " + o)
  );
};

global.login = async (user, page, isMobile = false) => {
  const notLogged = new Promise(async function(resolve, reject) {
    if (isMobile) {
      await page.click("#iconMenu");
    }

    await page.click(".iniciar_sesion");
    await page.waitForSelector("#login-with-pop");

    // 3) Ingreso mi email (que ya existe)
    const firtStepModalName = "#ingresoCorreoDeUsuario";
    await page.focus(firtStepModalName + " " + 'input[name="usuario"]');
    await page.keyboard.type(user.email);
    await page.click(firtStepModalName + " " + ".ingresarContraseña");

    const secondStepModalName = "#ingresoUsarioViejo";
    await page.waitForSelector(secondStepModalName, { visible: true });

    // 4) Checkeo que haya cargado el 2do paso
    const titleHtml = await page.$eval(
      "#ingresoUsarioViejo .type_text span",
      e => e.innerHTML
    );
    expect(titleHtml).toBe("Bienvenido de nuevo.");

    // 5) Escribo mi contraseña
    await page.focus(secondStepModalName + " " + 'input[name="password"]');
    await page.keyboard.type(user.pass);
    await page.click(secondStepModalName + " " + ".ingresarContraseña");

    // 6) Espero a que se loguee
    const usernameSelector = ".user-profile-name";
    page.waitForSelector(usernameSelector, { visible: true }).then(e => {
      if (e == null) {
        reject("ERROR");
      } else {
        resolve("logged");
      }
    });
  });
  const logged = new Promise(async function(resolve, reject) {
    const usernameSelector = ".user-profile-name";
    page.waitForSelector(usernameSelector, { visible: true }).then(e => {
      if (e == null) {
        reject("ERROR");
      } else {
        resolve("logged");
      }
    });
  });
  return Promise.race([notLogged, logged]).then(o =>
    console.log("Race result: " + o)
  );
};

global.sleep = milliseconds => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

global.parseDevice = device => {
  const custom_devices = {
    ...devices,
    "Macbook Pro Retina": {
      name: "Macbook Pro Retina",
      userAgent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_4) AppleWebKit/601.5.17 (KHTML, like Gecko) Version/9.1 Safari/601.5.17",
      viewport: {
        width: 2880,
        height: 1800,
        deviceScaleFactor: 2,
        isMobile: false
      }
    },
    "Desktop with Monitor": {
      name: "Desktop with Monitor",
      userAgent:
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36",
      viewport: {
        width: 1920,
        height: 1080,
        deviceScaleFactor: 1,
        isMobile: false
      }
    },
    Laptop: {
      name: "Laptop",
      userAgent:
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36",
      viewport: {
        width: 1366,
        height: 768,
        deviceScaleFactor: 1,
        isMobile: false
      }
    },
    Chromecast: {
      name: "Chromecast",
      userAgent:
        "Mozilla/5.0 (CrKey armv7l 1.5.16041) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.0 Safari/537.36",
      viewport: {
        width: 1280,
        height: 720,
        deviceScaleFactor: 1,
        isMobile: false
      }
    },
    "Apple TV 4k": {
      name: "Apple TV 4k",
      userAgent: "AppleTV6,2/11.1",
      viewport: {
        width: 3840,
        height: 2160,
        deviceScaleFactor: 1,
        isMobile: false
      }
    }
  };

  if (typeof custom_devices[device] !== "undefined") {
    return custom_devices[device];
  } else {
    console.error(
      "DEVICE NOT FOUND: " +
        JSON.stringify(device) +
        ", using: " +
        JSON.stringify(custom_devices[0])
    );
    return custom_devices[0];
  }
};

global.loadTestSettings = () => {
  const extractFromArg = key => {
    try {
      const k = "--" + key;
      return process.argv
        .find(
          a =>
            String(a)
              .toLowerCase()
              .substr(0, k.length) === k
        )
        .split("=")[1];
    } catch (e) {
      return null;
    }
  };

  const browser = extractFromArg("browser")
    ? extractFromArg("browser")
    : "chromium"; //'chromium', 'firefox', 'webkit'
  const device = parseDevice(
    extractFromArg("device") ? extractFromArg("device") : "Laptop"
  );
  const headless = extractFromArg("headless")
    ? extractFromArg("headless") === "true"
    : false;
  const slowmotion = extractFromArg("slowmotion")
    ? parseInt(extractFromArg("slowmotion"))
    : 5;
  const baseUrl = extractFromArg("base-url")
    ? extractFromArg("base-url")
    : "http://localhost:3000";
  const notify = extractFromArg("notify") ? extractFromArg("notify") : "none";

  const settings = { browser, device, baseUrl, headless, slowmotion, notify };

  console.info("Test settings:");
  console.log(settings);

  return settings;
};

module.exports = loadTestSettings();
