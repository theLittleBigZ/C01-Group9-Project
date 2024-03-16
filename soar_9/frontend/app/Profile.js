import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';
import TTS from '../components/TTS';

const Profile = () => {

    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <Text>User information related to the app settings from the questionaire are stored here, can be edited</Text>
            <TTS />

            <Pressable style={styles.press}
                onPress={() => router.replace("/Homescreen")}>
                <Text style={styles.pressWords}>Go to main page</Text>
            </Pressable>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        alignItems: 'center',
    },
    press:{
        borderColor: '#1f0160',
        borderWidth: 2,
        borderRadius: 2,
        width: 450,
        backgroundColor: "white",
        marginTop: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    pressWords: {
        color: '#1f0160',
        margin: 4,
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'arial',
        textAlign: 'center',
    }
})