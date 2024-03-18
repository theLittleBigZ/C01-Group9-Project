// Translations.js
import {I18n} from 'i18n-js';
import translations from './Languages';
import { getLocales } from 'expo-localization';

// Define translations
const i18n = new I18n(translations)
// i18n.translations = translations

// Set default locale and fallbacks
i18n.locale = getLocales()[0].languageCode;
i18n.fallbacks = true;

export default i18n;
