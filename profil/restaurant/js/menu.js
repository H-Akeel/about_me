// Menu Management - إدارة قائمة الطعام

class MenuManager {
    constructor() {
        this.currentFilter = 'all';
        this.currentSort = 'popular';
        this.searchQuery = '';
        this.init();
    }

    init() {
        this.loadFeaturedDishes();
        this.setupEventListeners();
    }

    // تحميل الأطباق المميزة في الصفحة الرئيسية
    loadFeaturedDishes() {
        const featuredContainer = document.getElementById('featuredDishes');
        if (!featuredContainer) return;

        // اختيار الأطباق المميزة والجديدة
        const featuredDishes = dishes.filter(dish => dish.isPopular || dish.isNew).slice(0, 6);
        
        featuredContainer.innerHTML = featuredDishes.map(dish => this.createDishCard(dish)).join('');
    }

    // إنشاء بطاقة طبق
    createDishCard(dish) {
        const discountPercentage = dish.originalPrice ? 
            Math.round(((dish.originalPrice - dish.price) / dish.originalPrice) * 100) : 0;

        return `
            <div class="dish-card fade-in" data-dish-id="${dish.id}">
                <div class="dish-image">
                    <img src="${dish.image}" alt="${dish.name}" loading="lazy">
                    ${dish.isNew ? '<span class="dish-badge new">جديد</span>' : ''}
                    ${dish.isPopular ? '<span class="dish-badge popular">مميز</span>' : ''}
                    ${discountPercentage > 0 ? `<span class="dish-badge discount">خصم ${discountPercentage}%</span>` : ''}
                    ${dish.isVegetarian ? '<span class="dish-badge vegetarian"><i class="fas fa-leaf"></i></span>' : ''}
                    ${dish.isSpicy ? '<span class="dish-badge spicy"><i class="fas fa-pepper-hot"></i></span>' : ''}
                </div>
                
                <div class="dish-info">
                    <div class="dish-category">${this.getCategoryName(dish.category)}</div>
                    <h3 class="dish-name">${dish.name}</h3>
                    <p class="dish-description">${dish.description}</p>
                    
                    <div class="dish-rating">
                        <div class="stars">
                            ${this.generateStars(dish.rating)}
                        </div>
                        <span class="rating-count">(${dish.reviewCount})</span>
                    </div>
                    
                    <div class="dish-price">
                        <div class="price-info">
                            <span class="current-price">${dish.price} دينار</span>
                            ${dish.originalPrice ? `<span class="original-price">${dish.originalPrice} دينار </span>` : ''}
                        </div>
                        <div class="preparation-time">
                            <i class="fas fa-clock"></i>
                            <span>${dish.preparationTime}</span>
                        </div>
                    </div>
                    
                    <div class="dish-actions">
                        <button class="btn btn-outline" onclick="showDishDetails(${dish.id})">
                            <i class="fas fa-info-circle"></i>
                            التفاصيل
                        </button>
                        <button class="add-to-cart" onclick="addToCart(${dish.id})">
                            <i class="fas fa-plus"></i>
                            إضافة للسلة
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // إنشاء النجوم للتقييم
    generateStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        let starsHtml = '';

        for (let i = 0; i < fullStars; i++) {
            starsHtml += '<i class="fas fa-star"></i>';
        }

        if (hasHalfStar) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        }

        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            starsHtml += '<i class="far fa-star"></i>';
        }

        return starsHtml;
    }

    // الحصول على اسم الفئة
    getCategoryName(categoryId) {
        const category = categories.find(cat => cat.id === categoryId);
        return category ? category.name : '';
    }

    // تحميل القائمة الكاملة
    loadFullMenu() {
        const menuContainer = document.getElementById('menuContainer');
        if (!menuContainer) return;

        // إنشاء فلاتر الفئات
        this.createCategoryFilters();
        
        // عرض الأطباق
        this.displayDishes(dishes);
    }

    // إنشاء فلاتر الفئات
    createCategoryFilters() {
        const filtersContainer = document.getElementById('categoryFilters');
        if (!filtersContainer) return;

        const allFilter = `
            <button class="filter-btn ${this.currentFilter === 'all' ? 'active' : ''}" 
                    onclick="menuManager.filterByCategory('all')">
                <i class="fas fa-th-large"></i>
                الكل
            </button>
        `;

        const categoryFilters = categories.map(category => `
            <button class="filter-btn ${this.currentFilter === category.id ? 'active' : ''}" 
                    onclick="menuManager.filterByCategory('${category.id}')">
                <i class="${category.icon}"></i>
                ${category.name}
            </button>
        `).join('');

        filtersContainer.innerHTML = allFilter + categoryFilters;
    }

    // فلترة حسب الفئة
    filterByCategory(categoryId) {
        this.currentFilter = categoryId;
        
        // تحديث أزرار الفلتر
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');

        // فلترة الأطباق
        const filteredDishes = categoryId === 'all' ? 
            dishes : dishes.filter(dish => dish.category === categoryId);
        
        this.displayDishes(filteredDishes);
    }

    // ترتيب الأطباق
    sortDishes(sortBy) {
        this.currentSort = sortBy;
        
        let sortedDishes = [...dishes];
        
        switch (sortBy) {
            case 'name':
                sortedDishes.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
                break;
            case 'price-low':
                sortedDishes.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedDishes.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                sortedDishes.sort((a, b) => b.rating - a.rating);
                break;
            case 'popular':
            default:
                sortedDishes.sort((a, b) => {
                    if (a.isPopular && !b.isPopular) return -1;
                    if (!a.isPopular && b.isPopular) return 1;
                    return b.rating - a.rating;
                });
                break;
        }

        // تطبيق الفلتر الحالي
        if (this.currentFilter !== 'all') {
            sortedDishes = sortedDishes.filter(dish => dish.category === this.currentFilter);
        }

        this.displayDishes(sortedDishes);
    }

    // البحث في الأطباق
    searchDishes(query) {
        this.searchQuery = query.toLowerCase().trim();
        
        let filteredDishes = dishes.filter(dish => 
            dish.name.toLowerCase().includes(this.searchQuery) ||
            dish.description.toLowerCase().includes(this.searchQuery) ||
            dish.ingredients.some(ingredient => 
                ingredient.toLowerCase().includes(this.searchQuery)
            )
        );

        // تطبيق فلتر الفئة إذا كان مفعلاً
        if (this.currentFilter !== 'all') {
            filteredDishes = filteredDishes.filter(dish => dish.category === this.currentFilter);
        }

        this.displayDishes(filteredDishes);
    }

    // عرض الأطباق
    displayDishes(dishesToShow) {
        const dishesContainer = document.getElementById('dishesContainer');
        if (!dishesContainer) return;

        if (dishesToShow.length === 0) {
            dishesContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>لا توجد نتائج</h3>
                    <p>لم نجد أطباق تطابق البحث أو الفلتر المحدد</p>
                    <button class="btn btn-primary" onclick="menuManager.clearFilters()">
                        مسح الفلاتر
                    </button>
                </div>
            `;
            return;
        }

        dishesContainer.innerHTML = dishesToShow.map(dish => this.createDishCard(dish)).join('');
        
        // إضافة تأثير الظهور التدريجي
        setTimeout(() => {
            document.querySelectorAll('.dish-card').forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('fade-in');
                }, index * 100);
            });
        }, 50);
    }

    // مسح الفلاتر
    clearFilters() {
        this.currentFilter = 'all';
        this.searchQuery = '';
        
        // مسح حقل البحث
        const searchInput = document.getElementById('dishSearch');
        if (searchInput) searchInput.value = '';
        
        // إعادة تعيين أزرار الفلتر
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.filter-btn[onclick*="all"]').classList.add('active');
        
        // عرض جميع الأطباق
        this.displayDishes(dishes);
    }

    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // البحث في الأطباق
        const searchInput = document.getElementById('dishSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchDishes(e.target.value);
            });
        }

        // ترتيب الأطباق
        const sortSelect = document.getElementById('dishSort');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.sortDishes(e.target.value);
            });
        }
    }
}

// عرض تفاصيل الطبق
function showDishDetails(dishId) {
    const dish = dishes.find(d => d.id === dishId);
    if (!dish) return;

    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content dish-details-modal">
            <div class="modal-header">
                <h3>${dish.name}</h3>
                <button class="close-btn" onclick="closeDishModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="dish-details-content">
                    <div class="dish-details-image">
                        <img src="${dish.image}" alt="${dish.name}">
                        <div class="dish-badges">
                            ${dish.isNew ? '<span class="badge new">جديد</span>' : ''}
                            ${dish.isPopular ? '<span class="badge popular">مميز</span>' : ''}
                            ${dish.isVegetarian ? '<span class="badge vegetarian"><i class="fas fa-leaf"></i> نباتي</span>' : ''}
                            ${dish.isSpicy ? '<span class="badge spicy"><i class="fas fa-pepper-hot"></i> حار</span>' : ''}
                        </div>
                    </div>
                    
                    <div class="dish-details-info">
                        <div class="dish-category">${menuManager.getCategoryName(dish.category)}</div>
                        <p class="dish-description">${dish.description}</p>
                        
                        <div class="dish-rating">
                            <div class="stars">
                                ${menuManager.generateStars(dish.rating)}
                            </div>
                            <span class="rating-text">${dish.rating} من 5 (${dish.reviewCount} تقييم)</span>
                        </div>
                        
                        <div class="dish-info-grid">
                            <div class="info-item">
                                <i class="fas fa-clock"></i>
                                <span>وقت التحضير: ${dish.preparationTime}</span>
                            </div>
                            <div class="info-item">
                                <i class="fas fa-utensils"></i>
                                <span>الفئة: ${menuManager.getCategoryName(dish.category)}</span>
                            </div>
                        </div>
                        
                        <div class="ingredients">
                            <h4><i class="fas fa-list"></i> المكونات:</h4>
                            <div class="ingredients-list">
                                ${dish.ingredients.map(ingredient => `<span class="ingredient">${ingredient}</span>`).join('')}
                            </div>
                        </div>
                        
                        <div class="dish-price-section">
                            <div class="price-info">
                                <span class="current-price">${dish.price} دينار</span>
                                ${dish.originalPrice ? `<span class="original-price">${dish.originalPrice} دينار</span>` : ''}
                            </div>
                            
                            <div class="quantity-selector">
                                <label>الكمية:</label>
                                <div class="quantity-controls">
                                    <button type="button" onclick="changeQuantity(-1)">-</button>
                                    <input type="number" id="dishQuantity" value="1" min="1" max="10">
                                    <button type="button" onclick="changeQuantity(1)">+</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="dish-notes">
                            <label for="dishNotes">ملاحظات خاصة:</label>
                            <textarea id="dishNotes" placeholder="أي طلبات خاصة للطبق..."></textarea>
                        </div>
                        
                        <button class="btn btn-primary btn-full" onclick="addToCartFromModal(${dish.id})">
                            <i class="fas fa-shopping-bag"></i>
                            إضافة للسلة
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// إغلاق نافذة تفاصيل الطبق
function closeDishModal() {
    const modal = document.querySelector('.dish-details-modal').closest('.modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// تغيير الكمية
function changeQuantity(change) {
    const quantityInput = document.getElementById('dishQuantity');
    if (!quantityInput) return;
    
    const currentValue = parseInt(quantityInput.value);
    const newValue = currentValue + change;
    
    if (newValue >= 1 && newValue <= 10) {
        quantityInput.value = newValue;
    }
}

// إضافة للسلة من النافذة المنبثقة
function addToCartFromModal(dishId) {
    const quantity = parseInt(document.getElementById('dishQuantity').value);
    const notes = document.getElementById('dishNotes').value;
    
    addToCart(dishId, quantity, notes);
    closeDishModal();
}

// عرض القائمة الكاملة
function showFullMenu() {
    // إنشاء صفحة القائمة أو التنقل إليها
    window.location.href = 'pages/menu.html';
}

// التمرير إلى قسم القائمة
function scrollToMenu() {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
    } else {
        showFullMenu();
    }
}

// إنشاء مدير القائمة
const menuManager = new MenuManager();

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MenuManager, showDishDetails, closeDishModal };
}

