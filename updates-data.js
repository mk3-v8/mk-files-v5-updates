window.updates = [

    {
        version: "1.0.0",
        date: "23-03-2025",
        features: [
            "تجربة ميزة 1",
            "تجربة ميزة 2",
            "تجربة ميزة 3",
            "تجربة ميزة 4"
        ],
        fixes: [
            "إصلاح مشكلة 1",
            "إصلاح مشكلة 2",
            "إصلاح مشكلة 3",
            "إصلاح مشكلة 4"
        ],
        configChanges: {
            title: "تحديث كونفق",
            description: "يجب إضافة الحقول الجديدة التالية إلى ملف vrp/MK-Config.lua :",
            code: `
-- Property System Configuration
Config.EnablePropertySystem = true
Config.MaxPropertiesPerPlayer = 3
`
        }
    },
];

// Export the updates array
if (typeof module !== 'undefined' && module.exports) {
    module.exports = updates;
} 