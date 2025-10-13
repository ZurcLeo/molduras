const uploadSection = document.getElementById('uploadSection');
const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasContainer = document.getElementById('canvasContainer');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const frameOptions = document.querySelectorAll('.frame-option');
const loading = document.getElementById('loading');
const themesGrid = document.getElementById('themesGrid');

let uploadedImage = null;
let selectedFrame = 'center';
let selectedTheme = DEFAULT_THEME;

// Cache de imagens por tema
let themeImages = {};

// Imagens do tema atual
let layerOne = new Image(); // Morcegos/overlay (fundo transparente)
let layerTwo = new Image(); // Fundo
let layersLoaded = { one: false, two: false };

// =====================================
// INICIALIZAÇÃO
// =====================================

window.addEventListener('DOMContentLoaded', () => {
    renderThemes();
    loadTheme(DEFAULT_THEME);
});

// =====================================
// RENDERIZAÇÃO DE TEMAS
// =====================================

function renderThemes() {
    const availableThemes = getAvailableThemes();

    themesGrid.innerHTML = '';

    availableThemes.forEach(theme => {
        const themeOption = createThemeElement(theme);
        themesGrid.appendChild(themeOption);
    });
}

function createThemeElement(theme) {
    const div = document.createElement('div');
    div.className = `theme-option ${theme.id === DEFAULT_THEME ? 'selected' : ''}`;
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
    const size = 1080;
    canvas.width = size;
    canvas.height = size;

    const theme = getThemeById(selectedTheme);
    console.log(`🎨 Aplicando moldura com tema: ${theme.name}`);
    console.log(`📐 Posicionamento: ${selectedFrame}`);

    // PASSO 1: Desenhar fundo (Layer Two)
    if (layersLoaded.two && layerTwo && layerTwo.complete) {
        console.log('📐 Desenhando Layer Two (fundo) - imagem carregada');
        ctx.drawImage(layerTwo, 0, 0, size, size);
    } else {
        console.log('📐 Desenhando fundo (fallback) - gerando gradiente dinamicamente');
        // Fallback: usar cores do tema
        const bgGradient = ctx.createLinearGradient(0, 0, size, size);
        bgGradient.addColorStop(0, theme.colors?.primary || '#FDB813');
        bgGradient.addColorStop(1, theme.colors?.secondary || '#FF6B00');
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, size, size);
    }

    // PASSO 2: Desenhar foto do usuário
    console.log('👤 Desenhando foto do usuário');

    const scale = Math.max(size / uploadedImage.width, size / uploadedImage.height);
    const x = (size - uploadedImage.width * scale) / 2;
    const y = (size - uploadedImage.height * scale) / 2;

    if (selectedFrame === 'center') {
        drawCenterFrame(size);
    } else if (selectedFrame === 'full') {
        drawFullFrame(size, x, y, scale);
    } else if (selectedFrame === 'topleft') {
        drawTopLeftFrame(size);
    }

    // PASSO 3: Desenhar overlay (Layer One - morcegos)
    if (layersLoaded.one && layerOne && layerOne.complete) {
        console.log('🦇 Desenhando Layer One (overlay) - imagem carregada');
        ctx.globalCompositeOperation = 'source-over';
        ctx.drawImage(layerOne, 0, 0, size, size);
    } else {
        console.log('🦇 Desenhando overlay (fallback) - gerando elementos dinamicamente');
        drawBatsFallback(ctx, size, theme);
    }

    console.log('✅ Composição finalizada com sucesso!');

    loading.style.display = 'none';
    canvasContainer.style.display = 'block';
    downloadBtn.style.display = 'inline-block';
    resetBtn.style.display = 'inline-block';
}

// Funções de desenho de frames
function drawCenterFrame(size) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.35, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const circleSize = size * 0.7;
    const imgScale = Math.max(circleSize / uploadedImage.width, circleSize / uploadedImage.height);
    const imgX = (size - uploadedImage.width * imgScale) / 2;
    const imgY = (size - uploadedImage.height * imgScale) / 2;

    ctx.drawImage(uploadedImage, imgX, imgY,
        uploadedImage.width * imgScale, uploadedImage.height * imgScale);
    ctx.restore();

    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.35, 0, Math.PI * 2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 8;
    ctx.stroke();
}

function drawFullFrame(size, x, y, scale) {
    ctx.globalAlpha = 0.7;
    ctx.drawImage(uploadedImage, x, y, uploadedImage.width * scale, uploadedImage.height * scale);
    ctx.globalAlpha = 1.0;
}

function drawTopLeftFrame(size) {
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

// Fallback: desenhar morcegos e elementos manualmente
function drawBatsFallback(ctx, size, theme) {
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
        batColor = '#cccccc'; // Morcegos claros no tema escuro
    } else if (theme.id === 'halloween') {
        batColor = '#FF6600'; // Morcegos laranjas no Halloween
    }

    ctx.fillStyle = batColor;
    batPositions.forEach(pos => {
        const batSize = size * pos.scale;
        const batX = size * pos.x;
        const batY = size * pos.y;

        ctx.save();
        ctx.translate(batX, batY);
        ctx.beginPath();
        ctx.ellipse(0, 0, batSize * 0.3, batSize * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(-batSize * 0.3, 0);
        ctx.quadraticCurveTo(-batSize * 0.6, -batSize * 0.4, -batSize * 0.8, -batSize * 0.2);
        ctx.quadraticCurveTo(-batSize * 0.6, 0, -batSize * 0.3, 0);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(batSize * 0.3, 0);
        ctx.quadraticCurveTo(batSize * 0.6, -batSize * 0.4, batSize * 0.8, -batSize * 0.2);
        ctx.quadraticCurveTo(batSize * 0.6, 0, batSize * 0.3, 0);
        ctx.fill();
        ctx.restore();
    });

    // Logo baseado no tema
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size * 0.04}px Arial`;
    ctx.textAlign = 'right';

    if (theme.id === 'halloween') {
        ctx.fillStyle = '#FF6600';
        ctx.fillText('HAPPY', size * 0.95, size * 0.88);
        ctx.font = `bold ${size * 0.055}px Arial`;
        ctx.fillText('HALLOWEEN', size * 0.95, size * 0.945);
    } else if (theme.id === 'pride_month') {
        ctx.fillText('PRIDE', size * 0.95, size * 0.88);
        ctx.font = `bold ${size * 0.055}px Arial`;
        ctx.fillText('MONTH', size * 0.95, size * 0.945);
    } else if (theme.id === 'dark_mode') {
        ctx.fillStyle = '#FF6B00';
        ctx.fillText('DARK', size * 0.95, size * 0.88);
        ctx.font = `bold ${size * 0.055}px Arial`;
        ctx.fillText('MODE', size * 0.95, size * 0.945);
    } else if (theme.id === 'outubro_rosa') {
        ctx.fillStyle = 'white';
        ctx.fillText('OUTUBRO', size * 0.95, size * 0.88);
        ctx.font = `bold ${size * 0.055}px Arial`;
        ctx.fillText('ROSA', size * 0.95, size * 0.945);

        // Desenhar laço rosa (símbolo da campanha)
        ctx.beginPath();
        ctx.arc(size * 0.83, size * 0.13, size * 0.04, 0, Math.PI * 2);
        ctx.fillStyle = '#FF1493';
        ctx.fill();
    } else {
        // Hornet Brasil (padrão)
        ctx.fillText('HORNET', size * 0.95, size * 0.88);
        ctx.font = `bold ${size * 0.055}px Arial`;
        ctx.fillText('LIVE', size * 0.95, size * 0.93);
        ctx.font = `${size * 0.03}px Arial`;
        ctx.fillText('BRASIL', size * 0.95, size * 0.97);

        // Círculo LIVE
        ctx.beginPath();
        ctx.arc(size * 0.82, size * 0.925, size * 0.015, 0, Math.PI * 2);
        ctx.fillStyle = '#FF6B00';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}

// =====================================
// DOWNLOAD E RESET
// =====================================

// Detectar se é mobile
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Função para salvar/compartilhar imagem
async function downloadImage() {
    const theme = getThemeById(selectedTheme);
    const filename = `hornet-${theme.id}-perfil.png`;

    // Converter canvas para blob
    canvas.toBlob(async (blob) => {
        // Tentar usar Web Share API (mobile) para salvar nas fotos
        if (isMobile() && navigator.canShare) {
            const file = new File([blob], filename, { type: 'image/png' });

            if (navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        files: [file],
                        title: 'Foto com Moldura Hornet',
                        text: 'Minha foto com moldura personalizada'
                    });
                    console.log('✓ Imagem compartilhada com sucesso');
                    return;
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.warn('⚠️ Compartilhamento cancelado ou não suportado:', err);
                    }
                    // Continuar para download tradicional
                }
            }
        }

        // Fallback: download tradicional
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = filename;
        link.href = url;
        link.click();

        // Limpar URL temporária
        setTimeout(() => URL.revokeObjectURL(url), 100);
    }, 'image/png');
}

downloadBtn.addEventListener('click', downloadImage);

resetBtn.addEventListener('click', () => {
    uploadedImage = null;
    fileInput.value = '';
    canvasContainer.style.display = 'none';
    downloadBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    frameOptions.forEach(opt => opt.classList.remove('selected'));
    document.querySelector('[data-frame="center"]').classList.add('selected');
});
