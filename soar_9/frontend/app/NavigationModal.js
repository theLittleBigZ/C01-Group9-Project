import { View, Text, Pressable, Modal} from 'react-native';
import { router } from 'expo-router';
import i18n from './Translations/PrimaryLanguage.js';
import { getStyles } from './Styling/Styles.js';
import { logout } from '../services/apiServices.js';
import TTS from './text-to-speech/TTS.js';
import { useEffect, useState } from 'react';

  export const NavigationModal = ({isUserLoggedIn, setIsUserLoggedIn, isTTS, modalVisible, setModalVisible}) => {
    const styles = getStyles();
    const [TTStext, setTTStext] = useState('');

    useEffect(() => {
        const getTTStext = () => {
            let text =  `${i18n.t('settings')}\n
            ${i18n.t('contacts')}\n
            ${i18n.t('dialer')}\n
            ${i18n.t('texttospeech')}\n`
            
            if(isUserLoggedIn){
                text +=  `${i18n.t('signout')}\n`
            } else{
                text += `${i18n.t('signin')}\n`;
            }
            text += `${i18n.t('close')}\n`;
            return text
        }
        setTTStext(getTTStext());
    }, [isUserLoggedIn]);

    const handleLogout = async () => {
      await logout(); // Call the logout function
      setIsUserLoggedIn(false); // Update login status
      // Optionally, navigate to a different screen or show a message
  };

    return (
      <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      style={styles.container}
      >
          <View style={styles.container}>
            <TTS input={TTStext} styles={styles}/>
          <Pressable style={styles.button} onPress={() => router.replace("/Questionaire")}>
              <Text style={styles.text}>{i18n.t('settings')}</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => router.replace("/ContactScreen")}>
              <Text style={styles.text}>{i18n.t('contacts')}</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={() => router.replace("/Dialer")}>
              <Text style={styles.text}>{i18n.t('dialer')}</Text>
          </Pressable>
          {isTTS ? (
              <Pressable style={styles.button} onPress={() => router.replace("/TTSPage")}>
                  <Text style={styles.text}>{i18n.t('texttospeech')}</Text>
              </Pressable>
          ): undefined}
          {isUserLoggedIn ? (
          <Pressable style={styles.button} onPress={handleLogout}>
              <Text style={styles.text}>{i18n.t('signout')}</Text>
          </Pressable>) :
          (<Pressable style={styles.button} onPress={() => router.replace("/LoginPage")}>
              <Text style={styles.text}>{i18n.t('signin')}</Text>
          </Pressable>)}
          <Pressable style={styles.button} onPress={() => {setModalVisible(false)}}>
              <Text style={styles.text}>{i18n.t('close')}</Text>
          </Pressable>
          </View>
      </Modal>
    );
  }
