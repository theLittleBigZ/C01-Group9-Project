// Import necessary components and hooks
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, TextInput, Button, ScrollView, Pressable, Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import {sample} from '../sample-apps';
import { router } from 'expo-router';

const Questionnaire = () => {
  // State for each setting
  const [speechToTextEnabled, setSpeechToTextEnabled] = useState(false);
  const [fontSize, setFontSize] = useState('Medium'); // Default to 'Medium'
  const [primaryLanguage, setPrimaryLanguage] = useState('');
  const [brightness, setBrightness] = useState(50); // Assuming brightness ranges from 0 to 100
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedApps, setSelectedApps] = useState([]);

  const toggleAppSelection = (appName) => {
    if (selectedApps.includes(appName)) {
      // If the app is already selected, remove it from the selection
      setSelectedApps(selectedApps.filter(name => name !== appName));
    } else {
      // If the app is not selected, add it to the selection
      setSelectedApps([...selectedApps, appName]);
    }
  };
  
  // Function to save all settings to AsyncStorage
  const savePreferences = async () => {
    const userPreferences = {
      accessibilitySettings: {
        speechToTextEnabled,
        fontSize,
        brightness,
      },
      languagePreferences: {
        primaryLanguage,
      },
      favoritedApps:{
        selectedApps,
      }
    };

    try {
      await AsyncStorage.setItem('@UserPreferences', JSON.stringify(userPreferences));
      console.log('Preferences saved');
      console.log(userPreferences);
      // Navigate to home screen or show a confirmation message
      router.replace("/")
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  // get apps from user preferences
  const getCacheAndUpdateSampleData = async () => {
    try {
      let value = await AsyncStorage.getItem('@UserPreferences');
      if (value !== null) {
          value = JSON.parse(value);
          const savedAppNames = value.favoritedApps.selectedApps; // Array of app names
          setSelectedApps(savedAppNames);
      }
  } catch (error) {
      console.error('Error getting preferences:', error);
  }
  };

  // Load user preferences from AsyncStorage
  useEffect(() => {
    getCacheAndUpdateSampleData();
  }, []);

  useEffect(() => {
    const saveSelectedAppsToCache = async () => {
      try {
        const value = JSON.stringify({ favoritedApps: { selectedApps } });
        await AsyncStorage.setItem('@UserPreferences', value);
      } catch (error) {
        console.error('Error saving preferences:', error);
      }
    };
  
    saveSelectedAppsToCache();
  }, [selectedApps]);

  return (
    <ScrollView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
      <Text>Accessibility Settings:</Text>
      <Text>Enable Speech to Text:</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={speechToTextEnabled ? "#f5dd4b" : "#f4f3f4"}
        onValueChange={setSpeechToTextEnabled}
        value={speechToTextEnabled}
      />

    <Text>Font Size:</Text>
    <View style={styles.fontSizeOptions}>
    {['Small', 'Medium', 'Large'].map((size) => (
        <Pressable
        key={size}
        onPress={() => setFontSize(size)}
        style={[styles.fontSizeButton, fontSize === size && styles.selectedButton]}
        >
        <Text style={styles.buttonText}>{size}</Text>
        </Pressable>
    ))}
    
    </View>


      <Text>Primary Language:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPrimaryLanguage}
        value={primaryLanguage}
        placeholder="Enter Primary Language"
      />

      <Text>Brightness:</Text>
      <Slider
        style={styles.slider}
        minimumValue={5}
        maximumValue={100}
        step={1}
        value={brightness}
        onValueChange={setBrightness}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        thumbTintColor="#007AFF"
        orientation="vertical" // Only supported on Android
      />
      <Text>{`Brightness: ${brightness}%`}</Text>

      <View style={styles.container}>
      <Text style={styles.title}>Select Your Favorite Apps:</Text>
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Choose Apps</Text>
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >

      <View style={styles.modalView}>
        <ScrollView>
          {sample.map((app, index) => (
            <Pressable
              key={index}
              style={styles.appOption}
              onPress={() => toggleAppSelection(app.appName)}
            >
              <Text style={{ color: selectedApps.includes(app.appName) ? '#FF6347' : '#000' }}>
                {app.appName}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <Pressable
          style={styles.buttonClose}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text style={styles.textStyle}>Close</Text>
        </Pressable>
      </View>

    </Modal>

    
    {selectedApps.map((app, index) => (
      <Text key={index} style={styles.selectedApp}>{app}</Text>
    ))}
  </View>
  
  </ScrollView>

    <View style={styles.footer}>
        <Button title="Save Preferences" onPress={savePreferences} />
      </View>
    </ScrollView>
  );
};

export default Questionnaire;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    minHeight:'80vh',
  },
  content: {
    // Styles for your content container
    flexGrow: 1, // Allows the container to grow to fill the space
    justifyContent: 'center', // Centers content vertically in the container
    paddingHorizontal: 10, // Adds some horizontal padding
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  fontSizeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  fontSizeButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#007bff',
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  selectedButton: {
    backgroundColor: 'black',
  },
  buttonText: {
    color: '#007bff',
  },
  slider: {
    height: 50,
    width: '100%',
  },

  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  appOption: {
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  selectedApp: {
    marginTop: 10,
  },
  footer: {
    // Styles for the footer area containing the button
    paddingBottom: 20, // Adds some padding at the bottom
    paddingHorizontal: 10, // Adds some horizontal padding
  },
});
