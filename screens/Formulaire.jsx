import { View, Text, StyleSheet, Dimensions, Button, TouchableOpacity, ToastAndroid, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color } from '../styles/colors';
import ButtonCom from '../components/ButtonCom';
import InputCom from '../components/InputCom';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import { Entypo, MaterialIcons } from '@expo/vector-icons';

const Formulaire = ({
    visible = false,
    onPress = () => { },
    onClose = () => { },
    onPerment = () => { },
    setNum = () => { },
    setNom = () => { },
    setSalaire = () => { },
    data = [],
    num,
    nom,
    salaire,
    modif,
}) => {

    let title = modif != '' ? 'Modification' : 'Nouveau';
    let btnTitle = modif != '' ? 'Modifier' : 'Enregistrer';


    const handlePressed = () => {
        if (btnTitle === 'Enregistrer') {
            setDataDB();
        } else {
            updateDataDB()
        }
    }

    const setDataDB = async () => {
        axios.post(`http://192.168.43.44/backend/employe.php`, {
            num: num,
            nom: nom,
            salaire: salaire
        })
            .then(function (response) {
                if (response.data.success) {
                    ToastAndroid.show(
                        "Employer ajouter avec succes .",
                        ToastAndroid.LONG
                    )
                    onPress()
                } else {
                    ToastAndroid.show(
                        "Employer non ajouter.",
                        ToastAndroid.LONG
                    );
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const updateDataDB = async () => {

        axios.put(`http://192.168.43.44/backend/employe.php`, {
            num: num,
            nom: nom,
            salaire: salaire
        })
            .then(function (response) {
                if (response.data.success) {
                    ToastAndroid.show(
                        "Employer modifier avec succes .",
                        ToastAndroid.LONG
                    )
                    onPress()
                } else {
                    ToastAndroid.show(
                        "Employer non modifier.",
                        ToastAndroid.LONG
                    );
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    return visible && (
        <Pressable style={styles.container} onPress={onClose} >
            <Pressable style={styles.content} onPress={onPerment}>
                <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: color.error, padding: 5, borderRadius: 50, position: 'absolute', right: 5, top: 5 }}
                    onPress={onClose}
                >
                    <MaterialIcons name="close" size={20} color={color.white} />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', width: '100%', fontSize: 35, fontWeight: 700, marginBottom: 10, color: 'grey' }}>{title}</Text>
                <InputCom placeholder='Numero' onChangeText={text => setNum(text)} value={num} editable={false} />
                <InputCom placeholder='Nom' onChangeText={text => setNom(text)} value={nom} />
                <InputCom placeholder='Salaire' keyboardType='numeric' onChangeText={text => setSalaire(text)} value={salaire} />
                <ButtonCom title={btnTitle} width={'98%'} onPress={handlePressed} />

            </Pressable>
        </Pressable>
    )
}

export default Formulaire;

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
        zIndex: 90,
    },
    content: {
        backgroundColor: color.white,
        width: '90%',
        paddingVertical: 30,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: color.primary,
        zIndex: 99,
    }
})