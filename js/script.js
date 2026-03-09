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
    // Clone all items and append to create seamless infinite loop
    const originalItems = Array.from(track.querySelectorAll('.carousel-item'));
    originalItems.forEach(item => track.appendChild(item.cloneNode(true)));
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
        galeria1: {
            titulo: 'Sinfonía Urbana',
            tecnica: 'Lapicera Bic y lápices de color sobre papel',
            descripcion: 'Una mirada cenital sobre el caos ordenado de la ciudad. Edificios, teclados y una figura que se disuelve en el paisaje urbano conforman una composición donde lo arquitectónico y lo humano se funden en una misma melodía visual.',
            precio: 'USD 620',
            año: '2024'
        },
        alfil: {
            titulo: 'El Alfil y el Tiempo',
            tecnica: 'Lapicera Bic sobre papel',
            descripcion: 'El alfil de ajedrez emerge de una espiral de plumas y esferas, flanqueado por un reloj de bolsillo que marca un tiempo suspendido. Una reflexión sobre la estrategia, el azar y la fugacidad del instante.',
            precio: 'USD 480',
            año: '2023'
        },
        cerebro: {
            titulo: 'Candados',
            tecnica: 'Lapicera Bic sobre papel',
            descripcion: 'Un cerebro suspendido del que penden candados abiertos y cerrados. Aves-llaves intentan liberarse de su propio peso. Una metáfora sobre los pensamientos que aprisionamos y aquellos que nos atrevemos a soltar.',
            precio: 'USD 550',
            año: '2023'
        },
        ernest: {
            titulo: 'El Cuarto de Ernest',
            tecnica: 'Lapicera Bic sobre papel',
            descripcion: 'Un interior donde conviven una espada, auriculares, una batería y teclas de piano desordenadas. El cuarto como archivo de experiencias: la música, la lucha y el recuerdo se superponen en un mismo espacio onírico.',
            precio: 'USD 580',
            año: '2025'
        },
        maquinaria: {
            titulo: 'Neuroengranaje',
            tecnica: 'Lapicera Bic y lápices de color sobre papel',
            descripcion: 'Neuronas que se entrelazan con tornillos, engranajes y piezas mecánicas. La obra explora el límite borroso entre lo biológico y lo industrial, preguntando si el pensamiento es impulso eléctrico o simplemente maquinaria bien aceitada.',
            precio: 'USD 490',
            año: '2024'
        },
        mesadeluz: {
            titulo: 'Mesa de Luz',
            tecnica: 'Lapicera Bic y lápices de color sobre papel',
            descripcion: 'Sobre una superficie imposible se acumulan objetos cotidianos que pierden su lógica: una botella atada, larvas geométricas, dientes que sonríen solos y un ojo que todo lo observa. La mesa como escenario de los sueños que no pedimos tener.',
            precio: 'USD 560',
            año: '2024'
        },
        serpsaxo: {
            titulo: 'Serpiente de Jazz',
            tecnica: 'Lapicera Bic sobre papel',
            descripcion: 'Un saxofón se transforma en serpiente y la serpiente en música. Un ojo integrado en el cuerpo del instrumento lo vuelve ser vivo. La obra celebra el jazz como algo instintivo, reptante e imposible de domesticar.',
            precio: 'USD 520',
            año: '2022'
        },
        tucan: {
            titulo: 'Tucán',
            tecnica: 'Lapicera Bic y lápices de color sobre papel',
            descripcion: 'Un tucán de pico dorado con ojo mecánico flota sobre un paisaje de olas y puentes. Sus plumas se deshacen en líneas de agua mientras unas tijeras cortan el aire debajo. La libertad como algo que siempre está a punto de ser recortado.',
            precio: 'USD 610',
            año: '2023'
        },
        velacrater: {
            titulo: 'Vela Cráter',
            tecnica: 'Lapicera Bic y lápices de color sobre papel',
            descripcion: 'Una vela que se derrite sobre un campo volcánico al atardecer. En primer plano, una taza guarda una lamparita como un secreto luminoso. La extinción y la luz coexisten: lo que se apaga afuera enciende algo adentro.',
            precio: 'USD 640',
            año: '2024'
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
