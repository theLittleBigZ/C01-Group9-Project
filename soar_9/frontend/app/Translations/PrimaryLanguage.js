// Translations.js
import {I18n} from 'i18n-js';
import translations from './Languages';
import { getLocales } from 'expo-localization';
import { load, isLoggedIn } from '../../services/apiServices.js';

// Define translations
const i18n = new I18n(translations)
i18n.fallbacks = true;

const intialize = async () => {
  try {
    let value = await load();
    let loggedin = await isLoggedIn();
    if (loggedin && value !== null) {
      i18n.locale = value.language; // use app preference/cache
    }else{
      i18n.locale = getLocales()[0].languageCode; //use device language
    }
  }catch (error) {
    i18n.locale = getLocales()[0].languageCode;
    console.error('Error getting language:', error);
  }
};

intialize();

export default i18n;
