import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useReducer, useEffect } from 'react';

export const TimeContext = React.createContext();

export const ACTION_TYPES = {
  UPDATE_TIME: 'update_time',
  STORE_TIMES: 'store_times',
  SET_TIMES: 'set_times',
  EDIT_TIME: 'edit_time',
  DELETE_TIME: 'delete_time',
  DELETE_MULTIPLE: 'delete_multiple'
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
      AsyncStorage.setItem('times', JSON.stringify([...state.times, action.time]))
      return { ...state, times: [...state.times, action.time] };
    case ACTION_TYPES.SET_TIMES:
      return { ...state, times: action.times };
    case ACTION_TYPES.EDIT_TIME:
      let newTimes = state.times.map(time => time.id === action.time.id ? action.time : time)
      AsyncStorage.setItem('times', JSON.stringify(newTimes))
      return { ...state, times: newTimes };
    case ACTION_TYPES.DELETE_TIME:
      newTimes = state.times.filter(time => time.id !== action.timeId)
      AsyncStorage.setItem('times', JSON.stringify(newTimes))
      return { ...state, times: newTimes };
    case ACTION_TYPES.DELETE_MULTIPLE:
      newTimes = state.times.filter(time => !action.times.includes(time.id))
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
