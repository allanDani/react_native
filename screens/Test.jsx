import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

// import { openDatabase } from "react-native-sqlite-storage";

// const db = openDatabase(
//     {
//         name: 'Employer',
//         location: 'default',
//     },
//     () => { },
//     error => { console.log(error) },
// );

const Test = () => {
    // const createTable = () => {
    //     db.transaction(txn => {
    //         txn.executeSql(
    //             'CREATE TABLE IF NOT EXISTES employer (num PRIMARY KEY, nom VARCHAR(120), salaire INTEGER(11))',
    //         );
    //     });
    // }
    // useEffect(() => {
    //     createTable()
    // }, [])

    return (
        <View>
            <StatusBar />
            <Text>Test</Text>
        </View>
    )
}

export default Test

const styles = StyleSheet.create({})