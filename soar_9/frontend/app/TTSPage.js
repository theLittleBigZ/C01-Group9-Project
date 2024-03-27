import React from 'react';
import { View, Text, Pressable } from 'react-native';
import TTS from './text-to-speech/TTS';
import { Divider } from 'react-native-paper';
import { router } from 'expo-router';
import i18n from './Translations/PrimaryLanguage';

function TTSPage () {
    return (
        <View>
            <TTS />
            <Divider />
            <Pressable onPress={() => router.replace("/")}>
                <Text>{(i18n.t('home'))}</Text>
            </Pressable>
        </View>
    )
}

export default TTSPage;