const scene = document.querySelector('.scene');
const btn = document.getElementById('toggle-btn');

btn.addEventListener('click', () => {
    scene.classList.toggle('night');
});
