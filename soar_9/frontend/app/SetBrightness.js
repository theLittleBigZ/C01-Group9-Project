import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Brightness from 'expo-brightness';
import { Platform } from 'react-native';
import i18n from './Translations/PrimaryLanguage.js';


const SetBrightness = ({styles, setbrightness, brightness}) => {

    async function setBrightness(level) {
        const { status } = await Brightness.requestPermissionsAsync();
          console.log(status);
          if (status === "granted"){
            if (Platform.OS === "android") {
                Brightness.setSystemBrightnessAsync(level); 
                //expo docs said "warning: this method is experimental"
            }
            else{ //ios
                Brightness.setBrightnessAsync(level); //only sets the brightness until they lock the phone
            }
          }
        
    }
    const brightnessMap = {
        [i18n.t('low')]: 0.3,
        [i18n.t('medium')]: 0.7,
        [i18n.t('high')]: 1,
    };

    return (
        <View style={styles.text}>
            {[i18n.t('low'), i18n.t('medium'), i18n.t('high')].map((level) => (
            <Pressable
                key={level}
                onPress={() => {
                setbrightness(brightnessMap[level]);
                setBrightness(brightnessMap[level]);
                }}
                style={[styles.button, brightness === brightnessMap[level] && styles.selectedButton]}
            >
                <Text style={styles.text}>{level}</Text>
            </Pressable>
            ))}
        </View>
    );
};

export default SetBrightness;