import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

function TTS() {

    let [toSpeak, setToSpeak] = useState('');


    const speak = () => {
        const options = {
        };
        Speech.speak(toSpeak, options);
    };

    return (
        <View style={styles.container}>
            <View>
                <TextInput style={styles.inputBox} multiline={true} value={toSpeak} onChangeText={(e) => setToSpeak(e)} />
                <Button title='Clear input' onPress={() => setToSpeak('')}/>
            </View>

        <Button title="Press to hear the text input" onPress={speak} />
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