import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ThemeContext } from '../utils/contexts/ThemeContext';
import { LanguageContext } from '../utils/contexts/LanguageContext';
import { TimeContext, ACTION_TYPES } from '../utils/contexts/TimeContext';
import AppFunctions from '../utils/functions'
import TouchableIcon from './shared/TouchableIcon';

const TimeList = ({ navigation }) => {

    const { theme } = useContext(ThemeContext)
    const { translate } = useContext(LanguageContext)

    const { state, dispatch } = useContext(TimeContext)
    const [activeTimes, setActiveTimes] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log(state);
            setActiveTimes(state.times.map(time => { return { ...time, clicked: false } }))
        });

        return unsubscribe;
    }, [navigation]);

    const clickItem = id => {
        setActiveTimes(activeTimes.map(time => time.id === id ? { ...time, clicked: !time.clicked } : time))
    }

    const deleteItem = id => {
        setActiveTimes(activeTimes.filter(time => time.id !== id))
        dispatch({ type: ACTION_TYPES.DELETE_TIME, timeId: id })
    }

    return (
        <View style={{ ...styles.container, backgroundColor: theme.background }} >
            <FlatList
                data={activeTimes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        style={{ ...styles.item, backgroundColor: state.selectedTime.id === item.id ? theme.secondary : theme.primary }}
                        onPress={() => dispatch({ type: ACTION_TYPES.UPDATE_TIME, time: item })}  >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 5 }}>
                            <Text style={{ ...styles.itemName, color: theme.contrast, }} >{item.name}</Text>
                            <TouchableIcon onPress={() => clickItem(item.id)}
                                family={'AntDesign'}
                                name={item.clicked ? "upcircleo" : "downcircleo"}
                                size={20} color={theme.contrast} />
                        </View>
                        {item.clicked ? <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 2 }}>
                            <View>
                                <Text style={{ ...styles.itemText, color: theme.contrast }}>
                                    {item.timeP2 ? translate('timePlayer1') : translate('time')}: {AppFunctions.getLocalizedTimeDescription(item.time)}
                                </Text>
                                {item.increment ? <Text style={{ ...styles.itemText, color: theme.contrast }}>
                                    {translate('increment')}: {AppFunctions.getIncrementDescription(item.increment.type) + ' - ' + AppFunctions.getLocalizedTimeDescription(item.increment.amount)}
                                </Text> : null}
                                {item.timeP2 ? <Text style={{ ...styles.itemText, color: theme.contrast }}>
                                    {translate('timePlayer2')}: {AppFunctions.getLocalizedTimeDescription(item.timeP2)}
                                </Text> : null}
                            </View>
                            <View style={{ marginTop: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableIcon onPress={() => clickItem(item.id)} containerStyle={{ ...styles.settings, marginRight: 5 }}
                                    family={'Feather'} name={"edit"}
                                    size={20} color={theme.contrast} />
                                <TouchableIcon onPress={() => deleteItem(item.id)} containerStyle={styles.settings}
                                    family={'MaterialIcons'} name={"delete"}
                                    size={20} color={theme.contrast} />
                            </View>
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
    },
    settings: {
        alignSelf: 'flex-end',
    }
})
