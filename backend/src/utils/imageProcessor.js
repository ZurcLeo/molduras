const { createCanvas, loadImage } = require('canvas');
const path = require('path');

// Caminhos para as imagens overlay
const LAYER_ONE_PATH = path.join(__dirname, '../../public/assets/Hornet_Brasil_Layer_One.png');
const LAYER_TWO_PATH = path.join(__dirname, '../../public/assets/Hornet_Brasil_Layer_Two.png');

async function applyFrame(imageData, frameType) {
    try {
        // Carregar a imagem do usuário
        const img = await loadImage(imageData);

        const size = 1080;
        const canvas = createCanvas(size, size);
        const ctx = canvas.getContext('2d');

        // 1. Desenhar fundo laranja (Layer Two)
        try {
            const layerTwo = await loadImage(LAYER_TWO_PATH);
            ctx.drawImage(layerTwo, 0, 0, size, size);
        } catch (error) {
            console.warn('Não foi possível carregar Layer Two, usando fallback');
            // Fallback: fundo laranja com gradiente
            const bgGradient = ctx.createLinearGradient(0, 0, size, size);
            bgGradient.addColorStop(0, '#FF8C00');
            bgGradient.addColorStop(1, '#FF6B00');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, size, size);
        }

        // 2. Calcular escala da imagem
        const scale = Math.max(size / img.width, size / img.height);
        const x = (size - img.width * scale) / 2;
        const y = (size - img.height * scale) / 2;

        // 3. Aplicar o tipo de moldura selecionado
        switch (frameType) {
            case 'center':
                applyCenterFrame(ctx, img, size);
                break;
            case 'full':
                applyFullFrame(ctx, img, size, x, y, scale);
                break;
            case 'topleft':
                applyTopLeftFrame(ctx, img, size);
                break;
            default:
                applyCenterFrame(ctx, img, size);
        }

        // 4. Desenhar morcegos por cima (Layer One)
        try {
            const layerOne = await loadImage(LAYER_ONE_PATH);
            ctx.drawImage(layerOne, 0, 0, size, size);
        } catch (error) {
            console.warn('Não foi possível carregar Layer One, usando fallback');
            // Fallback: desenhar morcegos manualmente
            drawBatsFallback(ctx, size);
        }

        // Retornar imagem processada como data URL
        return canvas.toDataURL('image/png');

    } catch (error) {
        console.error('Erro ao processar imagem:', error);
        throw new Error('Falha ao processar a imagem');
    }
}

function applyCenterFrame(ctx, img, size) {
    // Foto circular no centro
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.35, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const circleSize = size * 0.7;
    const imgScale = Math.max(circleSize / img.width, circleSize / img.height);
    const imgX = (size - img.width * imgScale) / 2;
    const imgY = (size - img.height * imgScale) / 2;

    ctx.drawImage(img, imgX, imgY, img.width * imgScale, img.height * imgScale);
    ctx.restore();

    // Borda branca ao redor do círculo
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.35, 0, Math.PI * 2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 8;
    ctx.stroke();
}

function applyFullFrame(ctx, img, size, x, y, scale) {
    // Foto como fundo completo com opacidade
    ctx.globalAlpha = 0.7;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
    ctx.globalAlpha = 1.0;
}

function applyTopLeftFrame(ctx, img, size) {
    // Foto no canto superior esquerdo
    const cornerSize = size * 0.4;
    ctx.save();
    ctx.beginPath();
    ctx.arc(size * 0.22, size * 0.22, cornerSize / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    const cornerScale = Math.max(cornerSize / img.width, cornerSize / img.height);
    const cornerX = size * 0.22 - (img.width * cornerScale) / 2;
    const cornerY = size * 0.22 - (img.height * cornerScale) / 2;

    ctx.drawImage(img, cornerX, cornerY, img.width * cornerScale, img.height * cornerScale);
    ctx.restore();

    // Borda branca
    ctx.beginPath();
    ctx.arc(size * 0.22, size * 0.22, cornerSize / 2, 0, Math.PI * 2);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 6;
    ctx.stroke();
}

// Fallback: desenhar morcegos manualmente
function drawBatsFallback(ctx, size) {
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

    // Logo Hornet Live Brasil no canto inferior direito
    ctx.fillStyle = 'white';
    ctx.font = `bold ${size * 0.04}px Arial`;
    ctx.textAlign = 'right';
    ctx.fillText('HORNET', size * 0.95, size * 0.88);

    ctx.font = `bold ${size * 0.055}px Arial`;
    ctx.fillText('LIVE', size * 0.95, size * 0.93);

    ctx.font = `${size * 0.03}px Arial`;
    ctx.fillText('BRASIL', size * 0.95, size * 0.97);

    // Ícone LIVE (círculo laranja)
    ctx.beginPath();
    ctx.arc(size * 0.82, size * 0.925, size * 0.015, 0, Math.PI * 2);
    ctx.fillStyle = '#FF6B00';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
}

module.exports = { applyFrame };
