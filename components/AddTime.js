import React, {useState} from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import { useContext } from 'react/cjs/react.development'
import { ThemeContext } from '../utils/contexts/ThemeContext'
import { translate } from '../utils/localizable/localizable'
import { AntDesign } from '@expo/vector-icons'

export default function AddTime() {
    const { theme } = useContext(ThemeContext)
    const [isPlayer2Different, setPlayer2Time] = useState(false)

    return (
        <ScrollView style={{ ...styles.container, backgroundColor: theme.background }}>
            <Text style={{ ...styles.label, color: theme.contrast }}>{translate('name')}</Text>
            <TextInput style={{ ...styles.input, borderBottomColor: theme.contrast, color: theme.contrast }}
                placeholder={translate('name')}
            />
            <Text style={{ ...styles.label, color: theme.contrast }}>{translate('time')}</Text>
            <TextInput style={{ ...styles.input, borderBottomColor: theme.contrast, color: theme.contrast }}
                placeholder={translate('time')}
            />
            {isPlayer2Different ?
              <View>
                <View style={{ ...styles.label, flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{color: theme.contrast }}>{translate('timePlayer2')}</Text>
                  <TouchableOpacity onPress={() => setPlayer2Time(!isPlayer2Different)}>
                    <AntDesign name="close" size={18} color={theme.contrast} />
                  </TouchableOpacity>
                </View>
                <TextInput style={{ ...styles.input, borderBottomColor: theme.contrast, color: theme.contrast }}
                    placeholder={translate('timePlayer2')} />
              </View> :
              <TouchableOpacity onPress={() => setPlayer2Time(!isPlayer2Different)}>
                <Text style={{ ...styles.clickableLabel, color: theme.contrast }}>Quieres poner tiempos diferentes por jugador?</Text>
              </TouchableOpacity>
            }


            <Text style={{ ...styles.label, color: theme.contrast }}>{translate('increment')}</Text>
            <TextInput style={{ ...styles.input, borderBottomColor: theme.contrast, color: theme.contrast }}
                placeholder={translate('increment')}
            />
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
        paddingVertical: 10
    },
    itemText: {
        fontSize: 12,
        marginTop: 5
    }
})
