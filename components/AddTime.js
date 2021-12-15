import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { ThemeContext } from '../utils/contexts/ThemeContext'
import { LanguageContext } from '../utils/contexts/LanguageContext'
import { ACTION_TYPES, TimeContext } from '../utils/contexts/TimeContext'
import uuid from 'react-native-uuid';
import AppFunctions from '../utils/functions'
import TouchableIcon from './shared/TouchableIcon'
import colors from '../utils/colors'

const RadioButton = ({ selected, text, color, textColor, onSelected }) => (
    <TouchableOpacity style={styles.radioButton} onPress={onSelected}>
        <View style={{ ...styles.outerView, borderColor: textColor }}>
            {selected ? <View style={{ ...styles.innerView, backgroundColor: color }}></View> : null}
        </View>
        <Text style={{ ...styles.radioText, color: textColor }}>{text}</Text>
    </TouchableOpacity>
)

export default function AddTime({ route, navigation }) {
    const { theme } = useContext(ThemeContext)
    const { translate } = useContext(LanguageContext)
    const { state, dispatch } = useContext(TimeContext)

    const [name, setName] = useState('')
    const [nameError, setNameError] = useState('')
    const [time, setTime] = useState(AppFunctions.formatTime(5 * 60 * 1000))
    const [timeError, setTimeError] = useState('')
    const [timePlayer2, setTimePlayer2] = useState(AppFunctions.formatTime(10 * 60 * 1000))
    const [time2Error, setTime2Error] = useState('')
    const [increment, setIncrement] = useState(0)
    const [incrementError, setIncrementError] = useState('')
    const [isPlayer2Different, setPlayer2Time] = useState(false)
    const [incrementType, setIncrementType] = useState('F')
    const [disabled, setDisabled] = useState(true)

    const regexTime = new RegExp('^([0-9]?[0-9]?[0-9]):[0-5][0-9]$')

    const stringToMiliseconds = time => {
        let timeSplitted = time.split(':')
        if (timeSplitted.length === 1) return (timeSplitted[0] * 60 * 1000)
        return (timeSplitted[0] * 60 * 1000) + timeSplitted[1] * 1000
    }

    const saveTime = () => {
        let newTime = {
            id: route.params ? route.params.time.id : uuid.v4(),
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

        if (route.params) dispatch({ type: ACTION_TYPES.EDIT_TIME, time: newTime })
        else dispatch({ type: ACTION_TYPES.STORE_TIMES, time: newTime })
        navigation.goBack()
    }

    const checkNameError = () => {
        if (name === '') setNameError(translate('requiredField'))
        else setNameError('')
    }

    const checkTimeError = () => {
        if (time === '') setTimeError(translate('requiredField'))
        else if (!time.match(regexTime)) setTimeError(translate('timeFormatError'))
        else setTimeError('')
    }

    const checkTime2Error = () => {
        if (timePlayer2 === '') setTime2Error(translate('requiredField'))
        else if (!timePlayer2.match(regexTime)) setTime2Error(translate('timeFormatError'))
        else setTime2Error('')
    }

    const checkIncrementError = () => {
        if (!Number.isInteger(Number(increment))) setIncrementError(translate('incrementError'))
        else setIncrementError('')
    }

    useEffect(() => {
        setDisabled((name === '' || time === '' || nameError !== '' || timeError !== '' || incrementError !== '' || (isPlayer2Different && time2Error !== '')))
    }, [name, time, nameError, timeError, time2Error, isPlayer2Different, incrementError])

    useEffect(() => {
        if (route.params) {
            const { time } = route.params
            navigation.setOptions({ title: translate('editTime') })
            setName(time.name)
            setTime(AppFunctions.formatTime(time.time))
            if (time.timeP2) {
                setTimePlayer2(AppFunctions.formatTime(time.timeP2))
                setPlayer2Time(true)
            }
            if (time.increment) {
                setIncrement((time.increment.amount / 1000).toString())
                setIncrementType(time.increment.type)
            }
        }
    }, [])

    return (
        <ScrollView style={{ ...styles.container, backgroundColor: theme.background }}>
            <Text style={{ ...styles.label, color: theme.contrast }}>{translate('name')}</Text>
            <TextInput style={{ ...styles.input, borderBottomColor: nameError ? colors.red : theme.contrast, color: theme.contrast }}
                placeholder={translate('name')}
                value={name}
                onChangeText={setName}
                onBlur={checkNameError}
                placeholderTextColor={theme.primary}
            />
            <Text style={styles.textError}>{nameError}</Text>
            <Text style={{ ...styles.label, color: theme.contrast }}>{translate('time')}</Text>
            <View style={styles.timeInputView}>
                <TextInput style={{ ...styles.input, ...styles.timeInput, borderBottomColor: timeError ? colors.red : theme.contrast, color: theme.contrast }}
                    placeholder={translate('time')}
                    value={time}
                    keyboardType={'numeric'}
                    placeholderTextColor={theme.primary}
                    onChangeText={setTime}
                    onBlur={checkTimeError}
                />
                <Text style={{ ...styles.label, color: theme.contrast, paddingBottom: 5 }}>{translate('minutes')} (mm:ss)</Text>
            </View>
            <Text style={styles.textError}>{timeError}</Text>
            {isPlayer2Different ?
                <View>
                    <View style={{ ...styles.label, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: theme.contrast }}>{translate('timePlayer2')}</Text>
                        <TouchableIcon onPress={() => setPlayer2Time(!isPlayer2Different)}
                            family={'AntDesign'}
                            name={"close"}
                            size={18} color={theme.contrast} />
                    </View>
                    <View style={styles.timeInputView}>
                        <TextInput style={{ ...styles.input, ...styles.timeInput, borderBottomColor: time2Error ? colors.red : theme.contrast, color: theme.contrast }}
                            placeholder={translate('time')}
                            value={timePlayer2}
                            keyboardType={'numeric'}
                            placeholderTextColor={theme.primary}
                            onChangeText={setTimePlayer2}
                            onBlur={checkTime2Error}
                        />
                        <Text style={{ ...styles.label, color: theme.contrast, paddingBottom: 5 }}>{translate('minutes')} (mm:ss)</Text>
                    </View>
                    <Text style={styles.textError}>{time2Error}</Text>
                </View> :
                <TouchableOpacity onPress={() => setPlayer2Time(!isPlayer2Different)}>
                    <Text style={{ ...styles.clickableLabel, color: theme.contrast }}>{translate('differentTimes')}</Text>
                </TouchableOpacity>
            }


            <Text style={{ ...styles.label, color: theme.contrast }}>{translate('increment')}</Text>
            <View style={styles.timeInputView}>
                <TextInput style={{ ...styles.input, ...styles.timeInput, borderBottomColor: incrementError ? colors.red : theme.contrast, color: theme.contrast }}
                    placeholder={translate('increment')}
                    value={increment.toString()}
                    onChangeText={setIncrement}
                    keyboardType={'numeric'}
                    onBlur={checkIncrementError}
                    placeholderTextColor={theme.primary}
                />
                <Text style={{ ...styles.label, color: theme.contrast, paddingBottom: 5 }}>{translate('seconds')}</Text>
            </View>
            <Text style={styles.textError}>{incrementError}</Text>

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

            {increment ? <View>
                <Text style={{ ...styles.clickableLabel, color: theme.contrast }}>{translate(`${incrementType}Description`)}</Text>
            </View> : null}

            <TouchableOpacity style={{ ...styles.button, backgroundColor: disabled ? theme.primary : theme.secondary }} onPress={saveTime} disabled={disabled}>
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
    inputError: {
        borderBottomColor: 'red',
    },
    textError: {
        color: 'red',
        fontSize: 12,
        marginTop: 2
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
