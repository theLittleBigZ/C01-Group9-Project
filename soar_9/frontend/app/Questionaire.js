import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { router } from 'expo-router';

const Questionaire = () => {
    return (
        <View>
            <Text> Here are where the questions go </Text>
            <Pressable style={styles.press}
                onPress={() => router.replace("/Homescreen")}>
                <Text style={styles.pressWords}>Go to main page</Text>
            </Pressable>
        </View>

    )
}

export default Questionaire

const styles = StyleSheet.create({
    press: {
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 1,
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