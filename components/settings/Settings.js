import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { ThemeContext } from '../../utils/contexts/ThemeContext';
import { LanguageContext } from '../../utils/contexts/LanguageContext';
import LanguageModal from './LanguageModal'
import ThemeModal from './ThemeModal'
import { getCurrentLanguage } from '../../utils/localizable/localizable'

export default function Settings() {

    const { theme } = useContext(ThemeContext)
    const { translate } = useContext(LanguageContext)

    const [isLanguageModalOpen, showLanguageModal] = useState(false)
    const [isThemeModalOpen, showThemeModal] = useState(false)

    return (
        <View style={{ ...styles.container, backgroundColor: theme.background }} >
            <TouchableOpacity style={{ ...styles.item, backgroundColor: theme.background, borderBottomColor: theme.primary }}
              onPress={() => showThemeModal(true)}>
              <Text style={{...styles.itemText, color: theme.contrast}}>{translate('theme') + ' ' + translate(theme.key)}</Text>
              <View style={{...styles.colorSample, backgroundColor: theme.secondary}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.item, backgroundColor: theme.background, borderBottomColor: theme.primary }}
              onPress={() => showLanguageModal(true)}>
              <Text style={{...styles.itemText, color: theme.contrast}}>{translate('language') + ' ' + getCurrentLanguage()}</Text>
            </TouchableOpacity>
            <LanguageModal visible={isLanguageModalOpen} onPress={() => showLanguageModal(false)}/>
            <ThemeModal visible={isThemeModalOpen} onPress={() => showThemeModal(false)}/>
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
      marginTop: 10,
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    colorSample: {
      height: 20,
      width: 20,
      borderRadius: 10
    },
    itemText: {
      fontSize: 14
    }
})
