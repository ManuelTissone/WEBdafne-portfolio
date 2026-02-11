document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    const navbar = document.querySelector('.navbar');
    const contactForm = document.getElementById('contactForm');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            burger.classList.remove('active');
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 1)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);


    let parallaxElements = document.querySelectorAll('.parallax-section:not(.hero)');

    function parallaxScroll() {
        parallaxElements.forEach(element => {
            let scrollPosition = window.pageYOffset;
            let elementOffset = element.offsetTop;
            let elementHeight = element.offsetHeight;

            if (scrollPosition + window.innerHeight > elementOffset &&
                scrollPosition < elementOffset + elementHeight) {
                let yPos = -(scrollPosition - elementOffset) * 0.3;
                element.style.backgroundPositionY = yPos + 'px';
            }
        });
    }

    window.addEventListener('scroll', parallaxScroll);


    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        console.log('Formulario enviado:');
        console.log('Nombre:', name);
        console.log('Email:', email);
        console.log('Mensaje:', message);

        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Mensaje Enviado';
        submitButton.style.backgroundColor = '#4CAF50';

        setTimeout(() => {
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
        }, 3000);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const heroContent = document.querySelector('.hero-content');

                if (heroContent && scrolled < window.innerHeight) {
                    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
                    heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
                }

                ticking = false;
            });

            ticking = true;
        }
    });

    const aboutSection = document.querySelector('.about-section');
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const aboutImage = entry.target.querySelector('.about-image');
                const aboutContent = entry.target.querySelector('.about-content');

                if (aboutImage && aboutContent) {
                    aboutImage.style.animation = 'fadeInUp 1s ease forwards';
                    aboutContent.style.animation = 'fadeInUp 1s ease 0.2s forwards';
                }

                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }

    // Carousel: auto-scroll + mouse drag (PC) + touch swipe (mobile)
    const track = document.querySelector('.carousel-track');
    const trackItems = track.querySelectorAll('.carousel-item');
    const halfWidth = track.scrollWidth / 2;
    let position = 0;
    let autoSpeed = 0.8; // px per frame
    let isDragging = false;
    let startX = 0;
    let dragStartPos = 0;
    let dragDistance = 0;
    let lastTime = performance.now();
    let velocity = 0;
    let animationId;

    function animate(now) {
        const delta = now - lastTime;
        lastTime = now;

        if (!isDragging) {
            // Apply velocity decay after drag release
            if (Math.abs(velocity) > 0.5) {
                position -= velocity;
                velocity *= 0.95;
            } else {
                velocity = 0;
                position -= autoSpeed;
            }
        }

        // Loop: reset when past half (duplicated items)
        if (position <= -halfWidth) {
            position += halfWidth;
        } else if (position > 0) {
            position -= halfWidth;
        }

        track.style.transform = `translateX(${position}px)`;
        animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    // Mouse drag (PC)
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        dragStartPos = position;
        dragDistance = 0;
        velocity = 0;
        e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const diff = e.clientX - startX;
        dragDistance = diff;
        position = dragStartPos + diff;
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        velocity = -dragDistance * 0.05;
    });

    // Touch swipe (mobile)
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        dragStartPos = position;
        dragDistance = 0;
        velocity = 0;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const diff = e.touches[0].clientX - startX;
        dragDistance = diff;
        position = dragStartPos + diff;
    }, { passive: true });

    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        velocity = -dragDistance * 0.05;
    });

    // Prevent img drag ghost
    track.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    // Lightbox (only open on click, not drag)
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    trackItems.forEach(item => {
        item.addEventListener('click', () => {
            if (Math.abs(dragDistance) > 5) return; // was a drag, not a click
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxClose) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
