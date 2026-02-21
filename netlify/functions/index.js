const fs = require('fs');
const axios = require('axios');

// Persistent memory for jz@votejz.org workspace
class AutonomousBrain {
    constructor() {
        this.memoryPath = './brain_state.json';
        this.config = {
            miracle_spritz: {
                domain: "miraclespritz.net",
                apiKey: process.env.SHOPIFY_KEY_MIRACLE,
                token: process.env.SHOPIFY_TOKEN_MIRACLE,
                formula: "pH 4.6",
                log: "spritz_audit.log"
            },
            secondary_site: {
                domain: "americasbest.shop", // Placeholder for your 2nd key
                apiKey: process.env.SHOPIFY_KEY_SECONDARY,
                token: process.env.SHOPIFY_TOKEN_SECONDARY,
                log: "secondary_audit.log"
            }
        };
        this.state = this.initMemory();
    }

    initMemory() {
        if (fs.existsSync(this.memoryPath)) {
            return JSON.parse(fs.readFileSync(this.memoryPath, 'utf8'));
        }
        return { miracle_spritz: { last_order: null }, secondary_site: { last_order: null } };
    }

    async synchronize(siteKey) {
        const site = this.config[siteKey];
        console.log(`[AUTONOMOUS] Syncing ${site.domain}...`);

        try {
            const res = await axios.get(`https://${site.domain}/admin/api/2024-01/orders.json?limit=4`, {
                headers: { 'X-Shopify-Access-Token': site.token }
            });

            const latestOrders = res.data.orders;
            
            // Continuous Learning: Compare new data with stored state
            if (latestOrders[0].id !== this.state[siteKey].last_order) {
                this.executeFulfillment(siteKey, latestOrders[0]);
                this.state[siteKey].last_order = latestOrders[0].id;
                this.saveState();
            }
            
            return latestOrders;
        } catch (err) {
            console.error(`[CRITICAL] Sync failure for ${siteKey}:`, err.message);
        }
    }

    executeFulfillment(siteKey, order) {
        // Autonomous execution based on your specific requirements
        console.log(`[EXECUTE] Processing Order ${order.name} for ${siteKey}`);
        // Add specific logistics logic here (Label gen, etc.)
    }

    saveState() {
        fs.writeFileSync(this.memoryPath, JSON.stringify(this.state, null, 2));
    }
}

module.exports = new AutonomousBrain();
