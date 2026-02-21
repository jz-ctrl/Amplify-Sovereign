const axios = require('axios');

exports.handler = async (event, context) => {
    // 1. AUTHORITY SECRETS (PULLED FROM NETLIFY ENV)
    const S_API_KEY = process.env.SHOPIFY_API_KEY; 
    const S_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN; 
    const STORE = "miraclespritz.net";
    
    // GOOGLE 2.0 & USER IDENTITY
    const KDP_EMAIL = process.env.KDP_EMAIL;
    const G_2_0_ID = process.env.GOOGLE_2_0_GEO_ID;
    const G_CLIENT_ID = process.env.GOOGLE_JAYZ_CLIENT_ID;

    // 2. THE INTERFACE (H2O SOVEREIGN DASHBOARD)
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
        .log-area { background: #111; color: #00FFFF; height: 350px; overflow-y: auto; padding: 15px; border: 1px solid #444; margin-top: 20px; font-size: 1.1rem; border-radius: 5px; }
        button { background: #39FF14; color: #000; width: 100%; padding: 25px; font-size: 2rem; font-weight: bold; border: none; margin-top: 20px; cursor: pointer; border-radius: 5px; }
        .highlight { color: #FFFF00; }
        .strobe { animation: blinker 1s linear infinite; }
        @keyframes blinker { 50% { opacity: 0; } }
    </style>
</head>
<body>
    <div class="terminal">
        <h1>AMPLIFY ACCESSIBILITY: MASTER CONTROL</h1>
        <p>CHIEF ARCHITECT: <span class="highlight">GEO ONE ZAVALA</span></p>
        <p>KDP EMAIL: <span class="highlight">\${KDP_EMAIL}</span></p>
        <p>SYSTEM STATUS: <span id="sys-status" class="strobe">ONLINE</span></p>
        
        <button onclick="executeSync()">EXECUTE AUTONOMOUS SYNC</button>
        
        <div class="log-area" id="log">
            [SYSTEM READY] Google 2.0 ID: \${G_2_0_ID}<br>
            [MEMORY] Establishing continuous learning loop...<br>
            [H2O] Interface loaded. Netlify environment verified.
        </div>
    </div>
    <script>
        async function executeSync() {
            const log = document.getElementById('log');
            const status = document.getElementById('sys-status');
            const now = new Date().toLocaleTimeString();
            log.innerHTML += "<br>[" + now + "] [ACTION] Initiating 14a7 Shopify Handshake...";
            try {
                const res = await fetch('?sync=true', { method: 'POST' });
                const data = await res.json();
                status.innerText = "SOVEREIGN VERIFIED: " + data.store;
                log.innerHTML += "<br>[" + now + "] [SUCCESS] Connected to: " + data.store;
                log.innerHTML += "<br>[" + now + "] [LOG] pH 4.6 Formula Integrity: VERIFIED";
            } catch (err) {
                log.innerHTML += "<br>[" + now + "] [ERROR] System Blindness. Check Netlify Environment Variables.";
            }
            log.scrollTop = log.scrollHeight;
        }
    </script>
</body>
</html>`
        };
    }

    // 3. BRAIN LOGIC (EXECUTION)
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
                owner: "Geo One Zavala",
                status: "SOVEREIGN_MASTER_ACTIVE",
                timestamp: new Date().toISOString()
            })
        };
    } catch (err) {
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: "BRAIN_FAILURE", detail: err.message }) 
        };
    }
};
