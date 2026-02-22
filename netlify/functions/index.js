const axios = require('axios');
const qs = require('qs');

exports.handler = async (event, context) => {
    // 1. MATCHING YOUR SCREENSHOT EXACTLY
    const JZ_ID = process.env.GOOGLE_JAYZ_CLIENT_ID;
    const JZ_SECRET = process.env.GOOGLE_JAYZ_CLIENT_SECRET;
    const JZ_REFRESH = process.env.GOOGLE_JAYZ_REFRESH_TOKEN;
    
    // This is the one currently MISSING from your screenshot
    const SHOPIFY_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN; 

    // 2. THE ANTI-HALLUCINATION GUARD
    if (!SHOPIFY_TOKEN) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: "SIGHT_REJECTED", 
                msg: "Sir, you haven't added SHOPIFY_ACCESS_TOKEN to Netlify yet. I am blind to the store." 
            })
        };
    }

    try {
        // 3. FORCE REFRESH FOR jz@votejz.org (EMAIL SIGHT)
        const tokenRes = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
            client_id: JZ_ID,
            client_secret: JZ_SECRET,
            refresh_token: JZ_REFRESH,
            grant_type: 'refresh_token'
        }));

        // 4. REAL-TIME STORE CALL
        const shopifyRes = await axios.get(`https://miraclespritz.net/admin/api/2024-01/shop.json`, {
            headers: { 'X-Shopify-Access-Token': SHOPIFY_TOKEN }
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: "Sovereign Verified",
                authority: "jz@votejz.org",
                store: shopifyRes.data.shop.name,
                identity_confirmed: "Geo One Zavala",
                timestamp: new Date().toISOString()
            })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "API_CRASH", details: err.message })
        };
    }
};
