import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { View, Text, StyleSheet, Modal } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { ThemeContext } from '../utils/contexts/ThemeContext'
import AppFunctions from '../utils/functions'
import { translate } from '../utils/localizable/localizable'
import TouchableIcon from './shared/TouchableIcon'

const initSummary = {
    average: 0,
    shortest: 0,
    longest: 0,
    first10: 0,
    averageAfter10: 0,
    shortestAfter10: 0,
    longestAfter10: 0,
}

const calculateSummary = times => {
    const sum = times.reduce((a, b) => a + b, 0);
    const after10 = times.length > 10 ? times.slice(9) : []
    const sumAfter10 = after10.reduce((a, b) => a + b, 0);

    return {
        average: AppFunctions.formatTime((sum / times.length) || 0),
        shortest: AppFunctions.formatTime(Math.min(...times.slice(1))),
        longest: AppFunctions.formatTime(Math.max(...times)),
        first10: AppFunctions.formatTime(times.slice(0, 9).reduce((a, b) => a + b, 0)),
        averageAfter10: AppFunctions.formatTime(after10.length ? (sumAfter10 / after10.length) : 0),
        shortestAfter10: AppFunctions.formatTime(after10.length ? Math.min(...after10) : 0),
        longestAfter10: AppFunctions.formatTime(after10.length ? Math.max(...after10) : 0),
    }
}

const TimesSummary = ({ visible, onPress, totalTimesPlayer1, totalTimesPlayer2 }) => {
    const { theme } = useContext(ThemeContext)

    const [summary1, setSummary1] = useState(initSummary)
    const [summary2, setSummary2] = useState(initSummary)

    useEffect(() => {
        setSummary1(calculateSummary(totalTimesPlayer1))
    }, [totalTimesPlayer1])

    useEffect(() => {
        setSummary2(calculateSummary(totalTimesPlayer2))
    }, [totalTimesPlayer2])

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}>
            <View style={styles.container}>
                <View style={{ ...styles.modalView, backgroundColor: theme.primary }} >
                    <View style={{ ...styles.header }}>
                        <Text style={{ ...styles.headerText, color: theme.contrast, borderBottomColor: theme.contrast }}>{translate('summaryTitle')}</Text>
                        <TouchableIcon onPress={onPress} style={{ paddingBottom: 10 }}
                            family={'AntDesign'} name={"close"}
                            size={18} color={theme.contrast} />
                    </View>
                    <ScrollView style={{ ...styles.list }}>
                        <Text style={{ ...styles.headerText, color: theme.contrast, borderBottomColor: theme.contrast }}>{translate('player1')}</Text>
                        <Text style={{ ...styles.item, color: theme.contrast }}>{translate('average') + summary1.average}</Text>
                        <Text style={{ ...styles.item, color: theme.contrast }}>{translate('shortest') + summary1.shortest}</Text>
                        <Text style={{ ...styles.item, color: theme.contrast }}>{translate('longest') + summary1.longest}</Text>

                        {totalTimesPlayer1.length >= 10 &&
                            <View>
                                <Text style={{ ...styles.item, color: theme.contrast }}>{translate('first10') + summary1.first10}</Text>
                                <Text style={{ ...styles.item, color: theme.contrast }}>{translate('averageAfter10') + summary1.averageAfter10}</Text>
                                <Text style={{ ...styles.item, color: theme.contrast }}>{translate('shortestAfter10') + summary1.shortestAfter10}</Text>
                                <Text style={{ ...styles.item, color: theme.contrast }}>{translate('longestAfter10') + summary1.longestAfter10}</Text>
                            </View>
                        }

                        <Text style={{ ...styles.headerText, color: theme.contrast, borderBottomColor: theme.contrast, marginTop: 20 }}>{translate('player2')}</Text>
                        <Text style={{ ...styles.item, color: theme.contrast }}>{translate('average') + summary2.average}</Text>
                        <Text style={{ ...styles.item, color: theme.contrast }}>{translate('shortest') + summary2.shortest}</Text>
                        <Text style={{ ...styles.item, color: theme.contrast }}>{translate('longest') + summary2.longest}</Text>

                        {totalTimesPlayer2.length >= 10 &&
                            <View>
                                <Text style={{ ...styles.item, color: theme.contrast }}>{translate('first10') + summary2.first10}</Text>
                                <Text style={{ ...styles.item, color: theme.contrast }}>{translate('averageAfter10') + summary2.averageAfter10}</Text>
                                <Text style={{ ...styles.item, color: theme.contrast }}>{translate('shortestAfter10') + summary2.shortestAfter10}</Text>
                                <Text style={{ ...styles.item, color: theme.contrast, marginBottom: 20 }}>{translate('longestAfter10') + summary2.longestAfter10}</Text>
                            </View>
                        }
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default TimesSummary

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    modalView: {
        flex: 1,
        alignItems: 'center',
        elevation: 5,
        borderRadius: 10,
        shadowColor: 'white',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        width: '80%',
        maxHeight: '85%',
    },
    header: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 7,
        borderBottomWidth: 1
    },
    list: {
        flex: 1,
        width: '95%',
        paddingHorizontal: 20,
    },
    item: {
        width: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        marginTop: 10
    },
    itemText: {
        fontSize: 15
    }
})
