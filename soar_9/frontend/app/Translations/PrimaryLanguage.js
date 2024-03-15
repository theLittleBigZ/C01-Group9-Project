// Translations.js
import * as Localization from 'expo-localization';
import I18n from 'react-native-i18n';
import translations from './Languages.json'
// Define translations
I18n.translations = translations;

// Set default locale and fallbacks
I18n.locale = ''
I18n.fallbacks = true;

export default I18n;
