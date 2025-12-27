document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-scroll');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden-scroll');
    hiddenElements.forEach(el => observer.observe(el));

    // Navbar Glass Effect on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 10, 0.8)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'transparent'; // Let it blend with hero normally
            navbar.style.backdropFilter = 'blur(12px)'; // Keep initial blur
        }
    });

    // Parallax Effect for visual elements
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        const orb = document.querySelector('.glowing-orb');
        if (orb) {
            orb.style.transform = `translate(${x}px, ${y}px)`;
        }
    });

    // Smooth Scroll for Anchor Links (Backup for older browsers)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
