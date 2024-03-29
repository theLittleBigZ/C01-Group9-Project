import React, { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import { View, TextInput, Pressable, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import { Divider } from 'react-native-paper'; 
import i18n from './Translations/PrimaryLanguage';
import { router } from 'expo-router';
import { getStyles } from './Styling/Styles';


const Dialer = () => {
    [number, setNumber] = useState("")
    const numbers = [[1,2,3], [4,5,6], [7,8,9], [0]]

    const styles = getStyles();

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
        <Text style={styles.Header}>{i18n.t('dialer')}</Text>
          <Divider/>
            <View style={styles.container}>
                <Text style={[styles.contactName, {textAlign: 'center'}]}>{number}</Text>
                {numbers.map((numberRow) =>
                    <View key={numberRow[0]} style={{ flexDirection: 'row', justifyContent: "space-evenly"}}>
                        {numberRow.map((number) =>(
                            <TouchableOpacity
                                style={styles.keypadNumber}
                                key={number}
                                onPress={() => handleKeypadPress(number.toString())}>
                                <Text style={styles.text}>{number}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
                <Pressable style={styles.button} onPress={() => callNumber()}>
                    <Text style={styles.text}>{i18n.t('call')}</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => setNumber("")}>
                    <Text style={styles.text}>{i18n.t('clearNumber')}</Text>
                </Pressable>
            </View>
            
            <Divider/>
                <Text style={[styles.Header]}>{i18n.t('navigateto')}:</Text>
                <Pressable style={styles.button} onPress={() => router.replace("/Homescreen")}>
                        <Text style={styles.text}>{i18n.t('home')}</Text>
                        </Pressable>
            </View>
        
    );
};

export default Dialer;
