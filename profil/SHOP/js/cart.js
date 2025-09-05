// Cart Management Functions

// Add product to cart
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    if (!product) {
        showNotification('المنتج غير موجود', 'error');
        return;
    }
    
    if (product.stock < quantity) {
        showNotification('الكمية المطلوبة غير متوفرة في المخزون', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.product_id === productId);
    
    if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
            showNotification('تم الوصول للحد الأقصى المتاح في المخزون', 'error');
            return;
        }
        existingItem.quantity = newQuantity;
    } else {
        cart.push({
            product_id: productId,
            quantity: quantity,
            added_at: new Date().toISOString()
        });
    }
    
    saveCart();
    updateCartCount();
    updateCartDisplay();
    showNotification('تم إضافة المنتج إلى السلة', 'success');
}

// Remove product from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.product_id !== productId);
    saveCart();
    updateCartCount();
    updateCartDisplay();
    showNotification('تم حذف المنتج من السلة', 'info');
}

// Update quantity in cart
function updateCartQuantity(productId, quantity) {
    const product = getProductById(productId);
    if (!product) return;
    
    if (quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    if (quantity > product.stock) {
        showNotification('الكمية المطلوبة غير متوفرة في المخزون', 'error');
        return;
    }
    
    const item = cart.find(item => item.product_id === productId);
    if (item) {
        item.quantity = quantity;
        saveCart();
        updateCartCount();
        updateCartDisplay();
    }
}

// Clear entire cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
    updateCartDisplay();
    showNotification('تم إفراغ السلة', 'info');
}

// Get cart total
function getCartTotal() {
    return cart.reduce((total, item) => {
        const product = getProductById(item.product_id);
        return total + (product ? product.price * item.quantity : 0);
    }, 0);
}

// Get cart items count
function getCartItemsCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

// Update cart count display
function updateCartCount() {
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        const count = getCartItemsCount();
        cartCountElement.textContent = count;
        cartCountElement.style.display = count > 0 ? 'flex' : 'none';
    }
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    if (cartSidebar && overlay) {
        cartSidebar.classList.toggle('open');
        overlay.classList.toggle('show');
        
        if (cartSidebar.classList.contains('open')) {
            updateCartDisplay();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Update cart display
function updateCartDisplay() {
    const cartContent = document.getElementById('cartContent');
    const cartFooter = document.getElementById('cartFooter');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartContent) return;
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>سلة التسوق فارغة</p>
                <button class="btn btn-primary" onclick="scrollToProducts(); toggleCart();">ابدأ التسوق</button>
            </div>
        `;
        if (cartFooter) cartFooter.style.display = 'none';
        return;
    }
    
    let cartHTML = '';
    cart.forEach(item => {
        const product = getProductById(item.product_id);
        if (product) {
            cartHTML += `
                <div class="cart-item">
                    <div class="cart-item-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${product.name}</div>
                        <div class="cart-item-price">${formatPrice(product.price)}</div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateCartQuantity(${product.id}, ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" class="quantity-input" value="${item.quantity}" 
                                   onchange="updateCartQuantity(${product.id}, parseInt(this.value))"
                                   min="1" max="${product.stock}">
                            <button class="quantity-btn" onclick="updateCartQuantity(${product.id}, ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button class="remove-item" onclick="removeFromCart(${product.id})" title="حذف من السلة">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
    });
    
    cartContent.innerHTML = cartHTML;
    
    if (cartFooter && cartTotal) {
        cartFooter.style.display = 'block';
        cartTotal.textContent = formatPrice(getCartTotal());
    }
}

// Wishlist Functions
function addToWishlist(productId) {
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        saveWishlist();
        updateWishlistCount();
        showNotification('تم إضافة المنتج إلى المفضلة', 'success');
    } else {
        showNotification('المنتج موجود بالفعل في المفضلة', 'info');
    }
}

function removeFromWishlist(productId) {
    wishlist = wishlist.filter(id => id !== productId);
    saveWishlist();
    updateWishlistCount();
    showNotification('تم حذف المنتج من المفضلة', 'info');
}

function toggleWishlistItem(productId) {
    if (wishlist.includes(productId)) {
        removeFromWishlist(productId);
    } else {
        addToWishlist(productId);
    }
    
    // Update wishlist button appearance
    const wishlistBtns = document.querySelectorAll(`[data-product-id="${productId}"] .wishlist-btn`);
    wishlistBtns.forEach(btn => {
        btn.classList.toggle('active', wishlist.includes(productId));
    });
}

function updateWishlistCount() {
    const wishlistCountElement = document.getElementById('wishlistCount');
    if (wishlistCountElement) {
        const count = wishlist.length;
        wishlistCountElement.textContent = count;
        wishlistCountElement.style.display = count > 0 ? 'flex' : 'none';
    }
}

function toggleWishlist() {
    // This would open wishlist page/modal
    showNotification('صفحة المفضلة قيد التطوير', 'info');
}

// Checkout Functions
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('السلة فارغة', 'error');
        return;
    }
    
    // This would redirect to checkout page
    showNotification('سيتم توجيهك لصفحة الدفع', 'info');
    
    // For demo purposes, simulate checkout process
    setTimeout(() => {
        const orderNumber = Math.floor(Math.random() * 1000000);
        showNotification(`تم إنشاء الطلب رقم ${orderNumber} بنجاح!`, 'success');
        clearCart();
        toggleCart();
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        z-index: 5000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        font-weight: 500;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-right: auto;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#27ae60';
        case 'error': return '#e74c3c';
        case 'warning': return '#f39c12';
        default: return '#3498db';
    }
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSavedData();
    updateCartDisplay();
});

