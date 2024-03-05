import { StyleSheet, Text, View, Pressable, TextInput, Button } from 'react-native';
import React, { useState } from 'react';
import { router } from 'expo-router';

const Questionaire = () => {

    const [nameInput, setNameInput] = useState('');
    return (
        <View>
            <Text> Here are where the questions go </Text>
            <View style={styles.questions}>
                <Text style={{
                    fontSize: 20,
                }}>What is you name?</Text>
                <TextInput style={styles.textInput}
                    placeholder='Write name here'
                    value={nameInput}
                    onChangeText={(e) => setNameInput(e)}>
                </TextInput>
                <Button onPress={() => setNameInput('')} title={'Set Name'}></Button>
                <Text style={{
                    fontSize: 20,
                    marginTop: 10,
                    marginBottom: 50,
                }}>What is your age?</Text>
                <Text>Add remaining questions</Text>
            </View>
            <Pressable style={styles.press}
                onPress={() => router.replace("/Homescreen")}>
                <Text style={styles.pressWords}>Go to main page</Text>
            </Pressable>
        </View>

    )
}

export default Questionaire

const styles = StyleSheet.create({
    questions: {
        alignItems: 'center',
    },
    textInput: {
        fontSize: 20,
        borderColor: 'grey',
        color: 'grey',
        borderRadius: 5,
        borderWidth: 1,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    press: {
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: "white",
    },
    pressWords: {
        color: '#1f0160',
        margin: 4,
        alignItems: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    }
})