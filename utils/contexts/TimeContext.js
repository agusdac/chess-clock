import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';

export const TimeContext = React.createContext();

const defaultTimes = [
    {
        id: '1',
        name: 'Time 1 - Regular',
        time: 5,
    },
    {
        id: '2',
        name: 'Time 2 - With Increment',
        time: 10,
        increment: 3,
    },
    {
        id: '3',
        name: 'Time 3 - Different for the players',
        time: 10,
        timeP2: 5,
    },
]

const TimeContextProvider = (props) => {

    const [times, setCurrentTimes] = useState(defaultTimes)

    useEffect(() => {
        AsyncStorage.getItem('times').then(times => {
            if (times) setCurrentTimes(times)
        }).catch(err => console.log('error reading times from storage: ', err))
    }, [])

    return (
        <TimeContext.Provider value={{ times }}>
            {props.children}
        </TimeContext.Provider>
    )
}

export default TimeContextProvider