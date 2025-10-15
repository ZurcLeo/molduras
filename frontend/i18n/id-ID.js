/**
 * Bahasa Indonesia (Indonesia) Terjemahan
 * Locale: id-ID
 * Region: Indonesia
 */

const translations_id_ID = {
    meta: {
        language: 'Bahasa Indonesia',
        locale: 'id-ID',
        region: 'Indonesia'
    },

    header: {
        title: '🐝 Pembuat Bingkai Hornet',
        subtitle: 'Sesuaikan foto profil Anda'
    },

    regions: {
        label: 'Pilih wilayah Anda:'
    },

    upload: {
        icon: '📸',
        title: 'Klik atau seret foto Anda di sini',
        formats: 'Format yang didukung: JPG, PNG'
    },

    themes: {
        title: 'Pilih tema bingkai:'
    },

    format: {
        title: 'Pilih format gambar:',
        square: 'Persegi',
        squareRatio: '1:1',
        squareSize: '1080x1080px',
        portrait: 'Potret',
        portraitRatio: '4:5',
        portraitSize: '1080x1360px'
    },

    logoPosition: {
        title: 'Posisi logo regional:',
        topLeft: 'Atas Kiri',
        topRight: 'Atas Kanan',
        bottomLeft: 'Bawah Kiri',
        bottomRight: 'Bawah Kanan'
    },

    frames: {
        title: 'Pilih posisi foto Anda:',
        center: 'Tengah Lingkaran',
        full: 'Latar Belakang Penuh',
        topleft: 'Sudut Atas'
    },

    buttons: {
        download: '💾 Simpan Gambar',
        share: '📤 Bagikan',
        reset: '🔄 Foto Baru'
    },

    instructions: {
        title: 'Cara menggunakan:',
        step1: 'Unggah foto Anda',
        step2: 'Pilih tema bingkai',
        step3: 'Pilih posisi foto',
        step4: 'Klik "Simpan Gambar"',
        mobileTip: {
            title: '💾 Simpan vs 📤 Bagikan:',
            save: '"Simpan Gambar" mengunduh langsung ke perangkat Anda.',
            share: '"Bagikan" membuka opsi untuk mengirim melalui WhatsApp, Instagram, dll.'
        }
    },

    loading: {
        message: 'Memproses gambar Anda...'
    },

    errors: {
        fileLoad: 'Kesalahan saat memuat file',
        imageProcess: 'Kesalahan saat memproses gambar',
        download: 'Kesalahan saat mengunduh gambar',
        share: 'Berbagi tidak tersedia di perangkat ini'
    }
};

// Export to global scope
if (typeof window !== 'undefined') {
    window.translations_id_ID = translations_id_ID;
}
