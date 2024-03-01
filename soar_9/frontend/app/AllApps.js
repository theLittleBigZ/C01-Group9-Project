import { Pressable, SafeAreaView, StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';
import React, { useState } from 'react';
import { sample } from '../sample-apps.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link, router } from 'expo-router';

const AllApps = () => {

    const [sampleData, setSampleData ] = useState(sample);
    const [appSearch, setAppSearch] = useState('');

    function saveApp(appName) {
        setSampleData(sampleData.map((app)=> {
            if (app.appName === appName) {
                app.saved = true;
            }
            return app;
        }))
    }

    return (

        <View style={styles.container}>
            <Text style={styles.Header}>All Apps</Text>

            <TextInput style={styles.input}
                placeholder="Search apps by name"
                value={appSearch}
                onChangeText={(e) => setAppSearch(e)}
            />

            <FlatList style={styles.appList}
                data={sampleData}
                renderItem={({item}) => <Text style={styles.item}>
                    <Icon style={styles.icon} name={item.icon}></Icon>
                    {item.appName}
                    <Button title='Favorite App'onPress={() => {saveApp(item.appName)}}/>
                </Text>}
            />
            <View style={styles.addAppsContainer}>
                <Pressable style={styles.press}
                    onPress={() => router.replace("/Homescreen")}>
                    <Text style={styles.pressWords}>Go back to main page</Text>
                </Pressable>
            </View>
        </View>








    )
}

export default AllApps

const styles = StyleSheet.create({
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
    container: {
        flex: 1,
        paddingTop: 22,
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginVertical: 5,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        margin: 50,
    },
    Header: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        color: '#1f0160',
    },
    input:  {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    icon: {
        padding: '2px',
        marginLeft: 20,
        color: '#1f0160',
        fontSize: 20,
        borderColor: '#1f0160',
        borderWidth: 2,
    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 44,
    },
    appList: {
        marginHorizontal: 20,
    },
    press:{
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 1,
        backgroundColor: "white",
        marginTop: 20,
    },
    pressWords: {
        color: '#1f0160',
        margin: 4,
        alignItems: 'center',
        fontSize: 30,
        fontWeight: 'bold',
    }
});