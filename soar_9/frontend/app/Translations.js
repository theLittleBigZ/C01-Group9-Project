// Translations.js
import * as Localization from 'expo-localization';
import i18n from 'react-native-i18n';
import en from './Languages/en';
import fr from './Languages/fr';

const lang = Localization.getLocales[0];
i18n.translations = { en, fr };
i18n.locale = lang
i18n.fallbacks = true;

export default i18n;
