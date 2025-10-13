require('dotenv').config();
const express = require('express');
const cors = require('cors');
const frameRoutes = require('./routes/frameRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Servir arquivos estáticos (overlays)
app.use('/public', express.static('public'));

// Rotas
app.get('/', (req, res) => {
    res.json({
        message: 'API Gerador de Molduras Hornet Brasil',
        version: '1.0.0',
        endpoints: {
            applyFrame: 'POST /api/apply-frame',
            health: 'GET /health'
        }
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', frameRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Algo deu errado!',
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
});
