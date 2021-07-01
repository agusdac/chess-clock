import React, { useState } from 'react';
import colors from '../colors';

export const ThemeContext = React.createContext();

const themes = {
    dark: {
        background: colors.darkGrey,
        primary: colors.grey,
        secondary: colors.lightBlue,
        contrast: colors.white,
    },
    light: {
        background: colors.white,
        primary: colors.grey,
        secondary: colors.lightBlue,
        contrast: colors.black,
    },
}

const ThemeContextProvider = (props) => {

    const [currentTheme, setCurrentTheme] = useState('dark')

    return (
        <ThemeContext.Provider value={{ theme: themes[currentTheme] }}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeContextProvider