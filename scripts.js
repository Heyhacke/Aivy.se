// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Typing Animation
const dynamicText = document.querySelector(".dynamic-text");
const textArray = [
    " automatisera utan att det blir svårt.",
    " jobba smartare, utan att ändra allt.",
    " spara tid utan att förlora kontrollen.",
    " automatisera det monotona, så ni kan fokusera.",
    " effektivisera processer – utan huvudvärk.",
    " få ett försprång."
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = textArray[textIndex];

    if (isDeleting) {
        dynamicText.textContent = currentText.substring(0, charIndex--);
    } else {
        dynamicText.textContent = currentText.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000); // Paus innan radering
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(typeEffect, 500); // Paus innan nästa text börjar skrivas
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

// Particles.js Fallback Check and Configuration
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 1000
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    }
                },
                "opacity": {
                    "value": 0.4,
                    "random": true
                },
                "size": {
                    "value": 3,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.3,
                    "width": 0.6
                },
                "move": {
                    "enable": true,
                    "speed": 0.4,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "bounce",
                    "bounce": true
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "attract"
                    },
                    "onclick": {
                        "enable": false
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 200,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "attract": {
                        "distance": 250,
                        "duration": 0.8,
                        "speed": 0.3
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.log('Particles.js failed to load, retrying in 2 seconds...');
        setTimeout(initParticles, 2000); // Retry after 2 seconds
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Initialize particles with retry mechanism
    initParticles();
    
    // Existing initialization code
    setTimeout(typeEffect, 1000);
});

// Testimonial Carousel
const testimonialSlides = document.querySelector(".testimonial-slides");
const testimonialDots = document.querySelectorAll(".testimonial-dot");
let currentSlide = 0;

function showSlide(index) {
    testimonialSlides.style.transform = `translateX(-${index * 100}%)`;
    testimonialDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialDots.length;
    showSlide(currentSlide);
}, 5000);

// FAQ Toggle
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle("active");
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
const formGroups = contactForm.querySelectorAll('.form-group');

formGroups.forEach(group => {
    const input = group.querySelector('input, textarea');
    const errorMessage = group.querySelector('.error-message');

    input.addEventListener('input', () => {
        validateField(input, errorMessage);
    });

    input.addEventListener('blur', () => {
        validateField(input, errorMessage);
    });
});

function validateField(input, errorMessage) {
    if (input.validity.valid) {
        input.setAttribute('aria-invalid', 'false');
        errorMessage.textContent = '';
    } else {
        input.setAttribute('aria-invalid', 'true');
        if (input.validity.valueMissing) {
            errorMessage.textContent = 'Detta fält är obligatoriskt';
        } else if (input.validity.typeMismatch) {
            errorMessage.textContent = 'Vänligen ange en giltig e-postadress';
        }
    }
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const errorMessage = group.querySelector('.error-message');
        
        if (!input.validity.valid) {
            isValid = false;
            validateField(input, errorMessage);
        }
    });

    if (isValid) {
        // Here you would typically send the form data to your server
        // For now, we'll just show a success message
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Skickat!';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            contactForm.reset();
        }, 3000);
    }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', 
                navMenu.classList.contains('active'));
        });

        // Stäng menyn när man klickar utanför
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Stäng menyn efter navigation
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Hantera orientering-ändringar
    window.addEventListener('orientationchange', function() {
        // Kort fördröjning för att låta layouten stabiliseras
        setTimeout(() => {
            window.scrollTo(0, window.scrollY);
        }, 100);
    });

    // Förbättrad scroll-hantering för iOS
    let touchStartY;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
        if (navMenu.classList.contains('active')) {
            e.preventDefault();
        }
    }, { passive: false });
});

// Förhindra zoom på input fields i iOS
document.addEventListener('touchstart', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        e.target.style.fontSize = '16px';
    }
});

// Smooth Scroll för mobil
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Lägg till offset för header
            const headerOffset = 60;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Stäng mobilmenyn om öppen
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

// Adjust particles for mobile
function updateParticlesConfig() {
    if (window.innerWidth <= 768) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 30 // Minska antal partiklar på mobil
                },
                size: {
                    value: 2
                }
            }
        });
    }
}

window.addEventListener('resize', updateParticlesConfig);
document.addEventListener('DOMContentLoaded', updateParticlesConfig);

// Uppdatera scroll-hanteringen för alla CTA-knappar
document.addEventListener('DOMContentLoaded', function() {
    // Välj alla CTA-knappar (både i header och hero)
    const allCTAButtons = document.querySelectorAll('.cta-button');
    
    allCTAButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fokusera på första input-fältet i kontaktformuläret
                if (targetId === '#contact') {
                    setTimeout(() => {
                        const firstInput = targetSection.querySelector('input');
                        if (firstInput) firstInput.focus();
                    }, 1000);
                }
            }
        });
    });
});

// Lägg till floating action button för snabb-CTA
document.addEventListener('DOMContentLoaded', function() {
    const fab = document.createElement('button');
    fab.className = 'floating-cta';
    fab.innerHTML = '<i class="fas fa-calendar-alt"></i>';
    
    // Visa efter 30% scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > window.innerHeight * 0.3) {
            fab.classList.add('visible');
        } else {
            fab.classList.remove('visible');
        }
    });
});