// Main JavaScript File - الملف الرئيسي للموقع

// تهيئة الموقع عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// تهيئة الموقع
function initializeWebsite() {
    setupNavigation();
    setupScrollEffects();
    setupAnimations();
    setupFormValidation();
    checkRestaurantStatus();
    initializeComponents();
}

// إعداد التنقل
function setupNavigation() {
    // التنقل السلس
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

    // تفعيل/إلغاء تفعيل روابط التنقل حسب الموضع
    window.addEventListener('scroll', updateActiveNavLink);
    
    // القائمة المحمولة
    setupMobileMenu();
}

// إعداد القائمة المحمولة
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            mobileToggle.querySelector('i').classList.toggle('fa-bars');
            mobileToggle.querySelector('i').classList.toggle('fa-times');
        });

        // إغلاق القائمة عند النقر على رابط
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                mobileToggle.querySelector('i').classList.add('fa-bars');
                mobileToggle.querySelector('i').classList.remove('fa-times');
            });
        });
    }
}

// تحديث الرابط النشط في التنقل
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
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

// إعداد تأثيرات التمرير
function setupScrollEffects() {
    // إخفاء/إظهار الهيدر عند التمرير
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // التمرير لأسفل - إخفاء الهيدر
            header.style.transform = 'translateY(-100%)';
        } else {
            // التمرير لأعلى - إظهار الهيدر
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // زر العودة للأعلى
    createScrollToTopButton();
}

// إنشاء زر العودة للأعلى
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.title = 'العودة للأعلى';
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    document.body.appendChild(scrollBtn);

    // إظهار/إخفاء الزر حسب موضع التمرير
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
}

// إعداد الرسوم المتحركة
function setupAnimations() {
    // مراقب التقاطع للرسوم المتحركة
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // رسوم متحركة خاصة للإحصائيات
                if (entry.target.classList.contains('stat-number')) {
                    animateNumber(entry.target);
                }
            }
        });
    }, observerOptions);

    // مراقبة العناصر القابلة للرسوم المتحركة
    document.querySelectorAll('.feature-item, .dish-card, .testimonial-item, .stat-item').forEach(el => {
        observer.observe(el);
    });
}

// تحريك الأرقام
function animateNumber(element) {
    const target = parseFloat(element.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // تنسيق الرقم
        if (target % 1 === 0) {
            element.textContent = Math.floor(current);
        } else {
            element.textContent = current.toFixed(1);
        }
        
        // إضافة + للأرقام الكبيرة
        if (target >= 100) {
            element.textContent += '+';
        }
    }, 16);
}

// إعداد التحقق من النماذج
function setupFormValidation() {
    // نموذج الحجز
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', handleReservationSubmit);
    }

    // نموذج النشرة الإخبارية
    const newsletterInput = document.getElementById('newsletterEmail');
    if (newsletterInput) {
        newsletterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                subscribeNewsletter();
            }
        });
    }
}

// معالجة إرسال نموذج الحجز
function handleReservationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const reservationData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        date: formData.get('date'),
        time: formData.get('time'),
        guests: formData.get('guests'),
        notes: formData.get('notes'),
        reservationId: 'RES-' + Date.now(),
        createdAt: new Date().toISOString()
    };

    // التحقق من صحة البيانات
    if (!validateReservationData(reservationData)) {
        return;
    }

    // إظهار رسالة التحميل
    showLoading('جاري معالجة الحجز...');

    // محاكاة معالجة الحجز
    setTimeout(() => {
        hideLoading();
        
        // حفظ الحجز
        saveReservation(reservationData);
        
        // إغلاق النافذة
        closeReservationModal();
        
        // إظهار رسالة النجاح
        showReservationSuccess(reservationData);
        
    }, 1500);
}

// التحقق من صحة بيانات الحجز
function validateReservationData(data) {
    // التحقق من التاريخ
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('لا يمكن الحجز في تاريخ سابق');
        return false;
    }

    // التحقق من أوقات العمل
    const dayOfWeek = selectedDate.getDay();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const daySchedule = workingHours[dayNames[dayOfWeek]];
    
    if (!daySchedule.isOpen) {
        alert('المطعم مغلق في هذا اليوم');
        return false;
    }

    return true;
}

// حفظ الحجز
function saveReservation(reservationData) {
    const reservations = JSON.parse(localStorage.getItem('restaurantReservations') || '[]');
    reservations.push(reservationData);
    localStorage.setItem('restaurantReservations', JSON.stringify(reservations));
}

// إظهار رسالة نجاح الحجز
function showReservationSuccess(reservationData) {
    const message = `
        تم تأكيد حجزكم بنجاح!
        
        رقم الحجز: ${reservationData.reservationId}
        التاريخ: ${reservationData.date}
        الوقت: ${reservationData.time}
        عدد الأشخاص: ${reservationData.guests}
        
        سنتواصل معكم قريباً لتأكيد التفاصيل.
    `;
    
    alert(message);
}

// الاشتراك في النشرة الإخبارية
function subscribeNewsletter() {
    const emailInput = document.getElementById('newsletterEmail');
    if (!emailInput) return;

    const email = emailInput.value.trim();
    
    if (!email) {
        alert('يرجى إدخال البريد الإلكتروني');
        return;
    }

    if (!isValidEmail(email)) {
        alert('يرجى إدخال بريد إلكتروني صحيح');
        return;
    }

    // حفظ الاشتراك
    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    
    if (subscribers.includes(email)) {
        alert('هذا البريد مشترك مسبقاً');
        return;
    }

    subscribers.push(email);
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));

    // مسح الحقل وإظهار رسالة النجاح
    emailInput.value = '';
    alert('تم الاشتراك بنجاح! شكراً لكم.');
}

// التحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// فحص حالة المطعم
function checkRestaurantStatus() {
    const now = new Date();
    const currentDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
    const currentTime = now.getHours() * 100 + now.getMinutes();
    
    const todaySchedule = workingHours[currentDay];
    
    if (!todaySchedule.isOpen) {
        showRestaurantStatus('مغلق اليوم', 'closed');
        return;
    }

    const openTime = parseInt(todaySchedule.open.replace(':', ''));
    const closeTime = parseInt(todaySchedule.close.replace(':', ''));
    
    if (currentTime >= openTime && currentTime <= closeTime) {
        showRestaurantStatus('مفتوح الآن', 'open');
    } else {
        showRestaurantStatus('مغلق الآن', 'closed');
    }
}

// عرض حالة المطعم
function showRestaurantStatus(status, type) {
    const statusElements = document.querySelectorAll('.restaurant-status');
    statusElements.forEach(element => {
        element.textContent = status;
        element.className = `restaurant-status ${type}`;
    });
}

// إظهار/إخفاء نافذة الحجز
function showReservationModal() {
    const modal = document.getElementById('reservationModal');
    const overlay = document.getElementById('overlay');
    
    if (modal) {
        modal.classList.add('show');
        if (overlay) overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // تعيين الحد الأدنى للتاريخ (اليوم)
        const dateInput = modal.querySelector('input[type="date"]');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        }
    }
}

function closeReservationModal() {
    const modal = document.getElementById('reservationModal');
    const overlay = document.getElementById('overlay');
    
    if (modal) {
        modal.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
        document.body.style.overflow = '';
        
        // مسح النموذج
        const form = modal.querySelector('form');
        if (form) form.reset();
    }
}

// تهيئة المكونات
function initializeComponents() {
    // تحديث الساعة في الهيدر
    updateClock();
    setInterval(updateClock, 60000); // تحديث كل دقيقة

    // تحميل المراجعات الديناميكية
    loadDynamicReviews();
    
    // إعداد مؤثرات الماوس
    setupHoverEffects();
}

// تحديث الساعة
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ar-SA', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    
    const clockElements = document.querySelectorAll('.current-time');
    clockElements.forEach(element => {
        element.textContent = timeString;
    });
}

// تحميل المراجعات الديناميكية
function loadDynamicReviews() {
    // يمكن هنا تحميل مراجعات إضافية من API أو قاعدة بيانات
    // حالياً نستخدم البيانات الثابتة
}

// إعداد مؤثرات الماوس
function setupHoverEffects() {
    // تأثير تتبع الماوس للأزرار
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            ripple.style.left = (e.clientX - rect.left) + 'px';
            ripple.style.top = (e.clientY - rect.top) + 'px';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// معالجة الأخطاء العامة
window.addEventListener('error', function(e) {
    console.error('خطأ في الموقع:', e.error);
    // يمكن هنا إرسال تقرير الخطأ لخادم التحليلات
});

// معالجة الأخطاء غير المعالجة في الوعود
window.addEventListener('unhandledrejection', function(e) {
    console.error('وعد مرفوض:', e.reason);
    e.preventDefault();
});

// تحسين الأداء - تحميل الصور بشكل تدريجي
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// تهيئة التحميل التدريجي
setupLazyLoading();

// إعداد Service Worker للتخزين المؤقت (اختياري)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// تصدير الوظائف للاستخدام العام
window.restaurantApp = {
    showReservationModal,
    closeReservationModal,
    subscribeNewsletter,
    scrollToMenu: () => {
        const menuSection = document.getElementById('menu');
        if (menuSection) {
            menuSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

