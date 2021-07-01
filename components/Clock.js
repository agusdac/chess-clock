import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ThemeContext } from '../utils/contexts/ThemeContext'
import { translate } from '../utils/localizable/localizable'

const MIN_IN_MILISECONDS = 60 * 1000
const SEC_IN_MILISECONDS = 1000
const SEC_20_IN_MILISECONDS = 20 * 1000

export default function Clock({ time, inverse, onPress, disabled, active, finished, winner, moves }) {

    const { theme } = useContext(ThemeContext)

    const formatTime = (time) => {
        let min = (Math.floor(time / MIN_IN_MILISECONDS) % 60)
        let sec = Math.floor(time / SEC_IN_MILISECONDS) % 60
        if (sec < 10) sec = `0${sec}`
        if (time < SEC_20_IN_MILISECONDS) sec += `.${Math.floor(time / 100) % 10}`
        return `${min}:${sec}`
    }

    return (
        <TouchableOpacity onPress={onPress}
            disabled={disabled}
            style={{
                ...styles.container,
                backgroundColor: winner ? 'green' : finished ? 'red' : active ? theme.secondary : theme.primary,
                transform: [{ rotate: inverse ? '180deg' : '0deg' }]
            }}>
            <Text style={{ ...styles.text, color: theme.contrast }}>{formatTime(time)}</Text>
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