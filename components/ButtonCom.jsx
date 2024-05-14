import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { color } from '../styles/colors'

const ButtonCom = ({
    title,
    colors,
    textColor,
    width,
    ...props
}) => {
    return (
        <TouchableOpacity style={[styles.button, {
            backgroundColor: colors ? colors : color.primary,
            width: width ? width : '100%'
        }]} {...props}>
            <Text style={{
                color: textColor ? textColor : color.white,
                fontSize: 19,
                fontWeight: 600
            }}>{title}</Text>
        </TouchableOpacity >
    )
}

export default ButtonCom

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    }
})