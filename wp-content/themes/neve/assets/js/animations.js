/**
 * AskStephen.ai Micro-Animations
 * Initializes AOS and adds dynamic hover effects
 */

// Initialize AOS when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS with custom settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,           // Animation happens only once
            duration: 700,        // Animation duration
            easing: 'ease-out-cubic',
            offset: 50,           // Offset from viewport
            delay: 0,
            anchorPlacement: 'top-bottom'
        });
    }

    // Add hover lift effect to cards
    addHoverEffects();

    // Add smooth scroll behavior
    addSmoothScroll();

    // Initialize parallax-lite effects
    initParallaxLite();
});

/**
 * Add hover effects to interactive elements
 */
function addHoverEffects() {
    // Cards and boxes
    const cards = document.querySelectorAll('.card, .feature-box, .service-card, [class*="shadow"]');
    cards.forEach(function(card) {
        if (!card.classList.contains('no-hover')) {
            card.classList.add('hover-lift');
        }
    });

    // Buttons get glow effect
    const buttons = document.querySelectorAll('.btn-primary, .btn-gold, [class*="bg-yellow"]');
    buttons.forEach(function(btn) {
        btn.classList.add('hover-glow');
    });
}

/**
 * Smooth scroll for anchor links
 */
function addSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Lightweight parallax effect for hero sections
 */
function initParallaxLite() {
    const parallaxElements = document.querySelectorAll('.parallax-bg, .hero-bg');

    if (parallaxElements.length === 0) return;

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        parallaxElements.forEach(function(el) {
            const speed = el.dataset.speed || 0.3;
            el.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
        });
    }, { passive: true });
}

/**
 * Intersection Observer for fade-in animations (fallback for AOS)
 */
function initFadeInObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-scroll').forEach(function(el) {
        observer.observe(el);
    });
}

// Re-initialize AOS after AJAX content loads (for dynamic content)
document.addEventListener('ajaxComplete', function() {
    if (typeof AOS !== 'undefined') {
        AOS.refresh();
    }
});
