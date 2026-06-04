document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Custom Cursor & Magnetic Elements
    // ==========================================
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    const cursorOutline = document.createElement('div');
    cursorOutline.classList.add('cursor-outline');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorOutline);
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX, outlineY = mouseY;
    let glowX = mouseX, glowY = mouseY;

    const glow = document.createElement('div');
    glow.classList.add('ambient-glow');
    document.body.appendChild(glow);

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });

    const animateCursor = () => {
        let distX = mouseX - outlineX;
        let distY = mouseY - outlineY;
        
        outlineX += distX * 0.15;
        outlineY += distY * 0.15;
        
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
        
        let gDistX = mouseX - glowX;
        let gDistY = mouseY - glowY;
        glowX += gDistX * 0.08;
        glowY += gDistY * 0.08;
        glow.style.left = `${glowX}px`;
        glow.style.top = `${glowY}px`;
        
        requestAnimationFrame(animateCursor);
    };
    if (window.matchMedia("(pointer: fine)").matches) animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, .btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });

    const magneticBtns = document.querySelectorAll('.btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // ==========================================
    // 2. Native Parallax & Effects
    // ==========================================
    const heroBgElements = document.querySelectorAll('.hero-bg');
    let lastY = window.scrollY;
    let ticking = false;

    const updateParallax = (y) => {
        if (heroBgElements.length > 0) {
            heroBgElements.forEach(bg => {
                // Slower scroll for background creates depth
                bg.style.transform = `scale(1.1) translateY(${y * 0.3}px)`;
            });
        }
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateParallax(window.scrollY);
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Init parallax
    updateParallax(window.scrollY);

    // ==========================================
    // 4. Text Splitting & Reveal Animations
    // ==========================================
    // Split h1 text into words, then chars to prevent awkward line breaks
    const heroTitle = document.querySelector('h1');
    if (heroTitle) {
        const text = heroTitle.innerText;
        heroTitle.innerHTML = '';
        let charIndex = 0;
        
        const words = text.split(' ');
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap';
            
            word.split('').forEach((char) => {
                const span = document.createElement('span');
                span.innerText = char;
                span.classList.add('char');
                span.style.transitionDelay = `${charIndex * 0.03}s`;
                wordSpan.appendChild(span);
                charIndex++;
            });
            
            heroTitle.appendChild(wordSpan);
            
            if (wordIndex < words.length - 1) {
                heroTitle.appendChild(document.createTextNode(' '));
            }
        });
        
        const cursorSpan = document.createElement('span');
        cursorSpan.innerHTML = '&nbsp;';
        cursorSpan.classList.add('typing-cursor');
        heroTitle.appendChild(cursorSpan);
        
        setTimeout(() => {
            cursorSpan.classList.add('active');
        }, charIndex * 30 + 1000);
    }

    // Intersection Observer for .reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));

    // ==========================================
    // 5. Hero Slider (Adapted for Awwwards)
    // ==========================================
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    if (slides.length > 0) {
        // Trigger initial text animation for first slide
        slides[0].classList.add('active');

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 6000);
    }

    // ==========================================
    // 6. Mobile Menu
    // ==========================================
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksWrapper = document.querySelector('.nav-links-wrapper');
    
    if (mobileMenuBtn && navLinksWrapper) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinksWrapper.classList.toggle('active');
        });
    }

    // ==========================================
    // 7. Image Tilt & Page Transitions
    // ==========================================
    const tiltImages = document.querySelectorAll('.img-placeholder img');
    tiltImages.forEach(img => {
        img.addEventListener('mousemove', (e) => {
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const xPct = (x / rect.width - 0.5) * 20; 
            const yPct = (y / rect.height - 0.5) * -20;
            img.style.transform = `scale(1.05) rotateX(${yPct}deg) rotateY(${xPct}deg)`;
        });
        img.addEventListener('mouseleave', () => {
            img.style.transform = `scale(1) rotateX(0) rotateY(0)`;
        });
    });

    const curtain = document.createElement('div');
    curtain.classList.add('page-curtain');
    document.body.appendChild(curtain);

    const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"])');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.href;
            curtain.style.transformOrigin = 'bottom';
            curtain.style.animation = 'curtainHide 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards';
            setTimeout(() => {
                window.location.href = target;
            }, 800);
        });
    });

    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});
