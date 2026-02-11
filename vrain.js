/* EMILY SOVEREIGN - COMMAND CENTER */
const biz = { name: "Amplify Accessibility", ceo: "Jorge Zavala" };

function executeCommand(cmd) {
    const term = document.getElementById('terminal');
    const input = document.getElementById('cmd-input');
    
    term.innerHTML += `<br><span style="color:white">> ${cmd}</span>`;
    
    // Command Recognition Logic
    if(cmd.toLowerCase().includes("status")) {
        term.innerHTML += `<br>> 88-OVERRIDE: STABLE. CEO AUTHORIZED.`;
    } else if(cmd.toLowerCase().includes("spritz")) {
        term.innerHTML += `<br>> MIRACLE SPRITZ pH: 4.6 (TARGET MATCHED)`;
    } else {
        term.innerHTML += `<br>> EXECUTING: ${cmd.toUpperCase()}... SUCCESS.`;
    }
    
    input.value = ""; // Clear input
    term.scrollTop = term.scrollHeight; // Auto-scroll
}

// SPRITE AUTOMATION
setInterval(() => {
    console.log("Automation Heartbeat: " + biz.name);
}, 5000);
