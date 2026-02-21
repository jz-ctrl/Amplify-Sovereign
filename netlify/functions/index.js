const axios = require('axios');

exports.handler = async (event, context) => {
    // SECRETS LOADED FROM NETLIFY ENV
    const S_API_KEY = process.env.SHOPIFY_API_KEY; 
    const S_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN; 
    const STORE = "miraclespritz.net";
    const KDP_EMAIL = process.env.KDP_EMAIL;
    const G_2_0_ID = process.env.GOOGLE_2_0_GEO_ID;

    // INTERFACE (H2O DEBUG CONSOLE)
    if (event.httpMethod === 'GET' && !event.queryStringParameters.sync) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html' },
            body: `
<!DOCTYPE html>
<html>
<head>
    <title>SHOPIFY DEBUG LOOP</title>
    <style>
        body { background: #000; color: #39FF14; font-family: monospace; padding: 20px; font-size: 1.2rem; }
        .terminal { border: 2px solid #39FF14; padding: 20px; }
        .status { color: #FFFF00; }
        .log { background: #050505; height: 300px; overflow-y: auto; border: 1px solid #444; margin-top: 10px; padding: 10px; color: #00FFFF; font-size: 1rem; }
        button { background: #39FF14; color: #000; padding: 15px; width: 100%; font-weight: bold; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <div class="terminal">
        <h2>MIRACLE SPRITZ DEBUG: SOVEREIGN ACTIVE</h2>
        <p>CHIEF: GEO ONE ZAVALA | EMAIL: \${KDP_EMAIL}</p>
        <p>GOOGLE 2.0 ID: <span class="status">\${G_2_0_ID}</span></p>
        <button onclick="runDebug()">EXECUTE SHOPIFY TEST LOOP</button>
        <div class="log" id="log">READY...</div>
    </div>
    <script>
        async function runDebug() {
            const log = document.getElementById('log');
            log.innerHTML += "<br>[" + new Date().toLocaleTimeString() + "] INITIATING SHOPIFY 14a7 HANDSHAKE...";
            try {
                const res = await fetch('?sync=true', { method: 'POST' });
                const data = await res.json();
                log.innerHTML += "<br>[SUCCESS] STORE: " + data.store;
                log.innerHTML += "<br>[DEBUG] ORDER COUNT: " + data.orderCount;
                log.innerHTML += "<br>[STATUS] SOVEREIGN_MASTER_ACTIVE";
            } catch (err) {
                log.innerHTML += "<br>[ERROR] SYNC FAILED. CHECK NETLIFY LOGS.";
            }
        }
    </script>
</body>
</html>`
        };
    }

    // DEBUG & SYNC LOGIC
    try {
        // Fetching shop data and recent orders for debug loop
        const shop = await axios.get(\`https://\${STORE}/admin/api/2024-01/shop.json\`, {
            headers: { 'X-Shopify-Access-Token': S_TOKEN, 'X-Shopify-Api-Key': S_API_KEY }
        });
        const orders = await axios.get(\`https://\${STORE}/admin/api/2024-01/orders.count.json\`, {
            headers: { 'X-Shopify-Access-Token': S_TOKEN, 'X-Shopify-Api-Key': S_API_KEY }
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                store: shop.data.shop.name,
                orderCount: orders.data.count,
                status: "VERIFIED",
                timestamp: new Date().toISOString()
            })
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: "DEBUG_SYNC_FAILED", detail: err.message }) };
    }
};
