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

// 5. Datos y control de la galería modal de productos
const productGalleries = {
    'modal-super': {
        title: 'Supermercado, Despensa y Limpieza',
        images: ['assets/img/imagen1.jpeg', 'assets/img/imagen4.jpeg', 'assets/img/imagen6.jpeg', 'assets/img/imagen8.jpeg', 'assets/img/imagen9.jpeg']
    },
    'modal-bebidas': {
        title: 'Hielo, Vinos y Bebidas Frías',
        images: ['assets/img/imagen3.jpeg', 'assets/img/imagen5.jpeg', 'assets/img/imagen7.jpeg']
    }
};

function openModal(categoryKey) {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modal-title');
    const galleryContainer = document.getElementById('modal-gallery-container');
    
    const data = productGalleries[categoryKey];
    if (!data || !modal) return;

    if (modalTitle) modalTitle.textContent = data.title;

    if (galleryContainer) {
        galleryContainer.innerHTML = '';
        data.images.forEach(imgPath => {
            const img = document.createElement('img');
            img.src = imgPath;
            img.alt = 'Producto en Carburantes Filabres';
            img.loading = 'lazy';
            galleryContainer.appendChild(img);
        });
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
// --- 8. CAMBIO DINÁMICO DE IDIOMA (ESPAÑOL / INGLÉS) ---
let currentLang = 'es';

function switchLanguage(lang) {
    currentLang = lang;

    // Actualizar clase activa en los botones
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.toLowerCase().includes(lang));
    });

    // Cambiar todos los elementos con atributos data-es / data-en
    document.querySelectorAll('[data-es]').forEach(elem => {
        const text = elem.getAttribute(`data-${lang}`);
        if (text) {
            elem.innerHTML = text;
        }
    });

    // Actualizar títulos de las galerías en el idioma activo
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
}