const axios = require('axios');

exports.handler = async (event, context) => {
    // HARD CREDENTIALS - NO GUESSING
    const S_API_KEY = process.env.SHOPIFY_API_KEY; 
    const S_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
    const STORE = "miraclespritz.net";

    // THE INTERFACE
    if (event.httpMethod === 'GET' && !event.queryStringParameters.sync) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html' },
            body: `
<!DOCTYPE html>
<html>
<head>
    <title>CORE RECOVERY</title>
    <style>
        body { background: #000; color: #39FF14; font-family: monospace; padding: 40px; }
        .terminal { border: 5px solid #39FF14; padding: 20px; }
        #log { color: #00FFFF; margin-top: 20px; white-space: pre-wrap; }
        button { background: #39FF14; color: #000; padding: 20px; width: 100%; font-weight: bold; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <div class="terminal">
        <h1>EMILY: CORE RECOVERY</h1>
        <button onclick="run()">EXECUTE HARD SYNC</button>
        <div id="log">[SYSTEM READY] No simulations. Real data only.</div>
    </div>
    <script>
        async function run() {
            const out = document.getElementById('log');
            out.innerText = "Attempting Handshake...";
            try {
                const res = await fetch('?sync=true', { method: 'POST' });
                const data = await res.json();
                if (data.error) {
                    out.innerText = "FAILED: " + data.detail;
                } else {
                    out.innerText = "SUCCESS\\nSTORE: " + data.store + "\\nTIME: " + data.timestamp;
                }
            } catch (e) { out.innerText = "CONNECTION ERROR: Check Netlify Logs."; }
        }
    </script>
</body>
</html>`
        };
    }

    // THE EXECUTION - NO SIMULATION
    try {
        const shopifyRes = await axios.get(`https://${STORE}/admin/api/2024-01/shop.json`, {
            headers: { 'X-Shopify-Access-Token': S_TOKEN, 'X-Shopify-Api-Key': S_API_KEY },
            timeout: 5000 // 5 second hard limit
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                store: shopifyRes.data.shop.name,
                status: "VERIFIED",
                timestamp: new Date().toISOString()
            })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "HARD_FAILURE", detail: err.message })
        };
    }
};
