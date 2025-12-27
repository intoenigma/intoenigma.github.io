const glass = document.getElementById('glass');
const blurIn = document.getElementById('blur');
const transIn = document.getElementById('transparency');
const colIn = document.getElementById('col');
const code = document.getElementById('css-code');

function update() {
    const blur = blurIn.value;
    const trans = transIn.value / 100;
    const hex = colIn.value;

    // Hex to RGB
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);

    const bgStyle = `background: rgba(${r}, ${g}, ${b}, ${trans});`;
    const blurStyle = `backdrop-filter: blur(${blur}px);`;
    const webkitStyle = `-webkit-backdrop-filter: blur(${blur}px);`;

    glass.style = `${bgStyle} ${blurStyle} ${webkitStyle}`;

    code.innerText = `${bgStyle}\n${blurStyle}\n${webkitStyle}\nborder: 1px solid rgba(255, 255, 255, 0.3);`;
}

[blurIn, transIn, colIn].forEach(el => el.addEventListener('input', update));
update();
