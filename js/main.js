// --- JS PRINCIPAL DE CARBURANTES FILABRES ---

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHeaderScroll();
    initSmoothScroll();
    initDynamicYear();
    initProductGalleries();
    initImageZoom();
    initFloatingMenu();
});

// 1. Menú móvil (Hamburguesa)
function initMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    let menuToggle = document.querySelector('.menu-toggle');

    if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.classList.add('menu-toggle');
        menuToggle.setAttribute('aria-label', 'Abrir menú');
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) navContainer.appendChild(menuToggle);
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            menuToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }
}

// 2. Sombra en la barra de navegación al hacer scroll
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        header.style.boxShadow = window.scrollY > 50 
            ? '0 4px 20px rgba(0, 0, 0, 0.15)' 
            : '0 2px 10px rgba(0, 0, 0, 0.1)';
    });
}

// 3. Desplazamiento suave (Smooth Scroll)
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// 4. Año automático en el footer
function initDynamicYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Datos y control de las galerías modales de fotos
const productGalleries = {
    'modal-super': {
        title: 'Supermercado, Despensa y Limpieza',
        images: ['assets/img/imagen1.jpeg', 'assets/img/imagen4.jpeg', 'assets/img/imagen6.jpeg', 'assets/img/imagen8.jpeg', 'assets/img/imagen9.jpeg'],
        descEs: '',
        descEn: ''
    },
    'modal-bebidas': {
        title: 'Hielo, Vinos y Bebidas Frías',
        images: ['assets/img/imagen3.jpeg', 'assets/img/imagen5.jpeg', 'assets/img/imagen7.jpeg'],
        descEs: '',
        descEn: ''
    },
    'modal-cafe': {
        title: 'Rincón de Cafetería y Pausa',
        images: ['assets/img/imagen14.jpg'],
        descEs: 'En esta cafetería puedes desayunar, comer y cenar cuando pases por aquí. Además, cuando compres el pan puedes hacerte un bocadillo a tu gusto ya que disponemos de una gran variedad de embutidos.',
        descEn: 'In this cafeteria you can have breakfast, lunch, and dinner whenever you pass by. Also, when you buy fresh bread, you can make your own custom sandwich as we offer a wide variety of cold cuts and cured meats.'
    },
    'modal-surtidor': {
        title: 'Estación de Servicio y Surtidores',
        images: ['assets/img/imagen11.jpg'],
        descEs: '',
        descEn: ''
    },
    'modal-lavadero': {
        title: 'Área de Lavado de Vehículos',
        images: ['assets/img/imagen12.jpg', 'assets/img/imagen13.jpg'],
        descEs: '',
        descEn: ''
    }
};

function openModal(categoryKey) {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modal-title');
    const galleryContainer = document.getElementById('modal-gallery-container');
    const modalDescription = document.getElementById('modal-description');
    
    const data = productGalleries[categoryKey];
    if (!data || !modal) return;

    // Cambiar título según el idioma
    if (modalTitle) {
        if (typeof currentLang !== 'undefined' && currentLang === 'en') {
            const englishTitles = {
                'modal-super': 'Supermarket, Grocery & Household Cleaning',
                'modal-bebidas': 'Ice, Wine & Cold Beverages',
                'modal-cafe': 'Coffee & Snack Corner',
                'modal-surtidor': 'Petrol Station & Fuel Pumps',
                'modal-lavadero': 'Car Wash Facilities'
            };
            modalTitle.textContent = englishTitles[categoryKey] || data.title;
        } else {
            modalTitle.textContent = data.title;
        }
    }

    // Inyectar imágenes en la galería
    if (galleryContainer) {
        galleryContainer.innerHTML = '';
        data.images.forEach(imgPath => {
            const img = document.createElement('img');
            img.src = imgPath;
            img.alt = 'Fotografía Carburantes Filabres';
            img.loading = 'lazy';
            galleryContainer.appendChild(img);
        });
    }

    // Inyectar descripción si la tiene (y cambiarla según el idioma)
    if (modalDescription) {
        const lang = (typeof currentLang !== 'undefined') ? currentLang : 'es';
        const textToDisplay = (lang === 'en') ? data.descEn : data.descEs;
        
        if (textToDisplay) {
            modalDescription.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${textToDisplay}`;
            modalDescription.style.display = 'block';
        } else {
            modalDescription.innerHTML = '';
            modalDescription.style.display = 'none';
        }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function initProductGalleries() {
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('productModal');
        if (e.target === modal) closeModal();
    });
}

// 6. Visor de zoom individual para las fotos de estanterías
function initImageZoom() {
    let zoomModal = document.getElementById('imageZoomModal');
    if (!zoomModal) {
        zoomModal = document.createElement('div');
        zoomModal.id = 'imageZoomModal';
        zoomModal.classList.add('image-zoom-modal');
        zoomModal.innerHTML = '<img id="zoomModalImg" src="" alt="Zoom de producto">';
        document.body.appendChild(zoomModal);
    }

    const zoomImg = document.getElementById('zoomModalImg');

    document.addEventListener('click', (e) => {
        if (e.target.matches('#modal-gallery-container img')) {
            zoomImg.src = e.target.src;
            zoomModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });

    zoomModal.addEventListener('click', () => {
        zoomModal.style.display = 'none';
        const mainModal = document.getElementById('productModal');
        document.body.style.overflow = (mainModal && mainModal.classList.contains('active')) ? 'hidden' : 'auto';
    });
}

// 7. Despliegue del botón flotante en móviles
function initFloatingMenu() {
    const container = document.querySelector('.social-float-container');
    const mainButton = document.querySelector('.whatsapp-float');

    if (container && mainButton) {
        mainButton.addEventListener('click', (e) => {
            e.stopPropagation();
            container.classList.toggle('active');
        });

        document.addEventListener('click', () => {
            container.classList.remove('active');
        });
    }
}

// 8. Cambio dinámico de idioma (ESPAÑOL / INGLÉS)
let currentLang = 'es';

function switchLanguage(lang) {
    currentLang = lang;

    // Actualizar clase activa en los botones de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(lang));
    });

    // Cambiar elementos con atributos data-es / data-en
    document.querySelectorAll('[data-es]').forEach(elem => {
        const text = elem.getAttribute(`data-${lang}`);
        if (text) {
            elem.innerHTML = text;
        }
    });

    // Actualizar títulos dinámicos de las galerías
    if (typeof productGalleries !== 'undefined') {
        if (productGalleries['modal-super']) {
            productGalleries['modal-super'].title = lang === 'es' 
                ? 'Supermercado, Despensa y Limpieza' 
                : 'Supermarket, Grocery & Household Cleaning';
        }
        if (productGalleries['modal-bebidas']) {
            productGalleries['modal-bebidas'].title = lang === 'es' 
                ? 'Hielo, Vinos y Bebidas Frías' 
                : 'Ice, Wine & Cold Beverages';
        }
        if (productGalleries['modal-cafe']) {
            productGalleries['modal-cafe'].title = lang === 'es' 
                ? 'Rincón de Cafetería y Pausa' 
                : 'Coffee & Snack Corner';
        }
        if (productGalleries['modal-surtidor']) {
            productGalleries['modal-surtidor'].title = lang === 'es' 
                ? 'Estación de Servicio y Surtidores' 
                : 'Petrol Station & Fuel Pumps';
        }
        if (productGalleries['modal-lavadero']) {
            productGalleries['modal-lavadero'].title = lang === 'es' 
                ? 'Área de Lavado de Vehículos' 
                : 'Car Wash Facilities';
        }
    }
}