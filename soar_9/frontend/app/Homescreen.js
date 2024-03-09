import React, {useEffect, useState} from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { sample } from '../sample-apps.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
        <View style={styles.savedAppsContainer}>
            <Text style={styles.Header}> Home Page </Text>

            <FlatList style={styles.appList}
                data={sampleData.filter(({ saved }) => saved)}
                renderItem={({item}) =>
                <TouchableOpacity style={styles.inLine} onPress={() => {alert("launch app")}}>
                    <Icon style={styles.icon} name={item.icon}></Icon>
                    <Text style={styles.item}>{item.appName}</Text>
                </TouchableOpacity>}
            />
            <Pressable style={styles.press} onPress={() => router.replace("/Questionaire")}>
                <Text style={styles.words}>Go To Settings</Text>
            </Pressable>
        </View>
    )
}

export default Homescreen;

const styles = StyleSheet.create({
    savedAppsContainer: {
      backgroundColor: '#1f0160',
      flex: 1,
    },
    inLine: {
        margin: 10,
        flexDirection:'row',
        padding: 10,
        alignItems: 'center',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 20, 
        width: '90%',
    },
    Header: {
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        color: '#1f0160',
        width: '100%',
        marginBottom: 30,
        borderWidth: 3,
        backgroundColor: 'white',
        textAlign: 'center'
    },
    item: {
        flex: 1,
        padding: 10,
        margin: 10, 
        fontSize: 30,
        color: 'white',
    },
    icon: {
        padding: 5,
        fontSize: 50,
        color: 'white',
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 10,
    },
    press:{
        width: '100%',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: "white",
    },
    words: {
        color: '#1f0160',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    }
    });
