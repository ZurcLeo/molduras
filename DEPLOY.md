# 🚀 Guia de Deploy

## ⚠️ Importante: Adicionar as Imagens PNG

Antes de fazer deploy, você **DEVE** adicionar as duas imagens PNG nas seguintes pastas:

### Frontend (GitHub Pages)
Copie as imagens para: `frontend/assets/`
- `Hornet_Brasil_Layer_One.png` (morcegos com fundo transparente)
- `Hornet_Brasil_Layer_Two.png` (fundo laranja)

### Backend (Render) - Opcional
Copie as imagens para: `backend/public/assets/`
- `Hornet_Brasil_Layer_One.png`
- `Hornet_Brasil_Layer_Two.png`

---

## 📦 Deploy do Frontend (GitHub Pages)

### 1. Adicionar as Imagens PNG
```bash
# Copie as imagens para a pasta correta
cp Hornet_Brasil_Layer_One.png frontend/assets/
cp Hornet_Brasil_Layer_Two.png frontend/assets/
```

### 2. Criar Repositório no GitHub
```bash
cd /Users/leocruz/Documents/Projects/molduras

# Inicializar Git (se ainda não tiver)
git init

# Adicionar todos os arquivos
git add .

# Commit inicial
git commit -m "Initial commit: Gerador de Molduras Hornet Brasil"

# Criar repositório no GitHub (via navegador)
# Depois conectar:
git remote add origin https://github.com/SEU-USUARIO/molduras.git
git branch -M main
git push -u origin main
```

### 3. Configurar GitHub Pages
1. Vá para: `Settings` → `Pages`
2. Em **Source**, selecione: `GitHub Actions`
3. O workflow já está configurado em `.github/workflows/deploy.yml`
4. O deploy será feito automaticamente após o push!

### 4. Acessar o Site
Seu site estará disponível em:
```
https://SEU-USUARIO.github.io/molduras
```

---

## 🔧 Deploy do Backend (Render) - Opcional

O frontend funciona 100% no navegador, mas você pode fazer deploy do backend para processamento mais robusto.

### 1. Adicionar as Imagens PNG ao Backend
```bash
cp Hornet_Brasil_Layer_One.png backend/public/assets/
cp Hornet_Brasil_Layer_Two.png backend/public/assets/
```

### 2. Fazer Commit das Imagens
```bash
git add backend/public/assets/
git commit -m "Add overlay images to backend"
git push
```

### 3. Deploy no Render

**Opção A: Blueprint (Recomendado)**
1. Acesse [render.com](https://render.com)
2. Clique em `New` → `Blueprint`
3. Conecte seu repositório GitHub
4. O arquivo `backend/render.yaml` será detectado automaticamente
5. Configure as variáveis de ambiente:
   - `FRONTEND_URL`: `https://SEU-USUARIO.github.io/molduras`
6. Clique em `Apply`

**Opção B: Web Service Manual**
1. Acesse [render.com](https://render.com)
2. Clique em `New` → `Web Service`
3. Conecte seu repositório GitHub
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `NODE_ENV`: `production`
     - `FRONTEND_URL`: `https://SEU-USUARIO.github.io/molduras`

### 4. Conectar Frontend ao Backend (Opcional)
Se você fez deploy do backend, edite `frontend/config.js`:
```javascript
const API_CONFIG = {
    BASE_URL: 'https://seu-app.onrender.com'
};
```

Depois:
```bash
git add frontend/config.js
git commit -m "Connect frontend to backend API"
git push
```

---

## ✅ Checklist de Deploy

- [ ] Imagens PNG copiadas para `frontend/assets/`
- [ ] Repositório criado no GitHub
- [ ] Código enviado para o GitHub (`git push`)
- [ ] GitHub Pages configurado (Settings → Pages → GitHub Actions)
- [ ] Site acessível em `https://SEU-USUARIO.github.io/molduras`
- [ ] Testado upload e download de imagem
- [ ] (Opcional) Backend deployado no Render
- [ ] (Opcional) Frontend conectado ao backend

---

## 🐛 Troubleshooting

### Erro: "Imagens não carregam"
- Verifique se as imagens PNG estão em `frontend/assets/`
- Verifique os nomes dos arquivos (devem ser exatamente):
  - `Hornet_Brasil_Layer_One.png`
  - `Hornet_Brasil_Layer_Two.png`
- Abra o Console do navegador (F12) e verifique erros

### Erro: "404 Not Found no GitHub Pages"
- Aguarde alguns minutos após o deploy
- Verifique se o workflow foi executado: `Actions` tab no GitHub
- Certifique-se de que o arquivo `.nojekyll` existe em `frontend/`

### Erro: "CORS blocked"
- Isso só acontece se você estiver usando o backend
- Verifique a variável `FRONTEND_URL` no Render
- Certifique-se de que a URL está correta

### Erro: "Layer não carregada"
- O sistema tem fallback automático
- Se as imagens PNG não carregarem, os morcegos serão desenhados manualmente
- Verifique o console do navegador para ver qual layer falhou

---

## 📱 Testando Localmente

### Frontend
```bash
cd frontend
npx serve .
# Acesse: http://localhost:3000
```

### Backend
```bash
cd backend
npm install
npm run dev
# Servidor rodando em: http://localhost:3000
```

---

## 🎉 Pronto!

Seu Gerador de Molduras Hornet Brasil está no ar! 🐝

Compartilhe o link: `https://SEU-USUARIO.github.io/molduras`
