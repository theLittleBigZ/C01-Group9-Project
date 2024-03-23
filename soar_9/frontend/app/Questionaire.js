// Import necessary components and hooks
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Switch, ScrollView, Pressable, Modal} from 'react-native';
import { Divider } from 'react-native-paper'; 
import {thememap} from './Styling/Colours.js';
import { load, saveToCache } from '../services/apiServices';
import RNPickerSelect from 'react-native-picker-select';
import {sample} from '../sample-apps';
import { router } from 'expo-router';
import options from './Translations/LanguageMap';
import i18n from './Translations/PrimaryLanguage';
import SetBrightness from './SetBrightness.js'
import {getTheme, getThemeName, themes } from './Styling/Colours.js';
import { useDynamicStyles, useThemeStyles } from './Styling/Styles.js';

const Questionnaire = () => {
  // State for each setting
  const [speechToText, setSpeechToTextEnabled] = useState(false);
  const [fontSize, setFontSize] = useState('Medium'); // Default to 'Medium'
  const [theme, setTheme] = useState(getThemeName());
  const [language, setLanguage] = useState(i18n.locale);
  const [brightness, setBrightness] = useState(0.5); // Assuming brightness ranges from 0 to 1
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedApps, setSelectedApps] = useState([]);
  const [styles, setStyles] = useState(useDynamicStyles(getTheme()));

  
  useEffect(() => {
    const fetchAndSetThemeStyles = async () => {
      const fetchedTheme = await getTheme();
      const dynamicStyles = useDynamicStyles(fetchedTheme);
      setStyles(dynamicStyles);
    };

    fetchAndSetThemeStyles();
  }, []);

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
      theme, 
      language,
      brightness,
      selectedApps,
    };

    try {
      console.log('Saving preferences:', userPreferences);
      saveToCache(userPreferences);
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
        setTheme(value.theme);
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
            trackColor={{ false: styles.toggleoff, true: styles.toggle }}
            thumbColor={speechToText ? styles.toggle : styles.toggleoff}
            onValueChange={setSpeechToTextEnabled}
            value={speechToText}
          />
        </View>
        <Divider/>

        <View style={styles.question}>
          <Text style={styles.questionfont}>{i18n.t('fontsize')}:</Text>
          <View style={styles.text}>
            {[i18n.t('small'), i18n.t('medium'), i18n.t('large')].map((size) => (
              <Pressable
                key={size}
                onPress={() => setFontSize(size)}
                style={[styles.button, fontSize === size && styles1.selectedButton]}
              >
                <Text style={[styles.text, {fontSize: 20}]}>{size}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <Divider/>

        <View style={styles.question}>
          <Text style={styles.questionfont}>{i18n.t('language') + ":"}</Text>
          <ScrollView style={{borderWidth:2,  borderColor: styles.icon.borderColor}}>
            <RNPickerSelect
              items = {options}
              onValueChange={(value) => {
                setLanguage(value);
                i18n.locale = value;
              }}
              value={language}
              placeholder={{}}
              style={styles.pickerstyle}/>
          </ScrollView>
        </View>
        <Divider/>

        <Divider/>

        <View style={styles.question}>
          <Text style={styles.questionfont}>{i18n.t('theme') + ":"}</Text>
          <ScrollView style={{borderWidth:2, borderColor: styles.icon.borderColor}}>
            <RNPickerSelect
              items={thememap}
              onValueChange={(value) => {
                setTheme(value);
                setStyles(useDynamicStyles(themes[value]))
              }}
              style={styles.pickerstyle}
              value={theme}
              placeholder={{}}
            />
          </ScrollView>
        </View>

        <Divider/>
        <View style={styles.question}>
          <Text style={styles.questionfont}>{i18n.t('brightness')}: {brightness}%</Text>
          <SetBrightness styles={styles}/>
        </View>

        <Divider/>
        <View style={styles.question}>
          <Text style={styles.questionfont}>{i18n.t('select') +" "+ i18n.t('frequentlyused') +" "+ i18n.t('apps')}:</Text>

          <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={[styles.text, {fontSize: 20}]}>{i18n.t('select') +" "+ i18n.t('apps')}</Text>
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
                <Text style={[styles.text, {fontSize:20}]}>{i18n.t('close')}</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      </ScrollView>

      <Divider/>
      <Pressable style={styles.button} onPress={() => {
        savePreferences();
        router.replace("/")
      }}>
        <Text style={[styles.text, {fontSize:20}]}>{i18n.t('home')}</Text>
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
  
});
