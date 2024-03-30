// Translations.js
import {I18n} from 'i18n-js';
import translations from './Languages';
import { getLocales } from 'expo-localization';
import { load } from '../../services/apiServices.js';
import {options} from './LanguageMap.js'

// Define translations
const i18n = new I18n(translations)
i18n.fallbacks = true;

const intialize = async () => {
  try {
    let value = await load();
    if (value !== null) {
      i18n.locale = value.language; // use app preference/cache
    }else{
      i18n.locale = getLocales()[0].languageCode; //use device language
      console.log(i18n.locale)
      if(options.find(deviceLanguage) == undefined){ //default to english
        i18n.locale = 'en';
      }
    }
  }catch (error) {
    i18n.locale = 'en';
    console.error('Error getting language:', error);
  }
};

intialize();

export default i18n;
