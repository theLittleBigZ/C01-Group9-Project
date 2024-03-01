import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect } from 'react';
import { getOrCreateUUID } from './services/uuidManager';
import Viewer from './viewer/viewer';

export default function App() {
  
  useEffect(() => {
    getOrCreateUUID(); // early in the app's lifecycle
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      < Viewer />
      < Text > Open up App.js to start working on your app! </Text>
      <StatusBar style="auto" />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
