/**
 * Configuração de Temas do Gerador de Molduras Hornet
 *
 * Arquitetura Multi-Regional:
 * - Suporta múltiplas regiões (Brasil, Global, Turquia, etc.)
 * - Mantém compatibilidade total com código existente
 * - Temas podem ser globais ou específicos de região
 *
 * Cada tema contém:
 * - id: identificador único
 * - name: nome exibido ao usuário
 * - region: região(ões) onde o tema está disponível (array ou 'all')
 * - background: caminho para imagem de fundo (Layer Two)
 * - overlay: caminho para imagem de overlay (Layer One - morcegos/elementos)
 * - preview: caminho para miniatura de preview
 * - colors: cores do tema para personalização da interface
 * - description: descrição do tema
 * - available: (opcional) período de disponibilidade (MM-DD)
 * - featured: (opcional) destaque na lista
 */

const THEMES = {
    // === TEMAS BRASIL ===
    hornet_brasil: {
        id: 'hornet_brasil',
        name: 'Fantasmas',
        emoji: '🧡',
        region: ['brasil'], // Específico do Brasil
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

    brasil: {
        id: 'brasil',
        name: 'Brasil',
        emoji: '🇧🇷',
        region: ['brasil'], // Específico do Brasil
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
    },

    outubro_rosa: {
        id: 'outubro_rosa',
        name: 'Outubro Rosa',
        emoji: '🎀',
        region: ['brasil'], // Específico do Brasil
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
            start: '10-01',
            end: '10-31'
        }
    },

    novembro_azul: {
        id: 'novembro_azul',
        name: 'Novembro Azul',
        emoji: '💙',
        region: ['brasil'], // Específico do Brasil
        background: 'assets/themes/novembro_azul/background.png',
        overlay: 'assets/themes/novembro_azul/overlay.png',
        preview: 'assets/themes/novembro_azul/preview.jpg',
        colors: {
            primary: '#F25E39',
            secondary: '#F25E39',
            gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%)'
        },
        description: 'Tema minimalista do novembro azul',
        featured: false,
        available: {
            start: '11-01',
            end: '11-30'
        }
    },

    consciencia_negra: {
        id: 'consciencia_negra',
        name: 'Consciencia Negra',
        emoji: '✊🏿',
        region: ['brasil'], // Específico do Brasil
        background: 'assets/themes/consciencia_negra/background.png',
        overlay: 'assets/themes/consciencia_negra/overlay.png',
        preview: 'assets/themes/consciencia_negra/preview.jpg',
        colors: {
            primary: '#F25E39',
            secondary: '#F25E39',
            gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%)'
        },
        description: 'Tema minimalista do novembro azul',
        featured: false,
        available: {
            start: '11-01',
            end: '11-30'
        }
    },

    // === TEMAS GLOBAIS (disponíveis em todas as regiões) ===
    pride_month: {
        id: 'pride_month',
        name: 'Mês do Orgulho',
        emoji: '🏳️‍🌈',
        region: 'all', // Disponível em todas as regiões
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
            start: '06-01',
            end: '06-30'
        }
    },

    dark_mode: {
        id: 'dark_mode',
        name: 'Abóboras',
        emoji: '🌙',
        region: 'all', // Disponível em todas as regiões
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
            start: '10-01',
            end: '10-31'
        }
    },

    halloween: {
        id: 'halloween',
        name: 'Aranhas',
        emoji: '🎃',
        region: 'all', // Disponível em todas as regiões
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
            start: '10-01',
            end: '10-31'
        },
        // Override de branding para este tema
        brandingOverride: {
            logo: {
                text: ['HAPPY', 'HALLOWEEN'],
                subtext: null,
                colors: {
                    primary: '#FF6600',
                    secondary: '#FF6600'
                }
            }
        }
    },

    zumbis: {
        id: 'zumbis',
        name: 'Zumbis',
        emoji: '🧟',
        region: 'all', // Disponível em todas as regiões
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
            start: '10-01',
            end: '10-31'
        }
    },

    morcegos: {
        id: 'morcegos',
        name: 'Morcegos',
        emoji: '🦇',
        region: 'all', // Disponível em todas as regiões
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
            start: '10-01',
            end: '10-31'
        }
    },

    natal: {
        id: 'natal',
        name: 'Natal',
        emoji: '🎄',
        region: 'all', // Disponível em todas as regiões
        background: 'assets/themes/natal/background.png',
        overlay: 'assets/themes/natal/overlay.png',
        preview: 'assets/themes/natal/preview.jpg',
        colors: {
            primary: '#F25E39',
            secondary: '#F25E39',
            gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%)'
        },
        description: 'Tema minimalista natalino',
        featured: false,
        available: {
            start: '12-01',
            end: '12-31'
        }
    },

    ano_novo: {
        id: 'ano_novo',
        name: 'Ano Novo',
        emoji: '✨',
        region: 'all', // Disponível em todas as regiões
        background: 'assets/themes/ano_novo/background.png',
        overlay: 'assets/themes/ano_novo/overlay.png',
        preview: 'assets/themes/ano_novo/preview.jpg',
        colors: {
            primary: '#F25E39',
            secondary: '#F25E39',
            gradient: 'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%)'
        },
        description: 'Tema minimalista de ano novo',
        featured: false,
        available: {
            start: '12-01',
            end: '12-31'
        }
    }
};

// ============================================
// TEMAS DE BATALHA
// ============================================

const BATTLE_THEMES = {
    // === TEMAS GLOBAIS DE BATALHA ===
    versus_classic: {
        id: 'versus_classic',
        name: 'Versus Clássico',
        mode: 'battle',
        emoji: '⚔️',
        region: 'all',
        background: 'assets/themes/versus_classic/background.png',
        overlay: 'assets/themes/versus_classic/overlay.png',
        preview: 'assets/themes/versus_classic/preview.jpg',
        colors: {
            primary: '#FF0000',
            secondary: '#0066FF',
            gradient: 'linear-gradient(90deg, #FF0000 0%, #000000 50%, #0066FF 100%)'
        },
        description: 'Duelo clássico - Vermelho vs Azul',
        featured: true,
        layout: {
            leftPhoto: { x: 0.28, y: 0.5, size: 0.45 },
            rightPhoto: { x: 0.72, y: 0.5, size: 0.45 },
            divider: {
                show: true,
                type: 'vs',
                color: '#FFD700',
                width: 6,
                style: 'bold' // VS em negrito com brilho dourado
            }
        }
    },

    fire_duel: {
        id: 'fire_duel',
        name: 'Duelo de Fogo',
        mode: 'battle',
        emoji: '🔥',
        region: 'all',
        background: 'assets/themes/fire_duel/background.png',
        overlay: 'assets/themes/fire_duel/overlay.png',
        preview: 'assets/themes/fire_duel/preview.jpg',
        colors: {
            primary: '#FF4500',
            secondary: '#FF8C00',
            gradient: 'linear-gradient(135deg, #8B0000 0%, #FF4500 25%, #FF8C00 50%, #FF4500 75%, #8B0000 100%)'
        },
        description: 'Batalha intensa com chamas',
        featured: true,
        layout: {
            leftPhoto: { x: 0.28, y: 0.5, size: 0.45 },
            rightPhoto: { x: 0.72, y: 0.5, size: 0.45 },
            divider: {
                show: true,
                type: 'vs',
                color: '#FF4500',
                width: 8,
                style: 'bold' // VS em negrito estilo fogo
            }
        }
    },

    // === TEMAS REGIONAIS DE BATALHA ===
    hornet_brasil_battle: {
        id: 'hornet_brasil_battle',
        name: 'Brasil - Batalha',
        baseTheme: 'hornet_brasil',
        mode: 'battle',
        emoji: '🇧🇷',
        region: ['brasil'],
        background: 'assets/themes/hornet_brasil/background.png',
        overlay: 'assets/themes/hornet_brasil/overlay.png',
        preview: 'assets/themes/hornet_brasil/preview.jpg',
        colors: {
            primary: '#FF6B00',
            secondary: '#FF751F',
            gradient: 'linear-gradient(135deg, #FDB813 0%, #FF6B00 100%)'
        },
        description: 'Duelo brasileiro intenso',
        featured: true,
        layout: {
            leftPhoto: { x: 0.28, y: 0.5, size: 0.44 },
            rightPhoto: { x: 0.72, y: 0.5, size: 0.44 },
            divider: {
                show: true,
                type: 'vs',
                color: '#FDB813',
                width: 6,
                style: 'bold'
            }
        }
    },

    halloween_battle: {
        id: 'halloween_battle',
        name: 'Halloween - Batalha',
        baseTheme: 'halloween',
        mode: 'battle',
        emoji: '🎃',
        region: 'all',
        background: 'assets/themes/halloween/background.png',
        overlay: 'assets/themes/halloween/overlay.png',
        preview: 'assets/themes/halloween/preview.jpg',
        colors: {
            primary: '#F25E39',
            secondary: '#F25E39',
            gradient: 'linear-gradient(135deg, #1a0033 0%, #8B008B 50%, #FF6600 100%)'
        },
        description: 'Batalha assombrada do Halloween',
        featured: true,
        available: {
            start: '10-01',
            end: '10-31'
        },
        layout: {
            leftPhoto: { x: 0.27, y: 0.5, size: 0.45 },
            rightPhoto: { x: 0.73, y: 0.5, size: 0.45 },
            divider: {
                show: true,
                type: 'lightning',
                color: '#FF6600',
                width: 5
            }
        }
    },

    outubro_rosa_battle: {
        id: 'outubro_rosa_battle',
        name: 'Outubro Rosa - Batalha',
        baseTheme: 'outubro_rosa',
        mode: 'battle',
        emoji: '🎀',
        region: ['brasil'],
        background: 'assets/themes/outubro_rosa/background.png',
        overlay: 'assets/themes/outubro_rosa/overlay.png',
        preview: 'assets/themes/outubro_rosa/preview.jpg',
        colors: {
            primary: '#F4298A',
            secondary: '#F4288A',
            gradient: 'linear-gradient(135deg, #FF1493 0%, #FF69B4 50%, #FFB6C1 100%)'
        },
        description: 'Batalha solidária pela conscientização',
        featured: true,
        available: {
            start: '10-01',
            end: '10-31'
        },
        layout: {
            leftPhoto: { x: 0.28, y: 0.5, size: 0.44 },
            rightPhoto: { x: 0.72, y: 0.5, size: 0.44 },
            divider: {
                show: true,
                type: 'vs',
                color: '#FF1493',
                width: 6,
                style: 'bold'
            }
        }
    },

    zumbis_battle: {
        id: 'zumbis_battle',
        name: 'Zumbis - Batalha',
        baseTheme: 'zumbis',
        mode: 'battle',
        emoji: '🧟',
        region: 'all',
        background: 'assets/themes/zumbis/background.png',
        overlay: 'assets/themes/zumbis/overlay.png',
        preview: 'assets/themes/zumbis/preview.jpg',
        colors: {
            primary: '#81CD11',
            secondary: '#303836',
            gradient: 'linear-gradient(135deg, #0a0a0a 0%, #2F4F2F 50%, #8B0000 100%)'
        },
        description: 'Apocalipse zumbi - duelo mortal',
        featured: false,
        available: {
            start: '10-01',
            end: '10-31'
        },
        layout: {
            leftPhoto: { x: 0.27, y: 0.5, size: 0.45 },
            rightPhoto: { x: 0.73, y: 0.5, size: 0.45 },
            divider: {
                show: true,
                type: 'lightning',
                color: '#81CD11',
                width: 5
            }
        }
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
 * Verifica se um tema está disponível para uma região específica
 * @param {Object} theme - Objeto do tema
 * @param {String} regionId - ID da região
 * @returns {Boolean} - true se disponível para a região
 */
function isThemeAvailableForRegion(theme, regionId) {
    // Se o tema não tem região definida (compatibilidade), assume 'brasil'
    if (!theme.region) {
        return regionId === 'brasil';
    }

    // Se o tema é global, está disponível para todas as regiões
    if (theme.region === 'all') {
        return true;
    }

    // Se o tema tem array de regiões, verifica se a região está incluída
    if (Array.isArray(theme.region)) {
        return theme.region.includes(regionId);
    }

    return false;
}

/**
 * Retorna lista de temas disponíveis na data atual
 * COMPATIBILIDADE: Mantém comportamento original (todos os temas disponíveis)
 * @returns {Array} - Array de objetos de tema
 */
function getAvailableThemes() {
    return Object.values(THEMES).filter(theme => isThemeAvailable(theme));
}

/**
 * Retorna lista de temas disponíveis para uma região específica
 * @param {String} regionId - ID da região
 * @returns {Array} - Array de objetos de tema
 */
function getAvailableThemesForRegion(regionId) {
    return Object.values(THEMES).filter(theme =>
        isThemeAvailable(theme) && isThemeAvailableForRegion(theme, regionId)
    );
}

/**
 * Retorna lista de temas em destaque
 * COMPATIBILIDADE: Mantém comportamento original
 * @returns {Array} - Array de objetos de tema
 */
function getFeaturedThemes() {
    return Object.values(THEMES).filter(theme =>
        theme.featured && isThemeAvailable(theme)
    );
}

/**
 * Retorna lista de temas em destaque para uma região específica
 * @param {String} regionId - ID da região
 * @returns {Array} - Array de objetos de tema
 */
function getFeaturedThemesForRegion(regionId) {
    return Object.values(THEMES).filter(theme =>
        theme.featured && isThemeAvailable(theme) && isThemeAvailableForRegion(theme, regionId)
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

/**
 * Retorna tema padrão para uma região específica
 * @param {String} regionId - ID da região
 * @returns {Object} - Objeto do tema padrão ou primeiro tema disponível
 */
function getDefaultThemeForRegion(regionId) {
    // Tenta encontrar um tema marcado como padrão para a região
    const defaultTheme = Object.values(THEMES).find(theme =>
        theme.default && isThemeAvailableForRegion(theme, regionId)
    );

    if (defaultTheme) return defaultTheme;

    // Caso contrário, retorna o primeiro tema disponível para a região
    const availableThemes = getAvailableThemesForRegion(regionId);
    return availableThemes.length > 0 ? availableThemes[0] : getDefaultTheme();
}

/**
 * Retorna lista de temas de batalha disponíveis para uma região específica
 * @param {String} regionId - ID da região
 * @returns {Array} - Array de objetos de tema de batalha
 */
function getBattleThemesForRegion(regionId) {
    return Object.values(BATTLE_THEMES).filter(theme =>
        isThemeAvailable(theme) && isThemeAvailableForRegion(theme, regionId)
    );
}

/**
 * Retorna tema por ID (busca em temas normais e de batalha)
 * @param {String} themeId - ID do tema
 * @returns {Object|null} - Objeto do tema ou null
 */
function getThemeByIdExtended(themeId) {
    return THEMES[themeId] || BATTLE_THEMES[themeId] || null;
}
