import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useReducer } from 'react';
import { useEffect } from 'react/cjs/react.development';

export const TimeContext = React.createContext();

export const ACTION_TYPES = {
  UPDATE_TIME: 'update_time',
  STORE_TIMES: 'store_times',
  SET_TIMES: 'set_times',
  DELETE_TIME: 'delete_time'
}

const defaultTimes = [
  {
    id: '1',
    name: 'Time 1 - Regular',
    time: 5 * 60 * 1000, //miliseconds
  },
  {
    id: '2',
    name: 'Time 2 - With Increment (Fischer)',
    time: 10 * 60 * 1000,
    increment: {
      type: 'F', //[Fischer, Delay, Bronstein]
      amount: 3 * 1000
    },
  },
  {
    id: '3',
    name: 'Time 3 - Different for the players',
    time: 10 * 60 * 1000,
    timeP2: 5 * 60 * 1000,
  },
  {
    id: '4',
    name: 'Time 4 - Bronstein Increment',
    time: 1 * 60 * 1000,
    increment: {
      type: 'B', //[Fischer, Delay, Bronstein]
      amount: 5 * 1000
    },
  },
  {
    id: '5',
    name: 'Time 5 - Delay Increment',
    time: 1.5 * 60 * 1000,
    increment: {
      type: 'D', //[Fischer, Delay, Bronstein]
      amount: 5 * 1000
    },
  },
  // {
  //     id: '4',
  //     name: 'Time 4 - Different stages',
  //     time: 10 * 60 * 1000,
  //     stages: [
  //       {
  //         time: 10 * 60 * 1000,
  //         moves:
  //       },
  //       15 * 60 * 1000,
  //       5 * 60 * 1000
  //     ]
  // },
]

const TimeReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_TIME:
      AsyncStorage.setItem('selectedTime', JSON.stringify(action.time))
      return { ...state, selectedTime: action.time };
    case ACTION_TYPES.STORE_TIMES:
      return { ...state, times: [...state.times, action.time] };
    case ACTION_TYPES.SET_TIMES:
      return { ...state, times: action.times };
    case ACTION_TYPES.DELETE_TIME:
      let newTimes = state.times.filter(time => time.id !== action.timeId)
      AsyncStorage.setItem('times', JSON.stringify(newTimes))
      return { ...state, times: newTimes };
    default:
      return state;
  }
}

const TimeContextProvider = (props) => {

  const [state, dispatch] = useReducer(TimeReducer, {
    times: defaultTimes,
    selectedTime: defaultTimes[0]
  })

  useEffect(() => {
    AsyncStorage.multiGet(['times', 'selectedTime']).then(items => {
      if (items[0][1]) dispatch({ type: ACTION_TYPES.SET_TIMES, times: JSON.parse(items[0][1]) })
      if (items[1][1]) dispatch({ type: ACTION_TYPES.UPDATE_TIME, time: JSON.parse(items[1][1]) })
    }).catch(err => console.log('error reading times from storage: ', err))
  }, [])

  return (
    <TimeContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TimeContext.Provider>
  )
}

export default TimeContextProvider
