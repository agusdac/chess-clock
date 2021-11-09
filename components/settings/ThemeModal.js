import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native'
import { ThemeContext } from '../../utils/contexts/ThemeContext';
import { LanguageContext } from '../../utils/contexts/LanguageContext';
import themes from '../../utils/themes';
import TouchableIcon from '../shared/TouchableIcon';

export default function ThemeModal({ visible, onPress }) {

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
        <View style={{ ...styles.modalView, backgroundColor: theme.primary }} >
          <View style={{ ...styles.header }}>
            <Text style={{ ...styles.headerText, color: theme.contrast, borderBottomColor: theme.contrast }}>{translate('chooseTheme')}</Text>
            <TouchableIcon onPress={onPress} style={{ paddingBottom: 10 }}
              family={'AntDesign'} name={"close"}
              size={18} color={theme.contrast} />
          </View>
          <View style={{ ...styles.list }}>
            <FlatList data={themes}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{ flex: 1, marginBottom: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity style={{ ...styles.item, backgroundColor: theme.key === item.key ? theme.secondary : theme.background }}
                  onPress={() => setThemeAndClose(item)}>
                  <Text style={{ ...styles.itemText, color: theme.contrast }}>{translate(item.key)}</Text>
                </TouchableOpacity>
              )} />
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
