import React from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { useContext } from 'react/cjs/react.development'
import { ThemeContext } from '../utils/contexts/ThemeContext'
import { translate } from '../utils/localizable/localizable'

export default function AddTime() {
    const { theme } = useContext(ThemeContext)
    return (
        <View style={{ ...styles.container, backgroundColor: theme.background }}>
            <Text style={{ ...styles.label, color: theme.contrast }}>{translate('name')}</Text>
            <TextInput style={{ ...styles.input, borderBottomColor: theme.contrast, color: theme.contrast }}
                placeholder={translate('name')}
            />
            <Text style={{ ...styles.label, color: theme.contrast }}>{translate('time')}</Text>
            <TextInput style={{ ...styles.input, borderBottomColor: theme.contrast, color: theme.contrast }}
                placeholder={translate('time')}
            />
            <Text style={{ ...styles.label, color: theme.contrast }}>{translate('increment')}</Text>
            <TextInput style={{ ...styles.input, borderBottomColor: theme.contrast, color: theme.contrast }}
                placeholder={translate('increment')}
            />
            <Text style={{ ...styles.label, color: theme.contrast }}>{translate('timePlayer2')}</Text>
            <TextInput style={{ ...styles.input, borderBottomColor: theme.contrast, color: theme.contrast }}
                placeholder={translate('timePlayer2')}
            />
        </View>
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
    input: {
        borderBottomWidth: 1,
        paddingVertical: 10
    },
    itemText: {
        fontSize: 12,
        marginTop: 5
    }
})
