// --- JS PRINCIPAL DE CARBURANTES FILABRES ---

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Manejo del menú de navegación en móviles
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');

    // Crear botón hamburguesa dinámicamente si no existe en el HTML
    let menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle) {
        menuToggle = document.createElement('button');
        menuToggle.classList.add('menu-toggle');
        menuToggle.setAttribute('aria-label', 'Abrir menú de navegación');
        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        
        const navContainer = document.querySelector('.nav-container');
        if (navContainer) {
            navContainer.appendChild(menuToggle);
        }
    }

    // Toggle para abrir/cerrar menú móvil
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isOpen = navMenu.classList.contains('active');
            menuToggle.innerHTML = isOpen 
                ? '<i class="fa-solid fa-xmark"></i>' 
                : '<i class="fa-solid fa-bars"></i>';
        });
    }

    // 2. Cerrar el menú móvil al hacer clic en cualquier enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
                }
            }
        });
    });

    // 3. Efecto de sombra en la barra de navegación al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // 4. Desplazamiento suave (Smooth Scroll) para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});

// --- 5. FUNCIONALIDAD DE LA GALERÍA MODAL DE PRODUCTOS ---

// Mapeo de categorías con las fotos reales de tus estanterías
const productGalleries = {
    'modal-super': {
        title: 'Supermercado, Despensa y Limpieza',
        images: [
            'assets/img/imagen1.jpg', // Tortitas, bollería y galletas
            'assets/img/imagen4.jpeg', // Limpieza del hogar y detergentes
            'assets/img/imagen6.jpg', // Pastas, caldos y conservas
            'assets/img/imagen8.jpg', // Latas, atún y conservas de pescado
            'assets/img/imagen9.jpg'  // Café, cereales e infusiones
        ]
    },
    'modal-bebidas': {
        title: 'Hielo, Vinos y Bebidas Frías',
        images: [
            'assets/img/imagen3.jpg', // Leche, zumos y batidos
            'assets/img/imagen5.jpg', // Selección de vinos y licores
            'assets/img/imagen7.jpg'  // Cervezas, refrescos y bebidas frías
        ]
    }
};

function openModal(categoryKey) {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modal-title');
    const galleryContainer = document.getElementById('modal-gallery-container');
    
    const data = productGalleries[categoryKey];
    if (!data || !modal) return;

    // Asignar título
    if (modalTitle) modalTitle.textContent = data.title;

    // Cargar imágenes dinámicamente
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

    // Mostrar modal y desactivar scroll de fondo
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

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
    const modal = document.getElementById('productModal');
    if (e.target === modal) {
        closeModal();
    }
});