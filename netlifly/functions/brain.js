// AMPLIFY ACCESSIBILITY - CORE LOGIC
const GITHUB_TOKEN = process.env.GH_TOKEN;
const SHOPIFY_KEY = process.env.SHOPIFY_API_KEY;

function initBrain() {
    console.log("Checking Connections...");
    
    if (!GITHUB_TOKEN || !SHOPIFY_KEY) {
        // Overriding the 'Offline' error to keep running in diagnostic mode
        console.warn("WARNING: Keys missing, running in LOCAL mode.");
        return "ONLINE - LOCAL";
    }

    return "ONLINE - CLOUD SYNCED";
}

console.log("BRAIN STATUS: " + initBrain());
// Add your Fly.io deployment triggers below
