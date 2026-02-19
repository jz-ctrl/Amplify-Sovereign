const axios = require('axios');

exports.handler = async (event, context) => {
    // Geo's Independent Key for Miracle Spritz
    const SHOPIFY_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN; 
    const SHOPIFY_DOMAIN = "miraclespritz.net";

    try {
        const res = await axios.get(`https://${SHOPIFY_DOMAIN}/admin/api/2024-01/shop.json`, {
            headers: { 'X-Shopify-Access-Token': SHOPIFY_TOKEN }
        });

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: "Sovereign",
                shop: res.data.shop.name,
                npo: "Amplify Accessibility Green Tech Coalition",
                ein: "99-3298727",
                duns: "96-9633754"
            })
        };
    } catch (err) {
        return { statusCode: 500, body: JSON.stringify({ error: "Check Geo's Shopify Key" }) };
    }
};
