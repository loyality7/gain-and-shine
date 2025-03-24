// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling
document.querySelector('.newsletter-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    if (email) {
        alert('Thank you for subscribing! We will keep you updated.');
        this.reset();
    }
});

// Waitlist form handling
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    alert('Thank you for joining our waitlist! We will contact you soon.');
    this.reset();
});

// Sample reel modal
document.querySelector('.secondary-btn')?.addEventListener('click', function() {
    alert('Sample reel feature coming soon!');
});

// Pricing button handlers
document.querySelectorAll('.pricing-cta').forEach(button => {
    button.addEventListener('click', function() {
        window.location.href = '#waitlist';
    });
});

// Mobile menu toggle
let isMenuOpen = false;
const mobileMenuToggle = document.createElement('button');
mobileMenuToggle.className = 'mobile-menu-toggle';
mobileMenuToggle.innerHTML = '☰';
document.querySelector('.navbar').prepend(mobileMenuToggle);

mobileMenuToggle.addEventListener('click', function() {
    const navLinks = document.querySelector('.navlinkwrap');
    isMenuOpen = !isMenuOpen;
    navLinks.style.display = isMenuOpen ? 'flex' : 'none';
    this.innerHTML = isMenuOpen ? '✕' : '☰';
});

// Reel cards animation
const reelCards = document.querySelectorAll('.reel-card');
let activeCardIndex = 0;

function rotateReelCards() {
    reelCards.forEach(card => card.classList.remove('active'));
    reelCards[activeCardIndex].classList.add('active');
    activeCardIndex = (activeCardIndex + 1) % reelCards.length;
}

setInterval(rotateReelCards, 3000);

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section-title, .step-card, .feature-card, .track-card, .pricing-card, .faq-item').forEach(el => {
    observer.observe(el);
}); 