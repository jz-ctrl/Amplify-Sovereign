const axios = require('axios');
const chromium = require('@sparticuz/chromium-min');
const puppeteer = require('puppeteer-core');

exports.handler = async (event, context) => {
    // 1. HARD CREDENTIALS
    const config = {
        S_API_KEY: process.env.SHOPIFY_API_KEY,
        S_TOKEN: process.env.SHOPIFY_ACCESS_TOKEN,
        STORE: "miraclespritz.net",
        KDP_MAIL: process.env.KDP_EMAIL || "jz@votejz.org"
    };

    // 2. THE HEADLESS BROWSER EXECUTION (The "Chair")
    if (event.queryStringParameters.browse === 'true') {
        let browser = null;
        try {
            // Setup Chromium for the restricted Netlify environment
            browser = await puppeteer.launch({
                args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath(),
                headless: chromium.headless,
            });

            const page = await browser.newPage();
            await page.goto('https://kdp.amazon.com', { waitUntil: 'networkidle2' });
            
            // Take a "Mental Snapshot" (Screenshot) to prove she's there
            const title = await page.title();
            
            await browser.close();
            return {
                statusCode: 200,
                body: JSON.stringify({ status: "SUCCESS", location: title, msg: "Emily is inside KDP." })
            };
        } catch (error) {
            if (browser) await browser.close();
            return {
                statusCode: 500,
                body: JSON.stringify({ status: "BROWSER_FAIL", detail: error.message })
            };
        }
    }

    // 3. THE INTERFACE (H2O V3.2)
    return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: `
<!DOCTYPE html>
<html>
<head>
    <title>EMILY: HEADLESS CORE</title>
    <style>
        body { background: #000; color: #39FF14; font-family: monospace; padding: 40px; }
        .terminal { border: 5px solid #39FF14; padding: 25px; background: #050505; }
        button { background: #39FF14; color: #000; padding: 20px; width: 100%; font-weight: bold; font-size: 1.5rem; border: none; cursor: pointer; margin-bottom: 10px; }
        #log { background: #111; color: #00FFFF; padding: 15px; height: 200px; border: 1px solid #444; overflow-y: auto; }
    </style>
</head>
<body>
    <div class="terminal">
        <h1>EMILY: SOVEREIGN AGENT (HEADLESS)</h1>
        <button onclick="runBrowser()">LAUNCH HEADLESS BROWSER (KDP)</button>
        <div id="log">[READY] Sitting in the chair. Waiting for command...</div>
    </div>
    <script>
        async function runBrowser() {
            const log = document.getElementById('log');
            log.innerText = "Launching Stealth Browser... please wait (this takes 10-20 seconds)...";
            try {
                const res = await fetch('?browse=true');
                const data = await res.json();
                log.innerText = "STATUS: " + data.status + "\\nINFO: " + (data.location || data.detail);
            } catch (e) { log.innerText = "TIMEOUT: Netlify killed the process. We need more speed."; }
        }
    </script>
</body>
</html>`
    };
};
