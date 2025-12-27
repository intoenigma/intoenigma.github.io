const logs = document.getElementById('logs');
const cmd = document.getElementById('cmd');
const btn = document.getElementById('run-btn');

function log(msg, type = 'result') {
    const div = document.createElement('div');
    div.className = `log-line ${type}`;
    div.textContent = msg;
    logs.appendChild(div);
    logs.scrollTop = logs.scrollHeight;
}

// Override console
const originalLog = console.log;
console.log = function(...args) {
    originalLog.apply(console, args);
    log(args.join(' '), 'result'); // Simplified
};

btn.addEventListener('click', execute);
cmd.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') execute();
});

function execute() {
    const val = cmd.value;
    if(!val) return;
    
    log(`> ${val}`, 'input-echo');
    
    try {
        // Indirect eval via logic or Function constructor
        // Function constructor is slightly cleaner scope-wise than eval, but still limited.
        // Returning the result
        const result = (new Function(`return (${val})`))();
        log(String(result), 'result');
    } catch(e) {
        log(e.toString(), 'error');
    }
    
    cmd.value = '';
}
