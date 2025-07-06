// تأثيرات ديناميكية بسيطة
window.addEventListener('DOMContentLoaded', () => {
    // تحريك العناوين عند الظهور
    document.querySelectorAll('section').forEach((section, idx) => {
        section.style.opacity = 0;
        setTimeout(() => {
            section.style.transition = 'opacity 0.8s';
            section.style.opacity = 1;
        }, 300 + idx * 200);
    });

    // تأثير عند تمرير الماوس على الأقسام
    document.querySelectorAll('section').forEach(section => {
        section.addEventListener('mouseenter', () => {
            section.style.boxShadow = '0 4px 24px rgba(59,89,152,0.10)';
        });
        section.addEventListener('mouseleave', () => {
            section.style.boxShadow = 'none';
        });
    });
});
