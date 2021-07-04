import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useEffect } from 'react/cjs/react.development';
import { ThemeContext } from '../utils/contexts/ThemeContext';
import { TimeContext } from '../utils/contexts/TimeContext';
import { translate } from '../utils/localizable/localizable';
import { AntDesign } from '@expo/vector-icons'

const SECONDS = 'seconds'

const TimeList = () => {

    const { theme } = useContext(ThemeContext)
    const { times, setSelectedTime } = useContext(TimeContext)

    const navigation = useNavigation()

    const [activeTimes, setActiveTimes] = useState(times.map(time => { return { ...time, clicked: false } }))

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
                      style={{ ...styles.item, backgroundColor: theme.primary }} onPress={() => setSelectedTime(item)}>
                      <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingRight: 5}}>
                        <Text style={{ ...styles.itemName, color: theme.contrast, }} >{item.name}</Text>
                        <TouchableOpacity onPress={() => clickItem(item.id)}>
                          <AntDesign name={item.clicked ? "upcircleo" : "downcircleo"} size={20} color={theme.contrast} />
                        </TouchableOpacity>
                      </View>
                        {item.clicked ? <View style={{ marginTop: 5, }}>
                            <Text style={{ ...styles.itemText, color: theme.contrast }}>{item.timeP2 ? translate('timePlayer2') : translate('time')}: {formatMiliseconds(item.time, 'min')}</Text>
                            {item.increment ? <Text style={{ ...styles.itemText, color: theme.contrast }}>{translate('increment')}: {formatMiliseconds(item.increment, SECONDS)}</Text> : null}
                            {item.timeP2 ? <Text style={{ ...styles.itemText, color: theme.contrast }}>{translate('timePlayer2')}: {formatMiliseconds(item.timeP2, 'min')}</Text> : null}
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
