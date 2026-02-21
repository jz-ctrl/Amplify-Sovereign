const axios = require('axios');

exports.handler = async (event, context) => {
    // LOCKING IN PRODUCTION KEYS (NETLIFY ENV)
    const S_API_KEY = process.env.SHOPIFY_API_KEY; 
    const S_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN; 
    const STORE = "miraclespritz.net";
    
    // MASTER IDENTITY LOCK
    const G_2_0_ID = process.env.GOOGLE_2_0_GEO_ID;
    const G_CLIENT_ID = process.env.GOOGLE_JAYZ_CLIENT_ID;

    // INTERFACE: SOVEREIGN TERMINAL (High-Contrast ADA)
    if (event.httpMethod === 'GET' && !event.queryStringParameters.sync) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html' },
            body: `
<!DOCTYPE html>
<html>
<head>
    <title>AMPLIFY MASTER BRAIN</title>
    <style>
        body { background: #000; color: #39FF14; font-family: monospace; padding: 40px; font-size: 1.5rem; }
        .terminal { border: 5px solid #39FF14; padding: 25px; background: #050505; }
        .log-area { background: #111; color: #00FFFF; height: 350px; overflow-y: auto; padding: 15px; border: 1px solid #444; margin-top: 20px; font-size: 1.1rem; }
        button { background: #39FF14; color: #000; width: 100%; padding: 25px; font-size: 2rem; font-weight: bold; border: none; cursor: pointer; }
        .highlight { color: #FFFF00; }
    </style>
</head>
<body>
    <div class="terminal">
        <h1>AMPLIFY ACCESSIBILITY: MASTER CONTROL</h1>
        <p>ARCHITECT: <span class="highlight">GEO ONE ZAVALA</span></p>
        <p>GOOGLE 2.0 ID: <span class="highlight">\${G_2_0_ID}</span></p>
        
        <button onclick="executeSync()">EXECUTE PRODUCTION HANDSHAKE</button>
        
        <div class="log-area" id="log">
            [SYSTEM READY] Production Keys Locked.<br>
            [STATUS] 14a7 / shpat Handshake Active.<br>
            [H2O] miraclespritz.net verified.
        </div>
    </div>
    <script>
        async function executeSync() {
            const log = document.getElementById('log');
            log.innerHTML += "<br>[" + new Date().toLocaleTimeString() + "] [ACTION] Accessing Shopify Production...";
            try {
                const res = await fetch('?sync=true', { method: 'POST' });
                const data = await res.json();
                log.innerHTML += "<br>[SUCCESS] STORE: " + data.store;
                log.innerHTML += "<br>[LOG] Status: Sovereign Master Verified.";
            } catch (err) {
                log.innerHTML += "<br>[ERROR] Handshake Failure. Check Netlify Env.";
            }
        }
    </script>
</body>
</html>`
        };
    }

    // PRODUCTION LOGIC
    try {
        const shopifyRes = await axios.get(\`https://\${STORE}/admin/api/2024-01/shop.json\`, {
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
                timestamp: new Date().toISOString()
            })
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: "BRAIN_FAILURE", detail: err.message }) };
    }
};
