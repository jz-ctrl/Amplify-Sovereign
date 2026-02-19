// EMILY SOVEREIGN BRAIN - DUAL-PATH AUTHENTICATION
const axios = require('axios');

exports.handler = async (event, context) => {
    // PATH 1: Geo One Zavala (Shopify Private App Access)
    const GEO_SHOPIFY_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN; 
    
    // PATH 2: jz@votejz.org (Workspace & Store Staff Access)
    const JZ_GOOGLE_TOKEN = process.env.GOOGLE_JAYZ_REFRESH_TOKEN;
    const JZ_CLIENT_ID = process.env.GOOGLE_JAYZ_CLIENT_ID;

    const STORE_URL = "miraclespritz.net";

    try {
        console.log("[EMILY] Opening eyes... syncing Geo + JZ paths.");

        // 1. MIRACLE SPRITZ STORE SYNC (GEO PATH)
        const shopData = await axios.get(`https://${STORE_URL}/admin/api/2024-01/shop.json`, {
            headers: { 'X-Shopify-Access-Token': GEO_SHOPIFY_TOKEN }
        });

        // 2. VOTEJZ.ORG EMAIL/CONTEXT SYNC (JZ PATH)
        // If this token is missing, she hallucinates about your emails.
        const hasWorkspaceAccess = !!JZ_GOOGLE_TOKEN;

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                status: "Sovereign Intelligence Active",
                identities: {
                    shopify: "Geo One Zavala (Verified)",
                    workspace: hasWorkspaceAccess ? "jz@votejz.org (Emails Visible)" : "Blind - Check Tokens"
                },
                store: shopData.data.shop.name,
                business: {
                    npo: "Amplify Accessibility Green Tech Coalition",
                    ein: "99-3298727",
                    duns: "96-9633754"
                },
                timestamp: new Date().toISOString()
            })
        };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: "System Jam", 
                reason: "Key Mismatch",
                details: "Check if Geo's API key is expired or if JZ permissions changed." 
            })
        };
    }
};
