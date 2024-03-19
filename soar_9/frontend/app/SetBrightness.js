import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import * as Brightness from 'expo-brightness';
import { Platform } from 'react-native';
import styles from './Styling/Styles.js';

const SetBrightness = () => {

    useEffect(() => {
        (async () => {
          const { status } = await Brightness.requestPermissionsAsync();
          console.log(status);
          if (status === "granted"){
            //const brightnessLevel = fetch brightness level from server
            setBrightness(brightnessLevel);
          }
        })}, []);
 
    function setBrightness(level) {
        //want to store the brightness level choice so that the brightness is set to that next time they open the app
        if (Platform.OS === "android") {
            Brightness.setSystemBrightnessAsync(level); 
            //expo docs said "warning: this method is experimental"
        }
        else{ //ios
            Brightness.setBrightnessAsync(level); //only sets the brightness until they lock the phone
            //possible workaround - store which button they had pressed and set the brightness again everytime they open the app
        }
    }

    return (
        <View>
            <Pressable style={styles.button} title="low" onPress={()=>setBrightness(0.3)}>
                <Text style={styles.words}>low</Text>
            </Pressable>
            <Pressable style={styles.button} title="medium" onPress={()=>setBrightness(0.7)}>
                <Text style={styles.words}>medium</Text>
            </Pressable>
            <Pressable  style={styles.button} title="high" onPress={()=>setBrightness(1)}>
                <Text style={styles.words}>high</Text>
            </Pressable>
        </View>
    )
}

export default SetBrightness;