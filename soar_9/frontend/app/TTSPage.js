import React, { useState } from 'react';
import { View, Text, Pressable, TextInput, ScrollView } from 'react-native';
import {TTS} from './text-to-speech/TTS';
import { Divider } from 'react-native-paper';
import { router } from 'expo-router';
import i18n from './Translations/PrimaryLanguage';
import { getStyles } from './Styling/Styles';

function TTSPage () {
    const styles = getStyles();
    const [toSpeak, setToSpeak] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.Header}>{i18n.t('texttospeech')}</Text>
            <ScrollView>
            <TextInput 
                style={[styles.input, {height: '50%', width: '100%'}]} 
                multiline={true} 
                placeholderTextColor={styles.input.color}
                cursorColor={styles.input.borderColor}
                value={toSpeak} 
                onChangeText={(e) => setToSpeak(e)} />   
            <TTS input={toSpeak} styles={styles}/>

            <Divider />
            
            <Pressable style={styles.button} onPress={() => setToSpeak('')}>
                    <Text style={styles.text}>{i18n.t('clearinput')}</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => router.replace("/")}>
                <Text style={styles.text}>{(i18n.t('home'))}</Text>
            </Pressable>
            </ScrollView>
        </View>
    )
}

export default TTSPage;