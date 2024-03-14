// Import necessary components and hooks
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, TextInput, ScrollView, Pressable, Modal} from 'react-native';
import { Divider } from 'react-native-paper'; 
import {colours} from "./Colours";
import styles from "./Styles";
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
    <View style={styles.container}>
      <Text style={styles.Header}> Settings </Text>
      <Divider/>

      <ScrollView>
        <View style={styles.question}>
          <Text style={styles.questionfont}>Enable Speech to Text:</Text>
          <Switch
            trackColor={{ false: "gray", true: "green" }}
            thumbColor={speechToTextEnabled ? "green" : "gray"}
            onValueChange={setSpeechToTextEnabled}
            value={speechToTextEnabled}
          />
        </View>
        <Divider/>

        <View style={styles.question}>
          <Text style={styles.questionfont}>Font Size:</Text>
          <View style={styles.words}>
            {['Small', 'Medium', 'Large'].map((size) => (
              <Pressable
                key={size}
                onPress={() => setFontSize(size)}
                style={[styles.button, fontSize === size && styles1.selectedButton]}
              >
                <Text style={[styles.words, {fontSize: 20}]}>{size}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <Divider/>

        <View style={styles.question}>
          <Text style={styles.questionfont}>Primary Language:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPrimaryLanguage}
            value={primaryLanguage}
            placeholder="Enter Primary Language"
          />
        </View>
        <Divider/>

        <View style={styles.question}>
          <Text style={styles.questionfont}>Brightness: {brightness}%</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={100}
            step={1}
            value={brightness}
            onValueChange={setBrightness}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor={colours.primary}
            thumbTintColor={colours.primary}
            orientation="vertical" // Only supported on Android
          />
        </View>

        <View style={styles.question}>
          <Text style={styles.questionfont}>Select Your Favourite Apps:</Text>

          <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={[styles.words, {fontSize: 20}]}>Choose Apps</Text>
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
                    style={styles1.appOption}
                    onPress={() => toggleAppSelection(app.appName)}
                  >
                    <Text style={{ color: selectedApps.includes(app.appName) ? '#FF6347' : '#000' }}>
                    {selectedApps.includes(app.appName) ? app.appName + ' [remove]': app.appName + ' [add]' }
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
              <Pressable
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={[styles.words, {fontSize:20}]}>Close</Text>
              </Pressable>
            </View>
          </Modal>

          {/* {selectedApps.map((app, index) => (
            <Text key={index} style={styles1.selectedApp}>{app}</Text>
          ))} */}

        </View>
      </ScrollView>

      <Divider/>
      <Pressable style={styles.button} onPress={savePreferences}>
        <Text style={[styles.words, {fontSize:20}]}>Go To Home Page</Text>
      </Pressable>
    </View>
  );
};

export default Questionnaire;

const styles1 = StyleSheet.create({
  appOption: {
    marginBottom: 15,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'black',
  },
  
});
