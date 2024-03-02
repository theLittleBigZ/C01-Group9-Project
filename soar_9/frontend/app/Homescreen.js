import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, Pressable, FlatList} from 'react-native';
import { sample } from '../sample-apps.js';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Link, router } from 'expo-router';
const Homescreen = () => {

    const [sampleData, setSampleData ] = useState(sample);
    sampleData.sort((a, b) => a.appName.localeCompare(b.appName));

    function unsaveApp(appName) {
        setSampleData(sampleData.map((app)=> {
            if (app.appName === appName) {
                app.saved = false;
            }
            return app;
        }))
    }

    return (
        <View style={styles.savedAppsContainer}>
            <View style={styles.headerView}>
                <Text style={styles.Header}> Home Page </Text>
                <Text style={styles.Header}>Saved Apps</Text>
            </View>

            <FlatList
                data={sampleData.filter(({ saved }) => saved)}
                renderItem={({item}) => <Text style={styles.item}>
                    <View style={styles.itemView}>
                        <Icon style={styles.icon} name={item.icon}></Icon>
                        <span>{item.appName}</span>
                    </View>
                    <Button style={styles.unfavButton} title='UnFavorite App'onPress={() => {unsaveApp(item.appName)}}/>
                </Text>}
            />
            <View>

            {/**<Link href="/profile"> Go to Profile </Link> */}

            <Pressable style={styles.press} onPress={() => router.replace("/Profile")}>
                <Text style={styles.words}>Go to profile page</Text>
            </Pressable>

            <Pressable style={styles.press} onPress={() => router.replace("/AllApps")}>
                <Text style={styles.words}>See All Apps</Text>
            </Pressable>

            </View>
        </View>
    )
}

export default Homescreen

const styles = StyleSheet.create({
    savedAppsContainer: {
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 20,
      backgroundColor: '#1f0160',
      flex: 1,
      justifyContent: 'center',
    },
    headerView: {
        backgroundColor: '#effafa',
        borderRadius: 15,
        width: 300,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    appItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      marginVertical: 5,
      borderColor: 'gray',
      borderWidth: 10,
      borderRadius: 5,
    },
    itemView: {
        display: 'flex',
        flexDirection: 'row',
    },
    item: {
        fontSize: 30,
        color: 'white',
        padding: 10,
        height: 'auto',
        width: 400,
        display: 'flex',
        justifyContent: 'space-between',
        margin: 5,
        borderRadius: 5,
    },
    icon: {
        padding: '2px',
        marginLeft: 20,
        marginRight: 10,
        color: 'white',
        fontSize: 30,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 5,
    },
    unfavButton: {
        textAlign: 'center',
        height: 'auto',
    },
    press:{
        borderColor: 'blue',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "white",
        marginBottom: 10,
    },
    Header: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        color: '#060540',
        textAlign: 'center',
    },
    words: {
        color: '#1f0160',
        alignItems: 'center',
        fontSize: 40,
        fontWeight: 'bold',
    }
});