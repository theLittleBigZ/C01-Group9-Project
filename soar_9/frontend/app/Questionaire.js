// Import necessary components and hooks
import React, { useState, useEffect } from 'react';
import { View, Text, Switch, ScrollView, Pressable, Modal} from 'react-native';
import { Divider } from 'react-native-paper';
import { load, loadCache, saveToCache } from '../services/apiServices';
import RNPickerSelect from 'react-native-picker-select';
import {sample} from '../sample-apps';
import { router } from 'expo-router';
import languageMap from './Translations/LanguageMap';
import i18n from './Translations/PrimaryLanguage';
import SetBrightness from './SetBrightness.js'
import {getTheme, themes, themeMap } from './Styling/Colours.js';
import { getFontSize, fontsizes } from './Styling/FontSize.js';
import { useDynamicStyles } from './Styling/Styles.js';
import {TTS} from './text-to-speech/TTS.js';
//import { questionnaireText } from './text-to-speech/PageInputs.js';
import { BrightnessMode } from 'expo-brightness';

const Questionnaire = () => {
  // State for each setting
  const [speechToText, setSpeechToTextEnabled] = useState(false);
  const [fontSize, setFontSize] = useState('Medium'); // Default to 'Medium'
  const [theme, setTheme] = useState('default');
  const [language, setLanguage] = useState('en');
  const [brightness, setBrightness] = useState(0.5); // Assuming brightness ranges from 0 to 1
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedApps, setSelectedApps] = useState([]);
  const [styles, setStyles] = useState(useDynamicStyles(getTheme(), getFontSize()));
  const [questionnaireText, setQuestionaireText] = useState('');

  useEffect(() => {
    const fetchAndSetStyles = async () => {
      const fetchedTheme = await getTheme();
      const fetchedFontSize = await getFontSize();
      const dynamicStyles = useDynamicStyles(fetchedTheme, fetchedFontSize);
      setStyles(dynamicStyles);
    };

    fetchAndSetStyles();
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
      router.replace("/");
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  // get apps from user preferences
  const getCacheAndUpdateSampleData = async () => {
    try {
      let cache = await loadCache();
      if (cache !== null) {
        setTheme(cache.theme);
        setSpeechToTextEnabled(cache.speechToText);
        setFontSize(cache.fontSize);
        setBrightness(cache.brightness);
      }
      let value = await load();
      if (value !== null) {
        const savedAppNames = value.selectedApps; // Array of app names
        setSelectedApps(savedAppNames); // Array of app names
        setSpeechToTextEnabled(value.speechToText);
        setLanguage(value.language);
      }
    } catch (error) {
      console.error('Error getting preferences:', error);
    }
  };

  // Load user preferences from AsyncStorage
  useEffect(() => {
    getCacheAndUpdateSampleData();
  }, []);

  const sizeMapping = {
    [i18n.t('small')]: 'Small',
    [i18n.t('medium')]: 'Medium',
    [i18n.t('large')]: 'Large',
  };

  useEffect(() => {
    const questionnaireText =
  `${i18n.t('settings')}\n
    ${i18n.t('enablespeechtotext')}\n
    ${i18n.t('fontsize')}\n
    ${i18n.t('small')}\n
    ${i18n.t('medium')}\n
    ${i18n.t('large')}\n
    ${i18n.t('language')}\n
    ${i18n.t('theme')}\n
    ${i18n.t('brightness')}\n
    ${i18n.t('select')}${i18n.t('frequentlyused')}${i18n.t('apps')}\n
    ${i18n.t('home')}`;

    setQuestionaireText(questionnaireText);
  }, [language]);



  return (
    <View style={styles.container}>
      <Text style={styles.Header}>{i18n.t('settings')}</Text>

      <TTS input={questionnaireText} styles={styles}/>
      <Divider/>
      <ScrollView>
        <View style={styles.question}>
          <Text style={styles.questionfont}>{i18n.t('texttospeech')}:</Text>
          <Switch
            trackColor={{ false: styles.negative, true: styles.positive }}
            thumbColor={speechToText ? styles.positive : styles.negative}
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
                onPress={() => {
                  setFontSize(sizeMapping[size]);
                  setStyles(useDynamicStyles(themes[theme], fontsizes[sizeMapping[size]]))
                }}
                style={[styles.button, fontSize === sizeMapping[size] && styles.selectedButton]}
              >
                <Text style={styles.text}>{size}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        <Divider/>
        <View style={styles.question}>
          <Text style={styles.questionfont}>{i18n.t('language') + ":"}</Text>
          <ScrollView style={{borderWidth:2,  borderColor: styles.icon.borderColor}}>
            <RNPickerSelect
              items = {languageMap}
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

        <View style={styles.question}>
          <Text style={styles.questionfont}>{i18n.t('theme') + ":"}</Text>
          <ScrollView style={{borderWidth:2, borderColor: styles.icon.borderColor}}>
            <RNPickerSelect
              items={themeMap}
              onValueChange={(value) => {
                setTheme(value);
                setStyles(useDynamicStyles(themes[value], fontsizes[fontSize]))
              }}
              style={styles.pickerstyle}
              value={theme}
              placeholder={{}}
            />
          </ScrollView>
        </View>

        <Divider/>
        <View style={styles.question}>
          <Text style={styles.questionfont}>{i18n.t('brightness')}: </Text>
            <SetBrightness styles={styles} brightness={brightness} setbrightness={setBrightness}/>
        </View>

        <Divider/>
        <View style={styles.question}>
          <Text style={styles.questionfont}>{i18n.t('select') +" "+ i18n.t('frequentlyused') +" "+ i18n.t('apps')}:</Text>

          <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.text}>{i18n.t('select') +" "+ i18n.t('apps')}</Text>
          </Pressable>

          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            style={styles.container}
            onRequestClose={() => setModalVisible(!modalVisible)}
          >
            <View style={styles.container}>
              <ScrollView>
                {sample.map((app, index) => (
                  <Pressable
                    key={index}
                    style={styles.container}
                    onPress={() => toggleAppSelection(app.appName)}
                  >
                    <Text style={[styles.text , { color: selectedApps.includes(app.appName) ? styles.negative : styles.positive }]}>
                    {selectedApps.includes(app.appName) ? app.appName + ' [remove]': app.appName + ' [add]' }
                    </Text>
                  </Pressable>
                ))}
              </ScrollView>
              <Pressable
                style={styles.button}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.text}>{i18n.t('close')}</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
      </ScrollView>

      <Divider/>
      <Pressable style={styles.button} onPress={() => {
        savePreferences();
      }}>
        <Text style={[styles.text]}>{i18n.t('home')}</Text>
      </Pressable>
    </View>
  );
};

export default Questionnaire;

