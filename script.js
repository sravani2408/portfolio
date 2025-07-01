// Navigation and section management
let currentSection = 'profile';
let typingInProgress = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio application initialized');
    
    // Set initial section
    showSection('profile');
    
    // Set up CSS custom property for icon count
    const iconCount = document.querySelectorAll('.icon').length;
    document.documentElement.style.setProperty('--n', iconCount);
    
    // Initialize typing effect
    initializeTypingEffect();
    
    // Initialize tech icon effects
    initializeTechIconEffects();
    
    // Initialize contact form
    initializeContactForm();
    
    // Auto-hide flash messages
    setTimeout(hideFlashMessages, 5000);
    
    // Add smooth loading animation to sections
    addLoadingAnimations();
});

// Section navigation
function showSection(sectionId) {
    console.log(`Switching to section: ${sectionId}`);
    
    // Prevent any potential interference
    if (typeof event !== 'undefined' && event && event.preventDefault) {
        event.preventDefault();
    }
    
    // Hide all sections immediately
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('visible', 'loading', 'loaded');
        section.style.display = 'none';
    });
    
    // Show the target section immediately
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('visible', 'loaded');
        currentSection = sectionId;
        
        // Start typing effect if about section
        if (sectionId === 'about' && !typingInProgress) {
            setTimeout(startTypingEffect, 200);
            // Initialize about animations
            setTimeout(() => {
                if (typeof initializeAboutAnimations === 'function') {
                    initializeAboutAnimations();
                }
            }, 500);
        }
        
        // Update URL hash without scrolling
        history.pushState(null, null, `#${sectionId}`);
        
        // Scroll to top of new section
        window.scrollTo(0, 0);
    }
    
    // Close mobile nav if open
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
        navLinks.classList.remove('active');
    }
    
    return false; // Prevent default behavior
}

// Mobile navigation toggle
function toggleNav() {
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// Typing effect for about section
let typingText = [];
let currentParagraph = 0;
let currentChar = 0;
let typingSpeed = 50;

function initializeTypingEffect() {
    // Load typing text from server
    fetch('/api/typing-text')
        .then(response => response.json())
        .then(data => {
            typingText = data.text;
            console.log('Typing text loaded:', typingText.length, 'paragraphs');
        })
        .catch(error => {
            console.error('Error loading typing text:', error);
            // Fallback text
            typingText = [
                "I am a tech enthusiast with a passion for building robust solutions that harmonize creativity, technology, and innovation.",
                "My journey bridges the worlds of cloud engineering, data science, and automation.",
                "This portfolio is a reflection of who I am: a technologist, a creator, and an artist at heart."
            ];
        });
}

function startTypingEffect() {
    if (typingInProgress || typingText.length === 0) return;
    
    typingInProgress = true;
    currentParagraph = 0;
    currentChar = 0;
    
    const typedTextElement = document.getElementById('typed-text');
    const cursorElement = document.getElementById('cursor');
    
    if (!typedTextElement || !cursorElement) return;
    
    typedTextElement.innerHTML = '';
    cursorElement.style.display = 'inline';
    
    typeNextCharacter();
}

function typeNextCharacter() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement || currentParagraph >= typingText.length) {
        typingInProgress = false;
        return;
    }
    
    const currentText = typingText[currentParagraph];
    
    if (currentChar < currentText.length) {
        // Add next character
        const currentHTML = typedTextElement.innerHTML;
        const nextChar = currentText.charAt(currentChar);
        typedTextElement.innerHTML = currentHTML + nextChar;
        currentChar++;
        
        // Continue typing with variable speed
        const delay = nextChar === '.' ? 300 : nextChar === ',' ? 150 : typingSpeed;
        setTimeout(typeNextCharacter, delay);
    } else {
        // Move to next paragraph
        currentParagraph++;
        currentChar = 0;
        
        if (currentParagraph < typingText.length) {
            // Add paragraph break
            typedTextElement.innerHTML += '<br><br>';
            setTimeout(typeNextCharacter, 500);
        } else {
            // Typing complete
            typingInProgress = false;
            // Keep cursor blinking
        }
    }
}

// CV download functionality
function downloadCV() {
    console.log('CV download requested');
    
    // Create download link for the actual resume file
    const link = document.createElement('a');
    link.href = '/static/files/Sravani_Ganta_Resume.pdf';
    link.download = 'Sravani_Ganta_Resume.pdf';
    link.target = '_blank';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Flash message management
function hideFlashMessages() {
    const flashMessages = document.getElementById('flash-messages');
    if (flashMessages) {
        const alerts = flashMessages.querySelectorAll('.alert');
        alerts.forEach(alert => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(100%)';
            setTimeout(() => {
                alert.remove();
            }, 300);
        });
    }
}

// Smooth animations for section loading
function addLoadingAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);
    
    // Observe all cards and containers
    document.querySelectorAll('.card, .project-card, .details-container, .contact-item').forEach(el => {
        observer.observe(el);
    });
}

// Enhanced hover effects for tech icons
function initializeTechIconEffects() {
    const techIcons = document.querySelectorAll('.icon');
    let autoHighlightInterval;
    let currentAutoIndex = 0;
    let userHasInteracted = false;
    
    // Auto-highlight function
    function startAutoHighlight() {
        if (userHasInteracted) return;
        
        autoHighlightInterval = setInterval(() => {
            if (userHasInteracted) {
                clearInterval(autoHighlightInterval);
                return;
            }
            
            // Remove auto-highlight from all icons
            techIcons.forEach(icon => {
                icon.classList.remove('auto-active');
            });
            
            // Add auto-highlight to current icon
            if (techIcons[currentAutoIndex]) {
                techIcons[currentAutoIndex].classList.add('auto-active');
            }
            
            // Move to next icon
            currentAutoIndex = (currentAutoIndex + 1) % techIcons.length;
        }, 1500); // Change every 1.5 seconds
    }
    
    // Stop auto-highlight when user interacts
    function stopAutoHighlight() {
        userHasInteracted = true;
        clearInterval(autoHighlightInterval);
        
        // Remove auto-active from all icons
        techIcons.forEach(icon => {
            icon.classList.remove('auto-active');
        });
    }
    
    techIcons.forEach(icon => {
        const img = icon.querySelector('img');
        
        // Click effect - toggle active state
        icon.addEventListener('click', function() {
            stopAutoHighlight();
            
            // Remove active and auto-active from all other icons
            techIcons.forEach(otherIcon => {
                if (otherIcon !== icon) {
                    otherIcon.classList.remove('active');
                    otherIcon.classList.remove('auto-active');
                }
            });
            
            // Toggle active state on current icon
            icon.classList.toggle('active');
        });
        
        // Hover effects (only when not active)
        icon.addEventListener('mouseenter', function() {
            // Pause auto-highlighting when hovering
            if (autoHighlightInterval) {
                clearInterval(autoHighlightInterval);
            }
            
            if (!icon.classList.contains('active') && !icon.classList.contains('auto-active') && img) {
                img.style.filter = 'grayscale(0%) brightness(1.1)';
                img.style.transform = 'scale(1.05)';
                img.style.opacity = '1';
            }
            
            // Pause rotation temporarily
            const container = document.querySelector('.circle-container');
            if (container) {
                container.style.animationPlayState = 'paused';
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            if (!icon.classList.contains('active') && !icon.classList.contains('auto-active') && img) {
                img.style.filter = 'grayscale(100%) brightness(0.7)';
                img.style.transform = 'scale(1)';
                img.style.opacity = '0.8';
            }
            
            // Resume rotation
            const container = document.querySelector('.circle-container');
            if (container) {
                container.style.animationPlayState = 'running';
            }
            
            // Resume auto-highlighting if user hasn't clicked anything
            if (!userHasInteracted) {
                setTimeout(() => {
                    if (!userHasInteracted) {
                        startAutoHighlight();
                    }
                }, 500);
            }
        });
    });
    
    // Start auto-highlight after a short delay
    setTimeout(startAutoHighlight, 2000);
}

// Handle browser back/forward navigation
window.addEventListener('popstate', function() {
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
        showSection(hash);
    } else {
        showSection('profile');
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Allow keyboard navigation through sections
    if (e.altKey) {
        const sections = ['profile', 'about', 'experience', 'projects', 'contact'];
        const currentIndex = sections.indexOf(currentSection);
        
        if (e.key === 'ArrowRight' && currentIndex < sections.length - 1) {
            showSection(sections[currentIndex + 1]);
            e.preventDefault();
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            showSection(sections[currentIndex - 1]);
            e.preventDefault();
        }
    }
});

// Form validation and enhancement
function initializeContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Add loading state to submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('input', clearValidationError);
        });
    }
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Remove existing error styling
    input.classList.remove('error');
    
    // Validate based on input type
    if (input.required && !value) {
        showInputError(input, 'This field is required');
        return false;
    }
    
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showInputError(input, 'Please enter a valid email address');
            return false;
        }
    }
    
    return true;
}

function showInputError(input, message) {
    input.classList.add('error');
    
    // Remove existing error message
    const existingError = input.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '5px';
    
    input.parentNode.appendChild(errorElement);
}

function clearValidationError(e) {
    const input = e.target;
    input.classList.remove('error');
    
    const errorMessage = input.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Performance optimization for animations
function optimizeAnimations() {
    // Reduce motion for users who prefer it
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
        const rotatingElements = document.querySelectorAll('.circle-container');
        rotatingElements.forEach(el => {
            el.style.animation = 'none';
        });
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', optimizeAnimations);

// Console easter egg
console.log(`
🌟 Welcome to Sravani Ganta's Portfolio! 🌟

Thank you for inspecting the code! 
This portfolio was built with:
- Flask (Backend)
- Vanilla JavaScript (Frontend)
- Custom CSS Animations
- Love and attention to detail ❤️

Feel free to explore the codebase and reach out if you have any questions!

Navigation tip: Use Alt + Arrow Keys to navigate between sections!
`);
