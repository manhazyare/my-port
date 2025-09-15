// === NAVIGATION & PAGE SWITCHING ===
class WebsiteManager {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupFormValidation();
        this.setupAnimations();
        this.setupScrollEffects();
    }

    // Navigation system
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const pages = document.querySelectorAll('.page');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-page');
                this.switchPage(targetPage);
                this.updateActiveNav(link);

                // Close mobile menu if open
                this.closeMobileMenu();
            });
        });

        // Handle CTA button navigation
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = ctaButton.getAttribute('data-page');
                this.switchPage(targetPage);
                this.updateActiveNav(document.querySelector(`[data-page="${targetPage}"]`));
            });
        }
    }

    switchPage(pageName) {
        // Hide current page
        const currentPageEl = document.getElementById(this.currentPage);
        if (currentPageEl) {
            currentPageEl.classList.remove('active');
        }

        // Show new page with animation
        setTimeout(() => {
            const newPageEl = document.getElementById(pageName);
            if (newPageEl) {
                newPageEl.classList.add('active');
                this.currentPage = pageName;

                // Trigger animations for new page
                this.animatePageElements(newPageEl);

                // Update page title
                this.updatePageTitle(pageName);
            }
        }, 150);
    }

    updateActiveNav(activeLink) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to clicked link
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    updatePageTitle(pageName) {
        const titles = {
            home: 'Mohamed Ibrahim - Digital Designer & Developer',
            about: 'About - Mohamed Ibrahim',
            services: 'Services - Mohamed Ibrahim',
            portfolio: 'Portfolio - Mohamed Ibrahim',
            contact: 'Contact - Mohamed Ibrahim'
        };
        document.title = titles[pageName] || titles.home;
    }

    // Mobile menu functionality
    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navMenu = document.querySelector('.nav-menu');

        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Change hamburger to X icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    closeMobileMenu() {
        const navMenu = document.querySelector('.nav-menu');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const icon = mobileMenuBtn.querySelector('i');

        navMenu.classList.remove('active');
        icon.className = 'fas fa-bars';
    }

    // Form validation and submission
    setupFormValidation() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        const inputs = form.querySelectorAll('.form-control');

        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Form submission
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit(form);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Clear previous error
        this.clearFieldError(field);

        // Validation rules
        if (field.required && !value) {
            isValid = false;
            errorMessage = `Please enter your ${fieldName}`;
        } else if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        const errorEl = document.getElementById(`${field.name}-error`);
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'block';
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorEl = document.getElementById(`${field.name}-error`);
        if (errorEl) {
            errorEl.style.display = 'none';
        }
    }

    async handleFormSubmit(form) {
        const formData = new FormData(form);
        const inputs = form.querySelectorAll('.form-control');
        let isFormValid = true;

        // Validate all fields
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            return;
        }

        // Show loading state
        this.setFormLoading(true);

        try {
            // Simulate API call (replace with actual endpoint)
            await this.simulateFormSubmission(formData);

            // Show success message
            this.showSuccessMessage();
            form.reset();
        } catch (error) {
            console.error('Form submission error:', error);
            alert('Sorry, there was an error sending your message. Please try again.');
        } finally {
            this.setFormLoading(false);
        }
    }

    setFormLoading(isLoading) {
        const submitBtn = document.getElementById('submit-btn');
        const btnText = document.getElementById('btn-text');
        const btnLoading = document.getElementById('btn-loading');

        if (isLoading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
        } else {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
        }
    }

    async simulateFormSubmission(formData) {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }

    showSuccessMessage() {
        const successMsg = document.getElementById('success-message');
        if (successMsg) {
            successMsg.style.display = 'block';

            // Hide after 5 seconds
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 5000);
        }
    }

    // Animation system
    setupAnimations() {
        // Animate elements when page loads
        this.animatePageElements(document.querySelector('.page.active'));
    }

    animatePageElements(pageEl) {
        if (!pageEl) return;

        const fadeElements = pageEl.querySelectorAll('.fade-in');
        fadeElements.forEach((el, index) => {
            // Reset animation
            el.classList.remove('visible');

            // Trigger animation with staggered delay
            setTimeout(() => {
                el.classList.add('visible');
            }, index * 100);
        });
    }

    // Scroll effects
    setupScrollEffects() {
        let ticking = false;

        const updateHeader = () => {
            const header = document.querySelector('.header');
            const scrollY = window.pageYOffset;

            if (scrollY > 50) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.background = 'var(--bg-white)';
                header.style.backdropFilter = 'none';
            }
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateHeader();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll);
    }
}

// === UTILITY FUNCTIONS ===

// Smooth scrolling for anchor links
function smoothScroll(target, duration = 800) {
    const targetEl = document.querySelector(target);
    if (!targetEl) return;

    const targetPosition = targetEl.offsetTop - 70; // Account for header height
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Intersection Observer for animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
};

// Debounce function for performance
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the website manager
    const website = new WebsiteManager();

    // Set up intersection observer
    observeElements();

    // Add loading class removal
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // Handle resize events
    const handleResize = debounce(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            const navMenu = document.querySelector('.nav-menu');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const icon = mobileMenuBtn.querySelector('i');

            navMenu.classList.remove('active');
            icon.className = 'fas fa-bars';
        }
    }, 250);

    window.addEventListener('resize', handleResize);

    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        // Close mobile menu with Escape key
        if (e.key === 'Escape') {
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu.classList.contains('active')) {
                website.closeMobileMenu();
            }
        }
    });

    console.log('✅ Portfolio website initialized successfully!');
});

// === ERROR HANDLING ===
window.addEventListener('error', (e) => {
    console.error('Website error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});
