const express = require('express');
const router = express.Router();
const { applyFrame } = require('../utils/imageProcessor');

router.post('/apply-frame', async (req, res) => {
    try {
        const { image, frameType } = req.body;

        if (!image || !frameType) {
            return res.status(400).json({
                error: 'Dados incompletos',
                message: 'É necessário enviar a imagem e o tipo de moldura'
            });
        }

        // Processar imagem
        const processedImage = await applyFrame(image, frameType);

        res.json({
            success: true,
            processedImage: processedImage,
            frameType: frameType
        });

    } catch (error) {
        console.error('Erro ao processar imagem:', error);
        res.status(500).json({
            error: 'Erro ao processar imagem',
            message: error.message
        });
    }
});

module.exports = router;
