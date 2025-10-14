/**
 * Configuração de Temas do Gerador de Molduras Hornet Brasil
 *
 * Cada tema contém:
 * - id: identificador único
 * - name: nome exibido ao usuário
 * - background: caminho para imagem de fundo (Layer Two)
 * - overlay: caminho para imagem de overlay (Layer One - morcegos/elementos)
 * - preview: caminho para miniatura de preview
 * - colors: cores do tema para personalização da interface
 * - description: descrição do tema
 * - available: (opcional) período de disponibilidade (MM-DD)
 * - featured: (opcional) destaque na lista
 */

const THEMES = {
    hornet_brasil: {
        id: 'hornet_brasil',
        name: 'Fantasmas',
        emoji: '🧡',
        background: 'assets/themes/hornet_brasil/background.png',
        overlay: 'assets/themes/hornet_brasil/overlay.png',
        preview: 'assets/themes/hornet_brasil/preview.jpg',
        colors: {
            primary: '#FF6B00',
            secondary: '#FF751F',
            gradient: 'linear-gradient(135deg, #FDB813 0%, #FF6B00 100%)'
        },
        description: 'Tema oficial Hornet Brasil com fundo laranja vibrante',
        featured: true,
        default: true
    },

    pride_month: {
        id: 'pride_month',
        name: 'Mês do Orgulho',
        emoji: '🏳️‍🌈',
        background: 'assets/themes/pride_month/background.png',
        overlay: 'assets/themes/pride_month/overlay.png',
        preview: 'assets/themes/pride_month/preview.jpg',
        colors: {
            primary: '#1E4253',
            secondary: '#112941',
            gradient: 'linear-gradient(135deg, #E40303 0%, #FF8C00 16%, #FFED00 32%, #008026 48%, #24408E 64%, #732982 80%, #8B00FF 100%)'
        },
        description: 'Celebre o Orgulho LGBTQIA+ com arco-íris',
        featured: true,
        available: {
            start: '06-01', // 1º de outubro
            end: '06-30'    // 31 de outubro
        }    
    },

    dark_mode: {
        id: 'dark_mode',
        name: 'Abóboras',
        emoji: '🌙',
        background: 'assets/themes/dark_mode/background.png',
        overlay: 'assets/themes/dark_mode/overlay.png',
        preview: 'assets/themes/dark_mode/preview.jpg',
        colors: {
            primary: '#9C00D0',
            secondary: '#9C00D0',
            gradient: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
        },
        description: 'Tema escuro elegante e moderno',
        featured: false,
        available: {
            start: '10-01', // 1º de outubro
            end: '10-31'    // 31 de outubro
        }   
    },

    halloween: {
        id: 'halloween',
        name: 'Aranhas',
        emoji: '🎃',
        background: 'assets/themes/halloween/background.png',
        overlay: 'assets/themes/halloween/overlay.png',
        preview: 'assets/themes/halloween/preview.jpg',
        colors: {
            primary: '#F25E39',
            secondary: '#F25E39',
            gradient: 'linear-gradient(135deg, #1a0033 0%, #8B008B 50%, #FF6600 100%)'
        },
        description: 'Tema especial de Halloween com cores roxas e laranjas',
        featured: false,
        available: {
            start: '10-01', // 1º de outubro
            end: '10-31'    // 31 de outubro
        }
    },

    outubro_rosa: {
        id: 'outubro_rosa',
        name: 'Outubro Rosa',
        emoji: '🎀',
        background: 'assets/themes/outubro_rosa/background.png',
        overlay: 'assets/themes/outubro_rosa/overlay.png',
        preview: 'assets/themes/outubro_rosa/preview.jpg',
        colors: {
            primary: '#F4298A',
            secondary: '#F4288A',
            gradient: 'linear-gradient(135deg, #FF1493 0%, #FF69B4 50%, #FFB6C1 100%)'
        },
        description: 'Campanha de conscientização sobre câncer de mama',
        featured: true,
        available: {
            start: '10-01', // 1º de outubro
            end: '10-31'    // 31 de outubro
        }
    },

    zumbis: {
        id: 'zumbis',
        name: 'Zumbis',
        emoji: '🧟',
        background: 'assets/themes/zumbis/background.png',
        overlay: 'assets/themes/zumbis/overlay.png',
        preview: 'assets/themes/zumbis/preview.jpg',
        colors: {
            primary: '#81CD11',
            secondary: '#303836',
            gradient: 'linear-gradient(135deg, #0a0a0a 0%, #2F4F2F 50%, #8B0000 100%)'
        },
        description: 'Tema apocalipse zumbi com tons verdes e sangue',
        featured: false,
        available: {
            start: '10-01', // 1º de outubro
            end: '10-31'    // 31 de outubro
        }
    },

    morcegos: {
        id: 'morcegos',
        name: 'Morcegos',
        emoji: '🦇',
        background: 'assets/themes/morcegos/background.png',
        overlay: 'assets/themes/morcegos/overlay.png',
        preview: 'assets/themes/morcegos/preview.jpg',
        colors: {
            primary: '#F25E39',
            secondary: '#F25E39',
            gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%)'
        },
        description: 'Tema minimalista com morcegos pretos e aranhas',
        featured: false,
        available: {
            start: '10-01', // 1º de outubro
            end: '10-31'    // 31 de outubro
        }
    },

    brasil: {
        id: 'brasil',
        name: 'Brasil',
        emoji: '🇧🇷',
        background: 'assets/themes/brasil/background.png',
        overlay: 'assets/themes/brasil/overlay.png',
        preview: 'assets/themes/brasil/preview.jpg',
        colors: {
            primary: '#72AC47',
            secondary: '#72AC47',
            gradient: 'linear-gradient(135deg, #009B3A 0%, #FEDF00 100%)'
        },
        description: 'Celebre a fauna brasileira com verde e amarelo',
        featured: true
    }
};

// Tema padrão (será carregado ao iniciar)
const DEFAULT_THEME = 'hornet_brasil';

/**
 * Verifica se um tema está disponível na data atual
 * @param {Object} theme - Objeto do tema
 * @returns {Boolean} - true se disponível
 */
function isThemeAvailable(theme) {
    if (!theme.available) return true;

    const now = new Date();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const today = `${month}-${day}`;

    return today >= theme.available.start && today <= theme.available.end;
}

/**
 * Retorna lista de temas disponíveis na data atual
 * @returns {Array} - Array de objetos de tema
 */
function getAvailableThemes() {
    return Object.values(THEMES).filter(theme => isThemeAvailable(theme));
}

/**
 * Retorna lista de temas em destaque
 * @returns {Array} - Array de objetos de tema
 */
function getFeaturedThemes() {
    return Object.values(THEMES).filter(theme =>
        theme.featured && isThemeAvailable(theme)
    );
}

/**
 * Retorna tema por ID
 * @param {String} themeId - ID do tema
 * @returns {Object|null} - Objeto do tema ou null
 */
function getThemeById(themeId) {
    return THEMES[themeId] || null;
}

/**
 * Retorna tema padrão
 * @returns {Object} - Objeto do tema padrão
 */
function getDefaultTheme() {
    return THEMES[DEFAULT_THEME];
}
