import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

export const TimeContext = React.createContext();

const defaultTimes = [
    {
        id: '1',
        name: 'Time 1 - Regular',
        time: 5 * 60 * 1000, //miliseconds
    },
    {
        id: '2',
        name: 'Time 2 - With Increment',
        time: 10 * 60 * 1000,
        increment: 3 * 1000,
    },
    {
        id: '3',
        name: 'Time 3 - Different for the players',
        time: 10 * 60 * 1000,
        timeP2: 5 * 60 * 1000,
    },
]

const TimeContextProvider = (props) => {

    const [times, setTimes] = useState(defaultTimes)
    const [selectedTime, setSelectedTime] = useState(defaultTimes[0])

    useEffect(() => {
        AsyncStorage.getItem('times').then(times => {
            if (times) setTimes(times)
        }).catch(err => console.log('error reading times from storage: ', err))
    }, [])

    return (
        <TimeContext.Provider value={{ times, selectedTime, setSelectedTime }}>
            {props.children}
        </TimeContext.Provider>
    )
}

export default TimeContextProvider
