import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import themes from '../themes';

export const ThemeContext = React.createContext();

const ThemeContextProvider = (props) => {

    const [currentTheme, setCurrentTheme] = useState(themes[0])

    useEffect(() => {
        AsyncStorage.getItem('theme').then(theme => {
            if (theme) setCurrentTheme(JSON.parse(theme))
        }).catch(err => console.log('error reading theme value from storage: ', err))
    }, [])

    const setTheme = theme => {
        setCurrentTheme(theme)
        AsyncStorage.setItem('theme', JSON.stringify(theme))
    }
    return (
        <ThemeContext.Provider value={{ theme: currentTheme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider
