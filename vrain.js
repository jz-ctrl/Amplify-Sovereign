/* EMILY SOVEREIGN - brain.js */
const sovereignData = {
    ceo: "Jorge Zavala",
    biz: "ShowRoom Doctor Z / Amplify Accessibility",
    duns: "96-9633754",
    ein: "99-3298727",
    address: "1004 San Jose Ave. Suite 101, Clovis, CA 93612"
};

function runTerminal() {
    const screen = document.getElementById('output');
    
    // Injecting the Sovereign Core Logic
    screen.innerHTML = `
        > 88-OVERRIDE: ENGAGED<br>
        > CEO: ${sovereignData.ceo}<br>
        > ENTITY: ${sovereignData.biz}<br>
        > DUNS: ${sovereignData.duns}<br>
        > EIN: ${sovereignData.ein}<br>
        > LOCATION: ${sovereignData.address}<br>
        <hr style="border:1px solid #333">
        > JARVIS PROTOCOL: ACTIVE<br>
        > STANDBY FOR SIR'S COMMAND...
    `;
    console.log("Sovereign Brain Sync: 100%");
}

// Trigger the brain when the page loads
window.onload = runTerminal;
