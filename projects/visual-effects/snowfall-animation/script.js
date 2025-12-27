const container = document.querySelector('.snow-container');

function createFlake() {
    const flake = document.createElement('div');
    flake.classList.add('flake');
    flake.style.left = Math.random() * 100 + 'vw';
    flake.style.animationDuration = Math.random() * 3 + 2 + 's';
    flake.style.opacity = Math.random();
    flake.style.width = flake.style.height = Math.random() * 5 + 2 + 'px';

    container.appendChild(flake);

    setTimeout(() => {
        flake.remove();
    }, 5000);
}

setInterval(createFlake, 100);
