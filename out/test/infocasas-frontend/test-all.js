/**

 npm run test-all -- --browsers="chromium,firefox,webkit" --devices="Desktop with Monitor,iPhone 7" --parallelism=5


 @todo:
    1. matar jests colgados, si le agrego --forceExit no manda slack...
    de mientras puedo usar: kill $(ps aux | grep 'chromium' | awk '{print $2}')

    2. manejar paralelisimo, cuantos tests puedo correr en simulteaneo?

    3. que combinacion de browser/device preciso usar? cuanto tiempo va a demorar?

    4. como sé que esta corriendo, si está trancado, si termino, etc..?

 * @type {string[]}
 */


const extractFromArg = key => {
    try {
        const k = "--" + key;
        return process.argv.find(a => String(a).toLowerCase().substr(0,k.length) === k).split("=")[1];
    } catch(e) {
        return null;
    }
};
const extractArrayFromArg = key => {
  const s = extractFromArg(key);
  if (s==null) return null;
  try {
      return s.split(",").map(o => o.trim());
  } catch(e) {
      return [s];
  }
};
const PARALLELISM = extractFromArg("parallelism")?parseInt(extractFromArg("parallelism")):2;
const BROWSERS = extractArrayFromArg("browsers")?extractArrayFromArg("browsers"):["chromium"];
const DEVICES = extractArrayFromArg("devices")?extractArrayFromArg("devices"):["Laptop"];


const testFolder = './tests/';
const { exec } = require("child_process");
const fs = require('fs');
const tests = [];


fs.readdirSync(testFolder).forEach(file => {
    if (file.includes(".test.js")) {
        tests.push(file);
    }
});

const TODO_TESTS = [];

BROWSERS.map(i => {
    DEVICES.map(j => {
        tests.map(k => {
            TODO_TESTS.push({browser:i,device:j,file:k});
        });
    });
});
console.log("");
console.log("");
console.log("");

console.log("PARALELLISM:")
console.log(PARALLELISM);
console.log("");

console.log("BROWSERS:")
console.log(JSON.stringify(BROWSERS))
console.log("");

console.log("DEVICES:")
console.log(JSON.stringify(DEVICES))
console.log("");

console.log("FILES:")
console.log(JSON.stringify(tests))
console.log("");

console.log("TOTAL TESTS TO RUN:")
console.log(TODO_TESTS.length);
console.log("");
console.log("");

console.time("RUNNING TESTS");

const TOTAL_TODO = TODO_TESTS.length;
let TOTAL_DONE = 0;

for(let i=0;i<PARALLELISM;i++) {
    run("npm run test -- --notify=all --headless=false");
}



function run(cmd) {
    if(TODO_TESTS.length===0) {
        return;
    }
    const {browser,device,file} = TODO_TESTS.pop();
    const cmd2 = cmd + " --browser=\"" + browser + "\" --device=\"" + device + "\" " + file;
    console.log("\n\n\nRunning: " + cmd2 + "\n\n")
    exec(cmd2, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
        }
        if (!error && !stderr) {
            console.log(`stdout: ${stdout}`);
        }

        TOTAL_DONE++;

        if(TOTAL_DONE === TOTAL_TODO) {
            console.timeEnd("RUNNING TESTS");
            process.exit(0);
        } else {
            run(cmd);
        }
    });

}