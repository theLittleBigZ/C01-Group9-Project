import React, {useEffect, useState} from 'react';
import { View, Text, Pressable, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { Divider } from 'react-native-paper'; 
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
            <Divider color='black'/>

            <FlatList style={styles.appList}
                data={sampleData.filter(({ saved }) => saved)}
                renderItem={({item}) =>
                <TouchableOpacity style={styles.button} onPress={() => {alert("launch app")}}>
                    <Icon style={styles.icon} name={item.icon}></Icon>
                    <Text style={styles.item}>{item.appName}</Text>
                </TouchableOpacity>}
            />
            <View style={{backgroundColor: '#BCB4D2', width: '100%'}}>
                <Divider/>
                <Text style={[styles.words, {color: 'black'}]}>Navigation</Text>
                <Pressable style={styles.button} onPress={() => router.replace("/Questionaire")}>
                    <Text style={styles.words}>Go To Settings ⚙</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => router.replace("/Questionaire")}>
                    <Text style={styles.words}>Contacts</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => router.replace("/Questionaire")}>
                    <Text style={styles.words}>Profile</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default Homescreen;

const styles = StyleSheet.create({
    savedAppsContainer: {
      backgroundColor: '#8c80ab',
      padding: 10,
      flex: 1,
    },
    button: {
        margin: 10,
        flexDirection:'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#28264C',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 20, 
        width: '90%',
    },
    Header: {
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        color: 'black',
        width: '100%',
        textAlign: 'center'
    },
    item: {
        flex: 1,
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
    words: {
        color: 'white',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    }
    });
