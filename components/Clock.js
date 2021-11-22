import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ThemeContext } from '../utils/contexts/ThemeContext'
import { LanguageContext } from '../utils/contexts/LanguageContext';
import AppFunctions from '../utils/functions';

export default function Clock({ time, inverse, onPress, disabled, active, finished, winner, moves }) {

    const { theme } = useContext(ThemeContext)
    const { translate } = useContext(LanguageContext)

    return (
        <TouchableOpacity onPress={onPress}
            disabled={disabled}
            style={{
                ...styles.container,
                backgroundColor: winner ? theme.win : finished ? theme.lose : active ? theme.secondary : theme.primary,
                transform: [{ rotate: inverse ? '180deg' : '0deg' }]
            }}>
            <Text style={{ ...styles.text, color: theme.contrast }}>{AppFunctions.formatTime(time)}</Text>
            <Text style={{ ...styles.movesText, color: theme.contrast }}> {translate('moves') + moves}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 40,
        width: '90%',
        borderRadius: 10
    },
    text: {
        fontSize: 75,
        color: 'white'
    },
    movesText: {
        fontSize: 14,
        color: 'white',
        marginTop: 20,
        textAlign: 'left'
    }
});
