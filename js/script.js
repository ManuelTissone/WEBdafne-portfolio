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
        if (window.innerWidth <= 768) return;
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


    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.querySelector('span').textContent;
        submitButton.querySelector('span').textContent = 'Enviando...';
        submitButton.disabled = true;

        const formData = new FormData(contactForm);
        const json = JSON.stringify(Object.fromEntries(formData));

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            });

            const result = await response.json();

            if (result.success) {
                submitButton.querySelector('span').textContent = 'Mensaje Enviado';
                submitButton.style.backgroundImage = 'none';
                submitButton.style.backgroundColor = '#4CAF50';
                contactForm.reset();
            } else {
                throw new Error(result.message);
            }
        } catch (error) {
            console.error('Web3Forms error:', error.message);
            submitButton.querySelector('span').textContent = 'Error al enviar';
            submitButton.style.backgroundImage = 'none';
            submitButton.style.backgroundColor = '#c0392b';
        } finally {
            setTimeout(() => {
                submitButton.querySelector('span').textContent = originalText;
                submitButton.style.backgroundImage = '';
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 3000);
        }
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

    const contactSection = document.querySelector('.contact-section');
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    if (contactSection) {
        contactObserver.observe(contactSection);
    }

    const obrasSection = document.querySelector('.obras-section');
    const obrasObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                obrasObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    if (obrasSection) {
        obrasObserver.observe(obrasSection);
    }

    const aboutSection = document.querySelector('.about-section');
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                aboutObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    if (aboutSection) {
        aboutObserver.observe(aboutSection);
    }

    // Magic text: word-by-word scroll reveal on about paragraphs
    const aboutParagraphs = document.querySelectorAll('.about-text');
    aboutParagraphs.forEach(p => {
        const words = p.textContent.trim().split(/\s+/);
        p.innerHTML = words.map(w => `<span class="magic-word">${w}</span>`).join(' ');
    });

    const magicWords = document.querySelectorAll('.magic-word');
    const totalWords = magicWords.length;

    function updateMagicText() {
        if (!aboutSection || totalWords === 0) return;
        const rect = aboutSection.getBoundingClientRect();
        const wh = window.innerHeight;
        // 0 cuando la sección entra por abajo, 1 cuando el top llega al 15% del viewport
        const progress = Math.max(0, Math.min(1, (wh - rect.top) / (wh * 1.15)));

        magicWords.forEach((span, i) => {
            const wordStart = i / totalWords;
            const wordEnd = wordStart + 1 / totalWords;
            const p = Math.max(0, Math.min(1, (progress - wordStart) / (wordEnd - wordStart)));
            span.style.opacity = 0.12 + p * 0.88;
        });
    }

    window.addEventListener('scroll', updateMagicText, { passive: true });
    updateMagicText();

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

    // Obra Modal
    const obrasData = {
        foco: {
            titulo: 'El Foco',
            tecnica: 'Lapicera Bic sobre papel',
            descripcion: 'Una introspección surrealista sobre la iluminación y el pensamiento creativo. El trazo de la Bic revela la dualidad entre lo cotidiano y lo extraordinario.',
            precio: 'USD 450',
            año: '2023'
        },
        pildoras: {
            titulo: 'Píldoras',
            tecnica: 'Lapicera Bic - Papel Texturado - Colores Lyra',
            descripcion: 'Composición que explora la tensión entre lo orgánico y lo artificial. Cada detalle fue construido trazo a trazo con paciencia y precisión.',
            precio: 'USD 380',
            año: '2026'
        },
        saxo: {
            titulo: 'Saxofón',
            tecnica: 'Lapicera Bic sobre papel',
            descripcion: 'Un homenaje a la música como lenguaje universal. La geometría del instrumento se convierte en poesía visual donde el ritmo y el trazo convergen.',
            precio: 'USD 520',
            año: '2023'
        },
        tuercas: {
            titulo: 'Tuercas',
            tecnica: 'Lapicera Bic sobre papel',
            descripcion: 'Los objetos mecánicos del cotidiano transformados en composición artística. La precisión del trazo refleja la complejidad de lo simple.',
            precio: 'USD 290',
            año: '2022'
        }
    };

    const obraModal        = document.getElementById('obraModal');
    const obraModalImg     = document.getElementById('obraModalImg');
    const obraModalYear    = document.getElementById('obraModalYear');
    const obraModalTitle   = document.getElementById('obraModalTitle');
    const obraModalTecnica = document.getElementById('obraModalTecnica');
    const obraModalDesc    = document.getElementById('obraModalDesc');
    const obraModalPrecio  = document.getElementById('obraModalPrecio');
    const obraModalCta     = document.getElementById('obraModalCta');
    const obraModalClose   = obraModal.querySelector('.obra-modal-close');
    const obraModalBackdrop = obraModal.querySelector('.obra-modal-backdrop');

    function abrirModal(obraId, imgSrc) {
        const obra = obrasData[obraId];
        if (!obra) return;
        obraModalImg.src = imgSrc;
        obraModalImg.alt = obra.titulo;
        obraModalYear.textContent = obra.año;
        obraModalTitle.textContent = obra.titulo;
        obraModalTecnica.textContent = obra.tecnica;
        obraModalDesc.textContent = obra.descripcion;
        obraModalPrecio.textContent = obra.precio;
        obraModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        obraModalClose.focus();
    }

    function cerrarModal() {
        obraModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Populate badge text
    trackItems.forEach(item => {
        const badge = item.querySelector('.obra-badge');
        if (badge) badge.textContent = 'Descripción';
    });

    trackItems.forEach(item => {
        item.addEventListener('click', () => {
            if (Math.abs(dragDistance) > 5) return;
            const obraId = item.getAttribute('data-obra');
            abrirModal(obraId, item.querySelector('img').src);
        });
    });

    obraModalClose.addEventListener('click', cerrarModal);
    obraModalBackdrop.addEventListener('click', cerrarModal);
    obraModalCta.addEventListener('click', cerrarModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && obraModal.classList.contains('active')) {
            cerrarModal();
        }
    });
});
