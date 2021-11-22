import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { ThemeContext } from '../../utils/contexts/ThemeContext';
import { translate } from '../../utils/localizable/localizable';
import TouchableIcon from '../shared/TouchableIcon';

export default function Popup({ visible, onClose, onAccept, title, message }) {

    const { theme } = useContext(ThemeContext)

    return (
        <Modal
            transparent={true}
            visible={visible}>
            <View style={styles.container}>
                <View style={{ ...styles.modalView, backgroundColor: theme.primary }} >
                    <View style={{ ...styles.header }}>
                        <Text style={{ ...styles.headerText, color: theme.contrast, borderBottomColor: theme.contrast }}>{title}</Text>
                        <TouchableIcon onPress={onClose} style={{ paddingBottom: 10 }}
                            family={'AntDesign'} name={"close"}
                            size={18} color={theme.contrast} />
                    </View>
                    <View style={{ ...styles.body }}>
                        <Text style={{ color: theme.contrast }}>{message}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                            <TouchableOpacity onPress={onClose} style={{ ...styles.button, backgroundColor: theme.background }}>
                                <Text style={{ ...styles.buttonText, color: theme.contrast }}>{translate('no')}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onAccept} style={{ ...styles.button, backgroundColor: theme.secondary }}>
                                <Text style={{ ...styles.buttonText, color: theme.contrast }}>{translate('yes')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
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
        maxHeight: '35%',
        marginTop: '40%'
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
    body: {
        flex: 1,
        width: '95%',
        justifyContent: 'space-between',
        paddingHorizontal: 14,
    },
    button: {
        padding: 10,
        borderRadius: 6,
        minWidth: '25%',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})
