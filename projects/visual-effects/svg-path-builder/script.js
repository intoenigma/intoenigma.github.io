const svg = document.getElementById('svg-area');
const code = document.getElementById('path-code');

let d = "";
let points = [];

svg.addEventListener('click', (e) => {
    const rect = svg.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    // Draw Point
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", 4);
    svg.appendChild(c);

    // Update Path
    if (points.length === 0) {
        d += `M ${x} ${y}`;
    } else {
        d += ` L ${x} ${y}`;
    }
    points.push({ x, y });

    // Draw/Update Path Element
    let path = svg.querySelector('path');
    if (!path) {
        path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        svg.prepend(path);
    }
    path.setAttribute("d", d);
    code.innerText = `d="${d}"`;
});

function clearPath() {
    svg.innerHTML = '';
    d = "";
    points = [];
    code.innerText = 'd=""';
}
window.clearPath = clearPath;
