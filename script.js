// Vita PulseCare - Simple Frontend JavaScript
// Handmade by team - No AI complex code

document.addEventListener('DOMContentLoaded', function() {
    console.log('Vita PulseCare website loaded successfully!');
    
    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.className = 'fas fa-times';
                document.body.style.overflow = 'hidden';
            } else {
                icon.className = 'fas fa-bars';
                document.body.style.overflow = '';
            }
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.mobile-nav') && 
            !event.target.closest('.mobile-menu-btn') &&
            mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            document.body.style.overflow = '';
        }
    });
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
                    document.body.style.overflow = '';
                }
                
                // Smooth scroll
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== TAB SWITCHING =====
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons
            tabButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab panes
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show selected tab pane
            const selectedPane = document.getElementById(tabId);
            if (selectedPane) {
                selectedPane.classList.add('active');
            }
        });
    });
    
    // ===== ACTIVE NAV LINK ON SCROLL =====
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ===== SCROLL TO TOP BUTTON =====
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    function toggleScrollToTop() {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    }
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', toggleScrollToTop);
        
        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Initial check
        toggleScrollToTop();
    }
    
    // ===== SIMPLE FORM VALIDATION (EXAMPLE) =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[name="name"]').value.trim();
            const email = this.querySelector('input[name="email"]').value.trim();
            const message = this.querySelector('textarea[name="message"]').value.trim();
            
            // Simple validation
            if (!name || !email || !message) {
                alert('Please fill in all fields!');
                return;
            }
            
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address!');
                return;
            }
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // ===== SIMPLE COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('%') ? '%' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
            }
        }, 30);
    }
    
    // Animate counters when in viewport
    function checkCounters() {
        statNumbers.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            const target = parseInt(stat.textContent);
            
            if (rect.top < window.innerHeight - 100 && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                animateCounter(stat, target);
            }
        });
    }
    
    window.addEventListener('scroll', checkCounters);
    // Initial check
    checkCounters();
    
    // ===== SIMPLE HOVER EFFECTS =====
    // Add hover class to cards
    const cards = document.querySelectorAll('.problem-card, .feature-card, .team-member, .status-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    // ===== CURRENT YEAR IN FOOTER =====
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // ===== SIMPLE LOADING ANIMATION =====
    // Remove loading class after page load
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Show welcome message in console
        console.log('%c🚀 Vita PulseCare Frontend Ready!', 'color: #667eea; font-size: 16px; font-weight: bold;');
        console.log('%c👨‍💻 Handcrafted by the project team', 'color: #764ba2; font-size: 14px;');
    });
});

// ===== EXTRA: SIMPLE DARK MODE TOGGLE (OPTIONAL) =====
// Uncomment if you want to add dark mode
/*
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #333;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    box-shadow: 0 3px 10px rgba(0,0,0,0.2);
`;

document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    const icon = this.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun';
        this.style.background = '#ffc107';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        icon.className = 'fas fa-moon';
        this.style.background = '#333';
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.querySelector('i').className = 'fas fa-sun';
    darkModeToggle.style.background = '#ffc107';
}
*/

// Add some CSS for dark mode if enabled
const darkModeCSS = `
.dark-mode {
    background-color: #1a1a1a;
    color: #f0f0f0;
}

.dark-mode .problem-card,
.dark-mode .feature-mockup,
.dark-mode .tech-category,
.dark-mode .timeline-content,
.dark-mode .team-member {
    background-color: #2d2d2d;
    color: #f0f0f0;
}

.dark-mode .main-header {
    background-color: #2d2d2d;
    box-shadow: 0 2px 15px rgba(0,0,0,0.3);
}
`;

// Uncomment to add dark mode styles
// const style = document.createElement('style');
// style.textContent = darkModeCSS;
// document.head.appendChild(style);
