// Advanced Cursor Effects - DISABLED
class CursorEffects {
    constructor() {
        this.cursor = null;
        this.cursorTrail = [];
        this.mouse = { x: 0, y: 0 };
        // Cursor effects disabled per user request
        // this.init();
    }
    
    init() {
        this.createCustomCursor();
        this.bindEvents();
        this.startTrailAnimation();
    }
    
    createCustomCursor() {
        // Hide default cursor
        document.body.style.cursor = 'none';
        
        // Create custom cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);
        
        // Create cursor trail elements
        for (let i = 0; i < 15; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            document.body.appendChild(trail);
            this.cursorTrail.push({
                element: trail,
                x: 0,
                y: 0,
                targetX: 0,
                targetY: 0
            });
        }
    }
    
    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.updateCursor();
        });
        
        document.addEventListener('mousedown', () => {
            this.cursor.classList.add('clicked');
            this.createRipple(this.mouse.x, this.mouse.y);
        });
        
        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('clicked');
        });
        
        // Interactive elements
        document.addEventListener('mouseover', (e) => {
            if (this.isInteractive(e.target)) {
                this.cursor.classList.add('hover');
                this.addMagneticEffect(e.target);
            }
        });
        
        document.addEventListener('mouseout', (e) => {
            if (this.isInteractive(e.target)) {
                this.cursor.classList.remove('hover');
                this.removeMagneticEffect(e.target);
            }
        });
    }
    
    updateCursor() {
        this.cursor.style.left = this.mouse.x + 'px';
        this.cursor.style.top = this.mouse.y + 'px';
    }
    
    startTrailAnimation() {
        const animate = () => {
            // Update trail positions
            this.cursorTrail.forEach((trail, index) => {
                const delay = index * 0.1;
                trail.targetX = this.mouse.x;
                trail.targetY = this.mouse.y;
                
                trail.x += (trail.targetX - trail.x) * (0.3 - delay);
                trail.y += (trail.targetY - trail.y) * (0.3 - delay);
                
                trail.element.style.left = trail.x + 'px';
                trail.element.style.top = trail.y + 'px';
                trail.element.style.opacity = (15 - index) / 15 * 0.5;
                trail.element.style.transform = `scale(${(15 - index) / 15})`;
            });
            
            requestAnimationFrame(animate);
        };
        animate();
    }
    
    isInteractive(element) {
        return element.matches('a, button, .btn, .icon, .card, input, textarea, select, [onclick], [role="button"]');
    }
    
    addMagneticEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseMoveHandler = (e) => {
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const strength = (100 - distance) / 100;
                element.style.transform = `translate(${dx * strength * 0.3}px, ${dy * strength * 0.3}px) scale(1.05)`;
            }
        };
        
        const mouseLeaveHandler = () => {
            element.style.transform = 'translate(0px, 0px) scale(1)';
            document.removeEventListener('mousemove', mouseMoveHandler);
            element.removeEventListener('mouseleave', mouseLeaveHandler);
        };
        
        document.addEventListener('mousemove', mouseMoveHandler);
        element.addEventListener('mouseleave', mouseLeaveHandler);
    }
    
    removeMagneticEffect(element) {
        element.style.transform = 'translate(0px, 0px) scale(1)';
    }
    
    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
}

// Text reveal effect on hover
class TextRevealEffect {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('.text-reveal').forEach(element => {
            this.wrapTextWithSpans(element);
            this.addHoverEffect(element);
        });
    }
    
    wrapTextWithSpans(element) {
        const text = element.textContent;
        element.innerHTML = '';
        
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${index * 50}ms`;
            element.appendChild(span);
        });
    }
    
    addHoverEffect(element) {
        element.addEventListener('mouseenter', () => {
            element.classList.add('revealed');
        });
        
        element.addEventListener('mouseleave', () => {
            element.classList.remove('revealed');
        });
    }
}

// Initialize cursor effects
document.addEventListener('DOMContentLoaded', () => {
    new CursorEffects();
    new TextRevealEffect();
});