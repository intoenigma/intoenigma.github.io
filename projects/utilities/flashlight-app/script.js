const btn = document.getElementById('toggle-btn');
const screen = document.getElementById('screen');
let isOn = false;

btn.addEventListener('click', () => {
    isOn = !isOn;
    if (isOn) {
        screen.classList.add('on');
        btn.classList.add('active');
        // Try requesting fullscreen for max brightness effect
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        }
    } else {
        screen.classList.remove('on');
        btn.classList.remove('active');
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
});
