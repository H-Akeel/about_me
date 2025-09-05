// Products Management Functions

// Display products in grid
function displayProducts(productsToShow = null) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    const productsList = productsToShow || getFeaturedProducts();
    
    if (productsList.length === 0) {
        productsGrid.innerHTML = `
            <div class="no-products">
                <i class="fas fa-box-open"></i>
                <p>لا توجد منتجات متاحة</p>
            </div>
        `;
        return;
    }
    
    let productsHTML = '';
    productsList.forEach(product => {
        const discountBadge = product.discount > 0 ? 
            `<div class="product-badge badge-discount">-${product.discount}%</div>` : '';
        const newBadge = product.is_new ? 
            `<div class="product-badge badge-new">جديد</div>` : '';
        
        const originalPriceHTML = product.original_price ? 
            `<span class="original-price">${formatPrice(product.original_price)}</span>` : '';
        
        const isInWishlist = wishlist.includes(product.id);
        
        productsHTML += `
            <div class="product-card fade-in" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onclick="showProductModal(${product.id})">
                    ${discountBadge}
                    ${newBadge}
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-description">${product.description}</p>
                    <div class="product-rating">
                        <div class="stars">${generateStars(product.rating)}</div>
                        <span class="rating-count">(${product.reviews_count})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">${formatPrice(product.price)}</span>
                        ${originalPriceHTML}
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart"></i>
                            أضف للسلة
                        </button>
                        <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" 
                                onclick="toggleWishlistItem(${product.id})" 
                                title="إضافة للمفضلة">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    productsGrid.innerHTML = productsHTML;
}

// Show product modal with details
function showProductModal(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modalBody');
    const modalProductName = document.getElementById('modalProductName');
    const overlay = document.getElementById('overlay');
    
    if (!modal || !modalBody || !modalProductName || !overlay) return;
    
    modalProductName.textContent = product.name;
    
    // Get product reviews
    const productReviews = reviews.filter(review => review.product_id === product.id);
    
    const isInWishlist = wishlist.includes(product.id);
    const originalPriceHTML = product.original_price ? 
        `<span class="original-price">${formatPrice(product.original_price)}</span>` : '';
    
    modalBody.innerHTML = `
        <div class="product-modal-content">
            <div class="product-modal-images">
                <div class="main-image">
                    <img src="${product.image}" alt="${product.name}" id="mainProductImage">
                </div>
                <div class="thumbnail-images">
                    ${product.images.map((img, index) => 
                        `<img src="${img}" alt="${product.name}" class="thumbnail ${index === 0 ? 'active' : ''}" 
                              onclick="changeMainImage('${img}')">`
                    ).join('')}
                </div>
            </div>
            <div class="product-modal-info">
                <div class="product-category">${product.category}</div>
                <h2 class="product-name">${product.name}</h2>
                <p class="product-description">${product.description}</p>
                
                <div class="product-rating">
                    <div class="stars">${generateStars(product.rating)}</div>
                    <span class="rating-count">(${product.reviews_count} تقييم)</span>
                </div>
                
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${originalPriceHTML}
                </div>
                
                <div class="product-stock">
                    <i class="fas fa-box"></i>
                    <span>متوفر في المخزون: ${product.stock} قطعة</span>
                </div>
                
                <div class="product-tags">
                    ${product.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                
                <div class="product-specifications">
                    <h4>المواصفات</h4>
                    <table class="specs-table">
                        ${Object.entries(product.specifications).map(([key, value]) => 
                            `<tr><td>${key}</td><td>${value}</td></tr>`
                        ).join('')}
                    </table>
                </div>
                
                <div class="product-actions-modal">
                    <div class="quantity-selector">
                        <label>الكمية:</label>
                        <select id="modalQuantity">
                            ${Array.from({length: Math.min(product.stock, 10)}, (_, i) => 
                                `<option value="${i + 1}">${i + 1}</option>`
                            ).join('')}
                        </select>
                    </div>
                    <div class="action-buttons">
                        <button class="btn btn-primary" onclick="addToCartFromModal(${product.id})">
                            <i class="fas fa-shopping-cart"></i>
                            أضف للسلة
                        </button>
                        <button class="btn btn-secondary ${isInWishlist ? 'active' : ''}" 
                                onclick="toggleWishlistItem(${product.id}); updateModalWishlistBtn(${product.id})">
                            <i class="fas fa-heart"></i>
                            ${isInWishlist ? 'في المفضلة' : 'أضف للمفضلة'}
                        </button>
                    </div>
                </div>
                
                ${productReviews.length > 0 ? `
                    <div class="product-reviews">
                        <h4>التقييمات والمراجعات</h4>
                        ${productReviews.map(review => `
                            <div class="review-item">
                                <div class="review-header">
                                    <span class="reviewer-name">${review.user_name}</span>
                                    <div class="review-rating">${generateStars(review.rating)}</div>
                                    <span class="review-date">${formatDate(review.date)}</span>
                                    ${review.verified ? '<span class="verified-badge">مشتري موثق</span>' : ''}
                                </div>
                                <p class="review-comment">${review.comment}</p>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    
    modal.classList.add('show');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Close product modal
function closeProductModal() {
    const modal = document.getElementById('productModal');
    const overlay = document.getElementById('overlay');
    
    if (modal && overlay) {
        modal.classList.remove('show');
        overlay.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Change main product image in modal
function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('mainProductImage');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
    
    // Update thumbnail active state
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(thumb => {
        thumb.classList.toggle('active', thumb.src.includes(imageSrc));
    });
}

// Add to cart from modal with selected quantity
function addToCartFromModal(productId) {
    const quantitySelect = document.getElementById('modalQuantity');
    const quantity = quantitySelect ? parseInt(quantitySelect.value) : 1;
    
    addToCart(productId, quantity);
}

// Update wishlist button in modal
function updateModalWishlistBtn(productId) {
    const isInWishlist = wishlist.includes(productId);
    const wishlistBtn = document.querySelector('.product-actions-modal .btn-secondary');
    
    if (wishlistBtn) {
        wishlistBtn.classList.toggle('active', isInWishlist);
        wishlistBtn.innerHTML = `
            <i class="fas fa-heart"></i>
            ${isInWishlist ? 'في المفضلة' : 'أضف للمفضلة'}
        `;
    }
}

// Search products
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const query = searchInput.value.trim();
    if (query.length < 2) {
        displayProducts(); // Show featured products
        return;
    }
    
    showLoading();
    
    // Simulate API call delay
    setTimeout(() => {
        const searchResults = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.name_en.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()) ||
            product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
        
        displayProducts(searchResults);
        hideLoading();
        
        // Update section title
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) {
            sectionTitle.textContent = searchResults.length > 0 ? 
                `نتائج البحث عن "${query}" (${searchResults.length} منتج)` : 
                `لا توجد نتائج للبحث عن "${query}"`;
        }
    }, 500);
}

// Filter products by category
function filterByCategory(categoryId) {
    showLoading();
    
    setTimeout(() => {
        const filteredProducts = getProductsByCategory(categoryId);
        const category = getCategoryById(categoryId);
        
        displayProducts(filteredProducts);
        hideLoading();
        
        // Update section title
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle && category) {
            sectionTitle.textContent = `منتجات ${category.name} (${filteredProducts.length} منتج)`;
        }
    }, 300);
}

// View all products
function viewAllProducts() {
    showLoading();
    
    setTimeout(() => {
        displayProducts(products);
        hideLoading();
        
        // Update section title
        const sectionTitle = document.querySelector('.section-title');
        if (sectionTitle) {
            sectionTitle.textContent = `جميع المنتجات (${products.length} منتج)`;
        }
    }, 300);
}

// Explore products (scroll to products section)
function exploreProducts() {
    scrollToProducts();
}

// Scroll to products section
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Show loading spinner
function showLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('show');
    }
}

// Hide loading spinner
function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.remove('show');
    }
}

// Sort products
function sortProducts(sortBy) {
    let sortedProducts = [...products];
    
    switch (sortBy) {
        case 'price_low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price_high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            sortedProducts.sort((a, b) => b.is_new - a.is_new);
            break;
        case 'name':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
            break;
        default:
            sortedProducts = getFeaturedProducts();
    }
    
    displayProducts(sortedProducts);
}

// Filter products by price range
function filterByPriceRange(minPrice, maxPrice) {
    const filteredProducts = products.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );
    
    displayProducts(filteredProducts);
    
    // Update section title
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.textContent = `منتجات من ${formatPrice(minPrice)} إلى ${formatPrice(maxPrice)} (${filteredProducts.length} منتج)`;
    }
}

// Filter products by rating
function filterByRating(minRating) {
    const filteredProducts = products.filter(product => product.rating >= minRating);
    
    displayProducts(filteredProducts);
    
    // Update section title
    const sectionTitle = document.querySelector('.section-title');
    if (sectionTitle) {
        sectionTitle.textContent = `منتجات بتقييم ${minRating} نجوم فأكثر (${filteredProducts.length} منتج)`;
    }
}

// Get product recommendations
function getRecommendations(productId, limit = 4) {
    const product = getProductById(productId);
    if (!product) return [];
    
    // Get products from same category
    const sameCategory = products.filter(p => 
        p.category_id === product.category_id && p.id !== product.id
    );
    
    // Sort by rating and return limited results
    return sameCategory
        .sort((a, b) => b.rating - a.rating)
        .slice(0, limit);
}

// Quick view product
function quickViewProduct(productId) {
    showProductModal(productId);
}

// Compare products (placeholder)
function compareProducts(productIds) {
    showNotification('ميزة المقارنة قيد التطوير', 'info');
}

// Share product
function shareProduct(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    if (navigator.share) {
        navigator.share({
            title: product.name,
            text: product.description,
            url: window.location.href + `#product-${productId}`
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: copy to clipboard
        const url = window.location.href + `#product-${productId}`;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('تم نسخ رابط المنتج', 'success');
        }).catch(() => {
            showNotification('فشل في نسخ الرابط', 'error');
        });
    }
}

// Initialize products display
function initializeProducts() {
    displayProducts();
    
    // Add search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
        
        // Real-time search (debounced)
        let searchTimeout;
        searchInput.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (this.value.length >= 2 || this.value.length === 0) {
                    searchProducts();
                }
            }, 300);
        });
    }
}

// Product image lazy loading
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProducts();
    lazyLoadImages();
});

