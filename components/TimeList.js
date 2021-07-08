import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useEffect } from 'react/cjs/react.development';
import { ThemeContext } from '../utils/contexts/ThemeContext';
import { LanguageContext } from '../utils/contexts/LanguageContext';
import { TimeContext, ACTION_TYPES } from '../utils/contexts/TimeContext';
import { AntDesign } from '@expo/vector-icons'
import AppFunctions from '../utils/functions'

const SECONDS = 'seconds'
const MINUTES = 'minutes'

const TimeList = () => {

    const { theme } = useContext(ThemeContext)
    const { translate } = useContext(LanguageContext)
    
    const { state, dispatch } = useContext(TimeContext)
    const navigation = useNavigation()

    const [activeTimes, setActiveTimes] = useState(state.times.map(time => { return { ...time, clicked: false } }))

    const clickItem = id => {
        setActiveTimes(activeTimes.map(time => time.id === id ? { ...time, clicked: !time.clicked } : time))
    }

    const formatMiliseconds = (time, unit) => {
      if (unit === SECONDS) return time / 1000
      return time / 60 / 1000
    }

    return (
        <View style={{ ...styles.container, backgroundColor: theme.background }} >
            <FlatList
                data={activeTimes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                      hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                      style={{ ...styles.item, backgroundColor: state.selectedTime.id === item.id ? theme.secondary : theme.primary }}
                      onPress={() => dispatch({type: ACTION_TYPES.UPDATE_TIME, time: item})}  >
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingRight: 5}}>
                        <Text style={{ ...styles.itemName, color: theme.contrast, }} >{item.name}</Text>
                        <TouchableOpacity onPress={() => clickItem(item.id)}>
                          <AntDesign name={item.clicked ? "upcircleo" : "downcircleo"} size={20} color={theme.contrast} />
                        </TouchableOpacity>
                      </View>
                        {item.clicked ? <View style={{ marginTop: 5, }}>
                            <Text style={{ ...styles.itemText, color: theme.contrast }}>
                              {item.timeP2 ? translate('timePlayer1') : translate('time')}: {AppFunctions.getLocalizedTimeDescription(item.time)}
                            </Text>
                            {item.increment ? <Text style={{ ...styles.itemText, color: theme.contrast }}>
                              {translate('increment')}: {AppFunctions.getIncrementDescription(item.increment.type) + ' - ' + AppFunctions.getLocalizedTimeDescription(item.increment.amount)}
                            </Text> : null}
                            {item.timeP2 ? <Text style={{ ...styles.itemText, color: theme.contrast }}>
                              {translate('timePlayer2')}: {AppFunctions.getLocalizedTimeDescription(item.timeP2)}
                            </Text> : null}
                        </View> : null}
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

export default TimeList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    item: {
        padding: 10,
        paddingLeft: 15,
        marginVertical: 7,
        borderRadius: 10
    },
    itemName: {
        fontSize: 14
    },
    itemText: {
        fontSize: 12,
        marginTop: 5
    }
})
