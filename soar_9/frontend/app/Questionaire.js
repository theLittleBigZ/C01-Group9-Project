// Import necessary components and hooks
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, ScrollView, Pressable, Modal} from 'react-native';
import { Divider } from 'react-native-paper'; 
import {colours} from './Styling/Colours.js';
import styles from './Styling/Styles.js';
import { load, saveToCache } from '../services/apiServices';
import RNPickerSelect from 'react-native-picker-select';
import Slider from '@react-native-community/slider';
import {sample} from '../sample-apps';
import { router } from 'expo-router';
import options from './Translations/LanguageMap';
import i18n from './Translations/PrimaryLanguage';
import SetBrightness from './SetBrightness.js'


const Questionnaire = () => {
  // State for each setting
  const [speechToText, setSpeechToTextEnabled] = useState(false);
  const [fontSize, setFontSize] = useState('Medium'); // Default to 'Medium'
  const [language, setLanguage] = useState(i18n.locale);
  const [brightness, setBrightness] = useState(0.5); // Assuming brightness ranges from 0 to 1
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
      speechToText,
      fontSize,
      language,
      brightness,
      selectedApps,
    };

    try {
      console.log('Saving preferences:', userPreferences);
      saveToCache(userPreferences);
      // Navigate to home screen or show a confirmation message
      router.replace("/")
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  // get apps from user preferences
  const getCacheAndUpdateSampleData = async () => {
    try {
      let value = await load();
      if (value !== null) {
          const savedAppNames = value.selectedApps; // Array of app names
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

  return (
    <View style={styles.container}>
      <Text style={styles.Header}>{i18n.t('settings')}</Text>
      <Divider/>

      <ScrollView>
        <View style={styles.question}>
          <Text style={styles.questionfont}>{i18n.t('enablespeechtotext')}:</Text>
          <Switch
            trackColor={{ false: "gray", true: "green" }}
            thumbColor={speechToText ? "green" : "gray"}
            onValueChange={setSpeechToTextEnabled}
            value={speechToText}
          />
        </View>
        <Divider/>

        <View style={styles.question}>
          <Text style={styles.questionfont}>{i18n.t('fontsize')}:</Text>
          <View style={styles.words}>
            {[i18n.t('small'), i18n.t('medium'), i18n.t('large')].map((size) => (
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
          <Text style={styles.questionfont}>{i18n.t('language') + ":"}</Text>
          <ScrollView>
            <RNPickerSelect
              placeholder={{ label: options.find(option => option.value === i18n.locale).label,  value: i18n.locale}}
              items = {options}
              onValueChange={(value) => {
                setLanguage(value);
                i18n.locale = value;
              }}
              value={language}
            />
          </ScrollView>
        </View>
        <Divider/>

        <View style={styles.question}>
          <Text style={styles.questionfont}>{i18n.t('brightness')}: {brightness}%</Text>
          <SetBrightness/>
        </View>

        <View style={styles.question}>
          <Text style={styles.questionfont}>{i18n.t('select') +" "+ i18n.t('frequentlyused') +" "+ i18n.t('apps')}:</Text>

          <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={[styles.words, {fontSize: 20}]}>{i18n.t('select') +" "+ i18n.t('apps')}</Text>
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
                <Text style={[styles.words, {fontSize:20}]}>{i18n.t('close')}</Text>
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
        <Text style={[styles.words, {fontSize:20}]}>{i18n.t('home')}</Text>
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
