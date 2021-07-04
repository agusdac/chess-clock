import { StatusBar } from 'expo-status-bar';
import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import Clock from './Clock';
import { ThemeContext } from '../utils/contexts/ThemeContext';
import { TimeContext } from '../utils/contexts/TimeContext';
import { useNavigation } from '@react-navigation/native';


export default function Game() {

    /* Hooks */
    const { theme } = useContext(ThemeContext)
    const { selectedTime } = useContext(TimeContext)
    const navigation = useNavigation()

    /* State */
    const [timePlayer1, setTimePlayer1] = useState(selectedTime.time)
    const [timePlayer2, setTimePlayer2] = useState(selectedTime.timeP2 ?? selectedTime.time)
    const [increment, setIncrement] = useState(selectedTime.increment ?? 0)
    const [movesPlayer1, setMovesPlayer1] = useState(0)
    const [movesPlayer2, setMovesPlayer2] = useState(0)
    const [isPlayer1Disabled, setPlayer1Disabled] = useState(false)
    const [isPlayer2Disabled, setPlayer2Disabled] = useState(false)
    const [isPlayer1Active, setPlayer1Active] = useState(false)
    const [isPlayer2Active, setPlayer2Active] = useState(false)
    const [isPaused, setPaused] = useState(false)
    const [isPlayer1Last, setLastPlayer] = useState(null)
    const countRefPlayer1 = useRef(null)
    const countRefPlayer2 = useRef(null)

    const startTimerPlayer2 = () => {
        countRefPlayer2.current = setInterval(() => {
            setTimePlayer2((timePlayer2) => {
                if (timePlayer2 === 100) {
                    clearInterval(countRefPlayer2.current)
                    setPlayer1Disabled(true)
                    setPlayer2Disabled(true)
                }
                return timePlayer2 - 100
            })
        }, 100)
    }

    const startTimerPlayer1 = () => {
        countRefPlayer1.current = setInterval(() => {
            setTimePlayer1((timePlayer1) => {
                if (timePlayer1 === 100) {
                    clearInterval(countRefPlayer1.current)
                    setPlayer1Disabled(true)
                    setPlayer2Disabled(true)
                }
                return timePlayer1 - 100
            })
        }, 100)
    }

    const clickedPlayer1 = () => {
        clearInterval(countRefPlayer1.current)
        if (isPlayer2Disabled) {
          console.log(increment);
            if (increment) setTimePlayer1(timePlayer1 + increment)
            setMovesPlayer1((movesPlayer1) => movesPlayer1 + 1)
        }
        startTimerPlayer2()
        setPlayer2Disabled(false)
        setPlayer1Disabled(true)
        setPlayer2Active(true)
        setPlayer1Active(false)
    }

    const clickedPlayer2 = () => {
        clearInterval(countRefPlayer2.current)
        if (isPlayer1Disabled) {
            if (increment) setTimePlayer2(timePlayer2 + increment)
            setMovesPlayer2((movesPlayer2) => movesPlayer2 + 1)
        }
        startTimerPlayer1()
        setPlayer1Disabled(false)
        setPlayer2Disabled(true)
        setPlayer2Active(false)
        setPlayer1Active(true)
    }

    const resetTimers = () => {
        setTimePlayer1(selectedTime.time)
        setTimePlayer2(selectedTime.timeP2 ?? selectedTime.time)
        setMovesPlayer1(0)
        setMovesPlayer2(0)
        clearInterval(countRefPlayer1.current)
        clearInterval(countRefPlayer2.current)
        setPlayer1Disabled(false)
        setPlayer2Disabled(false)
        setPlayer2Active(false)
        setPlayer1Active(false)
        setPaused(false)
    }

    const pauseTimers = () => {
        if (isPlayer2Disabled || isPlayer1Disabled) {
            setPaused(true)
            setLastPlayer(isPlayer2Disabled)
            setPlayer1Disabled(true)
            setPlayer2Disabled(true)
            clearInterval(countRefPlayer1.current)
            clearInterval(countRefPlayer2.current)
        }
    }

    const unpauseTimers = () => {
        setPaused(false)
        if (isPlayer1Last) {
            setPlayer1Disabled(false)
            startTimerPlayer1()
        } else {
            setPlayer2Disabled(false)
            startTimerPlayer2()
        }
    }

    return (
        <View style={{ ...styles.container, backgroundColor: theme.background }}>
            <Clock time={timePlayer1}
                onPress={clickedPlayer1}
                disabled={isPlayer1Disabled}
                active={isPlayer1Active}
                finished={timePlayer1 === 0}
                winner={timePlayer2 === 0}
                moves={movesPlayer1} />
            <View style={styles.buttons}>
                <TouchableOpacity onPress={resetTimers}>
                    <MaterialCommunityIcons name="restart" size={40} color={theme.contrast} style={{ marginRight: 20 }} />
                </TouchableOpacity>
                {isPaused ?
                    <TouchableOpacity onPress={unpauseTimers}>
                        <MaterialCommunityIcons name="play" size={40} color={theme.contrast} />
                    </TouchableOpacity> :
                    <TouchableOpacity onPress={pauseTimers}>
                        <MaterialCommunityIcons name="pause" size={40} color={theme.contrast} />
                    </TouchableOpacity>
                }
                <TouchableOpacity onPress={() => navigation.navigate('TimeList')}>
                    <MaterialIcons name="menu" size={40} color={theme.contrast} style={{ marginLeft: 20 }} />
                </TouchableOpacity>
            </View>
            <Clock time={timePlayer2}
                inverse
                onPress={clickedPlayer2}
                disabled={isPlayer2Disabled}
                active={isPlayer2Active}
                finished={timePlayer2 === 0}
                winner={timePlayer1 === 0}
                moves={movesPlayer2} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    buttons: {
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'space-evenly'
    }
});
