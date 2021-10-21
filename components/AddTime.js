import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { useContext } from 'react/cjs/react.development'
import { ThemeContext } from '../utils/contexts/ThemeContext'
import { LanguageContext } from '../utils/contexts/LanguageContext'
import { AntDesign } from '@expo/vector-icons'
import { ACTION_TYPES, TimeContext } from '../utils/contexts/TimeContext'
import uuid from 'react-native-uuid';
import AppFunctions from '../utils/functions'
import AsyncStorage from '@react-native-async-storage/async-storage'

const RadioButton = ({ selected, text, color, textColor, onSelected }) => (
    <TouchableOpacity style={styles.radioButton} onPress={onSelected}>
        <View style={{ ...styles.outerView, borderColor: textColor }}>
            {selected ? <View style={{ ...styles.innerView, backgroundColor: color }}></View> : null}
        </View>
        <Text style={{ ...styles.radioText, color: textColor }}>{text}</Text>
    </TouchableOpacity>
)

export default function AddTime({ navigation }) {
    const { theme } = useContext(ThemeContext)
    const { translate } = useContext(LanguageContext)
    const { state, dispatch } = useContext(TimeContext)

    const [name, setName] = useState('')
    const [time, setTime] = useState(AppFunctions.formatTime(5 * 60 * 1000))
    const [timePlayer2, setTimePlayer2] = useState(AppFunctions.formatTime(10 * 60 * 1000))
    const [increment, setIncrement] = useState(0)
    const [isPlayer2Different, setPlayer2Time] = useState(false)
    const [incrementType, setIncrementType] = useState('F')

    const stringToMiliseconds = time => {
        let timeSplitted = time.split(':')
        if (timeSplitted.length === 1) return (timeSplitted[0] * 60 * 1000)
        return (timeSplitted[0] * 60 * 1000) + timeSplitted[1] * 1000
    }

    const saveTime = () => {

        let newTime = {
            id: uuid.v4(),
            name,
            time: stringToMiliseconds(time) //miliseconds,
        }
        if (increment) {
            newTime.increment = {
                type: incrementType,
                amount: increment * 1000
            }
        }
        if (isPlayer2Different) {
            newTime.timeP2 = stringToMiliseconds(timePlayer2)
        }
        AsyncStorage.setItem('times', JSON.stringify([...state.times, newTime])).then(() => {
            dispatch({ type: ACTION_TYPES.STORE_TIMES, time: newTime })
            navigation.goBack()
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <ScrollView style={{ ...styles.container, backgroundColor: theme.background }}>
            <Text style={{ ...styles.label, color: theme.contrast }}>{translate('name')}</Text>
            <TextInput style={{ ...styles.input, borderBottomColor: theme.contrast, color: theme.contrast }}
                placeholder={translate('name')}
                value={name}
                onChangeText={setName}
                placeholderTextColor={theme.primary}
            />
            <Text style={{ ...styles.label, color: theme.contrast }}>{translate('time')}</Text>
            <View style={styles.timeInputView}>
                <TextInput style={{ ...styles.input, ...styles.timeInput, borderBottomColor: theme.contrast, color: theme.contrast }}
                    placeholder={translate('time')}
                    value={time}
                    keyboardType={'numeric'}
                    placeholderTextColor={theme.primary}
                    onChangeText={setTime}
                />
                <Text style={{ ...styles.label, color: theme.contrast, paddingBottom: 5 }}>{translate('minutes')} (mm:ss)</Text>
            </View>
            {isPlayer2Different ?
                <View>
                    <View style={{ ...styles.label, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: theme.contrast }}>{translate('timePlayer2')}</Text>
                        <TouchableOpacity onPress={() => setPlayer2Time(!isPlayer2Different)}>
                            <AntDesign name="close" size={18} color={theme.contrast} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.timeInputView}>
                        <TextInput style={{ ...styles.input, ...styles.timeInput, borderBottomColor: theme.contrast, color: theme.contrast }}
                            placeholder={translate('timePlayer2')}
                            value={timePlayer2}
                            keyboardType={'numeric'}
                            placeholderTextColor={theme.primary}
                            onChangeText={setTimePlayer2}
                        />
                        <Text style={{ ...styles.label, color: theme.contrast, paddingBottom: 5 }}>{translate('minutes')} (mm:ss)</Text>
                    </View>
                </View> :
                <TouchableOpacity onPress={() => setPlayer2Time(!isPlayer2Different)}>
                    <Text style={{ ...styles.clickableLabel, color: theme.contrast }}>{translate('differentTimes')}</Text>
                </TouchableOpacity>
            }


            <Text style={{ ...styles.label, color: theme.contrast }}>{translate('increment')}</Text>
            <View style={styles.timeInputView}>
                <TextInput style={{ ...styles.input, ...styles.timeInput, borderBottomColor: theme.contrast, color: theme.contrast }}
                    placeholder={translate('increment')}
                    value={increment.toString()}
                    onChangeText={setIncrement}
                    keyboardType={'numeric'}
                    placeholderTextColor={theme.primary}
                />
                <Text style={{ ...styles.label, color: theme.contrast, paddingBottom: 5 }}>{translate('seconds')}</Text>
            </View>

            {increment ? <View style={styles.incrementTypeView}>
                <RadioButton color={theme.secondary}
                    textColor={theme.contrast}
                    text={"Fischer"}
                    selected={incrementType === 'F'}
                    onSelected={() => setIncrementType('F')}
                />
                <RadioButton color={theme.secondary}
                    textColor={theme.contrast}
                    text={"Bronstein"}
                    selected={incrementType === 'B'}
                    onSelected={() => setIncrementType('B')}
                />
                <RadioButton color={theme.secondary}
                    textColor={theme.contrast}
                    text={"Delay"}
                    selected={incrementType === 'D'}
                    onSelected={() => setIncrementType('D')}
                />
            </View> : null}

            <View>
                <Text style={{ ...styles.clickableLabel, color: theme.contrast }}>{translate(`${incrementType}Description`)}</Text>
            </View>

            <TouchableOpacity style={{ ...styles.button, backgroundColor: theme.secondary }} onPress={saveTime}>
                <Text style={{ color: theme.contrast }}>{translate('save')}</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 25,
        paddingTop: 10
    },
    label: {
        marginTop: 20,
        borderRadius: 10
    },
    clickableLabel: {
        marginTop: 20,
        fontSize: 12,
    },
    input: {
        borderBottomWidth: 1,
        paddingVertical: 7
    },
    itemText: {
        fontSize: 12,
        marginTop: 5
    },
    timeInputView: {
        flexDirection: 'row'
    },
    timeInput: {
        width: '25%',
        textAlign: 'center',
        marginRight: 10,
        paddingBottom: 2
    },
    incrementTypeView: {
        paddingTop: 20,
        paddingHorizontal: 0,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    radioButton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    outerView: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerView: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    radioText: {
        marginLeft: 10
    },
    button: {
        marginTop: 40,
        borderRadius: 12,
        padding: 14,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
