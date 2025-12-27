const img = document.getElementById('avatar-img');
const seedIn = document.getElementById('seed');
const styleSel = document.getElementById('style-sel');

function generate() {
    const seed = seedIn.value || Math.random().toString(36).substring(7);
    const style = styleSel.value;
    
    // Dicebear API
    const url = `https://api.dicebear.com/7.x/${style}/svg?seed=${seed}`;
    img.src = url;
}

generate(); // Init
