import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { ThemeContext } from '../utils/contexts/ThemeContext';
import { LanguageContext } from '../utils/contexts/LanguageContext';
import { TimeContext, ACTION_TYPES } from '../utils/contexts/TimeContext';
import AppFunctions from '../utils/functions'
import TouchableIcon from './shared/TouchableIcon';
import Popup from './shared/Popup';

const TimeList = ({ navigation }) => {

    const { theme } = useContext(ThemeContext)
    const { translate } = useContext(LanguageContext)

    const { state, dispatch } = useContext(TimeContext)
    const [activeTimes, setActiveTimes] = useState([])
    const [showPopup, setShowPopup] = useState(false)
    const [showMultiplePopup, setShowMultiplePopup] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    const [deleteMultiple, setDeleteMultiple] = useState(false)
    const [deleteError, setDeleteError] = useState('')

    useEffect(() => {
        setActiveTimes(state.times.map(time => { return { ...time, clicked: false, selected: false } }))
    }, [state.times]);

    const clickItem = id => {
        setActiveTimes(activeTimes.map(time => time.id === id ? { ...time, clicked: !time.clicked } : time))
    }

    const selectItem = id => {
        setActiveTimes(activeTimes.map(time => time.id === id ? { ...time, selected: !time.selected } : time))
    }

    const selectItemToDelete = id => {
        setItemToDelete(id)
        setShowPopup(true)
    }

    const deleteItem = () => {
        if (itemToDelete && activeTimes.length > 1) {
            dispatch({ type: ACTION_TYPES.DELETE_TIME, timeId: itemToDelete })
            if (itemToDelete === state.selectedTime.id && activeTimes.length > 1) {
                dispatch({ type: ACTION_TYPES.UPDATE_TIME, time: state.times.filter(time => time.id !== itemToDelete)[0] })
            }
            setDeleteError('')
        } else {
            setDeleteError(translate('deleteAllError'))
        }
        setItemToDelete(null)
        setShowPopup(false)
    }

    const deleteMultipleItems = () => {
        const selectedTimes = activeTimes.filter(time => time.selected).map(time => time.id)
        if (selectedTimes.length !== activeTimes.length) {
            dispatch({ type: ACTION_TYPES.DELETE_MULTIPLE, times: selectedTimes })
            let deletedSelected = selectedTimes.find(time => time === state.selectedTime.id)
            if (deletedSelected && (activeTimes.length) > 0) {
                dispatch({ type: ACTION_TYPES.UPDATE_TIME, time: state.times.filter(time => !selectedTimes.includes(time.id))[0] })
            }
            setDeleteError('')
            setDeleteMultiple(false)
        } else {
            setDeleteError(translate('deleteAllError'))
        }
        setShowMultiplePopup(false)
    }

    const cancelMultiple = () => {
        setDeleteMultiple(false)
        setDeleteError('')
    }

    const editTime = item => {
        navigation.navigate('AddTime', { time: item })
    }

    return (
        <View style={{ ...styles.container, backgroundColor: theme.background }} >
            <FlatList
                data={activeTimes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                            onLongPress={() => setDeleteMultiple(true)}
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
                                    <TouchableIcon onPress={() => editTime(item)} containerStyle={{ ...styles.settings, marginRight: 5 }}
                                        family={'Feather'} name={"edit"}
                                        size={20} color={theme.contrast} />
                                    <TouchableIcon onPress={() => selectItemToDelete(item.id)} containerStyle={styles.settings}
                                        family={'MaterialIcons'} name={"delete"}
                                        size={20} color={theme.contrast} />
                                </View>
                            </View> : null}
                        </TouchableOpacity>
                        {deleteMultiple &&
                            <TouchableIcon family="MaterialCommunityIcons" name={item.selected ? "checkbox-marked" : "checkbox-blank-outline"}
                                onPress={() => selectItem(item.id)} size={22} color={theme.contrast} containerStyle={{ marginLeft: 10 }} />}
                    </View>
                )}
                ListFooterComponent={(
                    <View>
                        {deleteError ? <Text style={{ ...styles.textError, color: theme.lose }}>{deleteError}</Text> : null}
                        {deleteMultiple ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: deleteError ? 0 : 20 }}>
                                <TouchableOpacity style={{ ...styles.singleButton, borderColor: theme.lose }} onPress={cancelMultiple}>
                                    <Ionicons name={"md-add-circle-outline"} size={22} color={theme.lose} />
                                    <Text style={{ fontSize: 15, marginLeft: 7, color: theme.lose }}>{translate('cancel')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ ...styles.singleButton, borderColor: theme.contrast }} onPress={() => setShowMultiplePopup(true)}>
                                    <MaterialIcons name={"delete"} size={22} color={theme.contrast} />
                                    <Text style={{ fontSize: 15, marginLeft: 7, color: theme.contrast }}>{translate('delete')}</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={{ alignItems: 'center', marginTop: deleteError ? 0 : 20 }}>
                                <TouchableOpacity style={{ ...styles.addTime, borderColor: theme.contrast }} onPress={() => navigation.navigate('AddTime')}>
                                    <Ionicons name={"md-add-circle-outline"} size={22} color={theme.contrast} />
                                    <Text style={{ fontSize: 15, marginLeft: 7, color: theme.contrast }}>{translate('newTimeControl')}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                )}
            />
            <Popup visible={showPopup}
                onAccept={deleteItem}
                onClose={() => setShowPopup(false)}
                title={translate('warning')}
                message={translate('deleteTimeDescription')} />
            <Popup visible={showMultiplePopup}
                onAccept={deleteMultipleItems}
                onClose={() => setShowMultiplePopup(false)}
                title={translate('warning')}
                message={translate('deleteAllDescription')} />
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
        borderRadius: 10,
        flex: 1
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
    },
    addTime: {
        padding: 10,
        width: '100%',
        paddingHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    singleButton: {
        padding: 10,
        flex: 1,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        flexDirection: 'row',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textError: {
        fontSize: 12,
        marginBottom: 10,
        marginLeft: 5
    },
})
