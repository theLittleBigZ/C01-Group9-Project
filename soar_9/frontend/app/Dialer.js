import React, { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import { View, TextInput, Pressable, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import styles from './Styling/Styles.js';
import { Divider } from 'react-native-paper'; 
import i18n from './Translations/PrimaryLanguage';
import { router } from 'expo-router';
import {colours} from "./Styling/Colours.js";

const Dialer = () => {
    [number, setNumber] = useState("")
    const numbers = [[1,2,3], [4,5,6], [7,8,9], [0]]

    function callNumber() {
        console.log("calling" + number)
        Linking.openURL("tel:" + number);
    }

    function handleKeypadPress(inputNumber) {
        const newNumber = number + inputNumber
        setNumber(newNumber);
    }

    return(
        <View style={styles.container}>
            <Text style={styles.words}>{number}</Text>
            {numbers.map((numberRow) =>
                <View key={numberRow[0]} style={{ flexDirection: 'row', justifyContent: "space-evenly"}}>
                    {numberRow.map((number) =>(
                        <TouchableOpacity
                            style={styles.keypadNumber}
                            key={number}
                            onPress={() => handleKeypadPress(number.toString())}>
                            <Text style={styles.words}>{number}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
            <Pressable style={styles.button} onPress={() => callNumber()}>
                <Text style={styles.words}>Call</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setNumber("")}>
                <Text style={styles.words}>Clear Number</Text>
            </Pressable>
            <View style={{backgroundColor: colours.secondary, width: '100%'}}>
                <Divider/>
                <Text style={[styles.words, {color: colours.headertext}]}>{i18n.t('navigateto')}:</Text>
                <Pressable style={styles.button} onPress={() => router.replace("/Homescreen")}>
                    <Text style={[styles.words, {fontSize:20}]}>{i18n.t('home')}</Text>
                </Pressable>
            </View>
        </View>
        
    );
};

export default Dialer;