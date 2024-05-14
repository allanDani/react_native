import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { color } from '../styles/colors'

const InputCom = ({
    ...props
}) => {
    return (
        <View style={styles.container}>
            <TextInput style={[styles.input, {}]} {...props} />
        </View>
    )
}

export default InputCom

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        width: '98%',
        backgroundColor: color.lightw,
        borderRadius: 25,
        height: 48,
        paddingHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: color.primary,
    },
    input: {
        width: '100%',
        height: '98%',
        backgroundColor: color.trans
    }
})