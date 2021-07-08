import * as Localization from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
    AsyncStorage.getItem('language').then(language => {
      if (language) i18n.locale = language
      else i18n.locale = Localization.locale;
    }).catch(err => {
      console.log('error getting language from storage: ', err)
      i18n.locale = Localization.locale;
    })
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

export const getCurrentLanguageCode = () => {
    return i18n.locale.split('-')[0]
}

export const setLanguage = async (language) => {
    i18n.locale = language
    await AsyncStorage.setItem('language', language)
}
