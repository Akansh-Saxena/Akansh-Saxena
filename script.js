// --- Window Management ---
let highestZ = 100;

function openWindow(id) {
    const el = document.getElementById(id);
    el.style.display = 'flex';
    el.style.zIndex = ++highestZ;
}

function closeWindow(id) {
    document.getElementById(id).style.display = 'none';
}

// Make windows draggable
document.querySelectorAll('.window').forEach(win => {
    const titleBar = win.querySelector('.title-bar');
    
    // Bring to front on click
    win.addEventListener('mousedown', () => {
        win.style.zIndex = ++highestZ;
    });

    let isDragging = false;
    let offsetX, offsetY;

    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        win.style.left = `${e.clientX - offsetX}px`;
        win.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
});

// --- Clock Logic ---
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('sys-time').innerText = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// --- Terminal Logic ('whoami') ---
const cmdInput = document.getElementById('cmd-input');
const terminalOutput = document.getElementById('terminal-output');

cmdInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const cmd = this.value.trim().toLowerCase();
        
        let responseHTML = `<div class="log"><span class="prompt">akansh@os:~$</span> ${this.value}</div>`;
        
        if (cmd === 'whoami') {
            responseHTML += `
                <div class="log" style="color:#27c93f; margin-left:15px;">
                    User: Akansh Saxena<br>
                    Institute: J.K. Institute of Applied Physics & Technology<br>
                    Logic Base: 95th Percentile JEE Mains.
                </div>
                <div class="log" style="color:#9494a0; margin-left:15px;">
                    [System Auth: Verified Architect]
                </div>
            `;
        } else if (cmd === 'help') {
            responseHTML += `
                <div class="log" style="margin-left:15px;">
                    Available commands:<br>
                    - <span style="color:#00d2ff">whoami</span> : Authenticate system creator<br>
                    - <span style="color:#00d2ff">clear</span>  : Clear terminal screen<br>
                    - <span style="color:#00d2ff">sudo</span>   : Elevate privileges
                </div>
            `;
        } else if (cmd === 'clear') {
            terminalOutput.innerHTML = '';
            this.value = '';
            return;
        } else if (cmd === '') {
            responseHTML = `<div class="log"><span class="prompt">akansh@os:~$</span></div>`;
        } else {
            responseHTML += `<div class="log" style="color:#ff5f56; margin-left:15px;">Command not found: ${this.value}. Type 'help'.</div>`;
        }

        terminalOutput.innerHTML += responseHTML;
        this.value = '';
        
        // Auto scroll to bottom
        const terminalBody = document.getElementById('terminal-body');
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
});

// --- Game Center: 8051 Electronic Dice Logic ---
function rollDice() {
    const display = document.getElementById('segment-display');
    const log = document.getElementById('dice-log');
    const btn = document.getElementById('roll-btn');
    
    btn.disabled = true;
    log.innerHTML = 'Executing deterministic hardware randomization...';
    log.style.color = '#ffbd2e';

    let ms = 0;
    const interval = setInterval(() => {
        // Simulating the 7-segment rapid change
        display.innerText = Math.floor(Math.random() * 6) + 1;
        ms += 50;
        
        if (ms >= 1000) {
            clearInterval(interval);
            const finalRoll = Math.floor(Math.random() * 6) + 1;
            display.innerText = finalRoll;
            display.style.textShadow = '0 0 20px #27c93f';
            display.style.color = '#27c93f';
            
            log.innerHTML = `Interrupt resolved <10ms. Final State: [${finalRoll}]`;
            log.style.color = '#27c93f';
            
            setTimeout(() => {
                display.style.textShadow = '0 0 10px #ff3333, 0 0 20px #ff3333';
                display.style.color = '#ff3333';
                btn.disabled = false;
            }, 1000);
        }
    }, 50);
}
