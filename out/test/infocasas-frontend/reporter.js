const axios = require('axios')
const loadTestSettings = require("./helpers")

const pushToSlack = async (message) => {
    //const url = "https://hooks.slack.com/services/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"; //gt
    //const url = 'https://hooks.slack.com/services/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'; //frontend
    const url = "https://hooks.slack.com/services/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"; //frontend-tests
    return axios.post(url, {
        icon_emoji: ":fire:",
        username: "ricardobot",
        ...message,
    });
};


class MyCustomReporter {
    constructor(globalConfig, options) {
        this.globalConfig = globalConfig;
        this.options = options;
    }

    onRunStart(runResults, runConfig) {
    }

    onTestResult(testRunConfig, testResults, runResults) {

        const hasErrors = testResults.numFailingTests>0;

        if (hasErrors && loadTestSettings.notify==="errors") {
            return;
        }

        const icons = {
            "failed": "❌",
            "passed": "✅",
            "pending": "🔸"
        };


        let warningUrl = loadTestSettings.baseUrl;
        let baseText =  hasErrors?":warning: Frontend Test Failed.":":white_check_mark: Frontend Test Passed.";
        if(warningUrl.includes("www.") && hasErrors) {
            warningUrl += " :red_circle:";
            baseText += " @channel";
        }

        const m = {text: baseText,attachments: []};

        m.attachments.push({fields: [{title: "BASE URL",value: warningUrl,short: false}]});
        m.attachments.push({fields: [
                {title: "BROWSER",value: loadTestSettings.browser,short: true},
                {title: "DEVICE",value: loadTestSettings.device.name,short: true},
                {title: "HEADLESS",value: loadTestSettings.headless?"true":"false",short: true},
                {title: "SLOWMOTION",value: loadTestSettings.slowmotion + "ms",short: true}
            ]});
        m.attachments.push({fields: [
                {title: "FILE",value: testResults.testFilePath,short: false},
                {title: "PASSED",value: testResults.testResults.filter(o => o.status === "passed").length,short: true},
                {title: "FAILED",value: testResults.testResults.filter(o => o.status === "failed").length,short: true},
                {title: "SKIPPED",value: testResults.testResults.filter(o => o.status === "pending").length,short: true},
                {title: "DURATION",value: Math.round(testResults.testResults.reduce((acc,o) => acc+o.duration,0)/1000) + "s",short: true}
            ]});


        const message = testResults.testResults.filter(o => o.status === "passed" || o.status==="failed").reduce((acc,t) => {
            const icon = typeof icons[t.status]!=="undefined"?icons[t.status]:t.status;
            return acc += " " + icon + " " + t.fullName + ".  Took " + Math.round(t.duration/1000) + "s. \n\n";
        },"");

        pushToSlack(m).then(o => {
            if (hasErrors) {
                pushToSlack({text:"``` " + message.trim() + " ```"}).then()
            }
        });


    }

    onRunComplete(test, runResults) {
       /* setTimeout(() => process.exit(
            runResults.numFailedTests>0?1:0
        ), 1000);
        */
    }
}

module.exports = MyCustomReporter;