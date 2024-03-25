import React, {useEffect, useState} from 'react';
import { View, Text, Pressable, FlatList, TouchableOpacity, Modal, Button} from 'react-native';
import { Divider, useTheme } from 'react-native-paper'; 
import { sample } from '../sample-apps.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { router } from 'expo-router';
import { load, isLoggedIn, logout } from '../services/apiServices.js';
import i18n from './Translations/PrimaryLanguage.js';
import { getStyles } from './Styling/Styles.js';


const Homescreen = () => {
    const [sampleData, setSampleData] = useState(sample);

    const [savedApps, setSavedApps] = useState([]); 

    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // State to track login status

    const styles = getStyles();

    const [modalVisible, setModalVisible] = useState(false);

    const handleModalButtonPress = () => {
        setModalVisible(true);
    };

    const getCacheAndUpdateSampleData = async () => {
        try {
            let value = await load();
            console.log(value);
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
            <View>
                <Divider/>
                <Pressable styles={styles.button} onPress={handleModalButtonPress}>
                    <Text style={styles.text}>{i18n.t('navigateto') + "    ▲"}</Text>
                </Pressable>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                    style={styles.container}
                >
                    <View style={styles.container}>
                    <Pressable style={styles.button} onPress={() => router.replace("/Questionaire")}>
                        <Text style={styles.text}>{i18n.t('settings')}</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => router.replace("/ContactScreen")}>
                        <Text style={styles.text}>{i18n.t('contacts')}</Text>
                    </Pressable>
                    {isUserLoggedIn ? (
                    <Pressable style={styles.button} onPress={handleLogout}>
                        <Text style={styles.text}>{i18n.t('signout')}</Text> 
                    </Pressable>) : 
                    (<Pressable style={styles.button} onPress={() => router.replace("/LoginPage")}>
                        <Text style={styles.text}>{i18n.t('signin')}</Text>
                    </Pressable>)}
                    <Pressable style={styles.button} onPress={() => setModalVisible(false)}>
                        <Text style={styles.text}>{i18n.t('close')}</Text>
                    </Pressable>
                    </View>
                </Modal>
             </View>
        </View>
    )
}

export default Homescreen;
