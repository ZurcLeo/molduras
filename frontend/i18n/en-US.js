/**
 * English (United States) Translations
 * Locale: en-US
 * Region: Global
 */

const translations_en_US = {
    meta: {
        language: 'English',
        locale: 'en-US',
        region: 'Global'
    },

    header: {
        title: '🐝 Hornet Frame Generator',
        subtitle: 'Customize your profile picture'
    },

    regions: {
        label: 'Choose your region:'
    },

    upload: {
        icon: '📸',
        title: 'Click or drag your photo here',
        formats: 'Accepted formats: JPG, PNG'
    },

    themes: {
        title: 'Choose your frame theme:'
    },

    format: {
        title: 'Choose the image format:',
        square: 'Square',
        squareRatio: '1:1',
        squareSize: '1080x1080px',
        portrait: 'Portrait',
        portraitRatio: '4:5',
        portraitSize: '1080x1360px'
    },

    logoPosition: {
        title: 'Regional logo position:',
        topLeft: 'Top Left',
        topRight: 'Top Right',
        bottomLeft: 'Bottom Left',
        bottomRight: 'Bottom Right'
    },

    frames: {
        title: 'Choose your photo positioning:',
        center: 'Circular Center',
        full: 'Full Background',
        topleft: 'Top Corner'
    },

    buttons: {
        download: '💾 Save Image',
        share: '📤 Share',
        reset: '🔄 New Photo'
    },

    instructions: {
        title: 'How to use:',
        step1: 'Upload your photo',
        step2: 'Choose a frame theme',
        step3: 'Select the photo positioning',
        step4: 'Click "Save Image"',
        mobileTip: {
            title: '💾 Save vs 📤 Share:',
            save: '"Save Image" downloads directly to your device.',
            share: '"Share" opens options to send via WhatsApp, Instagram, etc.'
        }
    },

    loading: {
        message: 'Processing your image...'
    },

    errors: {
        fileLoad: 'Error loading file',
        imageProcess: 'Error processing image',
        download: 'Error downloading image',
        share: 'Sharing not available on this device'
    }
};

// Export to global scope
if (typeof window !== 'undefined') {
    window.translations_en_US = translations_en_US;
}
