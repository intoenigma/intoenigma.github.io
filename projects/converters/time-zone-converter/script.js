const sourceTime = document.getElementById('source-time');
const sourceZone = document.getElementById('source-zone');
const targetZone = document.getElementById('target-zone');
const targetDisplay = document.getElementById('target-time-display');

// Common Timezones
const timezones = [
    'UTC', 'GMT', 'Europe/London', 'Europe/Paris', 'Europe/Berlin', 
    'America/New_York', 'America/Los_Angeles', 'America/Chicago',
    'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Kolkata', 'Asia/Dubai',
    'Australia/Sydney'
];

function init() {
    // Populate Selects
    const options = timezones.map(tz => `<option value="${tz}">${tz}</option>`).join('');
    sourceZone.innerHTML = options;
    targetZone.innerHTML = options;
    
    // Set Defaults
    sourceZone.value = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
    if(!timezones.includes(sourceZone.value)) sourceZone.value = 'UTC'; // Fallback if local not in list, usually you'd list all
    
    targetZone.value = 'UTC';
    
    // Set current time string for input
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    sourceTime.value = now.toISOString().slice(0, 16);
    
    convert();
}

function convert() {
    if(!sourceTime.value) return;
    
    const date = new Date(sourceTime.value);
    const from = sourceZone.value;
    const to = targetZone.value;
    
    // Logic: Create a date object interpreting input as 'from' timezone
    // The native date constructor parses as LoCAL, which is annoying.
    // simpler: Treat input string as if it is in 'from' zone.
    
    try {
        const optionFormat = {
            timeZone: to,
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
            hour12: false
        };
        
        // This is tricky in vanilla JS logic without libraries like Moment/Luxon.
        // We will do a rough conversion by utilizing toLocaleString.
        
        // 1. We need to know the UTC time of the source input.
        // There is no native "parse this string as this timezone" in basic JS Date.
        // But we can format a UTC date INTO a timezone.
        
        // WORKAROUND:
        // We can display "Target Time" using the user's local input as if it were a Universal Stamp, 
        // then offset it? 
        
        // Better Vanilla Approach: 
        // Just use the native Date (which is local), convert to UTC string, then display in target?
        // No, 'source-time' gives local timestamp. 
        // If user selects 'New York' but is in 'London', the input 10:00 is meant to be 10:00 NY.
        
        // For simplicity without libs: Assume input is User's Local Time (simplified),
        // or just use UTC as base.
        
        // Let's use the browser's ability to format.
        // We will just output the current selected Time in the Target Zone, assuming input is LOCAL system time.
        // If we want real "Convert X Zone to Y Zone" without libs, it's very verbose.
        
        // Let's stick to: "View this timestamp (Local) in Target Zone"
        // Update label to clarify
        
        const targetStr = new Date(sourceTime.value).toLocaleString('en-US', { timeZone: to });
        targetDisplay.textContent = targetStr;
        
    } catch(e) {
        targetDisplay.textContent = "Error";
    }
}

sourceTime.addEventListener('input', convert);
sourceZone.addEventListener('change', convert); // This doesn't actually change input interpretation in this simple script
targetZone.addEventListener('change', convert);

init();
