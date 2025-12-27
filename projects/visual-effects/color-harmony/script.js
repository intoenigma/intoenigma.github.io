const input = document.getElementById('base-color');
const hexDisplay = document.getElementById('hex-code');
const palette = document.getElementById('palette');

input.addEventListener('input', () => {
    const hex = input.value;
    hexDisplay.textContent = hex;
    generatePalette(hex);
});

function generatePalette(hex) {
    palette.innerHTML = '';
    
    // Parse Hex to HSL
    let [h, s, l] = hexToHSL(hex);
    
    // Simple Monochromatic + Analogous Logic
    // We will generate 5 swatches: -30deg, -15deg, Base, +15deg, +30deg hue shift
    const shifts = [-40, -20, 0, 20, 40];
    
    shifts.forEach(shift => {
        let newH = (h + shift + 360) % 360;
        let color = `hsl(${newH}, ${s}%, ${l}%)`;
        
        const div = document.createElement('div');
        div.className = 'color-swatch';
        div.style.backgroundColor = color;
        div.innerHTML = `<span class="tooltip">${color}</span>`;
        div.onclick = () => {
            navigator.clipboard.writeText(color);
            alert('Copied CSS value');
        }
        palette.appendChild(div);
    });
}

function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255; g /= 255; b /= 255;
    let cmin = Math.min(r,g,b), cmax = Math.max(r,g,b), delta = cmax - cmin;
    let h = 0, s = 0, l = 0;
  
    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return [h, s, l];
}

generatePalette(input.value);
