import React from 'react';
import { View, Text, Pressable } from 'react-native';
import TTS from './text-to-speech/TTS';
import { Divider } from 'react-native-paper';
import { router } from 'expo-router';

function TTSPage () {
    return (
        <View>
            <TTS />
            <Divider />
            <Pressable onPress={() => router.replace("/")}>
                <Text>Return to Home Page</Text>
            </Pressable>
        </View>
    )
}

export default TTSPage;