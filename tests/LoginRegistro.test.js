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

// const cerrarSesion = async p => {
//   const isMobile = await p.context()._options.viewport.isMobile;
//   try {
//     if (isMobile) {
//       await p.click("#iconMenu");
//     }

//     // me fijo que este visible
//     await p.waitForSelector(".user_profile", {
//       visible: true,
//       timeout: 5000
//     });

//     await p.hover(".user_profile");
//     await p.click(".cerrar_sesion");
//     //await p.waitForNavigation({ waitUntil: "Load" });
//     await new Promise(r => setTimeout(r, 10000)); // wait for stuff
//   } catch (e) {
//     console.log("no pude cerrar sesion");
//   }
// };

const checkForLoginPopup = async p => {
  try {
    // aca digo: el popup del login no tendria que aparecer
    // si aparece => tiro una exception
    await p.waitForSelector("#login-with-pop", {
      hidden: true,
      timeout: 5000
    });

    //await p.click("#login-with-pop .cerrar_consultar");
  } catch (e) {
    throw new Error("Login Popup should not be visible");
  }
};

const checkearElNombreDeUsuario = async (p, t) => {
  // Espero a que se loguee
  const usernameSelector = ".user-profile-name";
  await p.waitForSelector(usernameSelector, { visible: true });

  // El nombre del navbar tendria que ser el del usuario logeado
  // assert = assert === t.expect.assert;
  name_in_selector = await p.$eval(usernameSelector, e => e.innerHTML);
  console.log("name in selector ", name_in_selector);
  return name_in_selector === t.expect.assert;
};

const doFacebookLogin = async (p, t) => {
  // click en el boton para loguearme con google
  await p.click(".ingresar.f");

  const newPagePromise = new Promise(x =>
    browser.once("targetcreated", target => x(target.page()))
  );
  const facebookPopUp = await newPagePromise;

  await facebookPopUp.waitForSelector(`#email_container`);
  await facebookPopUp.type(`#email_container input[name='email']`, t.email, {
    delay: 5
  });

  await facebookPopUp.type(`input[name='pass']`, t.password, {
    delay: 5
  });
  await facebookPopUp.click("#loginbutton");
};

const doGoogleLogin = async (p, t) => {
  // click en el boton para loguearme con google
  await p.click(".ingresar.g");
  const newPagePromise = new Promise(x =>
    browser.once("targetcreated", target => x(target.page()))
  );
  const googlePopUp = await newPagePromise;

  // const needToVerify = await l.$eval("#headingText span", e => {
  //   return e.innerText;
  // });
  // $("#headingText span").innerText;
  // "Verifica que eres tú"

  await googlePopUp.waitForSelector(`#identifierId`);
  await googlePopUp.type(`#identifierId`, t.email, {
    delay: 5
  });
  await googlePopUp.click("#identifierNext");

  await googlePopUp.waitForSelector(`#password input[type="password"]`);
  await p.waitFor(1000);
  await googlePopUp.type(`#password input[type="password"]`, t.password, {
    delay: 5
  });
  await googlePopUp.click("#passwordNext");

  // aca me puede pedir verificacion por email
};

describe("Login popup", () => {
  test.only("Relaod ", async done => {
    const p = page;
    await p.goto(appUrlBase);
    const isMobile = await p.context()._options.viewport.isMobile;

    // en mobile: abro el drawer, porque algunos links los tengo que clickear
    if (isMobile) {
      await p.click("#iconMenu");
    }

    // abro el modal
    const modalName = "#login-with-pop";
    await p.click(".iniciar_sesion a");
    await p.waitForSelector(modalName);

    await p.reload();

    // El popup del login tendria que estar cerrado aca (lo abri y se refresco la pagina)
    await checkForLoginPopup(p);

    done();
  }, 1600000);
});

describe("Logins/registros sociales", () => {
  const data = [
    // {
    //   case: "Login exitoso con Google",
    //   type: "GOOGLE",
    //   email: "augusto@infocasas.com.uy",
    //   password: "infopassword123",
    //   expect: {
    //     status: "OK",
    //     assert: "Augusto"
    //   }
    // },
    // {
    //   case: "Login exitoso con Facebook",
    //   type: "FACEBOOK",
    //   email: "ventabarrial@gmail.com",
    //   password: "mcr@T#2017",
    //   expect: {
    //     status: "OK",
    //     assert: "Amanda Velasquez"
    //   }
    // }
  ].map(t => LoginRegistroSocialTest(t));

  function LoginRegistroSocialTest(t) {
    // test.only(
    //   "El caso [" +
    //     t.case +
    //     "] deberia [" +
    //     (t.expect.status === "OK" ? "FUNCIONAR" : "NO FUNCIONAR") +
    //     "]",
    //   async done => {
    //     const p = page;
    //     await p.goto(appUrlBase);
    //     // borro cookies para poder tener que loguearme en google de nuevo
    //     const client = await p.target().createCDPSession();
    //     await client.send("Network.clearBrowserCookies");
    //     await client.send("Network.clearBrowserCache");
    //     // ciero el popup de transaccional
    //     await closePopupDestacadosIfExists(p);
    //     // SIEMPRE al refrescar tendria que estar cerrado,
    //     // no importa si quedo abierto en algun caso de email incorrecto
    //     await checkForLoginPopup(p);
    //     // cierro sesion si quedo logueado de otro test
    //     await cerrarSesion(p);
    //     // abro el modal
    //     await p.click(".iniciar_sesion a");
    //     const modalName = "#login-with-pop";
    //     await p.waitForSelector(modalName);
    //     if (t.type === "GOOGLE") {
    //       await doGoogleLogin(p, t);
    //     } else if (t.type === "FACEBOOK") {
    //       await doFacebookLogin(p, t);
    //     }
    //     const valid = await checkearElNombreDeUsuario(p, t);
    //     // El popup del login tendria que estar cerrado aca (me loguie y se refresco la pagina)
    //     await checkForLoginPopup(p);
    //     if (valid && t.expect.status === "ERROR") {
    //       throw new Error("Assert should be [NO EXISTIR] but it is [EXISTIR]");
    //     } else if (!valid && t.expect.status === "OK") {
    //       throw new Error("Assert should be [EXISTIR] but it is [NO EXISTIR]");
    //     }
    //     done();
    //   },
    //   1600000
    // );
  }
});

describe("Logins/registros comunes", () => {
  const randomStringRegistroExitoso = randomStringGenerator(7);
  const randomStringRegistroLuego = randomStringGenerator(7);
  const data = [
    {
      case: "Registro exitoso de particular",
      type: "REGISTRO",
      email: "prueba_" + randomStringRegistroExitoso + "@infocasas.com.uy",
      password: "celular123",
      expect: {
        status: "OK",
        assert: "prueba_" + randomStringRegistroExitoso
      }
    },
    {
      case: "Registro 'escribir contraseña luego' exitoso",
      type: "REGISTRO_DESPUES",
      email: "prueba_" + randomStringRegistroLuego + "@infocasas.com.uy",
      expect: {
        status: "OK",
        assert: "prueba_" + randomStringRegistroLuego
      }
    },
    {
      case: "Login fallido sin email",
      type: "LOGIN",
      email: "",
      expect: {
        status: "ERROR"
      }
    },
    {
      case: "Login fallido con usuario de otro pais",
      type: "LOGIN",
      email: "nvm17.9.2@gmail.com", // usuario de beta py
      expect: {
        status: "ERROR"
      }
    },
    {
      case: "Login exitoso con particular",
      type: "LOGIN",
      email: "augusto@infocasas.com.uy",
      password: "itunes",
      expect: {
        status: "OK",
        assert: "Augusto"
      }
    },
    // {
    //   case: "Login exitoso con una inmobiliaria",
    //   type: "LOGIN",
    //   email: "info@sures.com.uy",
    //   password: "itunes",
    //   expect: {
    //     status: "OK",
    //     assert: "SURES Bienes Raíces"
    //   }
    // }
    {
      case: "Login fallido con algo que no es un email",
      type: "LOGIN",
      email: "augustohola",
      expect: {
        status: "ERROR"
      }
    },
    {
      case: "Login fallido con mail existente pero password vacia",
      type: "LOGIN",
      email: "augusto@infocasas.com.uy",
      password: "",
      expect: {
        status: "ERROR"
      }
    },
    {
      case: "Login fallido con mail existente pero password incorrecta",
      type: "LOGIN",
      email: "augusto@infocasas.com.uy",
      password: "opqwdkqwkowpqdkoqwdpkoqwdkowqdkoqwd",
      expect: {
        status: "ERROR"
      }
    }
  ].map(t => LoginRegistroTests(t));

  function LoginRegistroTests(t, p) {
    test.only(
      "El caso [" +
        t.case +
        "] deberia [" +
        (t.expect.status === "OK" ? "FUNCIONAR" : "NO FUNCIONAR") +
        "]",
      async done => {
        const p = page;
        // borro cookies por si tengo la sesion iniciada
        // const client = await p.target().createCDPSession();
        // const client = await browser.pageTarget(p).createCDPSession();
        // await client.send("Network.clearBrowserCookies");
        // await client.send("Network.clearBrowserCache");

        // borro las cookies
        await p.context().clearCookies();

        await p.goto(appUrlBase);
        const isMobile = await p.context()._options.viewport.isMobile;

        // ciero el popup de transaccional
        await closePopupDestacadosIfExists(p);

        // SIEMPRE al refrescar tendria que estar cerrado,
        // no importa si quedo abierto en algun caso de email incorrecto
        await checkForLoginPopup(p);

        // cierro sesion si quedo logueado de otro test
        // esto puede llegar a dar error en mobile
        //await cerrarSesion(p);

        // en mobile: abro el drawer, porque algunos links los tengo que clickear
        if (isMobile) {
          await p.click("#iconMenu");
        }

        // abro el modal de inicio de sesion
        await p.click(".iniciar_sesion a");

        const modalName = "#login-with-pop";
        await p.waitForSelector(modalName);

        // ingreso el email
        //const firtStepModalName = "#ingresoCorreoDeUsuario";
        await p.focus(modalName + " " + 'input[name="usuario"]');
        await p.keyboard.type(t.email);
        await p.click(modalName + " " + ".ingresarContraseña");

        let llegoAlSegundoPaso, assert, email;
        llegoAlSegundoPaso = false;
        assert = false;

        try {
          // llego al 2do paso
          const secondStepModalName =
            t.type === "LOGIN" ? "#ingresoUsarioViejo" : "#ingresoUsarioNuevo";
          await p.waitForSelector(secondStepModalName, {
            visible: true,
            timeout: 10000
          });
          llegoAlSegundoPaso = true;

          if (t.type === "REGISTRO_DESPUES") {
            await p.click(secondStepModalName + " " + "#hacerDespues");
            assert = await checkearElNombreDeUsuario(p, t);
          } else {
            // registro y login normal

            // Escribo mi contraseña
            await p.focus(secondStepModalName + " " + 'input[name="password"]');
            await p.keyboard.type(t.password);

            // Click en continuar
            await p.click(secondStepModalName + " " + ".ingresarContraseña");

            assert = await checkearElNombreDeUsuario(p, t);
          }
        } catch (e) {
          //console.log("el error ", e);
        }

        if (t.expect.status === "OK") {
          // (solo en los casos exitosos)
          // El popup del login tendria que estar cerrado aca (me loguie y se refresco la pagina)
          await checkForLoginPopup(p);
        }

        const valid = llegoAlSegundoPaso && assert;

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
