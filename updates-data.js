window.updates = [
    {
        version: "1.0.0",
        date: "23-03-2025",
        features: [
            "إضافة نظام إدارة العقارات مع واجهات داخلية قابلة للتخصيص",
            "تنفيذ آليات ملكية الأعمال الجديدة مع إدارة الموظفين",
            "إضافة 10 طرازات مركبات جديدة مع ملفات معالجة مخصصة",
            "دمج نظام الهاتف مع الرسائل وإدارة جهات الاتصال"
        ],
        fixes: [
            "إصلاح نظام الكشف عن غسيل الأموال الذي يؤدي إلى إيجابيات خاطئة",
            "حل مشاكل استمرارية المركبات بعد إعادة تشغيل الخادم",
            "إصلاح عدة ثغرات في نظام سرقة البنوك"
        ],
        configChanges: {
            title: "تحديثات الكونفق",
            description: "يجب إضافة الحقول الجديدة التالية إلى الملفات التالية:",
            files: [
                {
                    path: "vrp/MK-Config/Permissions.lua",
                    code: `-- Permissions Configuration
Config.EnablePropertySystem = true
Config.MaxPropertiesPerPlayer = 3
Config.PropertyTaxRate = 0.02 -- 2% of property value per week`
                },
                {
                    path: "vrp/MK-Config/Update.lua",
                    code: `-- Update System Configuration
Config.AutoUpdate = true
Config.CheckInterval = 60 -- minutes
Config.NotifyAdmins = true

-- Discord Webhook Settings
Config.WebhookURL = "your_webhook_here"
Config.SendUpdateLogs = true`
                }
            ]
        }
    },
];

// Export the updates array
if (typeof module !== 'undefined' && module.exports) {
    module.exports = updates;
} 