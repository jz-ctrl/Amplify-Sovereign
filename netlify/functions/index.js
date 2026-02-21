const axios = require('axios');

exports.handler = async (event, context) => {
    // MASTER AUTHORITY - NO REDRACTION
    const KEYS = {
        S_TOKEN: process.env.SHOPIFY_ACCESS_TOKEN, // shpat_...
        S_API: process.env.SHOPIFY_API_KEY,        // 14a7...
        G_CLIENT: process.env.GOOGLE_JAYZ_CLIENT_ID,
        G_SECRET: process.env.GOOGLE_JAYZ_CLIENT_SECRET,
        G_REFRESH: process.env.GOOGLE_JAYZ_REFRESH_TOKEN,
        STORE: "miraclespritz.net"
    };

    // 1. THE MASTER INTERFACE (H2O V4.0 - TOTAL ACCESS)
    if (event.httpMethod === 'GET' && !event.queryStringParameters.sync) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html' },
            body: `
<!DOCTYPE html>
<html>
<head>
    <title>SOVEREIGN COMMAND v4.0</title>
    <style>
        body { background: #000; color: #39FF14; font-family: 'Courier New', monospace; padding: 30px; }
        .command-post { border: 6px double #39FF14; padding: 25px; background: #050505; box-shadow: 0 0 40px #39FF14; }
        .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-top: 20px; }
        .data-card { border: 1px solid #444; padding: 15px; background: #0a0a0a; height: 350px; overflow-y: auto; font-size: 0.85rem; }
        button { background: #39FF14; color: #000; width: 100%; padding: 20px; font-weight: bold; font-size: 1.2rem; border: none; cursor: pointer; text-transform: uppercase; }
        button:hover { background: #FFF; }
        h2 { color: #FFFF00; border-bottom: 1px solid #333; padding-bottom: 5px; margin-top: 0; }
        .strobe { animation: blink 1s infinite; }
        @keyframes blink { 50% { opacity: 0.3; } }
    </style>
</head>
<body>
    <div class="command-post">
        <h1>AMPLIFY SOVEREIGN COMMAND: EMILY V4.0</h1>
        <p>COMMANDER: <span class="strobe" style="color:#FFF">JAY-Z (GEO ONE)</span> | STATUS: <span style="color:#00FFFF">MASTER AUTH ACTIVE</span></p>
        
        <div class="grid">
            <div>
                <button onclick="pullData('inventory')">SYNC INVENTORY</button>
                <div id="inv-data" class="data-card">Waiting for inventory pull...</div>
            </div>
            <div>
                <button onclick="pullData('orders')">SYNC ORDERS</button>
                <div id="ord-data" class="data-card">Waiting for order pull...</div>
            </div>
            <div>
                <button onclick="pullData('google')">SYNC GOOGLE TRAFFIC</button>
                <div id="goog-data" class="data-card">Waiting for Google 2.0 handshake...</div>
            </div>
        </div>
    </div>

    <script>
        async function pullData(type) {
            const out = document.getElementById(type + '-data');
            out.innerHTML = "<span class='strobe'>ACCESSING " + type.toUpperCase() + "...</span>";
            try {
                const res = await fetch('?sync=true&type=' + type, { method: 'POST' });
                const data = await res.json();
                out.innerHTML = '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
            } catch (e) { out.innerHTML = "<span style='color:red'>FAILURE: Bridge Blocked.</span>"; }
        }
    </script>
</body>
</html>`
        };
    }

    // 2. THE EXECUTION - TOTAL SCOPE
    const type = event.queryStringParameters.type;
    try {
        if (type === 'inventory') {
            const res = await axios.get(`https://${KEYS.STORE}/admin/api/2024-01/products.json`, {
                headers: { 'X-Shopify-Access-Token': KEYS.S_TOKEN }
            });
            // Focus on Solar and Spray
            return { statusCode: 200, body: JSON.stringify(res.data.products.map(p => ({
                title: p.title,
                stock: p.variants[0].inventory_quantity,
                price: p.variants[0].price
            }))) };
        }

        if (type === 'orders') {
            const res = await axios.get(`https://${KEYS.STORE}/admin/api/2024-01/orders.json`, {
                headers: { 'X-Shopify-Access-Token': KEYS.S_TOKEN }
            });
            return { statusCode: 200, body: JSON.stringify(res.data.orders) };
        }

        if (type === 'google') {
            // Hard Handshake with Google 2.0 using Refresh Token
            const tokenRes = await axios.post('https://oauth2.googleapis.com/token', {
                client_id: KEYS.G_CLIENT,
                client_secret: KEYS.G_SECRET,
                refresh_token: KEYS.G_REFRESH,
                grant_type: 'refresh_token'
            });
            return { statusCode: 200, body: JSON.stringify({ 
                msg: "Google 2.0 Master Connected",
                access_token_active: !!tokenRes.data.access_token 
            }) };
        }

    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: "MASTER_REJECTION", detail: err.message }) };
    }
};
