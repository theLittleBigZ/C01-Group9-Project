import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { sample } from '../sample-apps.js';
import AddApp from './AddApp';

function SavedApps() {

    const [sampleData, setSampleData ] = useState(sample);


    function saveApp(appName) {
        setSampleData(sampleData.map((app)=> {
            if (app.appName === appName) {
                app.saved = true;
            }
            return app;
        }))
    }

    function unsaveApp(appName) {
        setSampleData(sampleData.map((app)=> {
            if (app.appName === appName) {
                app.saved = false;
            }
            return app;
        }))
    }

    return (
        <View style={styles.todoListContainer}>
            <Text style={styles.Header}>Saved Apps</Text>

            <AddApp saveApp={saveApp} sampleApps={sampleData.filter(({saved})=>!saved)}/>

            <View>
                {sampleData.filter(({ saved }) => saved).map((app) => (
                    <View key = {app.appName} style={styles.appItem}>
                        <Text>{app.appName}</Text>
                        <Button title = 'Launch App' />
                        <Button onPress={() =>unsaveApp(app.appName)} title='Unsave App' />
                    </View>
                ))}
            </View>
        </View>
    );
}
export default SavedApps;

const styles = StyleSheet.create({
    todoListContainer: {
      margin: 10,
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
    Header: {
        fontSize: 35,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    }
});