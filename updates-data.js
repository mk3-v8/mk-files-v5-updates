window.updates = [
    {
        version: "1.0.0",
        date: "23-03-2025",
        features: [
            "إضافة ميزة 1",
            "إضافة ميزة 2",
            "إضافة ميزة 3",
            "إضافة ميزة 4"
        ],
        fixes: [
            "إصلاح مشكلة 1",
            "إصلاح مشكلة 2",
            "إصلاح مشكلة 3",
            "إصلاح مشكلة 4"
        ],
        configChanges: {
            title: "تحديثات الكونفق",
            description: "يجب إضافة الحقول الجديدة التالية إلى الملفات التالية:",
            files: [
                {
                    path: 'vrp/MK-Config/Permissions.lua',
                    code: `Config_c.Radio_CFG = { -- كونفق الراديو اللاسلكي
    EnableList = true, -- تفعيل اللستة
    HideListCommand = 'rlist', -- امر اخفاء واظهار اللستة
    EnableEditing = true, -- السماح للاعبين بوضع شارة لهم
    MicClicks = true, -- تفعيل صوت ضغطات الراديو
    RadioAnims = true, -- تفعيل انميشن الراديو
    UseKeybind = 'u', -- زر فتح الراديو
    Command = 'radio', -- كوماند الراديو
    UseCustomChannelNames = false, -- اظهار اسامي القنوات بدل التردد
    ChannelNames = { -- اسامي القنوات ( لازم ماتتعدى 7 احرف انجليزية)
        [1] = 'LSPD',
        [2] = 'EMS'
    },
    --[[NEW_CODE]]
}`,
                    newCode: `WhitelistedAccess = { -- برمشنات القنوات
        [1] = "police.pc", -- برمشن وزارة الداخلية
        [2] =  "ems.whitelisted" -- برمشن وزارة الصحة
    },`
                }, {
                    path: 'vrp/MK-Config/Permissions.lua',
                    code: `Config_c.Radio_CFG = { -- كونفق الراديو اللاسلكي
    EnableList = true, -- تفعيل اللستة
    HideListCommand = 'rlist', -- امر اخفاء واظهار اللستة
    EnableEditing = true, -- السماح للاعبين بوضع شارة لهم
    MicClicks = true, -- تفعيل صوت ضغطات الراديو
    RadioAnims = true, -- تفعيل انميشن الراديو
    UseKeybind = 'u', -- زر فتح الراديو
    Command = 'radio', -- كوماند الراديو
    --[[NEW_CODE]]
    UseCustomChannelNames = false, -- اظهار اسامي القنوات بدل التردد
    ChannelNames = { -- اسامي القنوات ( لازم ماتتعدى 7 احرف انجليزية)
        [1] = 'LSPD',
        [2] = 'EMS'
    },
}`,
                    newCode: `WhitelistedAccess = { -- برمشنات القنوات
        [1] = "police.pc", -- برمشن وزارة الداخلية
        [2] =  "ems.whitelisted" -- برمشن وزارة الصحة
    },`
                },
            ]
        }
    },
];

// Export the updates array
if (typeof module !== 'undefined' && module.exports) {
    module.exports = updates;
} 