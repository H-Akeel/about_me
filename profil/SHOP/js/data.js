// Sample Data for E-commerce Website

// Categories Data
const categories = [
    {
        id: 1,
        name: "إلكترونيات",
        name_en: "Electronics",
        description: "أحدث الأجهزة الإلكترونية والتقنية",
        icon: "fas fa-laptop",
        image: "images/categories/electronics.jpg"
    },
    {
        id: 2,
        name: "أزياء",
        name_en: "Fashion",
        description: "أزياء عصرية للرجال والنساء",
        icon: "fas fa-tshirt",
        image: "images/categories/fashion.jpg"
    },
    {
        id: 3,
        name: "منزل وحديقة",
        name_en: "Home & Garden",
        description: "كل ما تحتاجه لمنزلك وحديقتك",
        icon: "fas fa-home",
        image: "images/categories/home.jpg"
    },
    {
        id: 4,
        name: "رياضة",
        name_en: "Sports",
        description: "معدات رياضية ولياقة بدنية",
        icon: "fas fa-dumbbell",
        image: "images/categories/sports.jpg"
    },
    {
        id: 5,
        name: "كتب",
        name_en: "Books",
        description: "كتب ومراجع في جميع المجالات",
        icon: "fas fa-book",
        image: "images/categories/books.jpg"
    }
];

// Products Data
const products = [
    {
        id: 1,
        name: "سماعات لاسلكية فاخرة",
        name_en: "Premium Wireless Headphones",
        description: "سماعات لاسلكية عالية الجودة مع إلغاء الضوضاء وبطارية تدوم 30 ساعة",
        category_id: 1,
        category: "إلكترونيات",
        price: 299,
        original_price: 399,
        discount: 25,
        image: "images/products/headphones.jpg",
        images: [
            "images/products/headphones.jpg",
            "images/products/headphones-2.jpg",
            "images/products/headphones-3.jpg"
        ],
        rating: 4.8,
        reviews_count: 124,
        stock: 15,
        is_featured: true,
        is_new: false,
        tags: ["لاسلكي", "إلغاء الضوضاء", "بطارية طويلة"],
        specifications: {
            "نوع الاتصال": "Bluetooth 5.0",
            "عمر البطارية": "30 ساعة",
            "إلغاء الضوضاء": "نعم",
            "الوزن": "250 جرام",
            "الضمان": "سنتان"
        }
    },
    {
        id: 2,
        name: "مجموعة أزياء أنيقة",
        name_en: "Elegant Fashion Collection",
        description: "مجموعة أزياء عصرية وأنيقة مناسبة لجميع المناسبات",
        category_id: 2,
        category: "أزياء",
        price: 199,
        original_price: null,
        discount: 0,
        image: "images/products/fashion.jpg",
        images: [
            "images/products/fashion.jpg",
            "images/products/fashion-2.jpg"
        ],
        rating: 4.6,
        reviews_count: 89,
        stock: 8,
        is_featured: true,
        is_new: true,
        tags: ["أنيق", "عصري", "مريح"],
        specifications: {
            "المادة": "قطن 100%",
            "الألوان المتاحة": "أسود، أبيض، أزرق",
            "المقاسات": "S, M, L, XL",
            "العناية": "غسيل آلي",
            "المنشأ": "تركيا"
        }
    },
    {
        id: 3,
        name: "أثاث منزلي عصري",
        name_en: "Modern Home Furniture",
        description: "أثاث منزلي عصري وعملي يضفي لمسة جمالية على منزلك",
        category_id: 3,
        category: "منزل وحديقة",
        price: 899,
        original_price: 1199,
        discount: 25,
        image: "images/products/furniture.jpg",
        images: [
            "images/products/furniture.jpg",
            "images/products/furniture-2.jpg"
        ],
        rating: 4.7,
        reviews_count: 67,
        stock: 5,
        is_featured: true,
        is_new: false,
        tags: ["عصري", "عملي", "جودة عالية"],
        specifications: {
            "المادة": "خشب طبيعي",
            "الأبعاد": "120x80x75 سم",
            "الوزن": "25 كيلو",
            "التجميع": "مطلوب",
            "الضمان": "5 سنوات"
        }
    },
    {
        id: 4,
        name: "حزمة إلكترونيات ذكية",
        name_en: "Smart Electronics Bundle",
        description: "حزمة متكاملة من الأجهزة الذكية لمنزل متصل ومتطور",
        category_id: 1,
        category: "إلكترونيات",
        price: 599,
        original_price: null,
        discount: 0,
        image: "images/products/electronics.jpg",
        images: [
            "images/products/electronics.jpg",
            "images/products/electronics-2.jpg"
        ],
        rating: 4.9,
        reviews_count: 156,
        stock: 12,
        is_featured: true,
        is_new: true,
        tags: ["ذكي", "متصل", "سهل الاستخدام"],
        specifications: {
            "المحتويات": "مساعد ذكي، مفاتيح ذكية، مستشعرات",
            "التوافق": "iOS, Android",
            "الاتصال": "WiFi, Bluetooth",
            "التطبيق": "مجاني",
            "الضمان": "سنة واحدة"
        }
    },
    {
        id: 5,
        name: "إكسسوارات مصممة",
        name_en: "Designer Accessories",
        description: "إكسسوارات فاخرة ومصممة بعناية لإطلالة مميزة",
        category_id: 2,
        category: "أزياء",
        price: 149,
        original_price: 199,
        discount: 25,
        image: "images/products/accessories.jpg",
        images: [
            "images/products/accessories.jpg",
            "images/products/accessories-2.jpg"
        ],
        rating: 4.5,
        reviews_count: 203,
        stock: 20,
        is_featured: true,
        is_new: false,
        tags: ["فاخر", "مصمم", "أنيق"],
        specifications: {
            "المادة": "جلد طبيعي",
            "الألوان": "بني، أسود، بيج",
            "الحجم": "قابل للتعديل",
            "المنشأ": "إيطاليا",
            "الضمان": "سنة واحدة"
        }
    },
    {
        id: 6,
        name: "ديكور منزلي فاخر",
        name_en: "Luxury Home Decor",
        description: "قطع ديكور منزلي فاخرة تضفي جمالاً وأناقة على مساحتك",
        category_id: 3,
        category: "منزل وحديقة",
        price: 449,
        original_price: null,
        discount: 0,
        image: "images/products/decor.jpg",
        images: [
            "images/products/decor.jpg",
            "images/products/decor-2.jpg"
        ],
        rating: 4.4,
        reviews_count: 91,
        stock: 7,
        is_featured: true,
        is_new: false,
        tags: ["فاخر", "ديكور", "أنيق"],
        specifications: {
            "المادة": "سيراميك فاخر",
            "الأبعاد": "30x20x15 سم",
            "الوزن": "2 كيلو",
            "العناية": "تنظيف بقطعة قماش",
            "المنشأ": "الصين"
        }
    }
];

// Payment Methods
const paymentMethods = [
    {
        id: "credit_card",
        name: "بطاقة ائتمان",
        name_en: "Credit Card",
        description: "ادفع باستخدام فيزا أو ماستركارد أو أمريكان إكسبريس",
        icon: "fas fa-credit-card",
        enabled: true
    },
    {
        id: "paypal",
        name: "باي بال",
        name_en: "PayPal",
        description: "ادفع بأمان باستخدام حساب باي بال",
        icon: "fab fa-paypal",
        enabled: true
    },
    {
        id: "apple_pay",
        name: "أبل باي",
        name_en: "Apple Pay",
        description: "ادفع باستخدام Touch ID أو Face ID",
        icon: "fab fa-apple-pay",
        enabled: true
    },
    {
        id: "cash_on_delivery",
        name: "الدفع عند الاستلام",
        name_en: "Cash on Delivery",
        description: "ادفع عند استلام طلبك",
        icon: "fas fa-money-bill-wave",
        enabled: true
    },
    {
        id: "bank_transfer",
        name: "تحويل بنكي",
        name_en: "Bank Transfer",
        description: "حول الأموال مباشرة من البنك",
        icon: "fas fa-university",
        enabled: true
    }
];

// Shipping Methods
const shippingMethods = [
    {
        id: "standard",
        name: "شحن عادي",
        name_en: "Standard Shipping",
        description: "التوصيل خلال 3-5 أيام عمل",
        price: 25,
        estimated_days: "3-5"
    },
    {
        id: "express",
        name: "شحن سريع",
        name_en: "Express Shipping",
        description: "التوصيل خلال 1-2 أيام عمل",
        price: 50,
        estimated_days: "1-2"
    },
    {
        id: "same_day",
        name: "توصيل نفس اليوم",
        name_en: "Same Day Delivery",
        description: "التوصيل في نفس اليوم ",
        price: 75,
        estimated_days: "نفس اليوم"
    }
];

// Reviews Data
const reviews = [
    {
        id: 1,
        product_id: 1,
        user_name: "أحمد محمد",
        rating: 5,
        comment: "سماعات ممتازة جداً، جودة الصوت رائعة وإلغاء الضوضاء فعال جداً",
        date: "2025-08-25",
        verified: true
    },
    {
        id: 2,
        product_id: 1,
        user_name: "فاطمة أحمد",
        rating: 4,
        comment: "جودة جيدة لكن السعر مرتفع قليلاً",
        date: "2025-08-20",
        verified: true
    },
    {
        id: 3,
        product_id: 2,
        user_name: "سارة علي",
        rating: 5,
        comment: "ملابس جميلة جداً وخامة ممتازة، أنصح بالشراء",
        date: "2025-08-22",
        verified: true
    }
];

// User Data (for demo purposes)
let currentUser = null;

// Cart Data
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Wishlist Data
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

// Helper Functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    }).format(price);

}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star star"></i>';
        } else {
            stars += '<i class="fas fa-star star empty"></i>';
        }
    }
    return stars;
}

function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

function getCategoryById(id) {
    return categories.find(category => category.id === parseInt(id));
}

function getProductsByCategory(categoryId) {
    return products.filter(product => product.category_id === parseInt(categoryId));
}

function getFeaturedProducts() {
    return products.filter(product => product.is_featured);
}

function getNewProducts() {
    return products.filter(product => product.is_new);
}

function searchProducts(query) {
    if (!query) return products;
    
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.name_en.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
}

// Local Storage Functions
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function saveWishlist() {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function saveUser() {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

// Load saved data
function loadSavedData() {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    
    updateCartCount();
    updateWishlistCount();
}

