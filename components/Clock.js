import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const MIN_IN_MILISECONDS = 60 * 1000
const SEC_IN_MILISECONDS = 1000
const SEC_20_IN_MILISECONDS = 20 * 1000

export default function Clock({ time, inverse, onPress, disabled, active, finished, winner }) {

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
                backgroundColor: winner ? 'green' : finished ? 'red' : active ? '#19D3DA' : '#686D76',
                transform: [{ rotate: inverse ? '180deg' : '0deg' }]
            }}>
            <View style={{
                ...styles.innerView,
                backgroundColor: winner ? 'green' : finished ? 'red' : active ? '#19D3DA' : '#686D76',
            }}>
                <Text style={styles.text}>{formatTime(time)}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '30%',
        backgroundColor: '#686D76',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 40,
        width: '90%',
        borderRadius: 10
    },
    innerView: {
        margin: 20,
        backgroundColor: '#787e8a',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        borderRadius: 10,
        padding: 20,
    },
    text: {
        fontSize: 75,
        color: 'white'
    }
});