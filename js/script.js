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

    // Carousel: continuous RAF scroll with seamless infinite loop
    const track = document.querySelector('.carousel-track');
    const trackItems = Array.from(track.querySelectorAll('.carousel-item'));
    const totalItems = trackItems.length;

    // Clone items for seamless infinite loop
    trackItems.forEach(item => {
        const clone = item.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        track.appendChild(clone);
    });

    let rafPos = 0;
    let rafId;
    let rafPaused = false;
    let isDragging = false;
    let dragStartX = 0;
    let dragStartPos = 0;
    let dragDistance = 0;
    const rafSpeed = 0.45;

    function getItemTotalWidth() {
        const gap = parseFloat(getComputedStyle(track).gap) || 16;
        return trackItems[0].offsetWidth + gap;
    }

    function getSeparatorWidth() {
        const sep = track.querySelector('.carousel-separator');
        if (!sep) return 0;
        const gap = parseFloat(getComputedStyle(track).gap) || 16;
        return sep.offsetWidth + gap;
    }

    function getOriginalWidth() {
        return totalItems * getItemTotalWidth() + getSeparatorWidth();
    }

    function normalizePos(pos) {
        const w = getOriginalWidth();
        return ((pos % w) + w) % w;
    }

    function applyPos(pos, transition) {
        track.style.transition = transition || 'none';
        track.style.transform = `translateX(${-pos}px)`;
    }

    function rafLoop() {
        if (!rafPaused && !isDragging) {
            rafPos += rafSpeed;
            const w = getOriginalWidth();
            if (rafPos >= w) rafPos -= w;
            applyPos(rafPos);
        }
        rafId = requestAnimationFrame(rafLoop);
    }


    // Mouse drag (PC)
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartPos = rafPos;
        dragDistance = 0;
        track.classList.add('is-dragging');
        e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        dragDistance = e.clientX - dragStartX;
        applyPos(normalizePos(dragStartPos - dragDistance));
    });

    window.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        track.classList.remove('is-dragging');
        const itemW = getItemTotalWidth();
        rafPos = normalizePos(Math.round((dragStartPos - dragDistance) / itemW) * itemW);
        applyPos(rafPos, 'transform 0.4s ease');
    });

    // Touch swipe (mobile)
    track.addEventListener('touchstart', (e) => {
        isDragging = true;
        dragStartX = e.touches[0].clientX;
        dragStartPos = rafPos;
        dragDistance = 0;
        track.classList.add('is-dragging');
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        dragDistance = e.touches[0].clientX - dragStartX;
        applyPos(normalizePos(dragStartPos - dragDistance));
    }, { passive: true });

    track.addEventListener('touchend', () => {
        if (!isDragging) return;
        isDragging = false;
        track.classList.remove('is-dragging');
        const itemW = getItemTotalWidth();
        let snap = dragStartPos - dragDistance;
        if (Math.abs(dragDistance) > 60) {
            snap = dragDistance < 0
                ? Math.ceil(snap / itemW) * itemW
                : Math.floor(snap / itemW) * itemW;
        } else {
            snap = Math.round(snap / itemW) * itemW;
        }
        rafPos = normalizePos(snap);
        applyPos(rafPos, 'transform 0.4s ease');
    });

    // Prevent img drag ghost
    track.querySelectorAll('img').forEach(img => {
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    // Pause on hover so the user can click
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => { rafPaused = true; });
    carouselContainer.addEventListener('mouseleave', () => { rafPaused = false; });

    // Obra Modal
    const obrasData = {
        alfil: {
            titulo: 'Tiempo en hacke',       // Título de la obra
            tecnica: '',      // Técnica utilizada
            descripcion: 'Soporte: 21 x 29,7cm',  // Descripción de la obra
            precio: '',       // Precio (ej: USD 500)
            año: ''           // Año (ej: 2024)
        },
        broches: {
            titulo: 'Insostenible',
            tecnica: '',
            descripcion: 'Soporte: 21 x 29,7cm',
            precio: '',
            año: ''
        },
        cerebro: {
            titulo: 'Cementerio de pensamientos',
            tecnica: '',
            descripcion: 'Soporte: 29,7 x 42cm',
            precio: '',
            año: ''
        },
        corazon: {
            titulo: 'Espacio ritmico',
            tecnica: '',
            descripcion: 'Soporte: 21 x 29,7cm',
            precio: '',
            año: ''
        },
        ernest: {
            titulo: 'El comandante',
            tecnica: '',
            descripcion: 'Soporte: 21 x 29,7cm',
            precio: '',
            año: ''
        },
        maquinaria: {
            titulo: 'Maquinarse',
            tecnica: '',
            descripcion: 'Soporte: 21 x 29,7cm',
            precio: '',
            año: ''
        },
        mesadeluz: {
            titulo: 'Cuando duermo',
            tecnica: '',
            descripcion: 'Soporte: 29,7 x 42cm',
            precio: '',
            año: ''
        },
        lapiceras: {
            titulo: 'Bic siendo Bic',
            tecnica: '',
            descripcion: 'Soporte: 21 x 29,7cm',
            precio: '',
            año: ''
        },
        piano: {
            titulo: '"Laura"',
            tecnica: '',
            descripcion: 'Soporte: 29,7 x 42cm',
            precio: '',
            año: ''
        },
        pildoras: {
            titulo: 'Tango',
            tecnica: '',
            descripcion: 'Soporte: 21 x 29,7cm',
            precio: '',
            año: ''
        },
        serpsaxo: {
            titulo: 'Monte barbaro',
            tecnica: '',
            descripcion: 'Soporte: 21 x 29,7cm',
            precio: '',
            año: ''
        },
        tambores: {
            titulo: 'Cuerda',
            tecnica: '',
            descripcion: 'Soporte: 21 x 29,7cm',
            precio: '',
            año: ''
        },
        tucan: {
            titulo: 'Taxidermia',
            tecnica: '',
            descripcion: 'Soporte: 29,7 x 42cm',
            precio: '',
            año: ''
        },
        velacrater: {
            titulo: 'Desierto',
            tecnica: '',
            descripcion: 'Soporte: 21 x 29,7cm',
            precio: '',
            año: ''
        }
    };

    // Start continuous scroll
    rafLoop();

    const obraModal         = document.getElementById('obraModal');
    const obraModalImg      = document.getElementById('obraModalImg');
    const obraModalYear     = document.getElementById('obraModalYear');
    const obraModalTitle    = document.getElementById('obraModalTitle');
    const obraModalTecnica  = document.getElementById('obraModalTecnica');
    const obraModalDesc     = document.getElementById('obraModalDesc');
    const obraModalPrecio   = document.getElementById('obraModalPrecio');
    const obraModalCta      = document.getElementById('obraModalCta');
    const obraModalClose    = obraModal.querySelector('.obra-modal-close');
    const obraModalBackdrop = obraModal.querySelector('.obra-modal-backdrop');
    const obraModalNavPrev  = obraModal.querySelector('.obra-modal-nav-prev');
    const obraModalNavNext  = obraModal.querySelector('.obra-modal-nav-next');

    let currentModalIndex = 0;

    function abrirModal(obraId, imgSrc, index) {
        const obra = obrasData[obraId];
        if (!obra) return;
        if (index !== undefined) currentModalIndex = index;
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

    function navegarModal(dir) {
        const newIndex = ((currentModalIndex + dir) % totalItems + totalItems) % totalItems;
        const item = trackItems[newIndex];
        const obraId = item.getAttribute('data-obra');
        // Fade out → swap → fade in
        obraModalImg.style.transition = 'opacity 0.15s ease';
        obraModalImg.style.opacity = '0';
        obraModalImg.style.transform = '';
        obraModalImg.style.transformOrigin = '';
        setTimeout(() => {
            currentModalIndex = newIndex;
            obraModalImg.src = item.querySelector('img').src;
            const obra = obrasData[obraId] || {};
            obraModalImg.alt      = obra.titulo || '';
            obraModalYear.textContent    = obra.año || '';
            obraModalTitle.textContent   = obra.titulo || '';
            obraModalTecnica.textContent = obra.tecnica || '';
            obraModalDesc.textContent    = obra.descripcion || '';
            obraModalPrecio.textContent  = obra.precio || '';
            obraModalImg.style.opacity = '1';
            setTimeout(() => { obraModalImg.style.transition = ''; }, 150);
        }, 150);
    }

    function cerrarModal() {
        obraModal.classList.remove('active');
        document.body.style.overflow = '';
        obraModalImg.style.transition = '';
        obraModalImg.style.transform = '';
        obraModalImg.style.transformOrigin = '';
    }

    // Zoom en imagen del modal — solo en dispositivos no-touch
    const imgWrap = obraModalImg.closest('.obra-modal-img-wrap');
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouch) {
        imgWrap.addEventListener('mousemove', (e) => {
            const rect = imgWrap.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            obraModalImg.style.transition = 'none';
            obraModalImg.style.transformOrigin = `${x}% ${y}%`;
            obraModalImg.style.transform = 'scale(2.4)';
        });

        imgWrap.addEventListener('mouseleave', () => {
            obraModalImg.style.transition = 'transform 0.4s ease';
            obraModalImg.style.transform = 'scale(1)';
            setTimeout(() => { obraModalImg.style.transformOrigin = 'center center'; }, 400);
        });
    }

    // Populate badge text
    trackItems.forEach(item => {
        const badge = item.querySelector('.obra-badge');
        if (badge) badge.textContent = 'Descripción';
    });

    // Event delegation handles clicks on originals AND clones
    track.addEventListener('click', (e) => {
        if (Math.abs(dragDistance) > 5) return;
        const item = e.target.closest('.carousel-item');
        if (!item) return;
        const obraId = item.getAttribute('data-obra');
        if (!obraId) return;
        const idx = trackItems.findIndex(t => t.getAttribute('data-obra') === obraId);
        abrirModal(obraId, item.querySelector('img').src, idx);
    });

    obraModalClose.addEventListener('click', cerrarModal);
    obraModalBackdrop.addEventListener('click', cerrarModal);
    obraModalCta.addEventListener('click', cerrarModal);
    obraModalNavPrev.addEventListener('click', () => navegarModal(-1));
    obraModalNavNext.addEventListener('click', () => navegarModal(1));

    // Swipe en mobile para navegar
    let modalSwipeX = 0;
    obraModal.addEventListener('touchstart', (e) => { modalSwipeX = e.touches[0].clientX; }, { passive: true });
    obraModal.addEventListener('touchend', (e) => {
        const diff = modalSwipeX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) navegarModal(diff > 0 ? 1 : -1);
    });

    document.addEventListener('keydown', (e) => {
        if (!obraModal.classList.contains('active')) return;
        if (e.key === 'Escape')      cerrarModal();
        if (e.key === 'ArrowLeft')   navegarModal(-1);
        if (e.key === 'ArrowRight')  navegarModal(1);
    });
});
