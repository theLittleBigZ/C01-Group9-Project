import React, {useEffect, useState} from 'react';
import { View, Text, Pressable, FlatList, TouchableOpacity} from 'react-native';
import { Divider } from 'react-native-paper'; 
import styles from "./Styles";
import {colours} from "./Colours";
import { sample } from '../sample-apps.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'react-native-i18n';


const Homescreen = () => {
    const [sampleData, setSampleData] = useState(sample);

    const [savedApps, setSavedApps] = useState([]); 



    const getCacheAndUpdateSampleData = async () => {
        try {
            let value = await AsyncStorage.getItem('@UserPreferences');
            if (value !== null) {
                value = JSON.parse(value);
                const savedAppNames = value.favoritedApps.selectedApps; // Array of app names
                setSavedApps(savedAppNames);

                const updatedSampleData = sample.map((app) => ({
                    ...app,
                    saved: savedAppNames.includes(app.appName),
                }));
                setSampleData(updatedSampleData);
            }
        } catch (error) {
            console.error('Error getting preferences:', error);
        }
    };

    useEffect(() => {
        getCacheAndUpdateSampleData();
    }, []);

    
    return (
        <View style={styles.container}>
            <Text style={styles.Header}>{i18n.t('home')}</Text>
            <Divider/>

            <FlatList style={styles.appList}
                data={sampleData.filter(({ saved }) => saved)}
                renderItem={({item}) =>
                <TouchableOpacity style={styles.button} onPress={() => {alert("launch app")}}>
                    <Icon style={styles.icon} name={item.icon}></Icon>
                    <Text style={styles.item}>{item.appName}</Text>
                </TouchableOpacity>}
            />
            <View style={{backgroundColor: colours.secondary, width: '100%'}}>
                <Divider/>
                <Text style={[styles.words, {color: colours.headertext}]}>Navigation To:</Text>
                <Pressable style={styles.button} onPress={() => router.replace("/Questionaire")}>
                    <Text style={styles.words}>Settings</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => router.replace("/Questionaire")}>
                    <Text style={styles.words}>Contacts</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => router.replace("/Profile")}>
                    <Text style={styles.words}>Profile</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => router.replace("/LoginPage")}>
                    <Text style={styles.words}>Sign In</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Homescreen;

