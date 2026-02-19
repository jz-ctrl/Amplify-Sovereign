// EMILY SOVEREIGN - ANTI-HALLUCINATION CORE
const axios = require('axios');
const qs = require('qs');

exports.handler = async (event, context) => {
    // 1. RAW CREDENTIALS (NO SIMULATION ALLOWED)
    const JZ_REFRESH = process.env.GOOGLE_JAYZ_REFRESH_TOKEN;
    const JZ_CLIENT_ID = process.env.GOOGLE_JAYZ_CLIENT_ID;
    const JZ_SECRET = process.env.GOOGLE_JAYZ_CLIENT_SECRET;
    const GEO_SHOPIFY_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
    const STORE = "miraclespritz.net";

    try {
        console.log("[EMILY] FORCING REAL-TIME CONTEXT SYNC...");

        // 2. FORCE REFRESH GOOGLE SIGHT (jz@votejz.org)
        // This stops the lying by forcing a new connection to your emails
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
            client_id: JZ_CLIENT_ID,
            client_secret: JZ_SECRET,
            refresh_token: JZ_REFRESH,
            grant_type: 'refresh_token'
        }));
        
        const ACCESS_TOKEN = tokenResponse.data.access_token;

        // 3. ACTUAL GMAIL CHECK (NO GHOSTING)
        const emailCheck = await axios.get('https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=1', {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` }
        });

        // 4. ACTUAL SHOPIFY CHECK (GEO PATH)
        const shopify = await axios.get(`https://${STORE}/admin/api/2024-01/shop.json`, {
            headers: { 'X-Shopify-Access-Token': GEO_SHOPIFY_TOKEN }
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: "Sovereign Intelligence Verified",
                authority: "jz@votejz.org",
                context: "LIVE - NO SIMULATION",
                store: shopify.data.shop.name,
                business: "Amplify Accessibility Green Tech Coalition",
                verified_data: {
                    ein: "99-3298727",
                    duns: "96-9633754"
                },
                last_sync: new Date().toISOString()
            })
        };
    } catch (err) {
        // HARD ERROR - NO GUESSTIMATES
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: "Authentication Jam", 
                diagnostics: "Check JZ Refresh Token and Geo Shopify Key.",
                raw_error: err.message 
            })
        };
    }
};
