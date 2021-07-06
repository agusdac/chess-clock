import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ThemeContext } from '../../utils/contexts/ThemeContext';
import LanguageModal from './LanguageModal'
import { translate, getCurrentLanguage } from '../../utils/localizable/localizable'

export default function Settings() {

    const { theme } = useContext(ThemeContext)
    const [isLanguageModalOpen, showLanguageModal] = useState(false)

    return (
        <View style={{ ...styles.container, backgroundColor: theme.background }} >
            <TouchableOpacity style={{ ...styles.item, backgroundColor: theme.background, borderBottomColor: theme.primary }}>
              <Text style={{...styles.itemText, color: theme.contrast}}>{translate('theme') + ' ' + translate(theme.key)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.item, backgroundColor: theme.background, borderBottomColor: theme.primary }}
              onPress={() => showLanguageModal(true)}>
              <Text style={{...styles.itemText, color: theme.contrast}}>{translate('language') + ' ' + getCurrentLanguage()}</Text>
            </TouchableOpacity>
            <LanguageModal visible={isLanguageModalOpen} onPress={() => showLanguageModal(false)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    item: {
      flexDirection: 'row',
      padding: 20,
      paddingLeft: 5,
      paddingBottom: 10,
      borderBottomWidth: 1,
      marginTop: 10
    },
    itemText: {
      fontSize: 14
    }
})