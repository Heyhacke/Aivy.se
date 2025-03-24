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

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 1000);
});

// Particles.js Konfiguration
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
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.setAttribute("aria-expanded", navMenu.classList.contains("active"));
});