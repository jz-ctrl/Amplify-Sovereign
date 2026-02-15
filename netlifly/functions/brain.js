const GITHUB_TOKEN = process.env.GH_TOKEN;
const SHOPIFY_KEY = process.env.SHOPIFY_API_KEY;

console.log("BRAIN INITIALIZED");

if (!GITHUB_TOKEN || !SHOPIFY_KEY) {
    console.log("STATUS: RUNNING LOCAL - MISSING KEYS");
} else {
    console.log("STATUS: CLOUD CONNECTED");
}
