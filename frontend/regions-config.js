/**
 * Configuração de Regiões do Gerador de Molduras Hornet
 *
 * Este arquivo gerencia as diferentes comunidades regionais do Hornet.
 * Cada região pode ter seus próprios temas, cores e configurações.
 */

const REGIONS = {
    brasil: {
        id: 'brasil',
        name: 'Hornet Brasil',
        emoji: '🇧🇷',
        flag: '🇧🇷',
        locale: 'pt-BR',
        colors: {
            primary: '#FF6B00',
            secondary: '#FDB813',
            gradient: 'linear-gradient(135deg, #FDB813 0%, #FF6B00 100%)'
        },
        branding: {
            logo: {
                // NOVO: Logo PNG oficial
                imagePath: 'assets/logos/brazil/brazil.png',
                imageWidth: 0.25,  // 25% da largura do canvas
                margin: 0.02,      // 2% de margem
                defaultPosition: 'bottom-right', // Padrão (usuário pode mudar)

                // Fallback: texto (se PNG falhar ou não existir)
                text: ['HORNET', 'LIVE'],
                subtext: 'BRASIL',
                position: { x: 0.95, y: 0.88 },
                textAlign: 'right',
                colors: {
                    primary: 'white',
                    secondary: 'white',
                    accent: '#FF6B00'
                },
                fontSize: {
                    main: 0.04,
                    secondary: 0.055,
                    sub: 0.03
                }
            },
            badge: {
                show: false, // Desabilitado se usar logo PNG
                position: { x: 0.82, y: 0.925 },
                radius: 0.015,
                fillColor: '#FF6B00',
                strokeColor: 'white',
                strokeWidth: 2
            },
            watermark: null
        },
        description: 'Comunidade Hornet Brasil',
        default: true
    },

    global: {
        id: 'global',
        name: 'Hornet Live',
        emoji: '🌍',
        flag: '🌍',
        locale: 'en-US',
        colors: {
            primary: '#FF6B00',
            secondary: '#FDB813',
            gradient: 'linear-gradient(135deg, #FDB813 0%, #FF6B00 100%)'
        },
        branding: {
            logo: {
                imagePath: 'assets/logos/global/global.png',
                imageWidth: 0.25,  // 25% da largura do canvas
                margin: 0.02,      // 2% de margem
                defaultPosition: 'bottom-right', // Padrão (usuário pode mudar)
                // Fallback: texto (se PNG falhar ou não existir)
                text: ['HORNET', 'LIVE'],
                subtext: null,
                position: { x: 0.95, y: 0.91 },
                textAlign: 'right',
                colors: {
                    primary: 'white',
                    secondary: 'white',
                    accent: '#FF6B00'
                },
                fontSize: {
                    main: 0.04,
                    secondary: 0.055,
                    sub: 0.03
                }
            },
            badge: {
                show: false,
                position: { x: 0.82, y: 0.925 },
                radius: 0.015,
                fillColor: '#FF6B00',
                strokeColor: 'white',
                strokeWidth: 2
            },
            watermark: null
        },
        description: 'Global Hornet Community'
    },

    turkey: {
        id: 'turkey',
        name: 'Hornet Türkiye',
        emoji: '🇹🇷',
        flag: '🇹🇷',
        locale: 'tr-TR',
        colors: {
            primary: '#E30A17',
            secondary: '#FFFFFF',
            gradient: 'linear-gradient(135deg, #E30A17 0%, #FFFFFF 100%)'
        },
        branding: {
            logo: {
                // Logo PNG oficial
                imagePath: 'assets/logos/turkey/turkey.png',
                imageWidth: 0.25,
                margin: 0.02,
                defaultPosition: 'bottom-right',

                // Fallback: texto
                text: ['HORNET', 'LIVE'],
                subtext: 'TÜRKİYE',
                position: { x: 0.95, y: 0.88 },
                textAlign: 'right',
                colors: {
                    primary: 'white',
                    secondary: 'white',
                    accent: '#E30A17'
                },
                fontSize: {
                    main: 0.04,
                    secondary: 0.055,
                    sub: 0.03
                }
            },
            badge: {
                show: false, // Desabilitado se usar logo PNG
                position: { x: 0.82, y: 0.925 },
                radius: 0.015,
                fillColor: '#E30A17',
                strokeColor: 'white',
                strokeWidth: 2
            },
            watermark: null
        },
        description: 'Türkiye Hornet Topluluğu'
    },

    russia: {
        id: 'russia',
        name: 'Hornet Россия',
        emoji: '🇷🇺',
        flag: '🇷🇺',
        locale: 'ru-RU',
        colors: {
            primary: '#0039A6',
            secondary: '#D52B1E',
            gradient: 'linear-gradient(135deg, #FFFFFF 0%, #0039A6 50%, #D52B1E 100%)'
        },
        branding: {
            logo: {
                imagePath: 'assets/logos/russia/russia.png',
                imageWidth: 0.25,  // 25% da largura do canvas
                margin: 0.02,      // 2% de margem
                defaultPosition: 'bottom-right', // Padrão (usuário pode mudar)
                // Fallback: texto (se PNG falhar ou não existir)
                text: ['HORNET', 'LIVE'],
                subtext: 'РОССИЯ',
                position: { x: 0.95, y: 0.88 },
                textAlign: 'right',
                colors: {
                    primary: 'white',
                    secondary: 'white',
                    accent: '#0039A6'
                },
                fontSize: {
                    main: 0.04,
                    secondary: 0.055,
                    sub: 0.03
                }
            },
            badge: {
                show: false,
                position: { x: 0.82, y: 0.925 },
                radius: 0.015,
                fillColor: '#D52B1E',
                strokeColor: 'white',
                strokeWidth: 2
            },
            watermark: null
        },
        description: 'Российское сообщество Hornet'
    },

    ukraine: {
        id: 'ukraine',
        name: 'Hornet Україна',
        emoji: '🇺🇦',
        flag: '🇺🇦',
        locale: 'uk-UA',
        colors: {
            primary: '#005BBB',
            secondary: '#FFD500',
            gradient: 'linear-gradient(135deg, #005BBB 0%, #FFD500 100%)'
        },
        branding: {
            logo: {
                imagePath: 'assets/logos/ukraine/ukraine.png',
                imageWidth: 0.25,  // 25% da largura do canvas
                margin: 0.02,      // 2% de margem
                defaultPosition: 'bottom-right', // Padrão (usuário pode mudar)
                // Fallback: texto (se PNG falhar ou não existir)
                text: ['HORNET', 'LIVE'],
                subtext: 'УКРАЇНА',
                position: { x: 0.95, y: 0.88 },
                textAlign: 'right',
                colors: {
                    primary: 'white',
                    secondary: 'white',
                    accent: '#005BBB'
                },
                fontSize: {
                    main: 0.04,
                    secondary: 0.055,
                    sub: 0.03
                }
            },
            badge: {
                show: false,
                position: { x: 0.82, y: 0.925 },
                radius: 0.015,
                fillColor: '#005BBB',
                strokeColor: '#FFD500',
                strokeWidth: 2
            },
            watermark: null
        },
        description: 'Українська спільнота Hornet'
    },

    thailand: {
        id: 'thailand',
        name: 'Hornet ไทย',
        emoji: '🇹🇭',
        flag: '🇹🇭',
        locale: 'th-TH',
        colors: {
            primary: '#2D2A4A',
            secondary: '#A51931',
            gradient: 'linear-gradient(135deg, #2D2A4A 0%, #A51931 100%)'
        },
        branding: {
            logo: {
                imagePath: 'assets/logos/thailand/thailand.png',
                imageWidth: 0.25,  // 25% da largura do canvas
                margin: 0.02,      // 2% de margem
                defaultPosition: 'bottom-right', // Padrão (usuário pode mudar)
                // Fallback: texto (se PNG falhar ou não existir)
                text: ['HORNET', 'LIVE'],
                subtext: 'ไทย',
                position: { x: 0.95, y: 0.88 },
                textAlign: 'right',
                colors: {
                    primary: 'white',
                    secondary: 'white',
                    accent: '#A51931'
                },
                fontSize: {
                    main: 0.04,
                    secondary: 0.055,
                    sub: 0.03
                }
            },
            badge: {
                show: false,
                position: { x: 0.82, y: 0.925 },
                radius: 0.015,
                fillColor: '#A51931',
                strokeColor: 'white',
                strokeWidth: 2
            },
            watermark: null
        },
        description: 'ชุมชน Hornet ประเทศไทย'
    },

    indonesia: {
        id: 'indonesia',
        name: 'Hornet Indonesia',
        emoji: '🇮🇩',
        flag: '🇮🇩',
        locale: 'id-ID',
        colors: {
            primary: '#FF0000',
            secondary: '#FFFFFF',
            gradient: 'linear-gradient(135deg, #FF0000 0%, #FFFFFF 100%)'
        },
        branding: {
            logo: {
                imagePath: 'assets/logos/indonesia/indonesia.png',
                imageWidth: 0.25,  // 25% da largura do canvas
                margin: 0.02,      // 2% de margem
                defaultPosition: 'bottom-right', // Padrão (usuário pode mudar)
                // Fallback: texto (se PNG falhar ou não existir)
                text: ['HORNET', 'LIVE'],
                subtext: 'INDONESIA',
                position: { x: 0.95, y: 0.88 },
                textAlign: 'right',
                colors: {
                    primary: 'white',
                    secondary: 'white',
                    accent: '#FF0000'
                },
                fontSize: {
                    main: 0.04,
                    secondary: 0.055,
                    sub: 0.03
                }
            },
            badge: {
                show: false,
                position: { x: 0.82, y: 0.925 },
                radius: 0.015,
                fillColor: '#FF0000',
                strokeColor: 'white',
                strokeWidth: 2
            },
            watermark: null
        },
        description: 'Komunitas Hornet Indonesia'
    }
};

// Região padrão (Brasil por compatibilidade)
const DEFAULT_REGION = 'brasil';

/**
 * Retorna região por ID
 * @param {String} regionId - ID da região
 * @returns {Object|null} - Objeto da região ou null
 */
function getRegionById(regionId) {
    return REGIONS[regionId] || null;
}

/**
 * Retorna região padrão
 * @returns {Object} - Objeto da região padrão
 */
function getDefaultRegion() {
    return REGIONS[DEFAULT_REGION];
}

/**
 * Retorna lista de todas as regiões
 * @returns {Array} - Array de objetos de região
 */
function getAllRegions() {
    return Object.values(REGIONS);
}

/**
 * Detecta região pela URL (query parameter ?region=)
 * @returns {Object} - Objeto da região detectada ou padrão
 */
function detectRegionFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const regionParam = urlParams.get('region');

    if (regionParam && REGIONS[regionParam]) {
        return REGIONS[regionParam];
    }

    return getDefaultRegion();
}

/**
 * Salva região selecionada no localStorage
 * @param {String} regionId - ID da região
 */
function saveSelectedRegion(regionId) {
    if (REGIONS[regionId]) {
        localStorage.setItem('hornet_selected_region', regionId);
    }
}

/**
 * Recupera região salva do localStorage
 * @returns {Object|null} - Objeto da região salva ou null
 */
function getSavedRegion() {
    const savedRegionId = localStorage.getItem('hornet_selected_region');
    return savedRegionId ? getRegionById(savedRegionId) : null;
}

/**
 * Retorna região ativa (URL > localStorage > padrão)
 * @returns {Object} - Objeto da região ativa
 */
function getActiveRegion() {
    // Prioridade: URL > localStorage > Padrão
    const urlParams = new URLSearchParams(window.location.search);
    const regionParam = urlParams.get('region');

    if (regionParam && REGIONS[regionParam]) {
        return REGIONS[regionParam];
    }

    const savedRegion = getSavedRegion();
    if (savedRegion) {
        return savedRegion;
    }

    return getDefaultRegion();
}
