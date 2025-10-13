# 🐛 Guia de Debug - Gerador de Molduras Hornet Brasil

## Como Verificar se as Camadas Estão Funcionando

### 1. Abrir o Console do Navegador
1. Pressione `F12` ou clique com botão direito → "Inspecionar"
2. Vá para a aba **Console**

### 2. O que você deve ver ao fazer upload de uma foto:

```
✓ Layer One (morcegos) carregada
✓ Layer Two (fundo laranja) carregada
🎨 Iniciando composição das camadas...
Layer One carregada: true
Layer Two carregada: true
📐 Desenhando Layer Two (fundo laranja)
👤 Desenhando foto do usuário - Frame: center
🦇 Desenhando Layer One (morcegos) por cima
✅ Composição finalizada!
```

### 3. Diagnóstico de Problemas

#### Problema: "Só aparece a Layer One (morcegos)"
**Causa**: As imagens PNG não têm transparência correta

**Solução**:
1. Verifique se `Hornet_Brasil_Layer_One.png` tem fundo **TRANSPARENTE** (não branco, não laranja)
2. A Layer One deve conter APENAS os morcegos e o logo, com resto transparente
3. Use um editor de imagem para remover o fundo se necessário

**Como verificar no console**:
```javascript
// Cole isso no console para ver as dimensões das layers
console.log('Layer One:', layerOne.width, 'x', layerOne.height);
console.log('Layer Two:', layerTwo.width, 'x', layerTwo.height);
```

#### Problema: "Não vejo a foto do usuário"
**Console mostrará**:
```
⚠ Erro ao carregar Layer One - usando fallback
```

**Causas possíveis**:
1. As imagens PNG não estão na pasta `frontend/assets/`
2. Nomes dos arquivos estão incorretos
3. Imagens corrompidas

**Solução**:
1. Verifique se os arquivos existem:
   - `frontend/assets/Hornet_Brasil_Layer_One.png`
   - `frontend/assets/Hornet_Brasil_Layer_Two.png`
2. Verifique os nomes EXATOS (maiúsculas/minúsculas importam)
3. Tente recarregar a página (Ctrl+F5)

#### Problema: "Fundo está errado"
**Se você vê no console**:
```
📐 Desenhando fundo laranja (fallback)
```

Isso significa que a `Layer Two` não carregou. Verifique:
1. O arquivo `Hornet_Brasil_Layer_Two.png` existe?
2. O caminho está correto?

---

## 🎨 Entendendo a Ordem das Camadas

A composição acontece nesta ordem (de baixo para cima):

```
┌─────────────────────────────────────┐
│  1. LAYER TWO (Fundo Laranja)       │ ← Base
├─────────────────────────────────────┤
│  2. FOTO DO USUÁRIO (circular/full) │ ← Meio
├─────────────────────────────────────┤
│  3. LAYER ONE (Morcegos)            │ ← Topo
│     (com transparência)              │
└─────────────────────────────────────┘
```

**Importante**: A Layer One DEVE ter transparência! Se ela tiver fundo sólido, cobrirá tudo.

---

## 🔍 Verificando as Imagens PNG

### Verificar se a Layer One tem transparência:

1. Abra `Hornet_Brasil_Layer_One.png` em um editor de imagens
2. Verifique se o fundo é transparente (padrão xadrez cinza/branco)
3. Se o fundo for laranja ou branco, você precisa removê-lo

### Estrutura esperada das imagens:

**Hornet_Brasil_Layer_Two.png**:
- Fundo laranja sólido completo (1080x1080)
- Sem transparência
- Pode ter gradiente laranja

**Hornet_Brasil_Layer_One.png**:
- Morcegos pretos nas laterais
- Logo "HORNET LIVE BRASIL" no canto inferior direito
- **RESTO TRANSPARENTE** (isso é crucial!)
- Tamanho: 1080x1080

---

## 🧪 Teste Manual das Layers

Cole este código no console do navegador para testar:

```javascript
// Testar carregamento das layers
console.log('=== TESTE DE LAYERS ===');
console.log('Layer One carregada:', layersLoaded.one);
console.log('Layer Two carregada:', layersLoaded.two);

// Ver as imagens
if (layersLoaded.one) {
    console.log('Layer One:', layerOne.src);
    console.log('Dimensões:', layerOne.width, 'x', layerOne.height);
} else {
    console.error('❌ Layer One NÃO carregada!');
}

if (layersLoaded.two) {
    console.log('Layer Two:', layerTwo.src);
    console.log('Dimensões:', layerTwo.width, 'x', layerTwo.height);
} else {
    console.error('❌ Layer Two NÃO carregada!');
}
```

---

## 🛠️ Soluções Rápidas

### Solução 1: Usar Fallback (sem PNG)
Se as imagens PNG não estiverem funcionando, o sistema já tem um fallback que desenha os morcegos manualmente.

Para forçar o uso do fallback temporariamente, adicione ao início de `script.js`:
```javascript
let layersLoaded = { one: false, two: false }; // Força usar fallback
```

### Solução 2: Verificar CORS
Se as imagens estão hospedadas em outro domínio:
```javascript
// No início de script.js, verifique:
layerOne.crossOrigin = "anonymous"; // Já está configurado
layerTwo.crossOrigin = "anonymous"; // Já está configurado
```

### Solução 3: Cache do Navegador
Se você atualizou as imagens PNG mas não vê mudanças:
1. Pressione `Ctrl+Shift+R` (ou `Cmd+Shift+R` no Mac)
2. Ou limpe o cache: DevTools → Application → Clear Storage

---

## 📊 Checklist de Verificação

Antes de reportar um bug, verifique:

- [ ] As imagens PNG estão em `frontend/assets/`
- [ ] Os nomes estão EXATOS: `Hornet_Brasil_Layer_One.png` e `Hornet_Brasil_Layer_Two.png`
- [ ] Layer One tem fundo TRANSPARENTE
- [ ] Layer Two tem fundo laranja SÓLIDO
- [ ] Ambas têm 1080x1080 pixels
- [ ] Console não mostra erros de carregamento
- [ ] Cache do navegador foi limpo

---

## 🎯 Teste Completo

Execute este teste para verificar tudo:

1. Abra `https://zurcleo.github.io/molduras` (ou localhost)
2. Abra o Console (F12)
3. Faça upload de uma foto
4. Verifique se aparece:
   - ✅ Fundo laranja
   - ✅ Sua foto no centro (circular)
   - ✅ Morcegos nas laterais
   - ✅ Logo "HORNET LIVE BRASIL" no canto

Se todos os 4 elementos aparecerem, está funcionando perfeitamente! 🎉

---

## 💡 Dica Pro

Para ver visualmente cada camada sendo desenhada:

```javascript
// Adicione delays entre cada camada (em applyFrameLocally)
// PASSO 1: Fundo laranja
ctx.drawImage(layerTwo, 0, 0, size, size);
await new Promise(r => setTimeout(r, 1000)); // Pausa 1 seg

// PASSO 2: Foto do usuário
// ... código da foto ...
await new Promise(r => setTimeout(r, 1000)); // Pausa 1 seg

// PASSO 3: Morcegos
ctx.drawImage(layerOne, 0, 0, size, size);
```

Isso mostrará cada camada sendo desenhada em slow motion.
