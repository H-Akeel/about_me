// Restaurant Data - أطباق المطعم والبيانات

// فئات الأطباق
const categories = [
    { id: 'appetizers', name: 'المقبلات', icon: 'fas fa-seedling' },
    { id: 'main-dishes', name: 'الأطباق الرئيسية', icon: 'fas fa-utensils' },
    { id: 'grills', name: 'المشاوي', icon: 'fas fa-fire' },
    { id: 'pastries', name: 'المعجنات والبيتزا', icon: 'fas fa-pizza-slice' },
    { id: 'desserts', name: 'الحلويات', icon: 'fas fa-ice-cream' },
    { id: 'beverages', name: 'المشروبات', icon: 'fas fa-coffee' }
];

// قائمة الأطباق
const dishes = [
    // المقبلات
    {
        id: 1,
        name: 'حمص بالطحينة',
        category: 'appetizers',
        description: 'حمص كريمي مع الطحينة وزيت الزيتون والصنوبر المحمص',
        price: 25,
        originalPrice: null,
        image: 'images/food/hummus.jpg',
        rating: 4.8,
        reviewCount: 156,
        isNew: false,
        isPopular: true,
        isVegetarian: true,
        isSpicy: false,
        preparationTime: '10 دقائق',
        ingredients: ['حمص', 'طحينة', 'ثوم', 'ليمون', 'زيت زيتون', 'صنوبر']
    },
    {
        id: 2,
        name: 'متبل باذنجان',
        category: 'appetizers',
        description: 'باذنجان مشوي مهروس مع الطحينة والثوم والليمون',
        price: 22,
        originalPrice: null,
        image: 'images/food/middle-eastern-dishes.jpg',
        rating: 4.6,
        reviewCount: 89,
        isNew: false,
        isPopular: false,
        isVegetarian: true,
        isSpicy: false,
        preparationTime: '15 دقيقة',
        ingredients: ['باذنجان', 'طحينة', 'ثوم', 'ليمون', 'زيت زيتون']
    },
    {
        id: 3,
        name: 'فتوش',
        category: 'appetizers',
        description: 'سلطة خضار مشكلة مع الخبز المحمص ودبس الرمان',
        price: 28,
        originalPrice: null,
        image: 'images/food/mezze-platter.jpg',
        rating: 4.7,
        reviewCount: 134,
        isNew: false,
        isPopular: true,
        isVegetarian: true,
        isSpicy: false,
        preparationTime: '12 دقيقة',
        ingredients: ['خس', 'طماطم', 'خيار', 'فجل', 'خبز محمص', 'دبس رمان']
    },
    {
        id: 4,
        name: 'تبولة',
        category: 'appetizers',
        description: 'سلطة البقدونس الطازجة مع البرغل والطماطم والليمون',
        price: 24,
        originalPrice: null,
        image: 'images/food/arabic-dishes-2.jpg',
        rating: 4.5,
        reviewCount: 98,
        isNew: false,
        isPopular: false,
        isVegetarian: true,
        isSpicy: false,
        preparationTime: '15 دقيقة',
        ingredients: ['بقدونس', 'برغل', 'طماطم', 'بصل أخضر', 'ليمون', 'زيت زيتون']
    },
    {
        id: 5,
        name: 'كبة مقلية',
        category: 'appetizers',
        description: 'كبة محشوة باللحم والصنوبر مقلية حتى الذهبي',
        price: 35,
        originalPrice: null,
        image: 'images/food/arabic-dishes-1.jpg',
        rating: 4.9,
        reviewCount: 203,
        isNew: false,
        isPopular: true,
        isVegetarian: false,
        isSpicy: false,
        preparationTime: '25 دقيقة',
        ingredients: ['برغل', 'لحم مفروم', 'بصل', 'صنوبر', 'بهارات']
    },

    // الأطباق الرئيسية
    {
        id: 6,
        name: 'مندي لحم',
        category: 'main-dishes',
        description: 'لحم خروف طري مطبوخ على الفحم مع الأرز البسمتي المعطر',
        price: 85,
        originalPrice: 95,
        image: 'images/food/arabic-dishes-1.jpg',
        rating: 4.9,
        reviewCount: 287,
        isNew: false,
        isPopular: true,
        isVegetarian: false,
        isSpicy: true,
        preparationTime: '45 دقيقة',
        ingredients: ['لحم خروف', 'أرز بسمتي', 'بهارات مندي', 'بصل', 'طماطم']
    },
    {
        id: 7,
        name: 'فروج مشوي',
        category: 'main-dishes',
        description: 'دجاج كامل مشوي بالأعشاب والتوابل مع البطاطس المشوية',
        price: 65,
        originalPrice: null,
        image: 'images/food/arabic-dishes-2.jpg',
        rating: 4.7,
        reviewCount: 198,
        isNew: false,
        isPopular: true,
        isVegetarian: false,
        isSpicy: false,
        preparationTime: '40 دقيقة',
        ingredients: ['دجاج كامل', 'بطاطس', 'أعشاب', 'ثوم', 'ليمون']
    },
    {
        id: 8,
        name: 'سمك مشوي',
        category: 'main-dishes',
        description: 'سمك طازج مشوي مع الخضار والأرز الأبيض',
        price: 75,
        originalPrice: null,
        image: 'images/food/middle-eastern-dishes.jpg',
        rating: 4.6,
        reviewCount: 145,
        isNew: true,
        isPopular: false,
        isVegetarian: false,
        isSpicy: false,
        preparationTime: '35 دقيقة',
        ingredients: ['سمك طازج', 'خضار مشكلة', 'أرز أبيض', 'ليمون', 'أعشاب']
    },
    {
        id: 9,
        name: 'كوسا محشي',
        category: 'main-dishes',
        description: 'كوسا محشوة بالأرز واللحم المفروم مطبوخة بصلصة الطماطم',
        price: 55,
        originalPrice: null,
        image: 'images/food/arabic-dishes-1.jpg',
        rating: 4.4,
        reviewCount: 112,
        isNew: false,
        isPopular: false,
        isVegetarian: false,
        isSpicy: false,
        preparationTime: '50 دقيقة',
        ingredients: ['كوسا', 'أرز', 'لحم مفروم', 'طماطم', 'بصل', 'بهارات']
    },

    // المشاوي
    {
        id: 10,
        name: 'مشاوي مشكلة',
        category: 'grills',
        description: 'تشكيلة من الكباب والتكة والكفتة مع الخضار المشوية',
        price: 95,
        originalPrice: 110,
        image: 'images/food/arabic-dishes-1.jpg',
        rating: 4.8,
        reviewCount: 324,
        isNew: false,
        isPopular: true,
        isVegetarian: false,
        isSpicy: true,
        preparationTime: '30 دقيقة',
        ingredients: ['لحم خروف', 'لحم عجل', 'دجاج', 'خضار مشوية', 'بهارات']
    },
    {
        id: 11,
        name: 'كباب حلبي',
        category: 'grills',
        description: 'كباب لحم مفروم بالبقدونس والبصل مشوي على الفحم',
        price: 68,
        originalPrice: null,
        image: 'images/food/arabic-dishes-2.jpg',
        rating: 4.7,
        reviewCount: 189,
        isNew: false,
        isPopular: true,
        isVegetarian: false,
        isSpicy: true,
        preparationTime: '25 دقيقة',
        ingredients: ['لحم مفروم', 'بقدونس', 'بصل', 'بهارات حلبية']
    },
    {
        id: 12,
        name: 'تكة لحم',
        category: 'grills',
        description: 'قطع لحم طرية متبلة ومشوية على الفحم',
        price: 72,
        originalPrice: null,
        image: 'images/food/middle-eastern-dishes.jpg',
        rating: 4.6,
        reviewCount: 156,
        isNew: false,
        isPopular: false,
        isVegetarian: false,
        isSpicy: true,
        preparationTime: '28 دقيقة',
        ingredients: ['لحم خروف', 'بصل', 'فلفل ألوان', 'بهارات مشكلة']
    },

    // المعجنات والبيتزا
    {
        id: 13,
        name: 'بيتزا مارجريتا',
        category: 'pastries',
        description: 'بيتزا كلاسيكية بصلصة الطماطم والجبن والريحان',
        price: 45,
        originalPrice: null,
        image: 'images/food/arabic-dishes-2.jpg',
        rating: 4.5,
        reviewCount: 167,
        isNew: false,
        isPopular: true,
        isVegetarian: true,
        isSpicy: false,
        preparationTime: '20 دقيقة',
        ingredients: ['عجينة بيتزا', 'صلصة طماطم', 'جبن موزاريلا', 'ريحان']
    },
    {
        id: 14,
        name: 'مناقيش زعتر',
        category: 'pastries',
        description: 'خبز مفرود مع الزعتر وزيت الزيتون مخبوز في الفرن',
        price: 18,
        originalPrice: null,
        image: 'images/food/mezze-platter.jpg',
        rating: 4.3,
        reviewCount: 89,
        isNew: false,
        isPopular: false,
        isVegetarian: true,
        isSpicy: false,
        preparationTime: '15 دقيقة',
        ingredients: ['عجينة', 'زعتر', 'زيت زيتون', 'سمسم']
    },
    {
        id: 15,
        name: 'فطائر سبانخ',
        category: 'pastries',
        description: 'فطائر محشوة بالسبانخ والبصل والسماق',
        price: 22,
        originalPrice: null,
        image: 'images/food/arabic-dishes-1.jpg',
        rating: 4.4,
        reviewCount: 134,
        isNew: false,
        isPopular: false,
        isVegetarian: true,
        isSpicy: false,
        preparationTime: '18 دقيقة',
        ingredients: ['عجينة', 'سبانخ', 'بصل', 'سماق', 'زيت زيتون']
    },

    // الحلويات
    {
        id: 16,
        name: 'بقلاوة',
        category: 'desserts',
        description: 'حلى شرقي بالعجين الرقيق والمكسرات والقطر',
        price: 28,
        originalPrice: null,
        image: 'images/food/arabic-dishes-2.jpg',
        rating: 4.8,
        reviewCount: 245,
        isNew: false,
        isPopular: true,
        isVegetarian: true,
        isSpicy: false,
        preparationTime: '5 دقائق',
        ingredients: ['عجين فيلو', 'فستق حلبي', 'جوز', 'قطر', 'سمن']
    },
    {
        id: 17,
        name: 'كنافة نابلسية',
        category: 'desserts',
        description: 'كنافة بالجبن الطازج والقطر والفستق الحلبي',
        price: 32,
        originalPrice: null,
        image: 'images/food/middle-eastern-dishes.jpg',
        rating: 4.7,
        reviewCount: 178,
        isNew: false,
        isPopular: true,
        isVegetarian: true,
        isSpicy: false,
        preparationTime: '8 دقائق',
        ingredients: ['كنافة', 'جبن عكاوي', 'قطر', 'فستق حلبي', 'سمن']
    },
    {
        id: 18,
        name: 'مهلبية',
        category: 'desserts',
        description: 'حلى بارد بالحليب والنشا مزين بالفستق والقرفة',
        price: 20,
        originalPrice: null,
        image: 'images/food/arabic-dishes-1.jpg',
        rating: 4.4,
        reviewCount: 98,
        isNew: false,
        isPopular: false,
        isVegetarian: true,
        isSpicy: false,
        preparationTime: '3 دقائق',
        ingredients: ['حليب', 'نشا', 'سكر', 'ماء ورد', 'فستق', 'قرفة']
    },

    // المشروبات
    {
        id: 19,
        name: 'عصير ليمون بالنعناع',
        category: 'beverages',
        description: 'عصير ليمون طازج مع النعناع والثلج',
        price: 15,
        originalPrice: null,
        image: 'images/food/mezze-platter.jpg',
        rating: 4.6,
        reviewCount: 156,
        isNew: false,
        isPopular: true,
        isVegetarian: true,
        isSpicy: false,
        preparationTime: '5 دقائق',
        ingredients: ['ليمون طازج', 'نعناع', 'سكر', 'ماء', 'ثلج']
    },
    {
        id: 20,
        name: 'قهوة عربية',
        category: 'beverages',
        description: 'قهوة عربية أصيلة بالهيل والزعفران',
        price: 12,
        originalPrice: null,
        image: 'images/food/arabic-dishes-2.jpg',
        rating: 4.5,
        reviewCount: 89,
        isNew: false,
        isPopular: false,
        isVegetarian: true,
        isSpicy: false,
        preparationTime: '8 دقائق',
        ingredients: ['قهوة عربية', 'هيل', 'زعفران', 'ماء']
    },
    {
        id: 21,
        name: 'شاي أخضر',
        category: 'beverages',
        description: 'شاي أخضر طبيعي مع النعناع الطازج',
        price: 10,
        originalPrice: null,
        image: 'images/food/middle-eastern-dishes.jpg',
        rating: 4.3,
        reviewCount: 67,
        isNew: false,
        isPopular: false,
        isVegetarian: true,
        isSpicy: false,
        preparationTime: '5 دقائق',
        ingredients: ['شاي أخضر', 'نعناع طازج', 'سكر']
    }
];

// العروض الخاصة
const specialOffers = [
    {
        id: 'offer1',
        title: 'وجبة مشاوي مشكلة',
        description: 'مشاوي مشكلة + أرز + سلطة + مشروب + حلى',
        originalPrice: 120,
        offerPrice: 85,
        discount: 30,
        image: 'images/food/arabic-dishes-1.jpg',
        validUntil: '2025-09-30',
        isActive: true
    },
    {
        id: 'offer2',
        title: 'عرض العائلة',
        description: 'فروج مشوي + مقبلات مشكلة + أرز + مشروبات',
        originalPrice: 150,
        offerPrice: 110,
        discount: 27,
        image: 'images/food/arabic-dishes-2.jpg',
        validUntil: '2025-09-15',
        isActive: true
    }
];

// طرق الدفع
const paymentMethods = [
    { id: 'cash', name: 'الدفع نقداً', icon: 'fas fa-money-bill-wave', available: true },
    { id: 'card', name: 'بطاقة ائتمان', icon: 'fas fa-credit-card', available: true },
    { id: 'apple-pay', name: 'أبل باي', icon: 'fab fa-apple-pay', available: true },
    { id: 'stc-pay', name: 'STC Pay', icon: 'fas fa-mobile-alt', available: true },
    { id: 'bank-transfer', name: 'تحويل بنكي', icon: 'fas fa-university', available: false }
];

// مناطق التوصيل
const deliveryAreas = [
    { id: 'center', name: 'وسط المدينة', fee: 15, estimatedTime: '30-45 دقيقة' },
    { id: 'north', name: 'شمال المدينة', fee: 20, estimatedTime: '45-60 دقيقة' },
    { id: 'south', name: 'جنوب المدينة', fee: 20, estimatedTime: '45-60 دقيقة' },
    { id: 'east', name: 'شرق المدينة', fee: 25, estimatedTime: '50-70 دقيقة' },
    { id: 'west', name: 'غرب المدينة', fee: 25, estimatedTime: '50-70 دقيقة' }
];

// أوقات العمل
const workingHours = {
    sunday: { open: '10:00', close: '24:00', isOpen: true },
    monday: { open: '10:00', close: '24:00', isOpen: true },
    tuesday: { open: '10:00', close: '24:00', isOpen: true },
    wednesday: { open: '10:00', close: '24:00', isOpen: true },
    thursday: { open: '10:00', close: '24:00', isOpen: true },
    friday: { open: '14:00', close: '24:00', isOpen: true },
    saturday: { open: '10:00', close: '24:00', isOpen: true }
};

// معلومات المطعم
const restaurantInfo = {
    name: 'مطعم عربي',
    slogan: 'أصالة الطعم',
    description: 'مطعم عربي أصيل يقدم أشهى الأطباق العربية والشرق أوسطية في أجواء دافئة ومريحة مع خدمة متميزة.',
    phone: '+966 50 123 4567',
    email: 'info@arabicrestaurant.sa',
    address: 'الرياض، حي الملك فهد، شارع العليا',
    coordinates: { lat: 24.7136, lng: 46.6753 },
    socialMedia: {
        facebook: 'https://facebook.com/arabicrestaurant',
        instagram: 'https://instagram.com/arabicrestaurant',
        twitter: 'https://twitter.com/arabicrestaurant',
        whatsapp: 'https://wa.me/966501234567'
    },
    established: 2010,
    rating: 4.8,
    reviewCount: 1247
};

// المراجعات والتقييمات
const reviews = [
    {
        id: 1,
        customerName: 'أحمد محمد',
        rating: 5,
        comment: 'طعم رائع وخدمة ممتازة. المطعم يقدم أطباق أصيلة بجودة عالية. أنصح بزيارته بشدة.',
        date: '2025-08-25',
        dishId: 10,
        verified: true
    },
    {
        id: 2,
        customerName: 'فاطمة أحمد',
        rating: 5,
        comment: 'أجواء رائعة وطعام لذيذ. الكباب الحلبي والحمص من أفضل ما تذوقت. خدمة التوصيل سريعة.',
        date: '2025-08-23',
        dishId: 11,
        verified: true
    },
    {
        id: 3,
        customerName: 'سارة علي',
        rating: 5,
        comment: 'مطعم عائلي رائع. الأطفال أحبوا الطعام والأجواء. نأتي هنا كل أسبوع مع العائلة.',
        date: '2025-08-20',
        dishId: 7,
        verified: true
    },
    {
        id: 4,
        customerName: 'محمد خالد',
        rating: 4,
        comment: 'المندي لذيذ جداً والأرز معطر. الخدمة جيدة لكن أحياناً يكون هناك انتظار.',
        date: '2025-08-18',
        dishId: 6,
        verified: true
    },
    {
        id: 5,
        customerName: 'نورا سعد',
        rating: 5,
        comment: 'البقلاوة والكنافة رائعة! الحلويات طازجة ولذيذة. المكان نظيف والموظفون مهذبون.',
        date: '2025-08-15',
        dishId: 16,
        verified: true
    }
];

// الأسئلة الشائعة
const faq = [
    {
        question: 'ما هي أوقات العمل؟',
        answer: 'نعمل يومياً من الساعة 10:00 صباحاً حتى 12:00 منتصف الليل، عدا يوم الجمعة من 2:00 ظهراً حتى 12:00 منتصف الليل.'
    },
    {
        question: 'هل تقدمون خدمة التوصيل؟',
        answer: 'نعم، نقدم خدمة التوصيل لجميع أنحاء المدينة. رسوم التوصيل تتراوح من 15-25 ريال حسب المنطقة.'
    },
    {
        question: 'هل يمكن حجز طاولة مسبقاً؟',
        answer: 'نعم، يمكنكم حجز طاولة مسبقاً عبر الموقع أو الاتصال بنا. ننصح بالحجز المسبق خاصة في نهاية الأسبوع.'
    },
    {
        question: 'هل تتوفر خيارات نباتية؟',
        answer: 'نعم، لدينا مجموعة واسعة من الأطباق النباتية مثل الحمص والمتبل والفتوش والتبولة.'
    },
    {
        question: 'ما هي طرق الدفع المتاحة؟',
        answer: 'نقبل الدفع نقداً، بطاقات الائتمان، أبل باي، وSTC Pay.'
    },
    {
        question: 'هل تقدمون وجبات للأطفال؟',
        answer: 'نعم، لدينا قائمة خاصة للأطفال تتضمن أطباق مناسبة لأعمارهم وأذواقهم.'
    }
];

// إعدادات الموقع
const siteSettings = {
    currency: 'ريال',
    language: 'ar',
    timezone: 'Asia/Riyadh',
    taxRate: 0.15, // 15% ضريبة القيمة المضافة
    deliveryFeeThreshold: 100, // الحد الأدنى للتوصيل المجاني
    maxDeliveryDistance: 25, // أقصى مسافة توصيل بالكيلومتر
    averagePreparationTime: 30, // متوسط وقت التحضير بالدقائق
    minOrderAmount: 50 // أقل مبلغ للطلب
};

// تصدير البيانات
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        categories,
        dishes,
        specialOffers,
        paymentMethods,
        deliveryAreas,
        workingHours,
        restaurantInfo,
        reviews,
        faq,
        siteSettings
    };
}

