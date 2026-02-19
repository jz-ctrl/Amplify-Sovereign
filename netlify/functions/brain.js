// EMILY MASTER BRAIN - ANTI-HALLUCINATION PROTOCOL
// AUTHORITY: jz@votejz.org | STORE: miraclespritz.net
const axios = require('axios');
const qs = require('qs');

exports.handler = async (event, context) => {
    // 1. DUAL-KEY SEPARATION
    const JZ_REFRESH = process.env.GOOGLE_JAYZ_REFRESH_TOKEN;
    const JZ_CLIENT_ID = process.env.GOOGLE_JAYZ_CLIENT_ID;
    const JZ_SECRET = process.env.GOOGLE_JAYZ_CLIENT_SECRET;
    const GEO_SHOPIFY_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;
    const STORE = "miraclespritz.net";

    try {
        // 2. THE EYE-OPENER: Refreshing the Workspace Connection
        // This is why she was hallucinating - the old token died.
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
            client_id: JZ_CLIENT_ID,
            client_secret: JZ_SECRET,
            refresh_token: JZ_REFRESH,
            grant_type: 'refresh_token'
        }));
        
        const LIVE_ACCESS_TOKEN = tokenResponse.data.access_token;

        // 3. CROSS-REFERENCE EMAILS (THE SIGHT)
        // Now she can actually see the jz@votejz.org inbox
        const emailCheck = await axios.get('https://www.googleapis.com/gmail/v1/users/me/messages?maxResults=5', {
            headers: { Authorization: `Bearer ${LIVE_ACCESS_TOKEN}` }
        });

        // 4. SHOPIFY SYNC (THE HANDS)
        const shopify = await axios.get(`https://${STORE}/admin/api/2024-01/shop.json`, {
            headers: { 'X-Shopify-Access-Token': GEO_SHOPIFY_TOKEN }
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: "Sovereign & Seeing",
                authority: "jz@votejz.org",
                context: "Emails Synced", // No more hallucinations
                store: shopify.data.shop.name,
                business: "Amplify Accessibility Green Tech Coalition",
                verified_data: {
                    ein: "99-3298727",
                    duns: "96-9633754"
                }
            })
        };
    } catch (err) {
        console.error("EMILY BLINDNESS ERROR:", err.response ? err.response.data : err.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: "System Jammed", 
                message: "Authentication expired. Check JZ Workspace Tokens." 
            })
        };
    }
};
