const axios = require('axios');

exports.handler = async (event, context) => {
    // 1. IDENTITY & AUTHORITY SECRETS
    const S_API_KEY = process.env.SHOPIFY_API_KEY; 
    const S_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
    const STORE = "miraclespritz.net";

    // 2. SERVE THE H2O INTERFACE (GET REQUEST)
    if (event.httpMethod === 'GET' && !event.queryStringParameters.sync) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html' },
            body: `
<!DOCTYPE html>
<html>
<head>
    <title>AMPLIFY SOVEREIGN</title>
    <style>
        body { background: #000; color: #39FF14; font-family: monospace; padding: 50px; font-size: 1.8rem; }
        .box { border: 5px solid #39FF14; padding: 30px; }
        button { background: #39FF14; color: #000; width: 100%; padding: 25px; font-size: 2rem; font-weight: bold; border: none; cursor: pointer; }
        #status { margin-top: 30px; color: #00FFFF; white-space: pre-wrap; }
    </style>
</head>
<body>
    <div class="box">
        <h1>AMPLIFY ACCESSIBILITY</h1>
        <p>OWNER: GEO ONE ZAVALA</p>
        <p>EIN: 99-3298727</p>
        <button onclick="runSync()">SYNC SOVEREIGN DATA</button>
        <div id="status">READY...</div>
    </div>
    <script>
        async function runSync() {
            const out = document.getElementById('status');
            out.innerText = "QUERYING SHOPIFY (14a7)...";
            const res = await fetch('?sync=true', { method: 'POST' });
            const data = await res.json();
            out.innerText = "STORE: " + data.store + "\\nSTATUS: " + data.status;
        }
    </script>
</body>
</html>`
        };
    }

    // 3. RUN THE BRAIN LOGIC (POST/SYNC REQUEST)
    try {
        const shopifyRes = await axios.get(\`https://\${STORE}/admin/api/2024-01/shop.json\`, {
            headers: { 'X-Shopify-Access-Token': S_TOKEN, 'X-Shopify-Api-Key': S_API_KEY }
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                store: shopifyRes.data.shop.name,
                status: "VERIFIED_SOVEREIGN",
                timestamp: new Date().toISOString()
            })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "CONNECTION_FAILED", detail: err.message })
        };
    }
};
