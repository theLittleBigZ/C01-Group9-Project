import { getLocales } from 'expo-localization';
import { load } from '../../services/apiServices.js';
import {options} from '../Translations/LanguageMap.js';

let language = 'en-CA';

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
            language = 'fr';
            break;
        case 'hi':
            language = 'hi';
            break;
        case 'id':
            language = 'id';
            break;
        case 'zh':
            language = 'zh';
            break;
        case 'pt':
            language = 'pt';
            break;
        case 'ru':
            language = 'ru';
            break;
        case 'es':
            language = 'es';
            break;
        case 'th':
            language = 'th';
            break;
        case 'th':
            language = 'th';
            break;
        case 'ur':
            language = 'ur';
            break;
        case 'vi':
            language = 'vi';
            break;
        default:
            language = 'en-CA';

    }

    return language;

}

export default getLanguage;