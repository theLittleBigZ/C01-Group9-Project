import { getLocales } from 'expo-localization';
import { load } from '../../services/apiServices.js';
import {options} from '../Translations/LanguageMap.js';

let language = 'en';

const initialize = async() => {
    try {
      let value = await load();
      if (value !== null) {
          language = value.language;
      }
    }catch (error) {
      console.error('Error getting language:', error);
    }
}

export const getLanguage = async () => {
    await initialize();
    switch(language) {
        case 'en':
            language = 'en-CA';
            break;
        case 'ar':
            language = 'ar-SA';
            break;
        case 'bn':
            language = 'bn-BD';
            break;
        case 'fa':
            language = 'en-CA';
            break;
        case 'fr':
            language = 'fr-FR';
            break;
        case 'hi':
            language = 'hi-IN';
            break;
        case 'id':
            language = 'id-ID';
            break;
        case 'zh':
            language = 'zh-CN';
            break;
        case 'pt':
            language = 'pt-PT';
            break;
        case 'ru':
            language = 'ru-RU';
            break;
        case 'es':
            language = 'es-ES';
            break;
        case 'th':
            language = 'th-TH';
            break;
        case 'th':
            language = 'en-CA';
            break;
        case 'ur':
            language = 'en_CA';
            break;
        case 'vi':
            language = 'en-CA';
            break;
        default:
            language = 'en-CA';

    }

    console.log(language)

    return language;

}

export default getLanguage;