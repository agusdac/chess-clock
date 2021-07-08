import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { ThemeContext } from '../../utils/contexts/ThemeContext';
import { LanguageContext } from '../../utils/contexts/LanguageContext';
import { AntDesign } from '@expo/vector-icons'

export default function ThemeModal({visible, onPress}) {

    const { theme, setTheme } = useContext(ThemeContext)
    const { translate } = useContext(LanguageContext)

    const setThemeAndClose = th => {
        setTheme(th)
        onPress()
    }

    return (
        <Modal
          animationType="slide"
          transparent={true}
          visible={visible}>
          <View style={styles.container}>
          <View style={{ ...styles.modalView, backgroundColor: theme.primary}} >
              <View style={{...styles.header}}>
                <Text style={{...styles.headerText, color: theme.contrast, borderBottomColor: theme.contrast}}>{translate('chooseTheme')}</Text>
                <TouchableOpacity onPress={onPress} hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}>
                  <AntDesign name="close" size={18} color={theme.contrast} style={{ paddingBottom: 10 }} />
                </TouchableOpacity>
              </View>
              <View style={{...styles.list}}>
                <TouchableOpacity style={{ ...styles.item, backgroundColor: theme.key === 'dark' ? theme.secondary : theme.background }}
                    onPress={() => setThemeAndClose('dark')}>
                  <Text style={{...styles.itemText, color: theme.contrast}}>{translate('dark')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.item, backgroundColor: theme.key === 'light' ? theme.secondary : theme.background }}
                    onPress={() => setThemeAndClose('light')}>
                  <Text style={{...styles.itemText, color: theme.contrast}}>{translate('light')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
    )
}

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
        maxHeight: '60%',
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
      padding: 15,
      width: '100%',
      paddingLeft: 20,
      borderRadius: 10,
      justifyContent: 'center',
      marginTop: 10
    },
    itemText: {
      fontSize: 15
    }
})
