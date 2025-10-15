/**
 * EXEMPLO: Configuração de Temas V2 com Paths Dinâmicos por Região
 *
 * Nova arquitetura:
 * - Assets organizados por região primeiro
 * - Paths construídos dinamicamente
 * - Fallback automático para /global/
 */

const THEMES_V2 = {
    // ===================================
    // TEMA PADRÃO (cada região tem o seu)
    // ===================================
    default: {
        id: 'default',
        name: {
            brasil: 'Fantasmas',
            turkey: 'Hayaletler',
            russia: 'Призраки',
            ukraine: 'Привиди',
            thailand: 'ผี',
            global: 'Ghosts'
        },
        emoji: '👻',
        region: 'all', // Todas as regiões têm versão própria

        // Função que retorna paths baseado na região
        getAssets: (regionId) => ({
            background: `assets/themes/${regionId}/default/background.png`,
            overlay: `assets/themes/${regionId}/default/overlay.png`,
            preview: `assets/themes/${regionId}/default/preview.jpg`
        }),

        colors: {
            primary: '#FF6B00',
            secondary: '#FF751F',
            gradient: 'linear-gradient(135deg, #FDB813 0%, #FF6B00 100%)'
        },
        description: 'Tema padrão da região',
        featured: true,
        default: true
    },

    // ===================================
    // HALLOWEEN (global com customizações)
    // ===================================
    halloween: {
        id: 'halloween',
        name: {
            brasil: 'Aranhas',
            turkey: 'Cadılar Bayramı',
            russia: 'Хэллоуин',
            ukraine: 'Хелловін',
            thailand: 'ฮาโลวีน',
            global: 'Halloween'
        },
        emoji: '🎃',
        region: 'all',

        // Busca primeiro na região, depois em global
        getAssets: (regionId) => {
            const regional = `assets/themes/${regionId}/halloween`;
            const globalPath = `assets/themes/global/halloween`;

            return {
                background: `${regional}/background.png`,
                overlay: `${regional}/overlay.png`,
                preview: `${regional}/preview.jpg`,
                // Fallback será tratado pelo preloader
                fallback: {
                    background: `${globalPath}/background.png`,
                    overlay: `${globalPath}/overlay.png`,
                    preview: `${globalPath}/preview.jpg`
                }
            };
        },

        colors: {
            primary: '#F25E39',
            secondary: '#F25E39',
            gradient: 'linear-gradient(135deg, #1a0033 0%, #8B008B 50%, #FF6600 100%)'
        },
        description: 'Halloween com elementos regionais',
        featured: false,
        available: {
            start: '10-01',
            end: '10-31'
        },
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

    // ===================================
    // PRIDE MONTH (100% global)
    // ===================================
    pride_month: {
        id: 'pride_month',
        name: {
            brasil: 'Mês do Orgulho',
            turkey: 'Onur Ayı',
            russia: 'Месяц Гордости',
            ukraine: 'Місяць Гордості',
            thailand: 'เดือนแห่งความภาคภูมิใจ',
            global: 'Pride Month'
        },
        emoji: '🏳️‍🌈',
        region: 'all',

        // Sempre busca em global (mesmo para todos)
        getAssets: (regionId) => ({
            background: `assets/themes/global/pride_month/background.png`,
            overlay: `assets/themes/global/pride_month/overlay.png`,
            preview: `assets/themes/global/pride_month/preview.jpg`
        }),

        colors: {
            primary: '#1E4253',
            secondary: '#112941',
            gradient: 'linear-gradient(135deg, #E40303 0%, #FF8C00 16%, #FFED00 32%, #008026 48%, #24408E 64%, #732982 80%, #8B00FF 100%)'
        },
        description: 'Celebre o Orgulho LGBTQIA+',
        featured: true,
        available: {
            start: '06-01',
            end: '06-30'
        },
        brandingOverride: {
            logo: {
                text: ['PRIDE', 'MONTH'],
                subtext: null
            }
        }
    },

    // ===================================
    // OUTUBRO ROSA (específico Brasil)
    // ===================================
    outubro_rosa: {
        id: 'outubro_rosa',
        name: 'Outubro Rosa',
        emoji: '🎀',
        region: ['brasil'], // APENAS Brasil

        getAssets: (regionId) => ({
            background: `assets/themes/brasil/outubro_rosa/background.png`,
            overlay: `assets/themes/brasil/outubro_rosa/overlay.png`,
            preview: `assets/themes/brasil/outubro_rosa/preview.jpg`
        }),

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

    // ===================================
    // DIA DA INDEPENDÊNCIA TR (específico Turquia)
    // ===================================
    independence_day_turkey: {
        id: 'independence_day_turkey',
        name: 'Cumhuriyet Bayramı',
        emoji: '🇹🇷',
        region: ['turkey'], // APENAS Turquia

        getAssets: (regionId) => ({
            background: `assets/themes/turkey/independence_day/background.png`,
            overlay: `assets/themes/turkey/independence_day/overlay.png`,
            preview: `assets/themes/turkey/independence_day/preview.jpg`
        }),

        colors: {
            primary: '#E30A17',
            secondary: '#FFFFFF',
            gradient: 'linear-gradient(135deg, #E30A17 0%, #FFFFFF 100%)'
        },
        description: 'Celebração da República da Turquia',
        featured: true,
        available: {
            start: '10-29',
            end: '10-29'
        },
        brandingOverride: {
            logo: {
                text: ['CUMHURİYET', 'BAYRAMI'],
                subtext: null,
                colors: {
                    primary: '#FFFFFF',
                    secondary: '#FFFFFF'
                }
            }
        }
    }
};

// ===================================
// HELPER: Obter nome localizado
// ===================================
function getThemeName(theme, regionId) {
    if (typeof theme.name === 'string') {
        return theme.name;
    }
    return theme.name[regionId] || theme.name.global || theme.name.brasil;
}

// ===================================
// HELPER: Carregar assets com fallback
// ===================================
async function loadThemeAssets(theme, regionId) {
    const assets = theme.getAssets(regionId);

    // Se tema tem fallback definido
    if (assets.fallback) {
        const regionalAssets = await tryLoadAssets(assets);

        // Se falhou, tenta global
        if (!regionalAssets.success) {
            console.log(`⚠️ Assets regionais não encontrados, usando global`);
            return await tryLoadAssets(assets.fallback);
        }

        return regionalAssets;
    }

    // Sem fallback, carrega direto
    return await tryLoadAssets(assets);
}

async function tryLoadAssets(assets) {
    return new Promise((resolve) => {
        const background = new Image();
        const overlay = new Image();

        background.crossOrigin = "anonymous";
        overlay.crossOrigin = "anonymous";

        let loadedCount = 0;
        let hasError = false;
        let loadedImages = { background: null, overlay: null };

        const checkComplete = () => {
            loadedCount++;
            if (loadedCount === 2) {
                resolve({
                    success: !hasError,
                    images: loadedImages
                });
            }
        };

        background.onload = () => {
            loadedImages.background = background;
            checkComplete();
        };

        overlay.onload = () => {
            loadedImages.overlay = overlay;
            checkComplete();
        };

        background.onerror = () => {
            hasError = true;
            checkComplete();
        };

        overlay.onerror = () => {
            hasError = true;
            checkComplete();
        };

        background.src = assets.background;
        overlay.src = assets.overlay;
    });
}

// ===================================
// EXEMPLO DE USO
// ===================================

/*
// Usuário na Turquia seleciona Halloween:
const regionId = 'turkey';
const theme = THEMES_V2.halloween;

// 1. Obter nome localizado
const themeName = getThemeName(theme, regionId);
console.log(themeName); // "Cadılar Bayramı"

// 2. Carregar assets (com fallback automático)
const assets = await loadThemeAssets(theme, regionId);
// Tenta: themes/turkey/halloween/background.png
// Se falhar: themes/global/halloween/background.png

// 3. Renderizar com branding da Turquia
drawBranding(ctx, width, height, REGIONS[regionId], theme);
// Logo: "HORNET LIVE TÜRKİYE" (região)
// Override: "HAPPY HALLOWEEN" (tema)
// Badge: vermelho #E30A17 (região)
*/
