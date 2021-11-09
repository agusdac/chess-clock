import React from 'react'
import { TouchableOpacity } from 'react-native'
import { AntDesign, MaterialIcons, Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

export default function TouchableIcon({ name, family, size, color, onPress, style, containerStyle }) {
    const renderIcon = () => {
        switch (family) {
            case 'MaterialIcons':
                return (<MaterialIcons name={name} size={size} color={color} style={style} />)
            case 'Feather':
                return (<Feather name={name} size={size} color={color} style={style} />)
            case 'Ionicons':
                return (<Ionicons name={name} size={size} color={color} style={style} />)
            case 'MaterialCommunityIcons':
                return (<MaterialCommunityIcons name={name} size={size} color={color} style={style} />)
            default:
                return (<AntDesign name={name} size={size} color={color} style={style} />)
        }
    }
    return (
        <TouchableOpacity onPress={onPress} style={containerStyle} hitSlop={{ top: 20, bottom: 20, left: 0, right: 20 }}>
            {renderIcon()}
        </TouchableOpacity>
    )
}
