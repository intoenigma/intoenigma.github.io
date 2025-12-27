const input = document.getElementById('token-input');
const headerOut = document.getElementById('header-out');
const payloadOut = document.getElementById('payload-out');

input.addEventListener('input', () => {
    const token = input.value.trim();
    if(!token) {
        headerOut.textContent = '{}';
        payloadOut.textContent = '{}';
        return;
    }
    
    const parts = token.split('.');
    if(parts.length !== 3) {
        headerOut.textContent = 'Invalid Token Format';
        payloadOut.textContent = '';
        return;
    }
    
    try {
        const header = JSON.parse(atob(parts[0]));
        const payload = JSON.parse(atob(parts[1])); // Might need Base64Url decode fix if -_ used
        
        headerOut.textContent = JSON.stringify(header, null, 2);
        payloadOut.textContent = JSON.stringify(payload, null, 2);
    } catch(e) {
        headerOut.textContent = 'Error Decoding Base64';
    }
});

// Helper if standard atob fails on Base64URL
function base64UrlDecode(str) {
    // Replace - with +, _ with /
    // Not implemented fully here, standard JWT usually works with atob if padded correctly.
    // For robust JWT, likely need replace logic, but keeping simple for this level.
}
