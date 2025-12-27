// JS mainly for click ripples if needed, but pure CSS covers most here.
const btns = document.querySelectorAll('.btn');
btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // prevent default for demo
        e.preventDefault();

        // Simple ripple
        const circle = document.createElement('span');
        const diameter = Math.max(btn.clientWidth, btn.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - btn.offsetLeft - radius}px`;
        circle.style.top = `${e.clientY - btn.offsetTop - radius}px`;
        circle.classList.add('ripple');

        // Remove old ripples? simplified logic

        // Actually ripple CSS logic isn't in style.css, skip for now to keep it simple pure CSS focus
        console.log("Button clicked!");
    });
});
