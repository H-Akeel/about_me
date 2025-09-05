// Cart Management - إدارة سلة التسوق

class CartManager {
    constructor() {
        this.cart = this.loadCart();
        this.init();
    }

    init() {
        this.updateCartDisplay();
        this.setupEventListeners();
    }

    // تحميل السلة من التخزين المحلي
    loadCart() {
        const savedCart = localStorage.getItem('restaurantCart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // حفظ السلة في التخزين المحلي
    saveCart() {
        localStorage.setItem('restaurantCart', JSON.stringify(this.cart));
    }

    // إضافة طبق للسلة
    addItem(dishId, quantity = 1, notes = '') {
        const dish = dishes.find(d => d.id === dishId);
        if (!dish) return false;

        const existingItem = this.cart.find(item => 
            item.dishId === dishId && item.notes === notes
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: Date.now(),
                dishId: dishId,
                name: dish.name,
                price: dish.price,
                image: dish.image,
                quantity: quantity,
                notes: notes,
                addedAt: new Date().toISOString()
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showAddToCartMessage(dish.name);
        return true;
    }

    // حذف عنصر من السلة
    removeItem(itemId) {
        this.cart = this.cart.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartDisplay();
    }

    // تحديث كمية عنصر
    updateQuantity(itemId, newQuantity) {
        const item = this.cart.find(item => item.id === itemId);
        if (item && newQuantity > 0) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartDisplay();
        } else if (newQuantity <= 0) {
            this.removeItem(itemId);
        }
    }

    // مسح السلة
    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartDisplay();
    }

    // حساب المجموع
    getTotal() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // حساب عدد العناصر
    getItemCount() {
        return this.cart.reduce((count, item) => count + item.quantity, 0);
    }

    // حساب الضريبة
    getTax() {
        return this.getTotal() * siteSettings.taxRate;
    }

    // حساب رسوم التوصيل
    getDeliveryFee(areaId = 'center') {
        const area = deliveryAreas.find(a => a.id === areaId);
        const subtotal = this.getTotal();
        
        // توصيل مجاني للطلبات الكبيرة
        if (subtotal >= siteSettings.deliveryFeeThreshold) {
            return 0;
        }
        
        return area ? area.fee : 15;
    }

    // حساب المجموع النهائي
    getFinalTotal(areaId = 'center') {
        const subtotal = this.getTotal();
        const tax = this.getTax();
        const deliveryFee = this.getDeliveryFee(areaId);
        
        return subtotal + tax + deliveryFee;
    }

    // تحديث عرض السلة
    updateCartDisplay() {
        this.updateCartCount();
        this.updateCartSidebar();
    }

    // تحديث عداد السلة
    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const count = this.getItemCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'block' : 'none';
        }
    }

    // تحديث الشريط الجانبي للسلة
    updateCartSidebar() {
        const cartContent = document.getElementById('cartContent');
        const cartFooter = document.getElementById('cartFooter');
        
        if (!cartContent) return;

        if (this.cart.length === 0) {
            cartContent.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-bag"></i>
                    <p>سلة الطلبات فارغة</p>
                    <button class="btn btn-primary" onclick="scrollToMenu()">ابدأ الطلب</button>
                </div>
            `;
            if (cartFooter) cartFooter.style.display = 'none';
            return;
        }

        // عرض عناصر السلة
        cartContent.innerHTML = `
            <div class="cart-items">
                ${this.cart.map(item => this.createCartItemHTML(item)).join('')}
            </div>
        `;

        // عرض المجموع
        if (cartFooter) {
            cartFooter.style.display = 'block';
            const cartTotal = document.getElementById('cartTotal');
            if (cartTotal) {
                cartTotal.textContent = this.getTotal().toFixed(2);
            }
        }
    }

    // إنشاء HTML لعنصر السلة
    createCartItemHTML(item) {
        return `
            <div class="cart-item" data-item-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    ${item.notes ? `<p class="cart-item-notes">${item.notes}</p>` : ''}
                    
                    <div class="cart-item-controls">
                        <div class="quantity-controls">
                            <button onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity">${item.quantity}</span>
                            <button onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        
                        <div class="cart-item-price">
                            ${(item.price * item.quantity).toFixed(2)} ريال
                        </div>
                        
                        <button class="remove-item" onclick="cartManager.removeItem(${item.id})" title="حذف من السلة">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // عرض رسالة إضافة للسلة
    showAddToCartMessage(dishName) {
        // إنشاء رسالة منبثقة
        const message = document.createElement('div');
        message.className = 'cart-message';
        message.innerHTML = `
            <div class="cart-message-content">
                <i class="fas fa-check-circle"></i>
                <span>تم إضافة "${dishName}" للسلة</span>
            </div>
        `;

        document.body.appendChild(message);

        // إظهار الرسالة
        setTimeout(() => message.classList.add('show'), 100);

        // إخفاء الرسالة
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => message.remove(), 300);
        }, 3000);
    }

    // إعداد مستمعي الأحداث
    setupEventListeners() {
        // إغلاق السلة عند النقر خارجها
        document.addEventListener('click', (e) => {
            const cartSidebar = document.getElementById('cartSidebar');
            const cartButton = e.target.closest('[onclick*="toggleCart"]');
            
            if (cartSidebar && cartSidebar.classList.contains('open') && 
                !cartSidebar.contains(e.target) && !cartButton) {
                toggleCart();
            }
        });
    }
}

// فتح/إغلاق سلة التسوق
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    if (cartSidebar) {
        cartSidebar.classList.toggle('open');
        if (overlay) {
            overlay.classList.toggle('show');
        }
    }
}

// إضافة طبق للسلة
function addToCart(dishId, quantity = 1, notes = '') {
    return cartManager.addItem(dishId, quantity, notes);
}

// المتابعة للدفع
function proceedToCheckout() {
    if (cartManager.cart.length === 0) {
        alert('السلة فارغة! يرجى إضافة بعض الأطباق أولاً.');
        return;
    }

    // إنشاء نافذة الدفع
    showCheckoutModal();
}

// عرض نافذة الدفع
function showCheckoutModal() {
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.id = 'checkoutModal';
    
    const subtotal = cartManager.getTotal();
    const tax = cartManager.getTax();
    const deliveryFee = cartManager.getDeliveryFee();
    const total = subtotal + tax + deliveryFee;

    modal.innerHTML = `
        <div class="modal-content checkout-modal">
            <div class="modal-header">
                <h3>إتمام الطلب</h3>
                <button class="close-btn" onclick="closeCheckoutModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            
            <div class="modal-body">
                <form class="checkout-form" id="checkoutForm">
                    <!-- معلومات العميل -->
                    <div class="form-section">
                        <h4><i class="fas fa-user"></i> معلومات العميل</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>الاسم الكامل *</label>
                                <input type="text" name="customerName" required>
                            </div>
                            <div class="form-group">
                                <label>رقم الهاتف *</label>
                                <input type="tel" name="customerPhone" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>البريد الإلكتروني</label>
                            <input type="email" name="customerEmail">
                        </div>
                    </div>

                    <!-- طريقة الاستلام -->
                    <div class="form-section">
                        <h4><i class="fas fa-truck"></i> طريقة الاستلام</h4>
                        <div class="delivery-options">
                            <label class="delivery-option">
                                <input type="radio" name="deliveryType" value="delivery" checked onchange="toggleDeliveryInfo()">
                                <span class="option-content">
                                    <i class="fas fa-truck"></i>
                                    <div>
                                        <strong>توصيل</strong>
                                        <small>يتم التوصيل خلال 30-60 دقيقة</small>
                                    </div>
                                </span>
                            </label>
                            
                            <label class="delivery-option">
                                <input type="radio" name="deliveryType" value="pickup" onchange="toggleDeliveryInfo()">
                                <span class="option-content">
                                    <i class="fas fa-store"></i>
                                    <div>
                                        <strong>استلام من المطعم</strong>
                                        <small>جاهز خلال 20-30 دقيقة</small>
                                    </div>
                                </span>
                            </label>
                        </div>
                    </div>

                    <!-- معلومات التوصيل -->
                    <div class="form-section" id="deliveryInfo">
                        <h4><i class="fas fa-map-marker-alt"></i> عنوان التوصيل</h4>
                        <div class="form-group">
                            <label>المنطقة *</label>
                            <select name="deliveryArea" onchange="updateDeliveryFee()" required>
                                ${deliveryAreas.map(area => `
                                    <option value="${area.id}">${area.name} - ${area.fee} ريال (${area.estimatedTime})</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>العنوان التفصيلي *</label>
                            <textarea name="deliveryAddress" rows="3" placeholder="الحي، الشارع، رقم المبنى، رقم الشقة..." required></textarea>
                        </div>
                    </div>

                    <!-- طريقة الدفع -->
                    <div class="form-section">
                        <h4><i class="fas fa-credit-card"></i> طريقة الدفع</h4>
                        <div class="payment-methods">
                            ${paymentMethods.filter(method => method.available).map(method => `
                                <label class="payment-method">
                                    <input type="radio" name="paymentMethod" value="${method.id}" ${method.id === 'cash' ? 'checked' : ''}>
                                    <span class="method-content">
                                        <i class="${method.icon}"></i>
                                        ${method.name}
                                    </span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <!-- ملاحظات -->
                    <div class="form-section">
                        <h4><i class="fas fa-sticky-note"></i> ملاحظات إضافية</h4>
                        <div class="form-group">
                            <textarea name="orderNotes" rows="3" placeholder="أي ملاحظات خاصة للطلب..."></textarea>
                        </div>
                    </div>

                    <!-- ملخص الطلب -->
                    <div class="order-summary">
                        <h4><i class="fas fa-receipt"></i> ملخص الطلب</h4>
                        <div class="summary-items">
                            ${cartManager.cart.map(item => `
                                <div class="summary-item">
                                    <span>${item.name} × ${item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)} ريال</span>
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="summary-totals">
                            <div class="summary-row">
                                <span>المجموع الفرعي:</span>
                                <span>${subtotal.toFixed(2)} ريال</span>
                            </div>
                            <div class="summary-row">
                                <span>ضريبة القيمة المضافة (15%):</span>
                                <span>${tax.toFixed(2)} ريال</span>
                            </div>
                            <div class="summary-row" id="deliveryFeeRow">
                                <span>رسوم التوصيل:</span>
                                <span id="deliveryFeeAmount">${deliveryFee.toFixed(2)} ريال</span>
                            </div>
                            <div class="summary-row total-row">
                                <span><strong>المجموع النهائي:</strong></span>
                                <span id="finalTotal"><strong>${total.toFixed(2)} ريال</strong></span>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-full btn-large">
                        <i class="fas fa-check"></i>
                        تأكيد الطلب
                    </button>
                </form>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // إعداد نموذج الدفع
    setupCheckoutForm();
}

// إغلاق نافذة الدفع
function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// تبديل معلومات التوصيل
function toggleDeliveryInfo() {
    const deliveryInfo = document.getElementById('deliveryInfo');
    const deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
    
    if (deliveryInfo) {
        deliveryInfo.style.display = deliveryType === 'delivery' ? 'block' : 'none';
        
        // تحديث الملخص
        updateOrderSummary();
    }
}

// تحديث رسوم التوصيل
function updateDeliveryFee() {
    updateOrderSummary();
}

// تحديث ملخص الطلب
function updateOrderSummary() {
    const deliveryType = document.querySelector('input[name="deliveryType"]:checked')?.value;
    const areaSelect = document.querySelector('select[name="deliveryArea"]');
    
    const subtotal = cartManager.getTotal();
    const tax = cartManager.getTax();
    let deliveryFee = 0;
    
    if (deliveryType === 'delivery' && areaSelect) {
        deliveryFee = cartManager.getDeliveryFee(areaSelect.value);
    }
    
    const total = subtotal + tax + deliveryFee;
    
    // تحديث العرض
    const deliveryFeeRow = document.getElementById('deliveryFeeRow');
    const deliveryFeeAmount = document.getElementById('deliveryFeeAmount');
    const finalTotal = document.getElementById('finalTotal');
    
    if (deliveryFeeRow) {
        deliveryFeeRow.style.display = deliveryType === 'delivery' ? 'flex' : 'none';
    }
    
    if (deliveryFeeAmount) {
        deliveryFeeAmount.textContent = `${deliveryFee.toFixed(2)} ريال`;
    }
    
    if (finalTotal) {
        finalTotal.innerHTML = `<strong>${total.toFixed(2)} ريال</strong>`;
    }
}

// إعداد نموذج الدفع
function setupCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // جمع بيانات النموذج
        const formData = new FormData(form);
        const orderData = {
            customer: {
                name: formData.get('customerName'),
                phone: formData.get('customerPhone'),
                email: formData.get('customerEmail')
            },
            delivery: {
                type: formData.get('deliveryType'),
                area: formData.get('deliveryArea'),
                address: formData.get('deliveryAddress')
            },
            payment: {
                method: formData.get('paymentMethod')
            },
            items: cartManager.cart,
            notes: formData.get('orderNotes'),
            totals: {
                subtotal: cartManager.getTotal(),
                tax: cartManager.getTax(),
                deliveryFee: formData.get('deliveryType') === 'delivery' ? 
                    cartManager.getDeliveryFee(formData.get('deliveryArea')) : 0,
                total: cartManager.getFinalTotal(formData.get('deliveryArea'))
            },
            orderDate: new Date().toISOString(),
            orderId: 'ORD-' + Date.now()
        };

        // معالجة الطلب
        processOrder(orderData);
    });
}

// معالجة الطلب
function processOrder(orderData) {
    // إظهار رسالة التحميل
    showLoading('جاري معالجة طلبكم...');

    // محاكاة معالجة الطلب
    setTimeout(() => {
        hideLoading();
        
        // حفظ الطلب
        saveOrder(orderData);
        
        // مسح السلة
        cartManager.clearCart();
        
        // إغلاق نافذة الدفع
        closeCheckoutModal();
        
        // إظهار رسالة النجاح
        showOrderSuccess(orderData);
        
    }, 2000);
}

// حفظ الطلب
function saveOrder(orderData) {
    const orders = JSON.parse(localStorage.getItem('restaurantOrders') || '[]');
    orders.push(orderData);
    localStorage.setItem('restaurantOrders', JSON.stringify(orders));
}

// إظهار رسالة نجاح الطلب
function showOrderSuccess(orderData) {
    const modal = document.createElement('div');
    modal.className = 'modal show';
    modal.innerHTML = `
        <div class="modal-content success-modal">
            <div class="modal-body">
                <div class="success-content">
                    <div class="success-icon">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    
                    <h2>تم تأكيد طلبكم بنجاح!</h2>
                    <p>رقم الطلب: <strong>${orderData.orderId}</strong></p>
                    
                    <div class="order-details">
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <span>وقت التحضير المتوقع: ${orderData.delivery.type === 'delivery' ? '45-60' : '20-30'} دقيقة</span>
                        </div>
                        
                        <div class="detail-item">
                            <i class="fas fa-phone"></i>
                            <span>سنتواصل معكم على: ${orderData.customer.phone}</span>
                        </div>
                        
                        <div class="detail-item">
                            <i class="fas fa-money-bill-wave"></i>
                            <span>المبلغ الإجمالي: ${orderData.totals.total.toFixed(2)} ريال</span>
                        </div>
                    </div>
                    
                    <div class="success-actions">
                        <button class="btn btn-primary" onclick="closeSuccessModal()">
                            <i class="fas fa-home"></i>
                            العودة للرئيسية
                        </button>
                        
                        <button class="btn btn-outline" onclick="trackOrder('${orderData.orderId}')">
                            <i class="fas fa-search"></i>
                            تتبع الطلب
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// إغلاق نافذة النجاح
function closeSuccessModal() {
    const modal = document.querySelector('.success-modal').closest('.modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// تتبع الطلب
function trackOrder(orderId) {
    alert(`تتبع الطلب ${orderId} - هذه الميزة ستكون متاحة قريباً!`);
    closeSuccessModal();
}

// إظهار/إخفاء التحميل
function showLoading(message = 'جاري التحميل...') {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.querySelector('p').textContent = message;
        loading.classList.add('show');
    }
}

function hideLoading() {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.remove('show');
    }
}

// إنشاء مدير السلة
const cartManager = new CartManager();

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CartManager, toggleCart, addToCart, proceedToCheckout };
}

