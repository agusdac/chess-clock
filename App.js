import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Clock from './components/Clock';


export default function App() {

  const [timePlayer1, setTimePlayer1] = useState(60000)
  const [timePlayer2, setTimePlayer2] = useState(12000)
  const [increment, setIncrement] = useState(0)
  const [isPlayer1Disabled, setPlayer1Disabled] = useState(false)
  const [isPlayer2Disabled, setPlayer2Disabled] = useState(false)
  const countRefPlayer1 = useRef(null)
  const countRefPlayer2 = useRef(null)

  const clickedPlayer1 = () => {
    clearInterval(countRefPlayer1.current)
    if (increment && isPlayer2Disabled) setTimePlayer1(timePlayer1 + increment)
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
    setPlayer2Disabled(false)
    setPlayer1Disabled(true)
  }

  const clickedPlayer2 = () => {
    clearInterval(countRefPlayer2.current)
    if (increment && isPlayer1Disabled) setTimePlayer2(timePlayer2 + increment)
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
    setPlayer1Disabled(false)
    setPlayer2Disabled(true)
  }

  const resetTimers = () => {
    setTimePlayer1(60000)
    setTimePlayer2(6000)
    clearInterval(countRefPlayer1.current)
    clearInterval(countRefPlayer2.current)
    setPlayer1Disabled(false)
    setPlayer2Disabled(false)
  }

  return (
    <View style={styles.container}>
      <Clock time={timePlayer1} onPress={clickedPlayer1} disabled={isPlayer1Disabled} active={isPlayer2Disabled} finished={timePlayer1 === 0} winner={timePlayer2 === 0} />
      <TouchableOpacity onPress={resetTimers}>
        <Text>Reset</Text>
      </TouchableOpacity>
      <Clock time={timePlayer2} inverse onPress={clickedPlayer2} disabled={isPlayer2Disabled} active={isPlayer1Disabled} finished={timePlayer2 === 0} winner={timePlayer1 === 0} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#373A40',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
});
