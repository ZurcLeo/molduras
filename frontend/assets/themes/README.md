# 🎨 Como Adicionar Temas

Esta pasta contém todos os temas disponíveis para o Gerador de Molduras.

## 📁 Estrutura de um Tema

Cada tema precisa ter sua própria pasta com 3 arquivos:

```
themes/
└── nome_do_tema/
    ├── background.png    (1080x1080px) - Fundo completo
    ├── overlay.png       (1080x1080px) - Morcegos/elementos com transparência
    └── preview.jpg       (300x300px)   - Miniatura para seleção
```

## ✨ Criando um Novo Tema

### Passo 1: Criar a Pasta
```bash
mkdir frontend/assets/themes/meu_tema
```

### Passo 2: Preparar as Imagens

**background.png** (Layer Two):
- Tamanho: 1080x1080px
- Formato: PNG ou JPG
- Conteúdo: Fundo completo (laranja, arco-íris, etc)
- Sem transparência

**overlay.png** (Layer One):
- Tamanho: 1080x1080px
- Formato: PNG
- Conteúdo: Morcegos, logo, elementos decorativos
- **IMPORTANTE**: Fundo TRANSPARENTE (apenas os elementos visíveis)

**preview.jpg**:
- Tamanho: 300x300px (ou proporcional)
- Formato: JPG ou PNG
- Conteúdo: Miniatura do resultado final

### Passo 3: Adicionar ao themes-config.js

Edite `frontend/themes-config.js` e adicione:

```javascript
const THEMES = {
    // ... temas existentes ...

    meu_tema: {
        id: 'meu_tema',
        name: 'Meu Tema Incrível',
        emoji: '✨',
        background: 'assets/themes/meu_tema/background.png',
        overlay: 'assets/themes/meu_tema/overlay.png',
        preview: 'assets/themes/meu_tema/preview.jpg',
        colors: {
            primary: '#FF0000',
            secondary: '#00FF00',
            gradient: 'linear-gradient(135deg, #FF0000 0%, #00FF00 100%)'
        },
        description: 'Descrição do meu tema',
        featured: false  // true para destaque
    }
};
```

### Passo 4: Testar

Abra o site e o novo tema deve aparecer na lista!

## 🎯 Temas Atuais

### 1. Hornet Brasil 🧡
- **Pasta**: `hornet_brasil/`
- **Status**: Tema padrão
- **Cores**: Laranja (#FF6B00) e Dourado (#FDB813)

### 2. Pride Month 🏳️‍🌈
- **Pasta**: `pride_month/`
- **Status**: Sazonal (junho)
- **Cores**: Arco-íris

### 3. Dark Mode 🌙
- **Pasta**: `dark_mode/`
- **Status**: Regular
- **Cores**: Preto e Laranja

### 4. Halloween 🎃
- **Pasta**: `halloween/`
- **Status**: Sazonal (outubro)
- **Cores**: Roxo e Laranja

## 🔧 Dicas para Criar Temas

### Cores Recomendadas
- Use cores contrastantes para boa legibilidade
- Teste com fotos claras e escuras
- Garanta que o texto branco seja visível

### Elementos do Overlay
- Morcegos nas laterais
- Logo "HORNET LIVE BRASIL" no canto inferior direito
- Mantenha a transparência no centro (onde fica a foto)

### Otimização de Imagens
```bash
# Reduzir tamanho (usar ImageMagick ou similar)
convert background.png -quality 85 -resize 1080x1080 background.png
convert overlay.png -quality 95 -resize 1080x1080 overlay.png
convert preview.jpg -quality 80 -resize 300x300 preview.jpg
```

## 📊 Tamanhos Recomendados

| Arquivo | Tamanho Ideal | Formato | Transparência |
|---------|---------------|---------|---------------|
| background.png | ~150-300 KB | PNG/JPG | Não |
| overlay.png | ~100-200 KB | PNG | Sim (obrigatório) |
| preview.jpg | ~20-50 KB | JPG/PNG | Não |
| **Total por tema** | **~300-600 KB** | - | - |

## 🎨 Ferramentas Recomendadas

- **Photoshop**: Edição profissional
- **GIMP**: Alternativa gratuita
- **Figma**: Design online
- **Canva**: Templates prontos
- **remove.bg**: Remover fundos (criar transparência)

## ⚠️ Problemas Comuns

### Overlay cobrindo tudo
**Problema**: A Layer One (overlay) está cobrindo a foto
**Solução**: Garanta que o overlay tenha fundo TRANSPARENTE, não branco ou laranja

### Tema não aparece
**Problema**: Tema adicionado mas não aparece na lista
**Solução**: Verifique se adicionou ao `themes-config.js` corretamente

### Imagens não carregam
**Problema**: Erro 404 ao carregar imagens
**Solução**: Verifique os caminhos em `themes-config.js`

## 🚀 Exemplo Completo

### Criar tema "Natal 🎄"

```bash
# 1. Criar pasta
mkdir frontend/assets/themes/natal

# 2. Adicionar imagens (copiar seus arquivos)
cp meu-fundo-natal.png frontend/assets/themes/natal/background.png
cp meu-overlay-natal.png frontend/assets/themes/natal/overlay.png
cp meu-preview-natal.jpg frontend/assets/themes/natal/preview.jpg

# 3. Editar themes-config.js
# Adicionar configuração do tema (ver Passo 3 acima)

# 4. Testar
open frontend/index.html
```

## 💡 Ideias de Temas

- 🏳️‍⚧️ Trans Pride
- 🇧🇷 Copa do Mundo
- 🎉 Ano Novo
- 💘 Dia dos Namorados
- 🌸 Primavera
- ☀️ Verão
- 🍂 Outono
- ❄️ Inverno
- 🎭 Carnaval
- 🌟 Aniversário Hornet

---

**Precisa de ajuda?** Consulte `ANALISE_MULTIPLOS_FUNDOS.md` para mais detalhes!
