import React, {useEffect, useState} from 'react';
import { View, Text, Pressable, StyleSheet, FlatList} from 'react-native';
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

    function unsaveApp(appName) {
        setSampleData(sampleData.map((app) => {
            if (app.appName === appName) {
                return { ...app, saved: false };
            }
            return app;
        }));
    }
    
    return (
        <View style={styles.savedAppsContainer}>
            <Text style={styles.Header}> Home Page </Text>
            <Text style={styles.Header}>Saved Apps</Text>

            <FlatList style={styles.appList}
                data={sampleData.filter(({ saved }) => saved)}
                renderItem={({item}) => <Text style={styles.item}>
                    <Icon style={styles.icon} name={item.icon}></Icon>
                    {item.appName}
                    <Pressable title='UnFavorite App'onPress={() => {unsaveApp(item.appName)}}/>
                </Text>}
            />
            <View>

            {/**<Link href="/profile"> Go to Profile </Link> */}

            <Pressable style={styles.press} onPress={() => router.replace("/Profile")}>
                <Text style={styles.words}>Go to profile page</Text>
            </Pressable>

            {/* <Pressable style={styles.press} onPress={() => router.replace("/AllApps")}>
                <Text style={styles.words}>See All Apps</Text>
            </Pressable> */}

            <Pressable style={styles.press} onPress={() => router.replace("/Questionaire")}>
                <Text style={styles.words}>Go to Questionaire</Text>
            </Pressable>

            </View>
        </View>
    )
}

export default Homescreen;

const styles = StyleSheet.create({
    savedAppsContainer: {
      margin: 20,
      backgroundColor: '#1f0160',
      flex: 1,
      alignItems: 'center',
    },
    appItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      marginVertical: 5,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
    },
    item: {
        fontSize: 40,
        color: 'white',
    },
    icon: {
        padding: '2px',
        marginLeft: 20,
        color: 'white',
        fontSize: 40,
        borderColor: 'white',
        borderWidth: 2,
    },
    press:{
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 1,
        backgroundColor: "white",
    },
    Header: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        color: 'white',
    },
    words: {
        color: '#1f0160',
        alignItems: 'center',
        fontSize: 40,
        fontWeight: 'bold',
    }
    });
