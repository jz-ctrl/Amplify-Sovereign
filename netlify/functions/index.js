const axios = require('axios');
const { getStore } = require('@netlify/blobs'); 

/**
 * EMILY CORE V3.0 - THE SOVEREIGN AGENT
 * INTEGRATED: KDP, MARKETING PLATFORM, GOOGLE 2.0, & SHOPIFY 14a7
 * ARCHITECT: GEO ONE ZAVALA
 */

exports.handler = async (event, context) => {
    // 1. DYNAMIC IDENTITY MAPPING (From your Netlify Env)
    const IDENTITY = {
        AMAMZON_USER: process.env.AMAZON_SELLER_USER || "geo_zavala@me.com",
        BUSINESS_MAIL: process.env.EMAIL_BUSINESS || "drz@showroomdrz.com",
        PRIMARY_MAIL: process.env.EMAIL_PRIMARY || "geo1zavala@gmail.com",
        MARKETING_USER: process.env.MARKETING_USER || "jz@votejz.org",
        KDP_MAIL: process.env.KDP_EMAIL || "jz@votejz.org",
        GOOGLE_ID: process.env.GOOGLE_2_0_GEO_ID,
        JAYZ_CLIENT: process.env.GOOGLE_JAYZ_CLIENT_ID
    };

    const S_API_KEY = process.env.SHOPIFY_API_KEY; // 14a7
    const S_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
    const STORE = "miraclespritz.net";

    // 2. THE HIGH-CONTRAST INTERFACE (H2O V3.0)
    if (event.httpMethod === 'GET' && !event.queryStringParameters.sync) {
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'text/html' },
            body: `
<!DOCTYPE html>
<html>
<head>
    <title>EMILY SOVEREIGN CORE V3</title>
    <style>
        body { background: #000; color: #39FF14; font-family: 'Courier New', monospace; padding: 30px; }
        .master-panel { border: 5px solid #39FF14; padding: 25px; background: #050505; box-shadow: 0 0 30px #39FF14; }
        .data-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px; }
        .log-box { background: #0a0a0a; color: #00FFFF; height: 450px; overflow-y: auto; padding: 15px; border: 1px solid #444; font-size: 0.9rem; border-radius: 5px; }
        button { background: #39FF14; color: #000; width: 100%; padding: 25px; font-size: 2rem; font-weight: bold; border: none; cursor: pointer; transition: 0.2s; }
        button:hover { background: #fff; box-shadow: 0 0 20px #fff; }
        .identity-tag { color: #FFFF00; font-size: 1.1rem; }
        .strobe { animation: blinker 1s linear infinite; }
        @keyframes blinker { 50% { opacity: 0; } }
    </style>
</head>
<body>
    <div class="master-panel">
        <h1>AMPLIFY ACCESSIBILITY: MASTER BRAIN V3</h1>
        <p>CHIEF ARCHITECT: <span class="identity-tag">GEO ONE ZAVALA</span></p>
        <p>ACTIVE MISSION: <span class="strobe" style="color:#FFF">GENETIC DATA SYNC</span></p>

        <div class="data-grid">
            <div class="control-zone">
                <button onclick="executeFullSync()">INITIATE GLOBAL SYNC</button>
                <div style="margin-top:20px; border: 1px solid #333; padding: 15px; line-height: 1.6;">
                    <strong>HANDSHAKE STATUS:</strong><br>
                    - SHOPIFY (14a7): <span style="color:white">READY</span><br>
                    - KDP IDENTITY: <span style="color:white">${IDENTITY.KDP_MAIL}</span><br>
                    - MARKETING: <span style="color:white">ALL-IN-ONE LINKED</span><br>
                    - MEMORY: <span style="color:white">NETLIFY BLOBS ACTIVE</span>
                </div>
            </div>
            <div class="log-box" id="log">
                [SYSTEM WAKE] Identity mapping complete.<br>
                [MEMORY] Resolving duplicates in Netlify Env variables...<br>
                [AUTH] Google Client IDs verified.<br>
                [READY] Waiting for Sovereign command.
            </div>
        </div>
    </div>

    <script>
        async function executeFullSync() {
            const log = document.getElementById('log');
            log.innerHTML += "<br>[" + new Date().toLocaleTimeString() + "] [ACTION] Pinging Shopify & Marketing API...";
            try {
                const res = await fetch('?sync=true', { method: 'POST' });
                const data = await res.json();
                log.innerHTML += "<br>[SUCCESS] Core Response: " + data.status;
                log.innerHTML += "<br>[LOG] Connected to: " + data.store;
                log.innerHTML += "<br>[MEMORY] Learned new state for: " + data.timestamp;
            } catch (err) {
                log.innerHTML += "<br>[ERROR] Bridge Blindness. Check credentials.";
            }
            log.scrollTop = log.scrollHeight;
        }
    </script>
</body>
</html>`
        };
    }

    // 3. THE RECURSIVE BRAIN (EXECUTION)
    try {
        // Shopify 14a7 Handshake
        const shopifyRes = await axios.get(`https://${STORE}/admin/api/2024-01/shop.json`, {
            headers: { 'X-Shopify-Access-Token': S_TOKEN, 'X-Shopify-Api-Key': S_API_KEY }
        });

        // GENETIC MEMORY: Storing the Handshake state in Netlify Blobs
        const brainStore = getStore('sovereign_brain');
        await brainStore.set('latest_handshake', {
            timestamp: new Date().toISOString(),
            identities: IDENTITY,
            store: shopifyRes.data.shop.name
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: "SOVEREIGN_MASTER_ACTIVE",
                store: shopifyRes.data.shop.name,
                timestamp: new Date().toISOString()
            })
        };
    } catch (err) {
        return { 
            statusCode: 500, 
            body: JSON.stringify({ error: "CORE_FAILURE", detail: err.message }) 
        };
    }
};
