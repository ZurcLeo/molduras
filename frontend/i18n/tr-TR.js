/**
 * Türkçe (Türkiye) Çevirileri
 * Locale: tr-TR
 * Region: Turkey
 */

const translations_tr_TR = {
    meta: {
        language: 'Türkçe',
        locale: 'tr-TR',
        region: 'Türkiye'
    },

    header: {
        title: '🐝 Hornet Çerçeve Oluşturucu',
        subtitle: 'Profil fotoğrafınızı özelleştirin'
    },

    regions: {
        label: 'Bölgenizi seçin:'
    },

    upload: {
        icon: '📸',
        title: 'Fotoğrafınızı buraya tıklayın veya sürükleyin',
        formats: 'Kabul edilen formatlar: JPG, PNG'
    },

    themes: {
        title: 'Çerçeve temanızı seçin:'
    },

    format: {
        title: 'Resim formatını seçin:',
        square: 'Kare',
        squareRatio: '1:1',
        squareSize: '1080x1080px',
        portrait: 'Portre',
        portraitRatio: '4:5',
        portraitSize: '1080x1360px'
    },

    logoPosition: {
        title: 'Bölgesel logo konumu:',
        topLeft: 'Sol Üst',
        topRight: 'Sağ Üst',
        bottomLeft: 'Sol Alt',
        bottomRight: 'Sağ Alt'
    },

    frames: {
        title: 'Fotoğraf konumlandırmanızı seçin:',
        center: 'Dairesel Merkez',
        full: 'Tam Arka Plan',
        topleft: 'Üst Köşe'
    },

    buttons: {
        download: '💾 Resmi Kaydet',
        share: '📤 Paylaş',
        reset: '🔄 Yeni Fotoğraf'
    },

    instructions: {
        title: 'Nasıl kullanılır:',
        step1: 'Fotoğrafınızı yükleyin',
        step2: 'Bir çerçeve teması seçin',
        step3: 'Fotoğraf konumlandırmasını seçin',
        step4: '"Resmi Kaydet" düğmesine tıklayın',
        mobileTip: {
            title: '💾 Kaydet vs 📤 Paylaş:',
            save: '"Resmi Kaydet" doğrudan cihazınıza indirir.',
            share: '"Paylaş" WhatsApp, Instagram vb. üzerinden gönderme seçeneklerini açar.'
        }
    },

    loading: {
        message: 'Resminiz işleniyor...'
    },

    errors: {
        fileLoad: 'Dosya yüklenirken hata oluştu',
        imageProcess: 'Resim işlenirken hata oluştu',
        download: 'Resim indirilirken hata oluştu',
        share: 'Bu cihazda paylaşım kullanılamıyor'
    }
};

// Export to global scope
if (typeof window !== 'undefined') {
    window.translations_tr_TR = translations_tr_TR;
}
