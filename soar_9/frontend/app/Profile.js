import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';

const Profile = () => {

    return (
        <View style={styles.container}>
            <Text>Profile</Text>
            <Text>Add User Info</Text>

            <Pressable onPress={() => router.replace("/Homescreen")}>
                <Text>Go back to main page</Text>
            </Pressable>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
    }
})