// Advanced About Section Animations and Interactions

class AboutAnimations {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        this.isInitialized = true;
        
        this.setupSkillBars();
        this.setupSkillsChart();
        this.setupScrollReveal();
        this.setupCardInteractions();
    }

    // Animated skill bars
    setupSkillBars() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px'
        };

        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach((bar, index) => {
                        setTimeout(() => {
                            const width = bar.getAttribute('data-width');
                            bar.style.width = width;
                        }, index * 200); // Stagger animation
                    });
                    skillObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const skillsSection = document.querySelector('.skills-visualization');
        if (skillsSection) {
            skillObserver.observe(skillsSection);
        }
    }

    // Skills radar chart
    setupSkillsChart() {
        const canvas = document.getElementById('skillsChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 120;

        const skills = [
            { name: 'Python', value: 0.9 },
            { name: 'ML', value: 0.85 },
            { name: 'SQL', value: 0.8 },
            { name: 'AI', value: 0.82 },
            { name: 'Data Science', value: 0.88 },
            { name: 'Analytics', value: 0.75 }
        ];

        let animationProgress = 0;
        const animateChart = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw grid
            this.drawRadarGrid(ctx, centerX, centerY, radius);
            
            // Draw skills polygon
            this.drawSkillsPolygon(ctx, centerX, centerY, radius, skills, animationProgress);
            
            // Draw labels
            this.drawSkillLabels(ctx, centerX, centerY, radius, skills);
            
            if (animationProgress < 1) {
                animationProgress += 0.02;
                requestAnimationFrame(animateChart);
            }
        };

        // Start animation when section is visible
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const chartObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateChart();
                    chartObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        chartObserver.observe(canvas);
    }

    drawRadarGrid(ctx, centerX, centerY, radius) {
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.2)';
        ctx.lineWidth = 1;

        // Draw concentric circles
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius * i) / 5, 0, Math.PI * 2);
            ctx.stroke();
        }

        // Draw radiating lines
        const angles = 6;
        for (let i = 0; i < angles; i++) {
            const angle = (Math.PI * 2 * i) / angles - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + Math.cos(angle) * radius,
                centerY + Math.sin(angle) * radius
            );
            ctx.stroke();
        }
    }

    drawSkillsPolygon(ctx, centerX, centerY, radius, skills, progress) {
        ctx.fillStyle = 'rgba(255, 215, 0, 0.2)';
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;

        ctx.beginPath();
        skills.forEach((skill, index) => {
            const angle = (Math.PI * 2 * index) / skills.length - Math.PI / 2;
            const distance = radius * skill.value * progress;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw points
        ctx.fillStyle = '#ffd700';
        skills.forEach((skill, index) => {
            const angle = (Math.PI * 2 * index) / skills.length - Math.PI / 2;
            const distance = radius * skill.value * progress;
            const x = centerX + Math.cos(angle) * distance;
            const y = centerY + Math.sin(angle) * distance;

            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    drawSkillLabels(ctx, centerX, centerY, radius, skills) {
        ctx.fillStyle = '#fff';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';

        skills.forEach((skill, index) => {
            const angle = (Math.PI * 2 * index) / skills.length - Math.PI / 2;
            const labelDistance = radius + 20;
            const x = centerX + Math.cos(angle) * labelDistance;
            const y = centerY + Math.sin(angle) * labelDistance;

            ctx.fillText(skill.name, x, y + 4);
        });
    }

    // Scroll reveal animations
    setupScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    
                    // Stagger child animations
                    const staggerChildren = entry.target.querySelectorAll('.stagger-child');
                    staggerChildren.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('stagger-revealed');
                        }, index * 150);
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-on-scroll').forEach(element => {
            revealObserver.observe(element);
        });
    }

    // Enhanced card interactions
    setupCardInteractions() {
        const cards = document.querySelectorAll('.interest-card');
        
        cards.forEach(card => {
            // Add hover effect
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });

            // Add click interaction for mobile
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });

            // 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateY(-10px)
                    scale(1.02)
                `;
            });
        });
    }
}

// Skills data for dynamic updates
const skillsData = {
    programming: [
        { name: 'Python', level: 90 },
        { name: 'SQL', level: 80 },
        { name: 'Java', level: 75 },
        { name: 'C', level: 70 }
    ],
    technologies: [
        { name: 'Machine Learning', level: 85 },
        { name: 'Data Science', level: 88 },
        { name: 'AI Development', level: 82 },
        { name: 'Cloud Platforms', level: 75 }
    ],
    tools: [
        { name: 'Azure', level: 80 },
        { name: 'Power BI', level: 85 },
        { name: 'AWS', level: 75 },
        { name: 'Git', level: 90 }
    ]
};

// Initialize animations when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize about animations
    window.aboutAnimations = new AboutAnimations();
});

// Initialize when about section is shown
function initializeAboutAnimations() {
    if (window.aboutAnimations) {
        window.aboutAnimations.init();
    }
}

// Export for global access
window.initializeAboutAnimations = initializeAboutAnimations;