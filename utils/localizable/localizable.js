import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import es from './es.js'
import ca from './ca.js'
import en from './en.js'

export const initLocalizable = () => {
    // Set the key-value pairs for the different languages you want to support.
    i18n.translations = {
        en: en,
        es: es,
        ca: ca,
    };
    // Set the locale once at the beginning of your app.
    i18n.locale = Localization.locale;
    // When a value is missing from a language it'll fallback to another language with the key present.
    i18n.fallbacks = true;
}

export const translate = key => {
    return i18n.t(key)
}

export const getCurrentLanguage = () => {
    let acrLanguage = i18n.locale.split('-')[0]
    switch (acrLanguage) {
      case 'es':
        return translate('spanish')
      case 'ca':
        return translate('catalan')
      default:
        return translate('english')
    }
    return
}
