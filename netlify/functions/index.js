const axios = require('axios');
const { getStore } = require('@netlify/blobs'); 
const chromium = require('@sparticuz/chromium-min'); // Lightweight 2026 Engine
const puppeteer = require('puppeteer-core'); // Use the Core to save space

exports.handler = async (event, context) => {
    // 1. IDENTITY & AUTHORITY
    const S_API_KEY = process.env.SHOPIFY_API_KEY; 
    const S_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
    const STORE = "miraclespritz.net";
    const MASTER_ID = "geo_zavala@me.com";

    // 2. THE INTERFACE (H2O V2.1 - RECOVERY MODE)
    if (event.httpMethod === 'GET' && !event.queryStringParameters.sync) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html' },
            body: `
<!DOCTYPE html>
<html>
<head>
    <title>EMILY RECOVERY: SOVEREIGN CORE</title>
    <style>
        body { background: #000; color: #39FF14; font-family: monospace; padding: 30px; }
        .terminal { border: 4px solid #39FF14; padding: 20px; background: #050505; box-shadow: 0 0 15px #39FF14; }
        .log-area { background: #0a0a0a; color: #00FFFF; height: 400px; overflow-y: auto; padding: 15px; border: 1px solid #444; margin-top: 15px; }
        button { background: #39FF14; color: #000; width: 100%; padding: 20px; font-size: 1.5rem; font-weight: bold; border: none; cursor: pointer; }
        .highlight { color: #FFFF00; }
    </style>
</head>
<body>
    <div class="terminal">
        <h1>EMILY AGENT: RECOVERY MODULE</h1>
        <p>ARCHITECT: <span class="highlight">GEO ONE ZAVALA</span></p>
        <p>STATUS: <span style="color:white">DEBUGGING HANDSHAKE...</span></p>
        <button onclick="runSync()">RE-ESTABLISH SOVEREIGNTY</button>
        <div class="log-area" id="log">
            [DEBUG] Optimized dependencies loaded.<br>
            [SYSTEM] Memory Blobs re-indexed.<br>
            [H2O] Ready for 14a7 Shopify sync.
        </div>
    </div>
    <script>
        async function runSync() {
            const log = document.getElementById('log');
            log.innerHTML += "<br>[" + new Date().toLocaleTimeString() + "] [ACTION] Pinging Shopify Core...";
            try {
                const res = await fetch('?sync=true', { method: 'POST' });
                const data = await res.json();
                log.innerHTML += "<br>[SUCCESS] Core Connected: " + data.store;
                log.innerHTML += "<br>[LEARN] New state recorded in Blobs.";
            } catch (err) { log.innerHTML += "<br>[CRITICAL] Check Netlify Logs."; }
        }
    </script>
</body>
</html>`
        };
    }

    // 3. RECURSIVE BRAIN LOGIC
    try {
        // Shopify 14a7 Verified Handshake
        const shopifyRes = await axios.get(`https://${STORE}/admin/api/2024-01/shop.json`, {
            headers: { 'X-Shopify-Access-Token': S_TOKEN, 'X-Shopify-Api-Key': S_API_KEY }
        });

        // Persistent Memory Update
        const agentMemory = getStore('sovereign_memory');
        await agentMemory.set('last_wake', {
            ts: new Date().toISOString(),
            identity: "Geo One Zavala",
            status: "EMILY_RESTORED"
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                store: shopifyRes.data.shop.name,
                status: "SOVEREIGN_RECOVERY_SUCCESS"
            })
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: "DEBUG_FAILED", detail: err.message }) };
    }
};
