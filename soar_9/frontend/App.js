import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { getOrCreateUUID } from './services/uuidManager';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  
  useEffect(() => {
    console.log('App started');
    getOrCreateUUID(); // early in the app's lifecycle
  }, []);

  return (

    <PaperProvider>
      <View style={styles.container}>
        {/* <index/> */}
        <StatusBar style="auto" />
      </View>
    </PaperProvider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    padding: '20px',
  },
});

//app/index.js  -> / resembles the main page
//app/home.js -> /home resembles the homes page
//app/proflie.js -> profile resembles the profile
