import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import colors from '../colors';

export const ThemeContext = React.createContext();

const themes = {
    dark: {
        key: 'dark',
        background: colors.darkGrey,
        primary: colors.grey,
        secondary: colors.lightBlue,
        contrast: colors.white,
    },
    light: {
        key: 'light',
        background: colors.white,
        primary: colors.grey,
        secondary: colors.lightBlue,
        contrast: colors.black,
    },
}

const ThemeContextProvider = (props) => {

    const [currentTheme, setCurrentTheme] = useState('dark')

    useEffect(() => {
        AsyncStorage.getItem('theme').then(theme => {
            if (theme) setCurrentTheme(theme)
        }).catch(err => console.log('error reading theme value from storage: ', err))
    }, [])

    return (
        <ThemeContext.Provider value={{ theme: themes[currentTheme] }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider
