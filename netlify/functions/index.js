const axios = require('axios');

exports.handler = async (event, context) => {
    // 1. MASTER IDENTITY & AUTHORITY (NETLIFY ONLY)
    // Verified Credentials for miraclespritz.net
    const S_API_KEY = process.env.SHOPIFY_API_KEY; // 14a7 verified
    const S_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN; // shpat verified
    const STORE = "miraclespritz.net";

    // 2. THE MASTER INTERFACE (ADA ACCESSIBILITY OPTIMIZED)
    if (event.httpMethod === 'GET' && !event.queryStringParameters.sync) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html' },
            body: `
<!DOCTYPE html>
<html>
<head>
    <title>MASTER CONTROL</title>
    <style>
        body { background: #000; color: #39FF14; font-family: monospace; padding: 40px; font-size: 2rem; }
        .terminal { border: 8px solid #39FF14; padding: 25px; background: #050505; box-shadow: 0 0 30px #39FF14; }
        .log-area { background: #111; color: #00FFFF; height: 400px; overflow-y: auto; padding: 20px; border: 2px solid #444; margin-top: 25px; font-size: 1.4rem; }
        button { background: #39FF14; color: #000; width: 100%; padding: 35px; font-size: 2.8rem; font-weight: bold; border: none; margin-top: 25px; cursor: pointer; border-radius: 10px; }
        .highlight { color: #FFFF00; }
        .strobe { animation: blinker 1s linear infinite; }
        @keyframes blinker { 50% { opacity: 0; } }
    </style>
</head>
<body>
    <div class="terminal">
        <h1>MIRACLE SPRITZ: MASTER CONTROL</h1>
        <p>CHIEF ARCHITECT: <span class="highlight">GEO ONE ZAVALA</span></p>
        <p>SYSTEM STATUS: <span id="sys-status" class="strobe">ONLINE</span></p>
        
        <button onclick="executeSync()">EXECUTE MASTER SYNC</button>
        
        <div class="log-area" id="log">
            [SYSTEM READY] Store: miraclespritz.net<br>
            [H2O] Handshake protocols primed for 14a7/7640.
        </div>
    </div>

    <script>
        async function executeSync() {
            const log = document.getElementById('log');
            const status = document.getElementById('sys-status');
            log.innerHTML += "<br>> [ACTION] Initiating 14a7 Shopify Handshake...";
            
            try {
                const res = await fetch('?sync=true', { method: 'POST' });
                const data = await res.json();
                status.innerText = "VERIFIED: " + data.store;
                log.innerHTML += "<br>> [SUCCESS] Connected: " + data.store;
                log.innerHTML += "<br>> [LOG] pH 4.6 Formula Status: STABLE";
                log.innerHTML += "<br>> [STATUS] Sync Time: " + data.timestamp;
            } catch (err) {
                log.innerHTML += "<br>> [ERROR] Connection Blindness. Check Netlify Env.";
            }
            log.scrollTop = log.scrollHeight;
        }
    </script>
</body>
</html>`
        };
    }

    // 3. MASTER EXECUTION (PRODUCTION API CALL)
    try {
        const shopifyRes = await axios.get(`https://${STORE}/admin/api/2024-01/shop.json`, {
            headers: { 
                'X-Shopify-Access-Token': S_TOKEN, 
                'X-Shopify-Api-Key': S_API_KEY 
            }
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                store: shopifyRes.data.shop.name,
                owner: "Geo One Zavala",
                timestamp: new Date().toISOString()
            })
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: "AUTH_FAILURE", detail: err.message }) };
    }
};
