const axios = require('axios');
const qs = require('qs');

exports.handler = async (event, context) => {
    // 1. EXACT MAPPING FROM YOUR SECRETS
    const JZ_CLIENT_ID = process.env.GOOGLE_JAYZ_CLIENT_ID;
    const JZ_SECRET = process.env.GOOGLE_JAYZ_CLIENT_SECRET;
    const JZ_REFRESH = process.env.GOOGLE_JAYZ_REFRESH_TOKEN;
    
    // Shopify Keys
    const SHOPIFY_API_KEY = process.env.SHOPIFY_API_KEY; // The 14a7... key
    const SHOPIFY_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN; // The shpat_... key
    const STORE = "miraclespritz.net";

    try {
        // 2. REFRESH GOOGLE SIGHT (jz@votejz.org)
        const tokenRes = await axios.post('https://oauth2.googleapis.com/token', qs.stringify({
            client_id: JZ_CLIENT_ID,
            client_secret: JZ_SECRET,
            refresh_token: JZ_REFRESH,
            grant_type: 'refresh_token'
        }));
        
        const GOOGLE_ACCESS = tokenRes.data.access_token;

        // 3. SHOPIFY PRODUCTION CALL
        // Using the 14a7... key and shpat... token together
        const shopify = await axios.get(`https://${STORE}/admin/api/2024-01/shop.json`, {
            headers: { 
                'X-Shopify-Access-Token': SHOPIFY_TOKEN,
                'X-Shopify-Api-Key': SHOPIFY_API_KEY
            }
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: "Sovereign Intelligence Verified",
                authority: "jz@votejz.org",
                store: shopify.data.shop.name,
                business: "Amplify Accessibility Green Tech Coalition",
                ein: "99-3298727",
                duns: "96-9633754"
            })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: "System Jammed", 
                diagnostics: "Check if 14a7 API key is entered in Netlify secrets.",
                raw: err.message 
            })
        };
    }
};
