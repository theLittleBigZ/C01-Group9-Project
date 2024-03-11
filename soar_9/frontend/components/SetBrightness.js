import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import * as Brightness from 'expo-brightness';

const SetBrightness = () => {
    useEffect(() => {
        (async () => {
          const { status } = await Brightness.requestPermissionsAsync();
          //display brightness control if status is granted, don't display if not
        })})
 
    function setBrightness(level) {
        Brightness.setSystemBrightnessAsync(level);
    }

    return (
        <View>
            <Pressable title="low" onPress={()=>setBrightness(0.3)}>
                <Text>low</Text>
            </Pressable>
            <Pressable title="medium" onPress={()=>setBrightness(0.7)}>
                <Text>medium</Text>
            </Pressable>
            <Pressable title="high" onPress={()=>setBrightness(1)}>
                <Text>high</Text>
            </Pressable>

        </View>
    )
}

export default SetBrightness;