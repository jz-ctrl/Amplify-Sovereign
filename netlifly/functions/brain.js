const GITHUB_TOKEN = process.env.GH_TOKEN;
const SHOPIFY_KEY = process.env.SHOPIFY_API_KEY;

// Log initialization for terminal confirmation
console.log("BRAIN INITIALIZED");

// Exporting variables for the Netlify functions to consume
module.exports = {
    GITHUB_TOKEN,
    SHOPIFY_KEY
};
