import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, TextInput, Text } from 'react-native';
import * as Speech from 'expo-speech';
import i18n from '../Translations/PrimaryLanguage';
import { getLanguage } from './LanguageTTS';
import { getStyles } from '../Styling/Styles';

export function TTS({input}) {

    const language = async () => {return await getLanguage()}

    const styles = getStyles();

    const speak = async () => {
        const getLang = await language();
        console.log(input);
        const options = {
            language: getLang,
        };
    
        try {
            Speech.speak(input, options);
        } catch (error) {
            console.error("Speech API error:", error);
        }
    };

    const stop = async () => {
        try {
            await Speech.stop();
        } catch (error) {
            console.error("Stop error:", error);
        }
    }


    return (
        <View style={styles.input}>
            <Pressable style={styles.icon} onPress={speak}>
                <Text style={styles.text}>▶</Text>
            </Pressable>
            <Pressable onPress={stop}>
                <Text style={styles.text}>⏹</Text>
            </Pressable>
        </View>
    );
}
export default TTS;