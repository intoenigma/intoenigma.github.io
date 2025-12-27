const input = document.getElementById('input');
const output = document.getElementById('output');
const btn = document.getElementById('format-btn');
const copy = document.getElementById('copy-btn');

btn.addEventListener('click', () => {
    let code = input.value.trim();
    if(!code) return;

    // Basic indentation logic (Naive)
    let indent = 0;
    let formatted = '';
    
    // Remove newlines first to handle minified
    code = code.replace(/\n/g, ''); 
    
    for (let i = 0; i < code.length; i++) {
        const char = code[i];
        
        if (char === '{') {
            formatted += '{\n' + '  '.repeat(++indent);
        } else if (char === '}') {
            formatted += '\n' + '  '.repeat(--indent) + '}';
        } else if (char === ';') {
            formatted += ';\n' + '  '.repeat(indent); // Basic line break on semi-colon
        } else {
            formatted += char;
        }
    }
    
    // Clean up empty lines
    formatted = formatted.replace(/^\s*[\r\n]/gm, "");
    
    output.value = formatted;
});

copy.addEventListener('click', () => {
    output.select();
    document.execCommand('copy');
    alert('Copied');
});
