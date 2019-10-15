const puppeteer = require('puppeteer-core')
const chromeInstance = require('./chromeInstance')
const getHTML = require('./getHTML')
const fs = require('fs')
const path = require('path')

// const { optimizeImage } = require("./optimizeImage")
// const { screenshotCode } = require("./screenshotCode.js")
// const { takeScreenshot } = require("./takeScreenshot.js")

exports.handler = async (event, context, callback) => {
    // // For keeping the browser launch

    if (typeof event === `string`) {
        try {
            event = JSON.parse(event)
        } catch (error) { }
    }

    console.log(typeof event)
    console.log(event)

    context.callbackWaitsForEmptyEventLoop = false;
    const chrome = await chromeInstance()
    const browser = await puppeteer.connect({ browserWSEndpoint: chrome.endpoint })
    const html = getHTML(
        event.svgs,
        event.pages,
        event.styles,
        event.query
    )

    const page = await browser.newPage()
    const pdfPath = path.join(__dirname, `../../_.pdf`)
    const options = {
        width: '1280px',
        // margin: {
        //     top: "10px",
        //     bottom: "30px"
        // },
        // printBackground: true,
        path: pdfPath
    }

    console.log(html)

    await page.setContent(html)
    // const pdfData = await page.pdf(pdfPath)
    // console.log(pdfData)

    // const pdfData = await page.evaluate(() => {
    //     return window.PDFExportData
    // })
    const ss = await page.screenshot({ fullPage: true })

    // fs.writeFileSync(path.join(__dirname, `../../_.pdf`), pdfData)
    // fs.writeFileSync(path.join(__dirname, `../../_.html`), html)
    fs.writeFileSync(path.join(__dirname, `../../_.png`), ss)

    // const headers = {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Credentials": true,
    //     "access-control-allow-methods": "GET"
    // };

    // if (!event.queryStringParameters) {
    //     callback(null, {
    //         statusCode: 400,
    //         headers,
    //         body: "You need a url"
    //     });
    // }

    // const targetUrl = event.queryStringParameters.url;
    // const code = event.queryStringParameters.code;
    // const codeType = event.queryStringParameters.codeType;
    // const urlencoded = event.queryStringParameters.urlencoded === "true";

    // if (!targetUrl && !code) {
    //     callback(null, {
    //         statusCode: 400,
    //         headers,
    //         body: "You need something to do"
    //     });
    // }

    // try {
    //     let result = null;

    //     switch (event.queryStringParameters.type) {
    //         case "image":
    //             result = await optimizeImage(targetUrl);
    //             break;
    //         case "code":
    //             result = await screenshotCode({
    //                 browser,
    //                 code,
    //                 codeType,
    //                 urlencoded
    //             });
    //             break;
    //         default:
    //             result = await takeScreenshot(browser, targetUrl);
    //     }

    //     callback(null, {
    //         statusCode: 200,
    //         headers,
    //         body: result
    //     });
    // } catch (e) {
    //     callback(e);
    // }
}