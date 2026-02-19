const axios = require('axios');
const qs = require('qs');

exports.handler = async (event, context) => {
    // 1. FORCED PRODUCTION KEYS
    const JZ_REFRESH = process.env.GOOGLE_JAYZ_REFRESH_TOKEN;
    const JZ_CLIENT_ID = process.env.GOOGLE_JAYZ_CLIENT_ID;
    const JZ_SECRET = process.env.GOOGLE_JAYZ_CLIENT_SECRET;
    const GEO_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN;

    try {
        // 2. FORCE GOOGLE REFRESH (If this fails, she goes silent - no lying)
        const tokenRes = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
            client_id: JZ_CLIENT_ID,
            client_secret: JZ_SECRET,
            refresh_token: JZ_REFRESH,
            grant_type: 'refresh_token'
        }));

        // 3. PULL REAL STORE DATA
        const shopifyRes = await axios.get(`https://miraclespritz.net/admin/api/2024-01/shop.json`, {
            headers: { 'X-Shopify-Access-Token': GEO_TOKEN }
        });

        // 4. RETURN ONLY LIVE DATA (No hardcoded descriptions)
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                auth: "jz@votejz.org",
                store: shopifyRes.data.shop.name, // This MUST come from Shopify
                domain: shopifyRes.data.shop.domain,
                timestamp: new Date().toISOString()
            })
        };
    } catch (err) {
        // 5. HARD CRASH ON ERROR (Stops the hallucination)
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: "CONNECTION_FAILURE", 
                msg: "I am blind. Check your API keys in Netlify." 
            })
        };
    }
};
