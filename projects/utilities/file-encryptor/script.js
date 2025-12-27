const dataIn = document.getElementById('data');
const keyIn = document.getElementById('key');
const resDiv = document.getElementById('output');
const resTxt = document.getElementById('result-text');

async function process(action) {
    const text = dataIn.value;
    const password = keyIn.value;

    if (!text || !password) return alert("Please enter text and key");

    // Basic XOR for demonstration as AES in vanilla JS without massive library is complex/unsafe to roll own.
    // For a pure JS "utility" without external libs like CryptoJS, Simple XOR is standard "obfuscation".
    // WARNING: NOT SECURE FOR REAL USE.

    const result = xorCipher(text, password);

    // If Encrypting, likely want Base64. If Decrypting, decode Base64 first then XOR.
    // Let's do simple: Text -> XOR -> Base64 (Encrypt)
    // Base64 -> XOR -> Text (Decrypt)

    let final;

    try {
        if (action === 'encrypt') {
            const xored = xorCipher(text, password);
            final = btoa(xored);
        } else {
            const decoded = atob(text);
            final = xorCipher(decoded, password);
        }

        resTxt.textContent = final;
        resDiv.classList.remove('hidden');
    } catch (e) {
        alert("Decryption Failed. Invalid Data.");
    }
}

function xorCipher(str, key) {
    let output = '';
    for (let i = 0; i < str.length; i++) {
        const c = str.charCodeAt(i);
        const k = key.charCodeAt(i % key.length);
        output += String.fromCharCode(c ^ k);
    }
    return output;
}
