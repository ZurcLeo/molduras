/**
 * Traduções em Português (Brasil)
 * Locale: pt-BR
 * Região: Brasil
 */

const translations_pt_BR = {
    meta: {
        language: 'Português',
        locale: 'pt-BR',
        region: 'Brasil'
    },

    header: {
        title: '🐝 Gerador de Molduras Hornet Brasil',
        subtitle: 'Personalize sua foto de perfil'
    },

    regions: {
        label: 'Escolha sua região:'
    },

    upload: {
        icon: '📸',
        title: 'Clique ou arraste sua foto aqui',
        formats: 'Formatos aceitos: JPG, PNG'
    },

    themes: {
        title: 'Escolha o tema da moldura:'
    },

    format: {
        title: 'Escolha o formato da imagem:',
        square: 'Quadrado',
        squareRatio: '1:1',
        squareSize: '1080x1080px',
        portrait: 'Retrato',
        portraitRatio: '4:5',
        portraitSize: '1080x1360px'
    },

    logoPosition: {
        title: 'Posição do logo regional:',
        topLeft: 'Superior Esquerdo',
        topRight: 'Superior Direito',
        bottomLeft: 'Inferior Esquerdo',
        bottomRight: 'Inferior Direito'
    },

    frames: {
        title: 'Escolha o posicionamento da sua foto:',
        center: 'Centro Circular',
        full: 'Fundo Completo',
        topleft: 'Canto Superior'
    },

    buttons: {
        download: '💾 Salvar Imagem',
        share: '📤 Compartilhar',
        reset: '🔄 Nova Foto'
    },

    instructions: {
        title: 'Como usar:',
        step1: 'Faça upload da sua foto',
        step2: 'Escolha um tema de moldura',
        step3: 'Selecione o posicionamento da foto',
        step4: 'Clique em "Baixar Imagem"',
        mobileTip: {
            title: '💾 Salvar vs 📤 Compartilhar:',
            save: '"Salvar Imagem" baixa direto para seu dispositivo.',
            share: '"Compartilhar" abre opções para enviar via WhatsApp, Instagram, etc.'
        }
    },

    loading: {
        message: 'Processando sua imagem...'
    },

    errors: {
        fileLoad: 'Erro ao carregar arquivo',
        imageProcess: 'Erro ao processar imagem',
        download: 'Erro ao baixar imagem',
        share: 'Compartilhamento não disponível neste dispositivo'
    }
};

// Exporta para escopo global
if (typeof window !== 'undefined') {
    window.translations_pt_BR = translations_pt_BR;
}
