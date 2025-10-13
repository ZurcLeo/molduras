# 🐝 Gerador de Molduras Hornet Brasil

Aplicação web para gerar molduras personalizadas do Hornet Brasil para fotos de perfil.

## 📋 Descrição

Este projeto permite que usuários:
- Façam upload de suas fotos
- Escolham entre diferentes estilos de moldura
- Baixem a imagem processada com a moldura do Hornet Brasil

## 🏗️ Arquitetura

O projeto é dividido em duas partes:

### Frontend (GitHub Pages)
- HTML/CSS/JavaScript puro
- Interface responsiva e moderna
- Processamento local de imagens como fallback
- Deploy automático via GitHub Actions

### Backend (Render)
- Node.js + Express
- Processamento de imagens com Canvas
- API REST para aplicação de molduras
- Deploy no Render com plano gratuito

## 🚀 Deploy

### Frontend (GitHub Pages)

1. Faça push do código para o GitHub
2. Acesse Settings → Pages
3. Configure para deploy via GitHub Actions
4. O workflow `.github/workflows/deploy.yml` fará o deploy automaticamente

### Backend (Render)

1. Crie uma conta no [Render](https://render.com)
2. Conecte seu repositório GitHub
3. Crie um novo Web Service
4. Configure as variáveis de ambiente:
   - `PORT`: 3000
   - `NODE_ENV`: production
   - `FRONTEND_URL`: URL do seu GitHub Pages
5. O Render usará o arquivo `backend/render.yaml` automaticamente

**Ou use o Blueprint:**
- Clique em "New Blueprint Instance"
- Conecte seu repositório
- O arquivo `backend/render.yaml` configurará tudo automaticamente

## 🛠️ Desenvolvimento Local

### Frontend

```bash
cd frontend
# Abra index.html no navegador ou use um servidor local
npx serve .
```

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Edite o arquivo .env com suas configurações
npm run dev
```

O backend estará rodando em `http://localhost:3000`

### Conectar Frontend ao Backend Local

Edite `frontend/config.js`:
```javascript
const API_CONFIG = {
    BASE_URL: 'http://localhost:3000'
};
```

## 📁 Estrutura do Projeto

```
molduras/
├── frontend/              # Aplicação frontend
│   ├── index.html        # Página principal
│   ├── style.css         # Estilos
│   ├── script.js         # Lógica do frontend
│   ├── config.js         # Configuração da API
│   └── .nojekyll         # Configuração GitHub Pages
├── backend/              # API backend
│   ├── src/
│   │   ├── index.js      # Servidor Express
│   │   ├── routes/       # Rotas da API
│   │   └── utils/        # Processamento de imagens
│   ├── package.json      # Dependências
│   ├── render.yaml       # Configuração Render
│   └── .env.example      # Exemplo de variáveis de ambiente
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions para deploy
└── README.md
```

## 🔧 Configuração

### Após Deploy do Backend

1. Copie a URL do seu serviço no Render (ex: `https://seu-app.onrender.com`)
2. Atualize `frontend/config.js`:
```javascript
const API_CONFIG = {
    BASE_URL: 'https://seu-app.onrender.com'
};
```
3. Faça commit e push das alterações
4. O GitHub Actions fará o deploy automaticamente

### Variáveis de Ambiente (Backend)

Crie um arquivo `.env` baseado em `.env.example`:

```env
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://seu-usuario.github.io/molduras
```

## 🎨 Tipos de Moldura

- **Centro Circular**: Foto em círculo no centro com fundo laranja
- **Fundo Completo**: Foto como fundo com opacidade
- **Canto Superior**: Foto circular no canto superior esquerdo

## 🧪 Testando a API

```bash
# Health check
curl https://seu-app.onrender.com/health

# Aplicar moldura (exemplo com curl)
curl -X POST https://seu-app.onrender.com/api/apply-frame \
  -H "Content-Type: application/json" \
  -d '{"image": "data:image/jpeg;base64,...", "frameType": "center"}'
```

## 📦 Dependências

### Frontend
- Sem dependências externas (HTML/CSS/JS puro)

### Backend
- express: ^4.18.2
- cors: ^2.8.5
- canvas: ^2.11.2
- dotenv: ^16.3.1

## 🐛 Troubleshooting

### Erro de CORS
Verifique se a variável `FRONTEND_URL` no backend está configurada corretamente com a URL do GitHub Pages.

### Imagens não processam
O frontend tem um fallback que processa as imagens localmente se a API não estiver disponível. Verifique o console do navegador para erros.

### Render: Cold Start
O plano gratuito do Render hiberna após 15 minutos de inatividade. A primeira requisição pode demorar alguns segundos.

## 📝 Licença

MIT

## 🤝 Contribuindo

Contribuições são bem-vindas! Abra uma issue ou pull request.

## ⚠️ Notas Importantes

- O plano gratuito do Render tem 750 horas/mês
- As imagens são processadas em tempo real e não são armazenadas
- O tamanho máximo de upload é 10MB (configurável em `backend/src/index.js`)

## 📧 Suporte

Para dúvidas ou problemas, abra uma issue no GitHub.
