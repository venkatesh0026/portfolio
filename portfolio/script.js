// =====================================================
// NAVIGATION & HAMBURGER MENU
// =====================================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && !navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
});

// =====================================================
// ACTIVE NAV LINK ON SCROLL
// =====================================================

function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentLocation = window.location.pathname;

    navLinks.forEach(link => {
        link.classList.remove('active');
        // Check if the link href matches current page
        if (link.getAttribute('href') === currentLocation.split('/').pop()) {
            link.classList.add('active');
        }
    });
}

// Set active link on page load
window.addEventListener('load', setActiveNavLink);

// =====================================================
// SKILL BARS ANIMATION
// =====================================================

const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
};

document.addEventListener('DOMContentLoaded', animateSkillBars);

// =====================================================
// CONTACT FORM HANDLING
// =====================================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validate form
        if (!validateForm(data)) {
            showFormMessage('Please fill in all required fields correctly.', 'error');
            return;
        }

        // Show processing state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            // Since we don't have a backend, we'll simulate form submission
            // In a real scenario, you would send this to a server
            await simulateFormSubmission(data);
            
            showFormMessage(
                'Thank you for your message! I\'ll get back to you soon.',
                'success'
            );
            contactForm.reset();
        } catch (error) {
            showFormMessage(
                'There was an error sending your message. Please try again.',
                'error'
            );
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return (
        data.name.trim() !== '' &&
        emailRegex.test(data.email) &&
        data.subject.trim() !== '' &&
        data.message.trim() !== ''
    );
}

function showFormMessage(message, type) {
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message visible ${type}`;
    
    // Auto-hide success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.classList.remove('visible');
        }, 5000);
    }
}

function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        // Simulate network delay
        setTimeout(() => {
            // In production, send to backend
            // console.log('Form submitted:', data);
            resolve();
        }, 800);
    });
}

// =====================================================
// SMOOTH SCROLL BEHAVIOR
// =====================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// =====================================================
// INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS
// ===================================================== 

const observeElements = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all project cards, skill cards, and other elements
    document.querySelectorAll(
        '.project-card, .skill-card, .experience-card, .summary-card, ' +
        '.achievement-card, .education-item, .cert-card'
    ).forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
};

document.addEventListener('DOMContentLoaded', observeElements);

// =====================================================
// NAVBAR BACKGROUND ON SCROLL
// ===================================================== 

const updateNavbarStyle = () => {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
        } else {
            navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
    });
};

document.addEventListener('DOMContentLoaded', updateNavbarStyle);

// =====================================================
// ANIMATE NUMBERS (for stats)
// ===================================================== 

const animateNumbers = () => {
    const statNumbers = document.querySelectorAll('.stat-number, .achievement-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const finalValue = element.textContent;
                
                // Extract number from text
                const numberMatch = finalValue.match(/\d+/);
                if (numberMatch) {
                    const finalNum = parseInt(numberMatch[0]);
                    let currentNum = 0;
                    const increment = Math.ceil(finalNum / 30);
                    
                    const counter = setInterval(() => {
                        currentNum += increment;
                        if (currentNum >= finalNum) {
                            element.textContent = finalValue;
                            clearInterval(counter);
                        } else {
                            element.textContent = currentNum + finalValue.replace(/\d+/, '');
                        }
                    }, 30);
                }
                
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => observer.observe(el));
};

document.addEventListener('DOMContentLoaded', animateNumbers);

// =====================================================
// LAZY LOADING IMAGES (if any)
// ===================================================== 

const lazyLoadImages = () => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
};

document.addEventListener('DOMContentLoaded', lazyLoadImages);

// =====================================================
// PRINT STYLES / DOWNLOAD CV FUNCTIONALITY
// ===================================================== 

// Function to download CV as PDF (optional enhancement)
const initializePrintFunctionality = () => {
    // Add print button functionality if needed
    const printCVBtn = document.getElementById('printCVBtn');
    if (printCVBtn) {
        printCVBtn.addEventListener('click', () => {
            window.print();
        });
    }
};

document.addEventListener('DOMContentLoaded', initializePrintFunctionality);

// =====================================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================================== 

// Add skip to main content link functionality
const setupAccessibility = () => {
    // Keyboard navigation for mobile menu
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                link.click();
            }
        });
    });

    // Focus management
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });
};

document.addEventListener('DOMContentLoaded', setupAccessibility);

// =====================================================
// UTILITY FUNCTIONS
// ===================================================== 

// Scroll to top button (optional)
const createScrollToTopButton = () => {
    const scrollBtn = document.createElement('button');
    scrollBtn.textContent = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #00d4ff;
        color: #1a2747;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: none;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
    `;

    document.body.appendChild(scrollBtn);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollBtn.addEventListener('mouseover', () => {
        scrollBtn.style.transform = 'scale(1.1)';
        scrollBtn.style.backgroundColor = '#ff6b35';
    });

    scrollBtn.addEventListener('mouseout', () => {
        scrollBtn.style.transform = 'scale(1)';
        scrollBtn.style.backgroundColor = '#00d4ff';
    });
};

document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// =====================================================
// INITIALIZE ALL FUNCTIONALITY
// ===================================================== 

console.log('Portfolio website loaded successfully!');
