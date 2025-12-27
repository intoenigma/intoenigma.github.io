function update() {
    document.getElementById('screen-res').textContent = `${window.screen.width} x ${window.screen.height}`;
    document.getElementById('viewport-res').textContent = `${window.innerWidth} x ${window.innerHeight}`;
    document.getElementById('pixel-ratio').textContent = window.devicePixelRatio || 1;
    document.getElementById('color-depth').textContent = window.screen.colorDepth || 24;

    let orient = 'Landscape';
    if (window.screen.orientation) {
        orient = window.screen.orientation.type.includes('portrait') ? 'Portrait' : 'Landscape';
    } else {
        orient = window.innerHeight > window.innerWidth ? 'Portrait' : 'Landscape';
    }
    document.getElementById('orientation').textContent = orient;
}

window.addEventListener('resize', update);
update();
