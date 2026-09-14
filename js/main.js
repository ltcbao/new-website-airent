document.addEventListener('DOMContentLoaded', () => {
    // 1. Xử lý hiệu ứng bám đỉnh (Sticky Header)
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // (Smooth Scroll)
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Trừ đi chiều cao của navbar (75px) để không bị che mất tiêu đề
                const offsetTop = targetElement.getBoundingClientRect().top + window.scrollY - 75;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});