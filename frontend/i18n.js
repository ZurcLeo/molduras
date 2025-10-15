/**
 * Sistema de Internacionalização (i18n)
 * Gerador de Molduras Hornet
 *
 * Sistema responsável por gerenciar traduções e troca de idiomas
 * baseado nas regiões configuradas.
 */

// Estado global do i18n
let currentLocale = 'pt-BR';
let currentTranslations = null;
let loadedLocales = new Set();

/**
 * Mapeia locales para seus respectivos arquivos de tradução
 */
const LOCALE_MAP = {
    'pt-BR': 'translations_pt_BR',
    'en-US': 'translations_en_US',
    'tr-TR': 'translations_tr_TR',
    'ru-RU': 'translations_ru_RU',
    'uk-UA': 'translations_uk_UA',
    'th-TH': 'translations_th_TH',
    'id-ID': 'translations_id_ID'
};

/**
 * Elementos HTML que serão traduzidos
 */
const I18N_ELEMENTS = {
    'headerTitle': 'header.title',
    'headerSubtitle': 'header.subtitle',
    'regionSelectorLabel': 'regions.label',
    'uploadTitle': 'upload.title',
    'uploadFormats': 'upload.formats',
    'themesTitle': 'themes.title',
    'formatTitle': 'format.title',
    'logoPositionTitle': 'logoPosition.title',
    'framesTitle': 'frames.title',
    'downloadBtn': 'buttons.download',
    'shareBtn': 'buttons.share',
    'resetBtn': 'buttons.reset',
    'instructionsTitle': 'instructions.title',
    'instructionsStep1': 'instructions.step1',
    'instructionsStep2': 'instructions.step2',
    'instructionsStep3': 'instructions.step3',
    'instructionsStep4': 'instructions.step4',
    'loadingMessage': 'loading.message'
};

/**
 * Carrega tradução dinamicamente
 * @param {String} locale - Locale a ser carregado (ex: 'pt-BR')
 * @returns {Promise} - Promise resolvida quando tradução for carregada
 */
function loadTranslation(locale) {
    return new Promise((resolve, reject) => {
        // Verifica se já está carregado
        const translationKey = LOCALE_MAP[locale];
        if (!translationKey) {
            console.error(`[i18n] Locale não suportado: ${locale}`);
            reject(new Error(`Locale não suportado: ${locale}`));
            return;
        }

        // Se já foi carregado, retorna imediatamente
        if (loadedLocales.has(locale) && window[translationKey]) {
            resolve(window[translationKey]);
            return;
        }

        // Carrega o script de tradução dinamicamente
        const script = document.createElement('script');
        script.src = `i18n/${locale}.js`;
        script.onload = () => {
            loadedLocales.add(locale);
            console.log(`[i18n] Tradução carregada: ${locale}`);
            resolve(window[translationKey]);
        };
        script.onerror = () => {
            console.error(`[i18n] Erro ao carregar tradução: ${locale}`);
            reject(new Error(`Erro ao carregar ${locale}`));
        };
        document.head.appendChild(script);
    });
}

/**
 * Função de tradução (t = translate)
 * @param {String} key - Chave de tradução no formato 'secao.subsecao.texto'
 * @param {Object} params - Parâmetros para interpolação (opcional)
 * @returns {String} - Texto traduzido ou chave se não encontrado
 */
function t(key, params = {}) {
    if (!currentTranslations) {
        console.warn(`[i18n] Traduções não carregadas. Usando chave: ${key}`);
        return key;
    }

    const keys = key.split('.');
    let value = currentTranslations;

    // Navega pelo objeto de traduções
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            console.warn(`[i18n] Chave de tradução não encontrada: ${key}`);
            return key;
        }
    }

    // Se for string, retorna (com interpolação se necessário)
    if (typeof value === 'string') {
        return interpolate(value, params);
    }

    // Se não for string, retorna a chave original
    console.warn(`[i18n] Valor de tradução inválido para: ${key}`);
    return key;
}

/**
 * Interpola parâmetros em uma string
 * @param {String} text - Texto com placeholders {param}
 * @param {Object} params - Parâmetros para substituir
 * @returns {String} - Texto interpolado
 */
function interpolate(text, params) {
    return text.replace(/\{(\w+)\}/g, (match, key) => {
        return params[key] !== undefined ? params[key] : match;
    });
}

/**
 * Atualiza todos os textos da interface
 */
function updateUITexts() {
    // Atualiza título da página
    const title = t('header.title');
    if (title) {
        document.title = title.replace('🐝 ', '');
    }

    // Atualiza elementos HTML mapeados
    for (const [elementId, translationKey] of Object.entries(I18N_ELEMENTS)) {
        const element = document.getElementById(elementId);
        if (element) {
            const translation = t(translationKey);
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    }

    // Atualiza elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.textContent = translation;
        }
    });

    // Atualiza labels de formatos
    updateFormatLabels();

    // Atualiza labels de posição de logo
    updateLogoPositionLabels();

    // Atualiza labels de frames
    updateFrameLabels();

    // Atualiza dica de mobile
    updateMobileTip();

    console.log(`[i18n] Interface atualizada para: ${currentLocale}`);
}

/**
 * Atualiza labels de formatos
 */
function updateFormatLabels() {
    const formatOptions = document.querySelectorAll('.format-option');
    formatOptions.forEach(option => {
        const format = option.getAttribute('data-format');
        const label = option.querySelector('div:nth-child(2)');
        const size = option.querySelector('small');

        if (label && format === 'square') {
            label.textContent = `${t('format.square')} (${t('format.squareRatio')})`;
        } else if (label && format === 'portrait') {
            label.textContent = `${t('format.portrait')} (${t('format.portraitRatio')})`;
        }

        if (size && format === 'square') {
            size.textContent = t('format.squareSize');
        } else if (size && format === 'portrait') {
            size.textContent = t('format.portraitSize');
        }
    });
}

/**
 * Atualiza labels de posição de logo
 */
function updateLogoPositionLabels() {
    const positions = {
        'top-left': 'logoPosition.topLeft',
        'top-right': 'logoPosition.topRight',
        'bottom-left': 'logoPosition.bottomLeft',
        'bottom-right': 'logoPosition.bottomRight'
    };

    for (const [position, key] of Object.entries(positions)) {
        const option = document.querySelector(`.logo-position-option[data-position="${position}"]`);
        if (option) {
            const label = option.querySelector('div:nth-child(2)');
            if (label) {
                label.textContent = t(key);
            }
        }
    }
}

/**
 * Atualiza labels de frames
 */
function updateFrameLabels() {
    const frames = {
        'center': 'frames.center',
        'full': 'frames.full',
        'topleft': 'frames.topleft'
    };

    for (const [frame, key] of Object.entries(frames)) {
        const option = document.querySelector(`.frame-option[data-frame="${frame}"]`);
        if (option) {
            const label = option.querySelector('div:nth-child(2)');
            if (label) {
                label.textContent = t(key);
            }
        }
    }
}

/**
 * Atualiza dica de mobile
 */
function updateMobileTip() {
    const tipContainer = document.querySelector('.mobile-tip');
    if (tipContainer) {
        const title = tipContainer.querySelector('strong');
        const saveLine = tipContainer.querySelector('p');

        if (title) {
            title.textContent = t('instructions.mobileTip.title');
        }

        if (saveLine) {
            saveLine.innerHTML = `
                <strong>"${t('buttons.download').replace('💾 ', '')}"</strong> ${t('instructions.mobileTip.save')}<br>
                <strong>"${t('buttons.share').replace('📤 ', '')}"</strong> ${t('instructions.mobileTip.share')}
            `;
        }
    }
}

/**
 * Muda o idioma atual
 * @param {String} locale - Novo locale (ex: 'en-US')
 * @returns {Promise} - Promise resolvida quando idioma for alterado
 */
async function changeLocale(locale) {
    try {
        console.log(`[i18n] Alterando idioma para: ${locale}`);

        // Carrega tradução se necessário
        const translations = await loadTranslation(locale);

        // Atualiza estado global
        currentLocale = locale;
        currentTranslations = translations;

        // Atualiza a interface
        updateUITexts();

        // Atualiza HTML lang attribute
        document.documentElement.setAttribute('lang', locale);

        // Dispara evento customizado
        window.dispatchEvent(new CustomEvent('localeChanged', {
            detail: { locale, translations }
        }));

        return true;
    } catch (error) {
        console.error(`[i18n] Erro ao mudar idioma:`, error);
        return false;
    }
}

/**
 * Inicializa sistema de i18n
 * @param {String} locale - Locale inicial (opcional, padrão: 'pt-BR')
 */
async function initI18n(locale = 'pt-BR') {
    console.log(`[i18n] Inicializando sistema i18n com locale: ${locale}`);
    await changeLocale(locale);
}

/**
 * Retorna locale atual
 * @returns {String} - Locale atual
 */
function getCurrentLocale() {
    return currentLocale;
}

/**
 * Retorna traduções atuais
 * @returns {Object} - Objeto de traduções
 */
function getCurrentTranslations() {
    return currentTranslations;
}

// Exporta funções para escopo global
if (typeof window !== 'undefined') {
    window.i18n = {
        t,
        changeLocale,
        initI18n,
        getCurrentLocale,
        getCurrentTranslations,
        updateUITexts
    };
}
