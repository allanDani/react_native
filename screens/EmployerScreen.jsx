import {
    View,
    Text,
    StatusBar,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { color } from "../styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Formulaire from "./Formulaire";
import axios from 'axios'
import DeleteDialog from "../components/DeleteDialog";

const EmployerScreen = () => {
    const [show, setShow] = useState(false);
    const [showDel, setShowDel] = useState(false);
    const [delMsg, setDelMsg] = useState('');
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);
    const [maxNum, setMaxNum] = useState('');
    const [total, setTotal] = useState(0);
    const [datas, setDatas] = useState([]);
    const [num, setNum] = useState('numin');
    const [nom, setNom] = useState('nomin');
    const [salaire, setSalaire] = useState(0);
    const [modifier, setModifier] = useState(false);

    useEffect(() => {
        async function check() {
            await getDataDB();
        }
        check();
    }, [])

    const getDataDB = async () => {
        await axios.get('http://192.168.43.44/backend/employe.php')
            .then(function (response) {
                if (response.data.success) {
                    setDatas(response.data.data);
                    getMinMax(response.data.data)
                } else {
                    console.log("response.message");
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const deleteDataDB = async (num) => {
        axios.delete('http://192.168.43.44/backend/employe.php', {
            data: {
                num: num
            }
        })
            .then(function (response) {
                if (response.data.success) {
                    setShowDel(false)
                    ToastAndroid.show(
                        "Employer supprimer avec succes .",
                        ToastAndroid.LONG
                    )
                    getDataDB()
                }
            })
            .catch(function (error) {
                console.error(error);
            });
    }

    const getMinMax = data => {
        let total = 0;
        let minimum = 0;
        let maximum = 0;
        let maxNum = 'E0000';
        for (let i = 0; i < data.length; i++) {
            const element = parseInt(data[i].salaire);
            if (element > maximum) {
                maximum = element;
            }
            if (minimum === 0) {
                minimum = element;
            } else {
                if (element < minimum) {
                    minimum = element;
                }
            }

            total += element;
            const num = data[i].num;
            if (num > maxNum) {
                maxNum = num;
            } else {
                return maxNum;
            }
        }
        setTotal(total);
        setMax(maximum);
        setMin(minimum);
        setMaxNumero(maxNum);
    }

    const setMaxNumero = (num) => {
        let numPart = num.substring(1);
        let newNumPart = parseInt(numPart) + 1;
        let newNum = '';
        if (newNumPart < 10) {
            newNum = "E000" + newNumPart
        }
        setMaxNum(newNum);
    }

    const RenderItem = data => {
        return (
            <View
                style={{
                    backgroundColor: color.lightb,
                    width: "100%",
                    height: 100,
                    paddingHorizontal: 10,
                    marginBottom: 4,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: color.primary,
                }}
            >
                <View style={{ flex: 4 }}>
                    <Text style={{ fontSize: 16 }}> Numero: {data.data.num} </Text>
                    <Text style={{ fontSize: 16 }}> Nom: {data.data.nom} </Text>
                    <Text style={{ fontSize: 16 }}> Salaire: {data.data.salaire} Ar </Text>
                    <Text style={{ fontSize: 16 }}> Observation: {data.data.salaire < 1000 ? 'Mediocre' : data.data.salaire < 5000 ? 'Moyenne' : 'Grand'} </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', gap: 10, height: '80%' }}>
                    <FontAwesome name="edit" size={30} color={color.primary} onPress={() => {
                        setNum(data.data.num);
                        setNom(data.data.nom);
                        setSalaire(data.data.salaire);
                        setShow(true);
                        setModifier(true)
                    }} />
                    <Entypo name="trash" size={28} color={color.error} onPress={() => deleteItem(data.data)} />
                </View>
            </View>
        );
    };

    const deleteItem = (data) => {
        setShowDel(true);
        setDelMsg(`Voulez-vous supprimer vraiment '${data.nom}' ?`);
        setNum(data.num);
    }
    return (
        <View style={{ zIndex: 1 }}>
            <StatusBar />
            <Formulaire
                visible={show}
                onPress={() => {
                    setShow(false);
                    getDataDB();
                }}
                onClose={() => setShow(false)}
                onPerment={() => setShow(true)}
                num={num}
                nom={nom}
                salaire={salaire}
                setNom={setNom}
                setNum={setNum}
                setSalaire={setSalaire}
                data={datas}
                modif={modifier}
            />
            <DeleteDialog
                visible={showDel}
                deleteMsg={delMsg}
                onClose={() => (setShowDel(false), setNum('numin'))}
                onPerment={() => setShowDel(true)}
                onAccept={() => (deleteDataDB(num), setNum('numin'))}
            />
            <View style={{
                marginBottom: 6, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, alignItems: 'center', height: 50, borderBottomColor: color.primary,
                borderBottomWidth: 1
            }}>
                <Text style={{ fontSize: 30, textAlign: "center", fontWeight: 700 }}>
                    Gestion Employer
                </Text>
                <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: color.primary, padding: 10, borderRadius: 50 }}
                    onPress={() => {
                        setNum(maxNum);
                        setNom('');
                        setSalaire(null);
                        setShow(true);
                        setModifier(false)
                    }}
                >
                    <Entypo name="plus" size={20} color={color.white} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: color.primary, padding: 10, borderRadius: 50 }}
                >
                    <Entypo name="magnifying-glass" size={20} color={color.white} />
                </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', width: '100%' }}>
                <FlatList
                    data={datas}
                    renderItem={data => <RenderItem data={data.item} />}
                    showsVerticalScrollIndicator={false}
                    decelerationRate={0.8}
                    snapToAlignment="center"
                    bounces={false}
                    pagingEnabled
                    style={{
                        height: '74%',
                        width: '97%'
                    }}
                />
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: 8, borderTopWidth: 1, borderTopColor: color.primary, paddingTop: 5 }}>
                <Text style={[styles.footer, { width: '48%', }]}>Min: {min} Ar</Text>
                <Text style={[styles.footer, { width: '48%', }]}>Max: {max} Ar</Text>
                <Text style={[styles.footer, { width: '48%', }]}>Total: {total} Ar</Text>
            </View>
        </View>
    );
};

export default EmployerScreen;

const styles = StyleSheet.create({
    btn: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50,
        position: "absolute",
        top: "40%",
        backgroundColor: color.primary
    },
    footer: {
        backgroundColor: color.lightb,
        marginBottom: 4,
        padding: 12,
        borderWidth: 1,
        borderColor: color.primary,
        fontSize: 19,
        borderRadius: 10,
    }
});
