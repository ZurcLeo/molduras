# Sistema de Internacionalização (i18n)

Sistema de tradução multi-idioma para o Gerador de Molduras Hornet.

## Idiomas Suportados

O sistema suporta 7 idiomas correspondentes às regiões do Hornet:

| Região | Idioma | Locale | Arquivo |
|--------|--------|--------|---------|
| 🇧🇷 Brasil | Português | pt-BR | `pt-BR.js` |
| 🌍 Global | Inglês | en-US | `en-US.js` |
| 🇹🇷 Turquia | Turco | tr-TR | `tr-TR.js` |
| 🇷🇺 Rússia | Russo | ru-RU | `ru-RU.js` |
| 🇺🇦 Ucrânia | Ucraniano | uk-UA | `uk-UA.js` |
| 🇹🇭 Tailândia | Tailandês | th-TH | `th-TH.js` |
| 🇮🇩 Indonésia | Indonésio | id-ID | `id-ID.js` |

## Arquitetura

### Estrutura de Arquivos

```
frontend/
├── i18n/
│   ├── README.md          # Esta documentação
│   ├── pt-BR.js          # Traduções em Português
│   ├── en-US.js          # Traduções em Inglês
│   ├── tr-TR.js          # Traduções em Turco
│   ├── ru-RU.js          # Traduções em Russo
│   ├── uk-UA.js          # Traduções em Ucraniano
│   ├── th-TH.js          # Traduções em Tailandês
│   └── id-ID.js          # Traduções em Indonésio
├── i18n.js               # Motor de i18n
├── regions-config.js     # Configuração de regiões (com locales)
└── script.js             # Integração com i18n
```

### Formato dos Arquivos de Tradução

Cada arquivo de tradução segue esta estrutura:

```javascript
const translations_pt_BR = {
    meta: {
        language: 'Português',
        locale: 'pt-BR',
        region: 'Brasil'
    },

    header: {
        title: '🐝 Gerador de Molduras Hornet Brasil',
        subtitle: 'Personalize sua foto de perfil'
    },

    upload: {
        icon: '📸',
        title: 'Clique ou arraste sua foto aqui',
        formats: 'Formatos aceitos: JPG, PNG'
    },

    // ... demais seções
};

// Exportar para escopo global
window.translations_pt_BR = translations_pt_BR;
```

## Como Funciona

### 1. Detecção Automática de Idioma

O idioma é automaticamente detectado baseado na **região selecionada** pelo usuário:

```javascript
// Ao inicializar
selectedRegion = getActiveRegion(); // Ex: região Brasil
await window.i18n.initI18n(selectedRegion.locale); // Carrega pt-BR
```

### 2. Troca de Idioma ao Mudar Região

Quando o usuário seleciona uma nova região, o idioma é automaticamente atualizado:

```javascript
async function changeRegion(region) {
    // Alterar idioma baseado no locale da região
    await window.i18n.changeLocale(region.locale);

    // Interface é atualizada automaticamente
}
```

### 3. Carregamento Dinâmico

Os arquivos de tradução são carregados **sob demanda** (lazy loading):

- Ao iniciar, apenas o idioma da região padrão é carregado
- Ao trocar de região, o novo idioma é carregado dinamicamente via `<script>`
- Idiomas já carregados ficam em cache para performance

### 4. Atualização da Interface

O sistema atualiza automaticamente todos os elementos HTML mapeados:

```javascript
// Mapeamento de elementos para chaves de tradução
const I18N_ELEMENTS = {
    'headerTitle': 'header.title',
    'uploadTitle': 'upload.title',
    'downloadBtn': 'buttons.download',
    // ...
};
```

## API do Sistema i18n

### Funções Disponíveis

#### `initI18n(locale)`

Inicializa o sistema de i18n com um locale específico.

```javascript
await window.i18n.initI18n('pt-BR');
```

#### `changeLocale(locale)`

Altera o idioma atual e atualiza a interface.

```javascript
await window.i18n.changeLocale('en-US');
```

#### `t(key, params)`

Traduz uma chave específica.

```javascript
const title = window.i18n.t('header.title');
// => "🐝 Gerador de Molduras Hornet Brasil"

// Com interpolação
const message = window.i18n.t('welcome', { name: 'João' });
// => "Bem-vindo, João!"
```

#### `getCurrentLocale()`

Retorna o locale atual.

```javascript
const locale = window.i18n.getCurrentLocale();
// => "pt-BR"
```

#### `updateUITexts()`

Força atualização de todos os textos da interface.

```javascript
window.i18n.updateUITexts();
```

## Eventos

O sistema dispara eventos personalizados que podem ser ouvidos:

```javascript
window.addEventListener('localeChanged', (event) => {
    console.log('Idioma alterado para:', event.detail.locale);
    console.log('Traduções:', event.detail.translations);
});
```

## Adicionando um Novo Idioma

Para adicionar suporte a um novo idioma:

### 1. Criar arquivo de tradução

```bash
touch frontend/i18n/fr-FR.js
```

### 2. Adicionar estrutura de tradução

```javascript
const translations_fr_FR = {
    meta: {
        language: 'Français',
        locale: 'fr-FR',
        region: 'France'
    },

    header: {
        title: '🐝 Générateur de Cadres Hornet',
        subtitle: 'Personnalisez votre photo de profil'
    },

    // ... traduzir todas as seções
};

window.translations_fr_FR = translations_fr_FR;
```

### 3. Registrar no motor i18n

Editar `frontend/i18n.js`:

```javascript
const LOCALE_MAP = {
    'pt-BR': 'translations_pt_BR',
    'en-US': 'translations_en_US',
    'fr-FR': 'translations_fr_FR', // ADICIONAR
    // ...
};
```

### 4. Adicionar região correspondente

Editar `frontend/regions-config.js`:

```javascript
france: {
    id: 'france',
    name: 'Hornet France',
    emoji: '🇫🇷',
    locale: 'fr-FR', // IMPORTANTE
    // ...
}
```

## Considerações de Localização

### Caracteres Especiais

Alguns idiomas requerem atenção especial:

- **Turco (tr-TR)**: Caracteres especiais como ı, ş, ğ, ü
- **Russo (ru-RU)**: Alfabeto cirílico
- **Ucraniano (uk-UA)**: Alfabeto cirílico
- **Tailandês (th-TH)**: Requer fonte com suporte a caracteres tailandeses
- **Árabe/Hebraico**: Não implementado (requereria suporte RTL)

### Formatação de Datas e Números

Atualmente não implementado, mas pode ser adicionado usando:

```javascript
// Números
const formatter = new Intl.NumberFormat(locale);

// Datas
const dateFormatter = new Intl.DateTimeFormat(locale);
```

## Performance

### Cache de Traduções

Arquivos carregados ficam em cache:

```javascript
let loadedLocales = new Set(); // Rastreamento
let themeImages = {}; // Cache de imagens
```

### Lazy Loading

Apenas o idioma necessário é carregado:

```javascript
// Carrega sob demanda
const script = document.createElement('script');
script.src = `i18n/${locale}.js`;
document.head.appendChild(script);
```

## Testes

Para testar o sistema de tradução:

1. Abra o aplicativo
2. Selecione diferentes regiões no seletor
3. Verifique se todos os textos são traduzidos
4. Verifique console para logs de carregamento

Logs esperados:

```
[i18n] Inicializando sistema i18n com locale: pt-BR
[i18n] Tradução carregada: pt-BR
[i18n] Interface atualizada para: pt-BR
🌍 Mudando região para: Hornet Live
[i18n] Alterando idioma para: en-US
[i18n] Tradução carregada: en-US
[i18n] Interface atualizada para: en-US
```

## Fallbacks

O sistema possui múltiplos níveis de fallback:

1. **Chave não encontrada**: Retorna a própria chave
2. **Arquivo não carregado**: Mantém idioma anterior
3. **Erro de rede**: Logs de erro mas não quebra aplicação

## Contribuindo

Ao adicionar novas strings traduzíveis:

1. Adicione a chave em TODOS os arquivos de idioma
2. Mapeie o elemento HTML em `I18N_ELEMENTS`
3. Teste em pelo menos 2 idiomas diferentes
4. Verifique caracteres especiais

## Roadmap Futuro

- [ ] Suporte a formatação de números
- [ ] Suporte a formatação de datas
- [ ] Pluralização (1 item vs 2 items)
- [ ] Suporte a RTL (Right-to-Left)
- [ ] Detecção automática de idioma do navegador
- [ ] Tradução de badges de temas ("Popular", "Sazonal")
