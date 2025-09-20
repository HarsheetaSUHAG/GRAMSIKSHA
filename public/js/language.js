document.addEventListener('DOMContentLoaded', () => {

    const translations = {
        en: {
            // Navbar
            navHome: "Home",
            navAbout: "About Us",
            navWhatsNew: "What's New",
            navCourses: "Courses",
            navPolicy: "Policy",
            navContact: "Contact",
            btnRegister: "Register",
            btnLogin: "Login",
            langSwitcher: "हिंदी",

            // Hero Section
            heroTitle: "Learning Made Simple for Villages 🌱",
            heroSubtitle: "Fun, gamified education for rural kids aged 6–12, in Hindi & English.",
            heroCta: "Start Learning →",

            // About Us
            aboutTitle: "About Us",
            aboutText: "We empower rural children with engaging, gamified education. GRAMSIKSHA blends agriculture, literacy, and STEM in fun missions & games tailored for ages 6–12.",

            // What’s Different
            featuresTitle: "What’s Different in Us?",
            feature1Title: "Localized Learning",
            feature1Text: "Hindi & English support for rural kids.",
            feature2Title: "Gamified Lessons",
            feature2Text: "Quizzes, games, and interactive missions.",
            feature3Title: "Rural Context",
            feature3Text: "Agriculture & life skill–based content.",
            feature4Title: "Badges & Rewards",
            feature4Text: "Motivation with achievements & badges.",

            // Courses
            coursesTitle: "Our Courses",
            course1Title: "Agriculture Basics",
            course1Text: "Learn how seeds grow, farming tools, and crops.",
            course2Title: "Literacy",
            course2Text: "Improve reading & writing with fun games.",
            course3Title: "STEM",
            course3Text: "Explore science & math through activities.",
            course4Title: "Life Skills",
            course4Text: "Learn teamwork, problem-solving & creativity.",
            courseCta: "Start →",

            // Policy
            policyTitle: "Our Policy",
            policyText: "We provide a safe, child-friendly environment. No personal data is shared, and content is designed to be inclusive & culturally relevant.",

            // Contact
            contactTitle: "Contact Us",
            contactNamePlaceholder: "Your Name",
            contactEmailPlaceholder: "Your Email",
            contactMessagePlaceholder: "Your Message",
            contactSendButton: "Send Message",

            // Footer
            footerRights: "© 2025 GRAMSIKSHA. All rights reserved.",
            footerPolicyLink: "Privacy Policy",
            footerContactLink: "Contact",
        },
        hi: {
            // Navbar
            navHome: "होम",
            navAbout: "हमारे बारे में",
            navWhatsNew: "नया क्या है",
            navCourses: "पाठ्यक्रम",
            navPolicy: "नीति",
            navContact: "संपर्क करें",
            btnRegister: "रजिस्टर करें",
            btnLogin: "लॉग इन करें",
            langSwitcher: "English",

            // Hero Section
            heroTitle: "गांवों के लिए सीखना हुआ आसान 🌱",
            heroSubtitle: "6-12 साल के ग्रामीण बच्चों के लिए हिंदी और अंग्रेजी में मजेदार, गेमीफाइड शिक्षा।",
            heroCta: "सीखना शुरू करें →",

            // About Us
            aboutTitle: "हमारे बारे में",
            aboutText: "हम ग्रामीण बच्चों को आकर्षक, गेमीफाइड शिक्षा के साथ सशक्त बनाते हैं। ग्रामशिक्षा 6-12 वर्ष की आयु के बच्चों के लिए कृषि, साक्षरता और STEM को मजेदार मिशन और खेलों में मिश्रित करती है।",

            // What’s Different
            featuresTitle: "हम में क्या अलग है?",
            feature1Title: "स्थानीय शिक्षा",
            feature1Text: "ग्रामीण बच्चों के लिए हिंदी और अंग्रेजी समर्थन।",
            feature2Title: "गेमीफाइड पाठ",
            feature2Text: "क्विज़, खेल, और इंटरैक्टिव मिशन।",
            feature3Title: "ग्रामीण संदर्भ",
            feature3Text: "कृषि और जीवन कौशल आधारित सामग्री।",
            feature4Title: "बैज और पुरस्कार",
            feature4Text: "उपलब्धियों और बैज के साथ प्रेरणा।",

            // Courses
            coursesTitle: "हमारे पाठ्यक्रम",
            course1Title: "कृषि की मूल बातें",
            course1Text: "जानें कि बीज कैसे उगते हैं, खेती के उपकरण और फसलें।",
            course2Title: "साक्षरता",
            course2Text: "मज़ेदार खेलों से पढ़ना और लिखना सुधारें।",
            course3Title: "स्टेम (विज्ञान, प्रौद्योगिकी)",
            course3Text: "गतिविधियों के माध्यम से विज्ञान और गणित का अन्वेषण करें।",
            course4Title: "जीवन कौशल",
            course4Text: "टीम वर्क, समस्या-समाधान और रचनात्मकता सीखें।",
            courseCta: "शुरू करें →",
            
            // Policy
            policyTitle: "हमारी नीति",
            policyText: "हम एक सुरक्षित, बाल-सुलभ वातावरण प्रदान करते हैं। कोई भी व्यक्तिगत डेटा साझा नहीं किया जाता है, और सामग्री को समावेशी और सांस्कृतिक रूप से प्रासंगिक बनाया गया है।",

            // Contact
            contactTitle: "हमसे संपर्क करें",
            contactNamePlaceholder: "आपका नाम",
            contactEmailPlaceholder: "आपका ईमेल",
            contactMessagePlaceholder: "आपका संदेश",
            contactSendButton: "संदेश भेजें",

            // Footer
            footerRights: "© 2025 ग्रामशिक्षा। सर्वाधिकार सुरक्षित।",
            footerPolicyLink: "गोपनीयता नीति",
            footerContactLink: "संपर्क करें",
        }
    };

    const languageSwitcher = document.getElementById('lang-switcher');
    let currentLang = localStorage.getItem('lang') || 'en'; // Default to English

    const setLanguage = (lang) => {
        // Update all text content
        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.dataset.translateKey;
            // Handle special cases like the course CTA which appears multiple times
            if (key === 'courseCta') {
                el.innerText = translations[lang][key];
            } else {
                el.innerText = translations[lang][key];
            }
        });

        // Update all placeholders
        document.querySelectorAll('[data-translate-key-placeholder]').forEach(el => {
            const key = el.dataset.translateKeyPlaceholder;
            el.placeholder = translations[lang][key];
        });

        // Update the language switcher button text
        languageSwitcher.innerText = translations[lang].langSwitcher;

        // Store the selected language
        localStorage.setItem('lang', lang);
        currentLang = lang;
    };

    languageSwitcher.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'hi' : 'en';
        setLanguage(newLang);
    });

    // Set initial language on page load
    setLanguage(currentLang);
});