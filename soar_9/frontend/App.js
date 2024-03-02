import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import index from './app/index';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <index/>
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
    width: '100%'
  },
});

//app/index.js  -> / resembles the main page
//app/home.js -> /home resembles the homes page
//app/proflie.js -> profile resembles the profile
