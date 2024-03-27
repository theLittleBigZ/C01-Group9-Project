import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, TextInput, Text } from 'react-native';
import * as Speech from 'expo-speech';
import i18n from '../Translations/PrimaryLanguage';
import { getLanguage } from './LanguageTTS';
import { getStyles } from '../Styling/Styles';

function TTS() {

    const [toSpeak, setToSpeak] = useState('');

    const language = async () => {return await getLanguage()}

    const styles = getStyles();

    const speak = async () => {
        const getLang = await language();
        console.log(toSpeak);
        const options = {
            language: getLang,
        };
        Speech.speak(toSpeak, options);
    };


    return (
        <View style={styles.container}>
            <View>
                <TextInput 
                style={styles.input} 
                multiline={true} 
                placeholderTextColor={styles.input.color}
                cursorColor={styles.input.borderColor}
                value={toSpeak} 
                onChangeText={(e) => setToSpeak(e)} />
                <Pressable style={styles.button} onPress={() => setToSpeak('')}>
                    <Text style={styles.text}>{i18n.t('clearinput')}</Text>
                </Pressable>
            </View>


        <Pressable style={styles.button} onPress={speak}>
            <Text style={styles.text}>{i18n.t('presstohear')}</Text>
        </Pressable>
        </View>
    );
}
export default TTS;


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    inputBox: {
        padding: 5,
        margin: 5,
        height: 200,
        width: 500,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    }
})
