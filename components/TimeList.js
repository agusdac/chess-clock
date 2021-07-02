import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useEffect } from 'react/cjs/react.development';
import { ThemeContext } from '../utils/contexts/ThemeContext';
import { TimeContext } from '../utils/contexts/TimeContext';
import { translate } from '../utils/localizable/localizable';

const TimeList = () => {

    const { theme } = useContext(ThemeContext)
    const { times } = useContext(TimeContext)

    const navigation = useNavigation()

    const [activeTimes, setActiveTimes] = useState(times.map(time => { return { ...time, clicked: false } }))

    const clickItem = id => {
        setActiveTimes(activeTimes.map(time => time.id === id ? { ...time, clicked: !time.clicked } : time))
    }

    return (
        <View style={{ ...styles.container, backgroundColor: theme.background }} >
            <FlatList
                data={activeTimes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={{ ...styles.item, backgroundColor: theme.primary }} onPress={() => clickItem(item.id)}>
                        <Text style={{ ...styles.itemName, color: theme.contrast, }} >{item.name}</Text>
                        {item.clicked ? <View style={{ marginTop: 5, }}>
                            <Text style={{ ...styles.itemText, color: theme.contrast }}>{item.timeP2 ? translate('timePlayer2') : translate('time')}: {item.time}</Text>
                            {item.increment ? <Text style={{ ...styles.itemText, color: theme.contrast }}>{translate('increment')}: {item.increment}</Text> : null}
                            {item.timeP2 ? <Text style={{ ...styles.itemText, color: theme.contrast }}>{translate('timePlayer2')}: {item.timeP2}</Text> : null}
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