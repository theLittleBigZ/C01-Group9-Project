import React, {useEffect, useState} from 'react';
import { View, Text, Pressable, FlatList, TouchableOpacity} from 'react-native';
import { Divider } from 'react-native-paper'; 
import styles from './Styling/Styles.js';
import {colours} from "./Styling/Colours.js";
import { sample } from '../sample-apps.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { load, isLoggedIn, logout } from '../services/apiServices.js';
import i18n from './Translations/PrimaryLanguage.js';


const Homescreen = () => {
    const [sampleData, setSampleData] = useState(sample);

    const [savedApps, setSavedApps] = useState([]); 

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // State to track login status

    const getCacheAndUpdateSampleData = async () => {
        try {
            let value = await load();
            if (value !== null) {
                const savedAppNames = value.selectedApps; // Array of app names
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

    const handleLogout = async () => {
        await logout(); // Call the logout function
        setIsUserLoggedIn(false); // Update login status
        // Optionally, navigate to a different screen or show a message
    };

    useEffect(() => {
        const checkLoginStatus = async () => {
            const loggedIn = await isLoggedIn(); // Check if user is logged in
            setIsUserLoggedIn(loggedIn); // Update state based on login status
        };

        checkLoginStatus();
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
                <Text style={[styles.words, {color: colours.headertext}]}>{i18n.t('navigateto')}:</Text>
                <Pressable style={styles.button} onPress={() => router.replace("/Questionaire")}>
                    <Text style={styles.words}>{i18n.t('settings')}</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => router.replace("/Questionaire")}>
                    <Text style={styles.words}>{i18n.t('contacts')}</Text>
                </Pressable>
                {/* <Pressable style={styles.button} onPress={() => router.replace("/Profile")}>
                    <Text style={styles.words}>Profile</Text>
                </Pressable> */}
                {/* Conditional rendering based on login status */}
                {isUserLoggedIn ? (
                    <Pressable style={styles.button} onPress={handleLogout}>
                        <Text style={styles.words}>{i18n.t('signout')}</Text> 
                    </Pressable>
                ) : (
                    <Pressable style={styles.button} onPress={() => router.replace("/LoginPage")}>
                        <Text style={styles.words}>{i18n.t('signin')}</Text>
                    </Pressable>
                )}
            </View>
        </View>
    )
}

export default Homescreen;
