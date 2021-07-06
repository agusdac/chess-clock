import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { ThemeContext } from '../../utils/contexts/ThemeContext';
import { translate, getCurrentLanguage } from '../../utils/localizable/localizable'

export default function LanguageModal({visible, onPress}) {

    const { theme } = useContext(ThemeContext)

    return (
        <View style={{ ...styles.container, backgroundColor: theme.background }} >
          <Modal
            animationType="slide"
            transparent={true}
            visible={visible}>
            <TouchableOpacity style={{ ...styles.item, backgroundColor: theme.background, borderBottomColor: theme.primary }} onPress={onPress}>
              <Text style={{...styles.itemText, color: theme.contrast}}>{translate('theme') + ' ' + translate(theme.key)}</Text>
            </TouchableOpacity>
          </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
