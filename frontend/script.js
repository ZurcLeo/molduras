const uploadSection = document.getElementById('uploadSection');
const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasContainer = document.getElementById('canvasContainer');
const downloadBtn = document.getElementById('downloadBtn');
const resetBtn = document.getElementById('resetBtn');
const frameOptions = document.querySelectorAll('.frame-option');
const loading = document.getElementById('loading');

let uploadedImage = null;
let selectedFrame = 'center';

// Upload de arquivo
uploadSection.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) loadImage(file);
});

// Drag and drop
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

// Seleção de moldura
frameOptions.forEach(option => {
    option.addEventListener('click', () => {
        frameOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedFrame = option.dataset.frame;
        if (uploadedImage) applyFrame();
    });
});

// Carregar imagem
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

// Aplicar moldura (versão local - fallback se API não estiver disponível)
async function applyFrame() {
    try {
        // Tentar usar a API do backend
        await applyFrameWithAPI();
    } catch (error) {
        console.error('Erro ao usar API, aplicando moldura localmente:', error);
        // Fallback: aplicar moldura localmente
        applyFrameLocally();
    }
}

// Aplicar moldura usando a API do backend
async function applyFrameWithAPI() {
    loading.style.display = 'block';
    canvasContainer.style.display = 'none';
    downloadBtn.style.display = 'none';
    resetBtn.style.display = 'none';

    // Converter imagem para base64
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = uploadedImage.width;
    canvas.height = uploadedImage.height;
    ctx.drawImage(uploadedImage, 0, 0);
    const imageData = canvas.toDataURL('image/jpeg', 0.9);

    const response = await fetch(`${API_CONFIG.BASE_URL}/api/apply-frame`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image: imageData,
            frameType: selectedFrame
        })
    });

    if (!response.ok) {
        throw new Error('Erro na API');
    }

    const data = await response.json();

    // Carregar imagem processada
    const img = new Image();
    img.onload = () => {
        const mainCanvas = document.getElementById('canvas');
        const mainCtx = mainCanvas.getContext('2d');
        mainCanvas.width = img.width;
        mainCanvas.height = img.height;
        mainCtx.drawImage(img, 0, 0);

        loading.style.display = 'none';
        canvasContainer.style.display = 'block';
        downloadBtn.style.display = 'inline-block';
        resetBtn.style.display = 'inline-block';
    };
    img.src = data.processedImage;
}

// Aplicar moldura localmente (fallback)
function applyFrameLocally() {
    const size = 1080;
    canvas.width = size;
    canvas.height = size;

    // Fundo laranja do Hornet
    const bgGradient = ctx.createLinearGradient(0, 0, size, size);
    bgGradient.addColorStop(0, '#FF8C00');
    bgGradient.addColorStop(1, '#FF6B00');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, size, size);

    const scale = Math.max(size / uploadedImage.width, size / uploadedImage.height);
    const x = (size - uploadedImage.width * scale) / 2;
    const y = (size - uploadedImage.height * scale) / 2;

    if (selectedFrame === 'center') {
        // Foto circular no centro
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

        // Borda branca ao redor do círculo
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size * 0.35, 0, Math.PI * 2);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 8;
        ctx.stroke();

    } else if (selectedFrame === 'full') {
        // Foto como fundo completo
        ctx.globalAlpha = 0.7;
        ctx.drawImage(uploadedImage, x, y, uploadedImage.width * scale, uploadedImage.height * scale);
        ctx.globalAlpha = 1.0;

    } else if (selectedFrame === 'topleft') {
        // Foto no canto superior esquerdo
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

        // Borda branca
        ctx.beginPath();
        ctx.arc(size * 0.22, size * 0.22, cornerSize / 2, 0, Math.PI * 2);
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 6;
        ctx.stroke();
    }

    // Desenhar morcegos
    drawBats(ctx, size);

    // Mostrar canvas e botões
    loading.style.display = 'none';
    canvasContainer.style.display = 'block';
    downloadBtn.style.display = 'inline-block';
    resetBtn.style.display = 'inline-block';
}

// Função para desenhar morcegos
function drawBats(ctx, size) {
    const batPositions = [
        {x: 0.15, y: 0.12, scale: 0.08},
        {x: 0.08, y: 0.35, scale: 0.09},
        {x: 0.12, y: 0.55, scale: 0.07},
        {x: 0.18, y: 0.75, scale: 0.08},
        {x: 0.35, y: 0.88, scale: 0.09},
        {x: 0.25, y: 0.08, scale: 0.06},
    ];

    ctx.fillStyle = '#1a1a1a';
    batPositions.forEach(pos => {
        const batSize = size * pos.scale;
        const batX = size * pos.x;
        const batY = size * pos.y;

        ctx.save();
        ctx.translate(batX, batY);
        ctx.beginPath();
        // Corpo
        ctx.ellipse(0, 0, batSize * 0.3, batSize * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        // Asas
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

    // Logo Hornet Live Brasil
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size * 0.04}px Arial`;
    ctx.textAlign = 'right';
    ctx.fillText('HORNET', size * 0.95, size * 0.88);

    ctx.font = `bold ${size * 0.055}px Arial`;
    ctx.fillText('LIVE', size * 0.95, size * 0.93);

    ctx.font = `${size * 0.03}px Arial`;
    ctx.fillText('BRASIL', size * 0.95, size * 0.97);

    // Ícone LIVE
    ctx.beginPath();
    ctx.arc(size * 0.82, size * 0.925, size * 0.015, 0, Math.PI * 2);
    ctx.fillStyle = '#FF6B00';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
}

// Download
downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'hornet-perfil.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

// Reset
resetBtn.addEventListener('click', () => {
    uploadedImage = null;
    fileInput.value = '';
    canvasContainer.style.display = 'none';
    downloadBtn.style.display = 'none';
    resetBtn.style.display = 'none';
    frameOptions.forEach(opt => opt.classList.remove('selected'));
    document.querySelector('[data-frame="center"]').classList.add('selected');
});
