import { StatusBar } from 'expo-status-bar';
import React, { useContext, useRef, useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Clock from './Clock';
import { ThemeContext } from '../utils/contexts/ThemeContext';
import { TimeContext } from '../utils/contexts/TimeContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TouchableIcon from './shared/TouchableIcon';


export default function Game() {

    /* Hooks */
    const { theme } = useContext(ThemeContext)
    const { state } = useContext(TimeContext)
    const { selectedTime } = state
    const navigation = useNavigation()

    /* State */
    const [timePlayer1, setTimePlayer1] = useState(selectedTime.time)
    const [timePlayer2, setTimePlayer2] = useState(selectedTime.timeP2 ?? selectedTime.time)
    const [increment, setIncrement] = useState(selectedTime.increment)
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
    /* Delay */
    const delayTimerRefPlayer1 = useRef(null)
    const delayTimerRefPlayer2 = useRef(null)
    /* Bronstein */
    const [msPassed, setMsPassed] = useState(0)

    const getIncrement = () => {
        switch (increment.type) {
            case 'D':
                return 0
            case 'B':
                return Math.min(msPassed, increment.amount)
            default:
                return increment.amount
        }
    }

    const startTimerOrDelayPlayer2 = () => {
        if (increment && increment.type === 'D') {
            delayTimerRefPlayer2.current = setTimeout(() => startTimerPlayer2(), increment.amount - 100)
        }
        else startTimerPlayer2()
    }

    const startTimerOrDelayPlayer1 = () => {
        if (increment && increment.type === 'D') {
            delayTimerRefPlayer1.current = setTimeout(() => startTimerPlayer1(), increment.amount - 100)
        }
        else startTimerPlayer1()
    }

    const startTimerPlayer2 = () => {
        countRefPlayer2.current = setInterval(() => {
            setTimePlayer2((timePlayer2) => {
                if (timePlayer2 === 100) {
                    clearInterval(countRefPlayer2.current)
                    setPlayer1Disabled(true)
                    setPlayer2Disabled(true)
                } else if (increment && increment.type === 'B') setMsPassed((msPassed) => msPassed + 100)
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
                } else if (increment && increment.type === 'B') setMsPassed((msPassed) => msPassed + 100)
                return timePlayer1 - 100
            })
        }, 100)
    }

    const clickedPlayer1 = () => {
        clearInterval(countRefPlayer1.current)
        clearInterval(delayTimerRefPlayer1.current)
        if (isPlayer2Disabled) {
            if (increment) setTimePlayer1(timePlayer1 + getIncrement())
            setMovesPlayer1((movesPlayer1) => movesPlayer1 + 1)
        }
        startTimerOrDelayPlayer2()
        setMsPassed(0)
        setPlayer2Disabled(false)
        setPlayer1Disabled(true)
        setPlayer2Active(true)
        setPlayer1Active(false)
    }

    const clickedPlayer2 = () => {
        clearInterval(countRefPlayer2.current)
        clearInterval(delayTimerRefPlayer2.current)
        if (isPlayer1Disabled) {
            if (increment) setTimePlayer2(timePlayer2 + getIncrement())
            setMovesPlayer2((movesPlayer2) => movesPlayer2 + 1)
        }
        startTimerOrDelayPlayer1()
        setMsPassed(0)
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
        clearInterval(delayTimerRefPlayer1.current)
        clearInterval(delayTimerRefPlayer2.current)
        setPlayer1Disabled(false)
        setPlayer2Disabled(false)
        setPlayer2Active(false)
        setPlayer1Active(false)
        setPaused(false)
        setMsPassed(0)
    }

    const pauseTimers = () => {
        if (isPlayer2Disabled || isPlayer1Disabled) {
            setPaused(true)
            setLastPlayer(isPlayer2Disabled)
            setPlayer1Disabled(true)
            setPlayer2Disabled(true)
            clearInterval(countRefPlayer1.current)
            clearInterval(countRefPlayer2.current)
            clearInterval(delayTimerRefPlayer1.current)
            clearInterval(delayTimerRefPlayer2.current)
        }
        //AsyncStorage.clear()
    }

    const unpauseTimers = () => {
        setPaused(false)
        if (isPlayer1Last) {
            setPlayer1Disabled(false)
            startTimerOrDelayPlayer1()
        } else {
            setPlayer2Disabled(false)
            startTimerOrDelayPlayer2()
        }
    }

    const goToList = () => {
        //if (!isPaused) resetTimers()
        navigation.navigate('TimeList')
    }

    useEffect(() => {
        resetTimers()
        setIncrement(selectedTime.increment)
    }, [state])

    return (
        <View style={{ ...styles.container, backgroundColor: theme.background }}>
            <Clock time={timePlayer1}
                inverse
                onPress={clickedPlayer1}
                disabled={isPlayer1Disabled}
                active={isPlayer1Active}
                finished={timePlayer1 === 0}
                winner={timePlayer2 === 0}
                moves={movesPlayer1} />
            <View style={styles.buttons}>
                <TouchableIcon onPress={resetTimers} family="MaterialCommunityIcons"
                    name="restart" size={40} color={theme.contrast} style={{ marginRight: 20 }} />
                {isPaused ?
                    <TouchableIcon onPress={unpauseTimers} family="MaterialCommunityIcons"
                        name="play" size={40} color={theme.contrast} /> :
                    <TouchableIcon onPress={pauseTimers} family="MaterialCommunityIcons"
                        name="pause" size={40} color={theme.contrast} />
                }
                <TouchableIcon onPress={goToList} family="MaterialIcons" style={{ marginLeft: 20 }}
                    name="menu" size={40} color={theme.contrast} />
            </View>
            <Clock time={timePlayer2}
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
