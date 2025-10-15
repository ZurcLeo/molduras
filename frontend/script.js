const uploadSection = document.getElementById('uploadSection');
const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasContainer = document.getElementById('canvasContainer');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const resetBtn = document.getElementById('resetBtn');
const frameOptions = document.querySelectorAll('.frame-option');
const formatOptions = document.querySelectorAll('.format-option');
const loading = document.getElementById('loading');
const themesGrid = document.getElementById('themesGrid');
const regionSelectorGrid = document.getElementById('regionSelectorGrid');
const headerTitle = document.getElementById('headerTitle');

let uploadedImage = null;
let selectedFrame = 'center';
let selectedFormat = 'square';
let selectedTheme = DEFAULT_THEME;
let selectedRegion = null; // Será definido na inicialização
let selectedLogoPosition = 'bottom-right'; // Posição padrão do logo

// Cache de imagens por tema
let themeImages = {};

// Cache de logos regionais
let regionLogos = {};

// Imagens do tema atual
let layerOne = new Image(); // Morcegos/overlay (fundo transparente)
let layerTwo = new Image(); // Fundo
let layersLoaded = { one: false, two: false };

// =====================================
// INICIALIZAÇÃO
// =====================================

window.addEventListener('DOMContentLoaded', async () => {
    // Detectar região ativa (URL > localStorage > Padrão)
    selectedRegion = getActiveRegion();
    console.log(`🌍 Região ativa: ${selectedRegion.name}`);

    // Inicializar sistema de i18n com locale da região
    if (window.i18n) {
        await window.i18n.initI18n(selectedRegion.locale);
    }

    // Renderizar seletor de regiões
    renderRegions();

    // Atualizar interface para a região
    updateRegionInterface(selectedRegion);

    // Pré-carregar logo da região ativa
    await preloadRegionLogo(selectedRegion);

    // Renderizar temas da região
    renderThemes();

    // Carregar tema padrão da região
    const defaultTheme = getDefaultThemeForRegion(selectedRegion.id);
    selectedTheme = defaultTheme.id;
    loadTheme(defaultTheme.id);
});

// =====================================
// RENDERIZAÇÃO DE REGIÕES
// =====================================

function renderRegions() {
    const allRegions = getAllRegions();
    regionSelectorGrid.innerHTML = '';

    allRegions.forEach(region => {
        const regionOption = createRegionElement(region);
        regionSelectorGrid.appendChild(regionOption);
    });
}

function createRegionElement(region) {
    const div = document.createElement('div');
    div.className = `region-option ${region.id === selectedRegion.id ? 'selected' : ''}`;
    div.dataset.region = region.id;

    const flag = document.createElement('div');
    flag.className = 'region-flag';
    flag.textContent = region.flag;

    const name = document.createElement('div');
    name.className = 'region-name';
    name.textContent = region.name;

    div.appendChild(flag);
    div.appendChild(name);

    // Event listener para troca de região
    div.addEventListener('click', () => {
        changeRegion(region);
    });

    return div;
}

async function changeRegion(region) {
    console.log(`🌍 Mudando região para: ${region.name}`);

    // Atualizar região selecionada
    selectedRegion = region;

    // Salvar no localStorage
    saveSelectedRegion(region.id);

    // Alterar idioma baseado no locale da região
    if (window.i18n) {
        await window.i18n.changeLocale(region.locale);
    }

    // Pré-carregar logo da região (se existir)
    await preloadRegionLogo(region);

    // Atualizar interface
    document.querySelectorAll('.region-option').forEach(opt =>
        opt.classList.remove('selected')
    );
    document.querySelector(`[data-region="${region.id}"]`).classList.add('selected');

    // Atualizar header e cores
    updateRegionInterface(region);

    // Renderizar temas da nova região
    renderThemes();

    // Carregar tema padrão da nova região
    const defaultTheme = getDefaultThemeForRegion(region.id);
    selectedTheme = defaultTheme.id;
    loadTheme(defaultTheme.id);
}

function updateRegionInterface(region) {
    // Atualizar título do header (será atualizado pelo i18n)
    const emoji = region.emoji;

    // Usar tradução se disponível, senão usar texto padrão
    if (window.i18n && window.i18n.t) {
        const translatedTitle = window.i18n.t('header.title');
        // Adiciona emoji se não estiver na tradução
        headerTitle.textContent = translatedTitle.includes(emoji)
            ? translatedTitle
            : `${emoji} ${translatedTitle}`;
    } else {
        headerTitle.textContent = `${emoji} Gerador de Molduras ${region.name}`;
    }

    // Atualizar cores do gradiente de fundo
    if (region.colors) {
        document.body.style.background = region.colors.gradient;
    }
}

// =====================================
// RENDERIZAÇÃO DE TEMAS
// =====================================

function renderThemes() {
    // Usar temas disponíveis para a região selecionada
    const availableThemes = getAvailableThemesForRegion(selectedRegion.id);

    themesGrid.innerHTML = '';

    if (availableThemes.length === 0) {
        themesGrid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:#999;">Nenhum tema disponível para esta região.</p>';
        return;
    }

    availableThemes.forEach(theme => {
        const themeOption = createThemeElement(theme);
        themesGrid.appendChild(themeOption);
    });
}

function createThemeElement(theme) {
    const div = document.createElement('div');
    // Marcar como selecionado se for o tema atual
    div.className = `theme-option ${theme.id === selectedTheme ? 'selected' : ''}`;
    div.dataset.theme = theme.id;

    const preview = document.createElement('div');
    preview.className = 'theme-preview';

    // Se tiver imagem de preview, usa; senão usa emoji
    if (theme.preview) {
        const img = document.createElement('img');
        img.src = theme.preview;
        img.alt = theme.name;
        img.onerror = () => {
            // Se preview falhar, mostra emoji
            preview.innerHTML = `<div class="theme-emoji">${theme.emoji}</div>`;
        };
        preview.appendChild(img);
    } else {
        preview.innerHTML = `<div class="theme-emoji">${theme.emoji}</div>`;
    }

    // Badge (destaque, sazonal, etc)
    if (theme.featured) {
        const badge = document.createElement('div');
        badge.className = 'theme-badge featured';
        badge.textContent = 'Popular';
        preview.appendChild(badge);
    } else if (theme.available) {
        const badge = document.createElement('div');
        badge.className = 'theme-badge seasonal';
        badge.textContent = 'Sazonal';
        preview.appendChild(badge);
    }

    const name = document.createElement('div');
    name.className = 'theme-name';
    name.textContent = theme.name;

    div.appendChild(preview);
    div.appendChild(name);

    // Event listener para seleção
    div.addEventListener('click', async () => {
        document.querySelectorAll('.theme-option').forEach(opt =>
            opt.classList.remove('selected')
        );
        div.classList.add('selected');

        await loadTheme(theme.id);
    });

    return div;
}

// =====================================
// CARREGAMENTO DE LOGOS REGIONAIS
// =====================================

/**
 * Pré-carrega o logo PNG de uma região
 * @param {Object} region - Objeto da região
 * @returns {Promise<Image|null>} - Imagem carregada ou null se falhar
 */
async function preloadRegionLogo(region) {
    // Se já está em cache, retorna
    if (regionLogos[region.id]) {
        console.log(`📦 Logo da região ${region.id} carregado do cache`);
        return regionLogos[region.id];
    }

    // Se não tem imagePath configurado, retorna null (usará fallback de texto)
    if (!region.branding?.logo?.imagePath) {
        console.log(`ℹ️ Região ${region.id} não tem logo PNG configurado`);
        return null;
    }

    const logoPath = region.branding.logo.imagePath;
    console.log(`⬇️ Baixando logo da região ${region.id}: ${logoPath}`);

    return new Promise((resolve) => {
        const logoImage = new Image();
        logoImage.crossOrigin = "anonymous";

        logoImage.onload = () => {
            console.log(`✓ Logo da região ${region.id} carregado com sucesso`);
            regionLogos[region.id] = logoImage;
            resolve(logoImage);
        };

        logoImage.onerror = () => {
            console.warn(`⚠️ Logo da região ${region.id} não encontrado (404) - usando fallback de texto`);
            regionLogos[region.id] = null;
            resolve(null);
        };

        logoImage.src = logoPath;
    });
}

// =====================================
// CARREGAMENTO DE TEMAS
// =====================================

async function loadTheme(themeId) {
    console.log(`🎨 Carregando tema: ${themeId}`);

    const theme = getThemeById(themeId);
    if (!theme) {
        console.error(`❌ Tema ${themeId} não encontrado`);
        return;
    }

    // Mostrar loading
    if (uploadedImage) {
        loading.style.display = 'block';
    }

    try {
        // Pré-carregar imagens do tema
        const images = await preloadTheme(theme);

        // Atualizar layers globais (podem ser null se 404)
        layerTwo = images.background;
        layerOne = images.overlay;
        layersLoaded = {
            one: images.overlay !== null,
            two: images.background !== null
        };

        selectedTheme = themeId;

        // Atualizar cores da interface (opcional)
        updateInterfaceColors(theme);

        if (!layersLoaded.one || !layersLoaded.two) {
            console.warn(`⚠️ Tema ${themeId} usando fallback para imagens não encontradas`);
        } else {
            console.log(`✓ Tema ${themeId} carregado completamente`);
        }

        // Reaplicar moldura se já houver imagem
        if (uploadedImage) {
            await applyFrame();
        }
    } catch (error) {
        console.error(`❌ Erro ao carregar tema ${themeId}:`, error);
        // Continuar com fallback
        layersLoaded = { one: false, two: false };
    }

    loading.style.display = 'none';
}

async function preloadTheme(theme) {
    // Verificar se já está em cache
    if (themeImages[theme.id]) {
        console.log(`📦 Tema ${theme.id} carregado do cache`);
        return themeImages[theme.id];
    }

    console.log(`⬇️ Baixando imagens do tema ${theme.id}...`);

    return new Promise((resolve) => {
        const background = new Image();
        const overlay = new Image();

        background.crossOrigin = "anonymous";
        overlay.crossOrigin = "anonymous";

        let loadedCount = 0;
        let loadedImages = { background: null, overlay: null };

        const checkComplete = () => {
            loadedCount++;
            if (loadedCount === 2) {
                // Sempre resolve, mesmo se houver erros
                // O fallback será usado durante a renderização
                themeImages[theme.id] = loadedImages;
                console.log(`✓ Carregamento do tema ${theme.id} concluído`);
                resolve(loadedImages);
            }
        };

        background.onload = () => {
            console.log(`✓ Background do tema ${theme.id} carregado`);
            loadedImages.background = background;
            checkComplete();
        };

        overlay.onload = () => {
            console.log(`✓ Overlay do tema ${theme.id} carregado`);
            loadedImages.overlay = overlay;
            checkComplete();
        };

        background.onerror = () => {
            console.warn(`⚠️ Background do tema ${theme.id} não encontrado (404) - usando fallback`);
            loadedImages.background = null;
            checkComplete();
        };

        overlay.onerror = () => {
            console.warn(`⚠️ Overlay do tema ${theme.id} não encontrado (404) - usando fallback`);
            loadedImages.overlay = null;
            checkComplete();
        };

        background.src = theme.background;
        overlay.src = theme.overlay;
    });
}

function updateInterfaceColors(theme) {
    // Atualizar CSS variables (opcional)
    if (theme.colors) {
        document.documentElement.style.setProperty('--theme-primary', theme.colors.primary);
        document.documentElement.style.setProperty('--theme-secondary', theme.colors.secondary);
    }
}

// =====================================
// UPLOAD E DRAG & DROP
// =====================================

uploadSection.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) loadImage(file);
});

uploadSection.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadSection.classList.add('dragover');
});

uploadSection.addEventListener('dragleave', () => {
    uploadSection.classList.remove('dragover');
});

uploadSection.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadSection.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        loadImage(file);
    }
});

// =====================================
// SELEÇÃO DE FORMATO
// =====================================

formatOptions.forEach(option => {
    option.addEventListener('click', () => {
        formatOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedFormat = option.dataset.format;
        if (uploadedImage) applyFrame();
    });
});

// =====================================
// SELEÇÃO DE POSIÇÃO DO LOGO
// =====================================

const logoPositionOptions = document.querySelectorAll('.logo-position-option');

logoPositionOptions.forEach(option => {
    option.addEventListener('click', () => {
        logoPositionOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedLogoPosition = option.dataset.position;
        console.log(`📍 Posição do logo alterada para: ${selectedLogoPosition}`);

        // Reaplicar moldura se já houver imagem
        if (uploadedImage) applyFrame();
    });
});

// =====================================
// SELEÇÃO DE FRAME (POSICIONAMENTO)
// =====================================

frameOptions.forEach(option => {
    option.addEventListener('click', () => {
        frameOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedFrame = option.dataset.frame;
        if (uploadedImage) applyFrame();
    });
});

// =====================================
// PROCESSAMENTO DE IMAGEM
// =====================================

function loadImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            uploadedImage = img;
            applyFrame();
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

async function applyFrame() {
    loading.style.display = 'block';
    canvasContainer.style.display = 'none';
    downloadBtn.style.display = 'none';
    resetBtn.style.display = 'none';

    await new Promise(resolve => setTimeout(resolve, 100));

    applyFrameLocally();
}

function applyFrameLocally() {
    const width = 1080;
    const height = selectedFormat === 'portrait' ? 1360 : 1080; // 1080 + 140 (cima) + 140 (baixo) = 1360
    canvas.width = width;
    canvas.height = height;

    const theme = getThemeById(selectedTheme);
    console.log(`🎨 Aplicando moldura com tema: ${theme.name}`);
    console.log(`📐 Posicionamento: ${selectedFrame}`);
    console.log(`📱 Formato: ${selectedFormat} (${width}x${height})`);

    // PASSO 1: Desenhar fundo (Layer Two)
    if (layersLoaded.two && layerTwo && layerTwo.complete) {
        console.log('📐 Desenhando Layer Two (fundo) - imagem carregada');

        if (selectedFormat === 'portrait') {
            // Para retrato: desenhar fundo quadrado no centro com barras acima e abaixo
            const squareSize = 1080;
            const yOffset = (height - squareSize) / 2;

            // Preencher barras com gradiente
            const bgGradient = ctx.createLinearGradient(0, 0, width, height);
            bgGradient.addColorStop(0, theme.colors?.primary || '#FDB813');
            bgGradient.addColorStop(1, theme.colors?.secondary || '#FF6B00');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, width, height);

            // Desenhar imagem quadrada no centro
            ctx.drawImage(layerTwo, 0, yOffset, squareSize, squareSize);
        } else {
            // Quadrado normal
            ctx.drawImage(layerTwo, 0, 0, width, height);
        }
    } else {
        console.log('📐 Desenhando fundo (fallback) - gerando gradiente dinamicamente');
        // Fallback: usar cores do tema
        const bgGradient = ctx.createLinearGradient(0, 0, width, height);
        bgGradient.addColorStop(0, theme.colors?.primary || '#FDB813');
        bgGradient.addColorStop(1, theme.colors?.secondary || '#FF6B00');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, width, height);
    }

    // PASSO 2: Desenhar foto do usuário
    console.log('👤 Desenhando foto do usuário');

    const scale = Math.max(width / uploadedImage.width, height / uploadedImage.height);
    const x = (width - uploadedImage.width * scale) / 2;
    const y = (height - uploadedImage.height * scale) / 2;

    if (selectedFrame === 'center') {
        drawCenterFrame(width, height);
    } else if (selectedFrame === 'full') {
        drawFullFrame(width, height, x, y, scale);
    } else if (selectedFrame === 'topleft') {
        drawTopLeftFrame(width, height);
    }

    // PASSO 3: Desenhar overlay (Layer One - morcegos)
    if (layersLoaded.one && layerOne && layerOne.complete) {
        console.log('🦇 Desenhando Layer One (overlay) - imagem carregada');
        ctx.globalCompositeOperation = 'source-over';

        if (selectedFormat === 'portrait') {
            // Para retrato: desenhar overlay quadrado no centro
            const squareSize = 1080;
            const yOffset = (height - squareSize) / 2;
            ctx.drawImage(layerOne, 0, yOffset, squareSize, squareSize);
        } else {
            // Quadrado normal
            ctx.drawImage(layerOne, 0, 0, width, height);
        }
    } else {
        console.log('🦇 Desenhando overlay (fallback) - gerando elementos dinamicamente');
        drawBatsFallback(ctx, width, height, theme);
    }

    // PASSO 4: Desenhar branding (logo + badge) - SEMPRE DINÂMICO
    console.log('🏷️ Desenhando branding da região');
    drawBranding(ctx, width, height, selectedRegion, theme);

    console.log('✅ Composição finalizada com sucesso!');

    loading.style.display = 'none';
    canvasContainer.style.display = 'block';
    downloadBtn.style.display = 'inline-block';

    // Mostrar botão de compartilhamento apenas em mobile
    if (isMobile()) {
        shareBtn.style.display = 'inline-block';
    }

    resetBtn.style.display = 'inline-block';
}

// Funções de desenho de frames
function drawCenterFrame(width, height) {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) * 0.35;

    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const circleSize = radius * 2;
    const imgScale = Math.max(circleSize / uploadedImage.width, circleSize / uploadedImage.height);
    const imgX = centerX - (uploadedImage.width * imgScale) / 2;
    const imgY = centerY - (uploadedImage.height * imgScale) / 2;

    ctx.drawImage(uploadedImage, imgX, imgY,
        uploadedImage.width * imgScale, uploadedImage.height * imgScale);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 8;
    ctx.stroke();
}

function drawFullFrame(width, height, x, y, scale) {
    ctx.globalAlpha = 0.7;
    ctx.drawImage(uploadedImage, x, y, uploadedImage.width * scale, uploadedImage.height * scale);
    ctx.globalAlpha = 1.0;
}

function drawTopLeftFrame(width, height) {
    const size = Math.min(width, height);
    const cornerSize = size * 0.4;
    ctx.save();
    ctx.beginPath();
    ctx.arc(size * 0.22, size * 0.22, cornerSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const cornerScale = Math.max(cornerSize / uploadedImage.width, cornerSize / uploadedImage.height);
    const cornerX = size * 0.22 - (uploadedImage.width * cornerScale) / 2;
    const cornerY = size * 0.22 - (uploadedImage.height * cornerScale) / 2;

    ctx.drawImage(uploadedImage, cornerX, cornerY,
        uploadedImage.width * cornerScale, uploadedImage.height * cornerScale);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(size * 0.22, size * 0.22, cornerSize / 2, 0, Math.PI * 2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 6;
    ctx.stroke();
}

/**
 * Desenha branding dinâmico (logo + badge) baseado na região e tema
 * NOVA ARQUITETURA: Separação entre elementos decorativos e branding
 * Suporta logos PNG posicionáveis nos 4 cantos
 *
 * @param {CanvasRenderingContext2D} ctx - Contexto do canvas
 * @param {Number} width - Largura do canvas
 * @param {Number} height - Altura do canvas
 * @param {Object} region - Objeto da região ativa
 * @param {Object} theme - Objeto do tema ativo
 */
function drawBranding(ctx, width, height, region, theme) {
    const size = Math.min(width, height);

    // Mesclar branding da região com override do tema (se existir)
    const branding = {
        ...region.branding,
        ...(theme.brandingOverride || {})
    };

    // Mesclar configurações de logo
    const logo = {
        ...region.branding.logo,
        ...(theme.brandingOverride?.logo || {})
    };

    // Mesclar configurações de badge
    const badge = {
        ...region.branding.badge,
        ...(theme.brandingOverride?.badge || {})
    };

    // ===== DESENHAR LOGO PNG (se disponível) =====
    const logoImage = regionLogos[region.id];

    if (logoImage && logoImage.complete && logo.imagePath) {
        console.log(`🖼️ Desenhando logo PNG da região ${region.id} em ${selectedLogoPosition}`);

        // Calcular dimensões do logo
        const logoWidth = width * (logo.imageWidth || 0.25);
        const logoHeight = (logoImage.height / logoImage.width) * logoWidth;
        const margin = width * (logo.margin || 0.02);

        // Calcular posição baseado na escolha do usuário
        let x, y;
        switch (selectedLogoPosition) {
            case 'top-left':
                x = margin;
                y = margin;
                break;
            case 'top-right':
                x = width - logoWidth - margin;
                y = margin;
                break;
            case 'bottom-left':
                x = margin;
                y = height - logoHeight - margin;
                break;
            case 'bottom-right':
            default:
                x = width - logoWidth - margin;
                y = height - logoHeight - margin;
        }

        // Desenhar logo PNG
        ctx.drawImage(logoImage, x, y, logoWidth, logoHeight);

        console.log(`✓ Logo PNG desenhado em (${x.toFixed(0)}, ${y.toFixed(0)}) - ${logoWidth.toFixed(0)}x${logoHeight.toFixed(0)}px`);
    }
    // ===== FALLBACK: DESENHAR LOGO DE TEXTO =====
    else if (logo && logo.text) {
        console.log(`📝 Desenhando logo de texto (fallback) da região ${region.id}`);

        ctx.textAlign = logo.textAlign || 'right';
        const posX = size * (logo.position?.x || 0.95);
        let posY = size * (logo.position?.y || 0.88);

        // Linha 1: Texto principal (ex: "HORNET")
        if (logo.text[0]) {
            ctx.fillStyle = logo.colors?.primary || 'white';
            ctx.font = `bold ${size * (logo.fontSize?.main || 0.04)}px Arial`;
            ctx.fillText(logo.text[0], posX, posY);
            posY += size * 0.05; // Espaçamento
        }

        // Linha 2: Texto secundário (ex: "LIVE")
        if (logo.text[1]) {
            ctx.fillStyle = logo.colors?.secondary || 'white';
            ctx.font = `bold ${size * (logo.fontSize?.secondary || 0.055)}px Arial`;
            ctx.fillText(logo.text[1], posX, posY);
            posY += size * 0.04; // Espaçamento
        }

        // Linha 3: Subtexto (ex: "BRASIL", "TÜRKIYE")
        if (logo.subtext) {
            ctx.fillStyle = logo.colors?.primary || 'white';
            ctx.font = `${size * (logo.fontSize?.sub || 0.03)}px Arial`;
            ctx.fillText(logo.subtext, posX, posY);
        }
    }

    // ===== DESENHAR BADGE (círculo "LIVE") =====
    if (badge && badge.show) {
        const badgeX = size * (badge.position?.x || 0.82);
        const badgeY = size * (badge.position?.y || 0.925);
        const badgeRadius = size * (badge.radius || 0.015);

        ctx.beginPath();
        ctx.arc(badgeX, badgeY, badgeRadius, 0, Math.PI * 2);
        ctx.fillStyle = badge.fillColor || '#FF6B00';
        ctx.fill();

        if (badge.strokeColor) {
            ctx.strokeStyle = badge.strokeColor;
            ctx.lineWidth = badge.strokeWidth || 2;
            ctx.stroke();
        }
    }
}

/**
 * Fallback: desenhar elementos decorativos manualmente quando PNG não está disponível
 * NOTA: Branding (logo/badge) agora é desenhado separadamente pela função drawBranding()
 */
function drawBatsFallback(ctx, width, height, theme) {
    const size = Math.min(width, height);

    // Posições dos morcegos decorativos
    const batPositions = [
        {x: 0.15, y: 0.12, scale: 0.08},
        {x: 0.08, y: 0.35, scale: 0.09},
        {x: 0.12, y: 0.55, scale: 0.07},
        {x: 0.18, y: 0.75, scale: 0.08},
        {x: 0.35, y: 0.88, scale: 0.09},
        {x: 0.25, y: 0.08, scale: 0.06},
    ];

    // Cor dos morcegos baseada no tema
    let batColor = '#1a1a1a';
    if (theme.id === 'dark_mode') {
        batColor = '#cccccc';
    } else if (theme.id === 'halloween') {
        batColor = '#FF6600';
    }

    // Desenhar morcegos decorativos
    ctx.fillStyle = batColor;
    batPositions.forEach(pos => {
        const batSize = size * pos.scale;
        const batX = size * pos.x;
        const batY = size * pos.y;

        ctx.save();
        ctx.translate(batX, batY);

        // Corpo do morcego
        ctx.beginPath();
        ctx.ellipse(0, 0, batSize * 0.3, batSize * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Asa esquerda
        ctx.beginPath();
        ctx.moveTo(-batSize * 0.3, 0);
        ctx.quadraticCurveTo(-batSize * 0.6, -batSize * 0.4, -batSize * 0.8, -batSize * 0.2);
        ctx.quadraticCurveTo(-batSize * 0.6, 0, -batSize * 0.3, 0);
        ctx.fill();

        // Asa direita
        ctx.beginPath();
        ctx.moveTo(batSize * 0.3, 0);
        ctx.quadraticCurveTo(batSize * 0.6, -batSize * 0.4, batSize * 0.8, -batSize * 0.2);
        ctx.quadraticCurveTo(batSize * 0.6, 0, batSize * 0.3, 0);
        ctx.fill();

        ctx.restore();
    });

    // Elementos decorativos específicos de alguns temas
    if (theme.id === 'outubro_rosa') {
        // Laço rosa (símbolo da campanha)
        ctx.beginPath();
        ctx.arc(size * 0.83, size * 0.13, size * 0.04, 0, Math.PI * 2);
        ctx.fillStyle = '#FF1493';
        ctx.fill();
    } else if (theme.id === 'zumbis') {
        // Mão de zumbi (canto inferior esquerdo)
        ctx.fillStyle = '#556B2F';
        ctx.fillRect(size * 0.02, size * 0.85, size * 0.08, size * 0.05);
    } else if (theme.id === 'brasil') {
        // Estrelas (estilo bandeira)
        const drawStar = (x, y, radius, color) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            for (let i = 0; i < 5; i++) {
                const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
                const px = x + Math.cos(angle) * radius;
                const py = y + Math.sin(angle) * radius;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
        };

        drawStar(size * 0.15, size * 0.15, size * 0.03, '#FEDF00');
        drawStar(size * 0.85, size * 0.20, size * 0.025, '#009B3A');
        drawStar(size * 0.12, size * 0.85, size * 0.028, '#002776');
    }

    // NOTA: Logo e badge agora são desenhados pela função drawBranding()
    // que é chamada após este fallback na função applyFrameLocally()
}

// =====================================
// DOWNLOAD E RESET
// =====================================

// Detectar se é mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Função para SALVAR imagem (download direto)
function downloadImage() {
    const theme = getThemeById(selectedTheme);
    const filename = `hornet-${theme.id}-perfil.png`;

    console.log('💾 Iniciando download direto da imagem...');

    // Converter canvas para blob
    canvas.toBlob((blob) => {
        // Download tradicional (funciona em todos os dispositivos)
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Limpar URL temporária
        setTimeout(() => URL.revokeObjectURL(url), 100);

        console.log('✓ Download iniciado com sucesso!');
    }, 'image/png');
}

// Função para COMPARTILHAR imagem (Web Share API)
async function shareImage() {
    const theme = getThemeById(selectedTheme);
    const filename = `hornet-${theme.id}-perfil.png`;

    console.log('📤 Iniciando compartilhamento via Web Share API...');

    // Converter canvas para blob
    canvas.toBlob(async (blob) => {
        if (navigator.canShare) {
            const file = new File([blob], filename, { type: 'image/png' });

            if (navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: 'Foto com Moldura Hornet',
                        text: 'Minha foto com moldura personalizada! 🐝'
                    });
                    console.log('✓ Imagem compartilhada com sucesso');
                } catch (err) {
                    if (err.name === 'AbortError') {
                        console.log('ℹ️ Compartilhamento cancelado pelo usuário');
                    } else {
                        console.error('❌ Erro ao compartilhar:', err);
                        alert('Não foi possível compartilhar. Use o botão "Salvar Imagem".');
                    }
                }
            } else {
                console.warn('⚠️ Web Share API não suporta compartilhar arquivos');
                alert('Compartilhamento não disponível. Use o botão "Salvar Imagem".');
            }
        } else {
            console.warn('⚠️ Web Share API não disponível neste dispositivo');
            alert('Compartilhamento não disponível. Use o botão "Salvar Imagem".');
        }
    }, 'image/png');
}

// Event listeners
downloadBtn.addEventListener('click', downloadImage);
shareBtn.addEventListener('click', shareImage);

resetBtn.addEventListener('click', () => {
    uploadedImage = null;
    fileInput.value = '';
    canvasContainer.style.display = 'none';
    downloadBtn.style.display = 'none';
    shareBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    frameOptions.forEach(opt => opt.classList.remove('selected'));
    document.querySelector('[data-frame="center"]').classList.add('selected');
    formatOptions.forEach(opt => opt.classList.remove('selected'));
    document.querySelector('[data-format="square"]').classList.add('selected');
    selectedFormat = 'square';
});
