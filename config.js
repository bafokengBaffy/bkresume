// config.js - Environment Configuration
const CONFIG = {
    // Google Analytics
    GA_ID: process.env.GOOGLE_ANALYTICS_ID || '',

    // Personal Information
    PERSONAL: {
        PHONE: process.env.PHONE_NUMBER || '',
        EMAIL: process.env.EMAIL_ADDRESS || '',
        LOCATION: process.env.LOCATION || ''
    },

    // Social Links
    SOCIAL: {
        FACEBOOK: process.env.FACEBOOK_URL || '',
        LINKEDIN: process.env.LINKEDIN_URL || '',
        WHATSAPP: process.env.WHATSAPP_NUMBER || '',
        GITHUB: process.env.GITHUB_URL || ''
    },

    // References
    REFERENCES: {
        REF1_PHONE: process.env.REFERENCE_1_PHONE || '',
        REF2_PHONE: process.env.REFERENCE_2_PHONE || '',
        REF3_PHONE: process.env.REFERENCE_3_PHONE || ''
    },

    // Site Info
    SITE: {
        URL: process.env.SITE_URL || '',
        TITLE: process.env.SITE_TITLE || ''
    }
};
