import { Pressable, StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';
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
                placeholder="🔍︎ Search apps by name"
                value={appSearch}
                onChangeText={(e) => setAppSearch(e)}

            />
            <Button onPress={() => setAppSearch('')} title={'Clear Search'}></Button>

            <FlatList style={styles.appList}
                data={sampleData.filter(({appName}) => appName.toLowerCase().startsWith(appSearch.toLowerCase()))}
                renderItem={({item}) => <Text style={styles.item}>
                    <View style={styles.itemView}>
                        <Icon style={styles.icon} name={item.icon}></Icon>
                        <Text>{item.appName}</Text>
                    </View>
                    <Button style={styles.saveButton} title='Favorite App'onPress={() => {saveApp(item.appName)}}/>
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
    },
    Header: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'arial',
        color: '#1f0160',
    },
    input:  {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 5,
        fontSize: 30,
        color: 'grey',
        fontFamily: 'arial',
        textAlign: 'center',
    },
    icon: {
        padding: '2px',
        marginLeft: 20,
        marginRight: 10,
        color: '#1f0160',
        fontSize: 20,
        borderColor: '#1f0160',
        borderWidth: 2,
        borderRadius: 5,
    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 'auto',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#effafa',
        margin: 5,
        borderRadius: 5,
    },
    itemView: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 5,
    },
    appList: {
        marginHorizontal: 20,
        width: 'auto',
    },
    saveButton: {
        backgroundColor: '#1f0160',
        color: '#060540',
        alignItems: 'flex-end',
        display: 'none',
        right: 1,
        position: 'absolute',
    },
    press:{
        borderColor: '#1f0160',
        borderWidth: 2,
        borderRadius: 2,
        width: 450,
        backgroundColor: "white",
        marginTop: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    pressWords: {
        color: '#1f0160',
        margin: 4,
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'arial',
        textAlign: 'center',
    }
});