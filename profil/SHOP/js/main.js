// Main JavaScript Functions

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupEventListeners();
    loadSavedData();
});

// Initialize website
function initializeWebsite() {
    // Initialize navigation
    initializeNavigation();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize responsive features
    initializeResponsiveFeatures();
    
    // Load products
    displayProducts();
    
    console.log('موقع التجارة الإلكترونية تم تحميله بنجاح');
}

// Setup event listeners
function setupEventListeners() {
    // Close modals when clicking overlay
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', closeModals);
    }
    
    // Escape key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModals();
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', handleWindowResize);
    
    // Scroll handler for animations
    window.addEventListener('scroll', handleScroll);
}

// Navigation Functions
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Scroll to section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    
    if (navMenu && mobileToggle) {
        navMenu.classList.toggle('show');
        
        // Change icon
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.className = navMenu.classList.contains('show') ? 
                'fas fa-times' : 'fas fa-bars';
        }
    }
}

// User menu toggle
function toggleUserMenu() {
    showNotification('قائمة المستخدم قيد التطوير', 'info');
}

// Smooth scrolling
function initializeSmoothScrolling() {
    // Already handled by CSS scroll-behavior: smooth
}

// Animations
function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.product-card, .feature-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Responsive features
function initializeResponsiveFeatures() {
    handleWindowResize();
}

// Handle window resize
function handleWindowResize() {
    const width = window.innerWidth;
    
    // Close mobile menu on desktop
    if (width > 767) {
        const navMenu = document.querySelector('.nav-menu');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navMenu && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            
            const icon = mobileToggle?.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-bars';
            }
        }
    }
    
    // Adjust cart sidebar width
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar && width <= 767) {
        cartSidebar.style.width = '100%';
    } else if (cartSidebar) {
        cartSidebar.style.width = '400px';
    }
}

// Handle scroll events
function handleScroll() {
    const scrollTop = window.pageYOffset;
    
    // Update navigation active state based on scroll position
    updateActiveNavigation(scrollTop);
    
    // Show/hide scroll to top button
    toggleScrollToTopButton(scrollTop);
}

// Update active navigation based on scroll
function updateActiveNavigation(scrollTop) {
    const sections = ['home', 'products', 'categories', 'offers', 'about', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    sections.forEach((sectionId, index) => {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        }
    });
}

// Scroll to top button
function toggleScrollToTopButton(scrollTop) {
    let scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollTop > 300) {
        if (!scrollToTopBtn) {
            scrollToTopBtn = document.createElement('button');
            scrollToTopBtn.id = 'scrollToTop';
            scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            scrollToTopBtn.className = 'scroll-to-top';
            scrollToTopBtn.onclick = scrollToTop;
            
            // Add styles
            scrollToTopBtn.style.cssText = `
                position: fixed;
                bottom: 30px;
                left: 30px;
                width: 50px;
                height: 50px;
                background: #667eea;
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                z-index: 1000;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
            `;
            
            document.body.appendChild(scrollToTopBtn);
        }
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else if (scrollToTopBtn) {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(20px)';
    }
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Close all modals
function closeModals() {
    closeProductModal();
    
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    if (cartSidebar && cartSidebar.classList.contains('open')) {
        cartSidebar.classList.remove('open');
    }
    
    if (overlay && overlay.classList.contains('show')) {
        overlay.classList.remove('show');
    }
    
    document.body.style.overflow = '';
}

// Newsletter subscription
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('يرجى إدخال البريد الإلكتروني', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
        return;
    }
    
    // Simulate API call
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        emailInput.value = '';
        showNotification('تم الاشتراك في النشرة الإخبارية بنجاح!', 'success');
    }, 1000);
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Contact form (placeholder)
function submitContactForm() {
    showNotification('تم إرسال رسالتك بنجاح، سنتواصل معك قريباً', 'success');
}

// Language toggle (placeholder)
function toggleLanguage() {
    showNotification('تبديل اللغة قيد التطوير', 'info');
}

// Currency toggle (placeholder)
function toggleCurrency() {
    showNotification('تبديل العملة قيد التطوير', 'info');
}

// Theme toggle (placeholder)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    showNotification(`تم التبديل إلى الوضع ${isDark ? 'الليلي' : 'النهاري'}`, 'success');
}

// Load saved theme
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Product quick actions
function quickAddToCart(productId) {
    addToCart(productId);
}

function quickAddToWishlist(productId) {
    toggleWishlistItem(productId);
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('خطأ في الموقع:', e.error);
    showNotification('حدث خطأ غير متوقع، يرجى إعادة تحميل الصفحة', 'error');
});

// Performance monitoring
function measurePerformance() {
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`وقت تحميل الصفحة: ${loadTime}ms`);
        });
    }
}

// Initialize performance monitoring
measurePerformance();

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration would go here
        console.log('Service Worker support detected');
    });
}

// Initialize theme
loadSavedTheme();

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Print functionality
function printPage() {
    window.print();
}

// Export functions for global access
window.ecommerce = {
    addToCart,
    removeFromCart,
    toggleCart,
    toggleWishlistItem,
    searchProducts,
    showProductModal,
    closeProductModal,
    subscribeNewsletter,
    toggleMobileMenu,
    toggleUserMenu,
    scrollToProducts,
    exploreProducts,
    viewAllProducts,
    filterByCategory,
    sortProducts,
    filterByPriceRange,
    filterByRating
};

