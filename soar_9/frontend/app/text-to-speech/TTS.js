import { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import * as Speech from 'expo-speech';
import { getLanguage } from './LanguageTTS';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export function TTS({input, styles}) {

    const language = async () => {return await getLanguage()}


    const speak = async () => {
        const getLang = await language();
        console.log("Your Language is: " + getLang);
        console.log("your input :" + input);
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
        <View style={[styles.question, {flexDirection: 'row', width: '100%', justifyContent:'flex-end'}]}>
            <Pressable style={styles.ttsbutton} onPress={speak}>
                <Icon name='play' style={styles.text}/>
            </Pressable>
            <Pressable style={styles.ttsbutton} onPress={stop}>
                <Icon name='stop' style={styles.text} />
            </Pressable>
        </View>
    );
}
export default TTS;
