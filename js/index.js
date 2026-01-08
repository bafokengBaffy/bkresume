// index.js - Main JavaScript file

// DOM Elements
let currentYearElement, backToTopButton, navbar, skillToggleButtons, skillCategories;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    currentYearElement = document.getElementById('year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    // Get DOM elements
    backToTopButton = document.querySelector('.back-to-top');
    navbar = document.querySelector('.navbar');
    skillToggleButtons = document.querySelectorAll('.skill-toggle-btn');
    skillCategories = document.querySelectorAll('.skill-category');

    // Initialize all features
    initNavbarScroll();
    initBackToTop();
    initSmoothScrolling();
    initActiveNavLinks();
    initScrollAnimations();
    initSkillsToggle();
    initSkillBarAnimations();
    initHoverAnimations();
    initSectionObserver();
});

// Navbar scroll effect
function initNavbarScroll() {
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Back to top button
function initBackToTop() {
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
}

// Enhanced smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarNav = document.querySelector('.navbar-collapse');
                if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
                    navbarToggler.click();
                }

                // Calculate target position with offset
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 70;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = Math.min(1000, Math.max(500, Math.abs(distance) / 2));
                let startTime = null;

                // Animation function
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = easeInOutQuad(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }

                // Easing function
                function easeInOutQuad(t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                }

                requestAnimationFrame(animation);

                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// Add active class to current section in navigation
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Scroll animation for elements
function initScrollAnimations() {
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.timeline-item, .education-item, .skill-category, .interest-item, .project-card, .award-item, .training-item, .affiliation-item, .reference-item');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    };

    // Initialize animations on load
    window.addEventListener('load', function() {
        animateOnScroll();
    });

    // Animate on scroll
    window.addEventListener('scroll', animateOnScroll);
}

// Skills Toggle Functionality
function initSkillsToggle() {
    if (!skillToggleButtons.length || !skillCategories.length) return;

    skillToggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            skillToggleButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            filterSkills(category);
        });
    });
}

function filterSkills(category) {
    skillCategories.forEach(skillCategory => {
        const skillCategoryType = skillCategory.getAttribute('data-category');
        
        if (category === 'all') {
            skillCategory.classList.remove('hidden');
        } else if (skillCategoryType === category) {
            skillCategory.classList.remove('hidden');
        } else {
            skillCategory.classList.add('hidden');
        }
    });
}

// Animate skill bars
function initSkillBarAnimations() {
    const animateSkillBars = function() {
        const skillBars = document.querySelectorAll('.skill-progress:not(.animated)');
        
        skillBars.forEach(bar => {
            const elementPosition = bar.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                const width = bar.getAttribute('data-width') + '%';
                bar.style.width = width;
                bar.classList.add('animated');
            }
        });
    };
    
    // Initialize on load
    window.addEventListener('load', function() {
        setTimeout(animateSkillBars, 500);
    });
    
    // Animate on scroll
    window.addEventListener('scroll', animateSkillBars);
}

// Add hover effects
function initHoverAnimations() {
    // Add shake animation to profile image on hover
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.addEventListener('mouseenter', function() {
            this.classList.add('animate__animated', 'animate__pulse');
        });
        profileImg.addEventListener('mouseleave', function() {
            this.classList.remove('animate__animated', 'animate__pulse');
        });
    }

    // Add animation to social links
    const socialLinks = document.querySelectorAll('.social-links a, .footer-social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.classList.add('animate__animated', 'animate__rubberBand');
        });
        link.addEventListener('mouseleave', function() {
            this.classList.remove('animate__animated', 'animate__rubberBand');
        });
    });

    // Add animation to section titles
    const sectionTitles = document.querySelectorAll('.section-title h2');
    sectionTitles.forEach(title => {
        title.addEventListener('mouseenter', function() {
            this.classList.add('animate__animated', 'animate__swing');
        });
        title.addEventListener('animationend', function() {
            this.classList.remove('animate__animated', 'animate__swing');
        });
    });

    // Add hover effects to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.timeline-content').classList.add('hvr-glow');
        });
        item.addEventListener('mouseleave', function() {
            this.querySelector('.timeline-content').classList.remove('hvr-glow');
        });
    });
}

// Section scroll-in animation with Intersection Observer
function initSectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-scroll-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialize timeline items animation
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
}

// Initialize education items animation
function initEducationAnimation() {
    const educationItems = document.querySelectorAll('.education-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    educationItems.forEach(item => {
        observer.observe(item);
    });
}

// Call additional initialization functions
window.addEventListener('load', function() {
    initTimelineAnimation();
    initEducationAnimation();
});