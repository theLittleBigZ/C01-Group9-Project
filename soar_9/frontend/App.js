import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SavedApps from './components/SavedApps';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  console.log("saved apps being called"); //kill me
  return (
    <PaperProvider>
      <View style={styles.container}>
        <SavedApps />
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
