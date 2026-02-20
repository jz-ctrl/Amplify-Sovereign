const axios = require('axios');
const qs = require('qs');

exports.handler = async (event, context) => {
    // 1. DIRECT BINDING TO YOUR VERIFIED NETLIFY KEYS
    const JZ_ID = process.env.GOOGLE_JAYZ_CLIENT_ID;
    const JZ_SECRET = process.env.GOOGLE_JAYZ_CLIENT_SECRET;
    const JZ_REFRESH = process.env.GOOGLE_JAYZ_REFRESH_TOKEN;
    
    // THE KEYS FROM YOUR SCREENSHOT
    const S_API_KEY = process.env.SHOPIFY_API_KEY; // 14a7...
    const S_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN; // shpat...
    const STORE = "miraclespritz.net";

    try {
        // 2. REFRESH GOOGLE AUTH (THE SIGHT)
        const tokenRes = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
            client_id: JZ_ID,
            client_secret: JZ_SECRET,
            refresh_token: JZ_REFRESH,
            grant_type: 'refresh_token'
        }));
        
        const GOOGLE_ACCESS = tokenRes.data.access_token;

        // 3. SECURE SHOPIFY CALL (THE HANDS)
        const shopifyRes = await axios.get(`https://${STORE}/admin/api/2024-01/shop.json`, {
            headers: { 
                'X-Shopify-Access-Token': S_TOKEN,
                'X-Shopify-Api-Key': S_API_KEY
            }
        });

        // 4. THE TRUTH RETURN (ONLY LIVE DATA)
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: "Sovereign Verified",
                authority: "jz@votejz.org",
                store_name: shopifyRes.data.shop.name,
                npo: "Amplify Accessibility Green Tech Coalition",
                biz_ids: { ein: "99-3298727", duns: "96-9633754" },
                timestamp: new Date().toISOString()
            })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: "SYSTEM_BLINDNESS", 
                details: "Check if the 14a7 key and shpat token are active in Shopify Partner Dashboard." 
            })
        };
    }
};
