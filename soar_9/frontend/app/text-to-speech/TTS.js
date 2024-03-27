import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Pressable, TextInput, Text } from 'react-native';
import * as Speech from 'expo-speech';
import i18n from '../Translations/PrimaryLanguage';
import { getLanguage } from './LanguageTTS';


function TTS() {

    const [toSpeak, setToSpeak] = useState('');

    const language = async () => {return await getLanguage()}


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
                <TextInput style={styles.inputBox} multiline={true} value={toSpeak} onChangeText={(e) => setToSpeak(e)} />
                <Pressable onPress={() => setToSpeak('')}>
                    <Text>{i18n.t('clearinput')}</Text>
                </Pressable>
            </View>


        <Pressable onPress={speak}>
            <Text>{i18n.t('presstohear')}</Text>
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
