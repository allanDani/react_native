import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ButtonCom from './ButtonCom'
import { color } from '../styles/colors'

const DeleteDialog = ({
    deleteMsg,
    visible,
    onClose = () => { },
    onPerment = () => { },
    onAccept = () => { },
}) => {
    return visible && (
        <Pressable style={styles.container} onPress={onClose}>
            <Pressable style={styles.content} onPress={onPerment}>
                <Text style={styles.title}>Suppression ?</Text>
                <Text style={styles.text}>{deleteMsg}</Text>
                <View style={styles.actions}>
                    <ButtonCom title='Annuler' width='45%' colors={color.lightb} textColor={color.black} onPress={onClose} />
                    <ButtonCom title='Supprimer' width='45%' colors='red' onPress={onAccept} />
                </View>
            </Pressable>
        </Pressable>
    )
}

export default DeleteDialog

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: color.dark,
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        left: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        zIndex: 99,
    },
    content: {
        backgroundColor: color.white,
        width: '90%',
        paddingVertical: 15,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: color.primary,
    },
    actions: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    title: {
        fontSize: 25,
        textAlign: 'left',
        width: '90%',
        fontWeight: 'bold'
    },
    text: {
        fontSize: 18,
        paddingVertical: 10,
        textAlign: 'center'
    }
})