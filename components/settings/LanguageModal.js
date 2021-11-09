import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { ThemeContext } from '../../utils/contexts/ThemeContext';
import { LanguageContext } from '../../utils/contexts/LanguageContext';
import { getCurrentLanguageCode } from '../../utils/localizable/localizable'
import TouchableIcon from '../shared/TouchableIcon';

export default function LanguageModal({ visible, onPress }) {

  const { theme } = useContext(ThemeContext)
  const { translate, setLanguage } = useContext(LanguageContext)

  const setLanguageAndClose = language => {
    setLanguage(language)
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
            <Text style={{ ...styles.headerText, color: theme.contrast, borderBottomColor: theme.contrast }}>{translate('chooseLanguage')}</Text>
            <TouchableIcon onPress={onPress} style={{ paddingBottom: 10 }}
              family={'AntDesign'} name={"close"}
              size={18} color={theme.contrast} />
          </View>
          <View style={{ ...styles.list }}>
            <TouchableOpacity style={{ ...styles.item, backgroundColor: getCurrentLanguageCode() === 'en' ? theme.secondary : theme.background }}
              onPress={() => setLanguageAndClose('en')}>
              <Text style={{ ...styles.itemText, color: theme.contrast }}>{translate('english')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.item, backgroundColor: getCurrentLanguageCode() === 'es' ? theme.secondary : theme.background }}
              onPress={() => setLanguageAndClose('es')}>
              <Text style={{ ...styles.itemText, color: theme.contrast }}>{translate('spanish')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ ...styles.item, backgroundColor: getCurrentLanguageCode() === 'ca' ? theme.secondary : theme.background }}
              onPress={() => setLanguageAndClose('ca')}>
              <Text style={{ ...styles.itemText, color: theme.contrast }}>{translate('catalan')}</Text>
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
