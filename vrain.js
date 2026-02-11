/* EMILY SOVEREIGN - BRAIN AUTOMATION CORE */
const bizData = {
    ceo: "JORGE ZAVALA",
    duns: "96-9633754",
    ein: "99-3298727",
    formula: "pH 4.6 (MIRACLE SPRITZ)"
};

const statusCycle = [
    "88-OVERRIDE: ENGAGED",
    "AUTOMATION: RUNNING",
    "SCANNING BIO-FREQUENCIES...",
    "AMPLIFY ACCESSIBILITY: ACTIVE",
    "JARVIS PROTOCOL: ONLINE"
];

let cycleIndex = 0;

function runSovereignLoop() {
    const screen = document.getElementById('terminal');
    
    // This loop updates the screen automatically
    setInterval(() => {
        screen.innerHTML = `
            <div style="color:red; font-weight:bold;">> CEO AUTHORIZED: ${bizData.ceo}</div>
            <div style="color:lime;">> STATUS: ${statusCycle[cycleIndex]}</div>
            <hr style="border:0.5px solid #222;">
            <div style="color:cyan;">> FORMULA: ${bizData.formula}</div>
            <div style="color:yellow;">> DUNS: ${bizData.duns} | EIN: ${bizData.ein}</div>
        `;
        
        cycleIndex = (cycleIndex + 1) % statusCycle.length;
    }, 3000); // 3 seconds per cycle
}

// Wake up the brain
window.onload = runSovereignLoop;
