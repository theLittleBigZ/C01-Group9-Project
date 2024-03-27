import React from 'react';
import { View, Text, Pressable } from 'react-native';
import TTS from './text-to-speech/TTS';
import { Divider } from 'react-native-paper';
import { router } from 'expo-router';
import i18n from './Translations/PrimaryLanguage';
import { getStyles } from './Styling/Styles';

function TTSPage () {
    const styles = getStyles();

    return (
        <View style={styles.container}>
            <TTS />
            <Divider />
            <Pressable style={styles.button} onPress={() => router.replace("/")}>
                <Text style={styles.text}>{(i18n.t('home'))}</Text>
            </Pressable>
        </View>
    )
}

export default TTSPage;