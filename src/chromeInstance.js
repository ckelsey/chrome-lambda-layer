const launchChrome = require("@serverless-chrome/lambda")
const request = require("superagent")

const getChrome = async () => {
    const chrome = await launchChrome()
    const response = await request
        .get(`${chrome.url}/json/version`)
        .set("Content-Type", "application/json")

    return {
        endpoint: response.body.webSocketDebuggerUrl,
        instance: chrome
    }
}

module.exports = getChrome