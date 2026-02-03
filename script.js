// ===== Navigation & Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

// Toggle mobile menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger) hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Google Maps =====
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;
    
    const lat = parseFloat(mapElement.dataset.lat || 40.7128);
    const lng = parseFloat(mapElement.dataset.lng || -74.006);
    const location = { lat, lng };
    
    if (typeof google !== 'undefined' && google.maps) {
        const map = new google.maps.Map(mapElement, {
            center: location,
            zoom: 15,
            styles: [
                {
                    featureType: 'all',
                    elementType: 'geometry',
                    stylers: [{ color: '#f5f5f5' }]
                }
            ]
        });
        
        new google.maps.Marker({
            position: location,
            map: map,
            title: 'Frias handyman services, LLC'
        });
    } else {
        // Fallback
        mapElement.innerHTML = 
            '<div style="display:flex; align-items:center; justify-content:center; height:100%; background:#f3f4f6; border-radius:12px;">' +
                '<a href="https://www.google.com/maps/search/?api=1&query=' + lat + ',' + lng + '" target="_blank" rel="noopener" style="color:#2563eb; text-decoration:none; padding: 20px;">📍 View on Google Maps</a>' +
            '</div>';
    }
}

// Initialize map when page loads
if (document.getElementById('map')) {
    window.initMap = initMap;
    // Call initMap after a short delay to ensure DOM is ready
    setTimeout(initMap, 100);
}

// ===== Intersection Observer =====
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.feature-card, .service-card, .contact-method').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

console.log('✅ Website loaded successfully!');