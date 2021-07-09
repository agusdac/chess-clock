import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

export const LanguageContext = React.createContext();

const LanguageContextProvider = (props) => {

    const [language, setCurrentLanguage] = useState('en')

    useEffect(() => {
        AsyncStorage.getItem('language').then(language => {
            if (language) setCurrentLanguage(language)
            else setCurrentLanguage(Localization.locale)
        }).catch(err => console.log('error reading language value from storage: ', err))
    }, [])

    const setLanguage = language => {
      i18n.locale = language
      setCurrentLanguage(language)
      AsyncStorage.setItem('language', language)
    }

    const translate = key => {
        return i18n.t(key)
    }

    return (
        <LanguageContext.Provider value={{ translate, language, setLanguage }}>
            {props.children}
        </LanguageContext.Provider>
    )
}

export default LanguageContextProvider
