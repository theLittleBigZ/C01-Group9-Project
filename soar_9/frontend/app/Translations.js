import i18n from 'react-native-i18n';
import { getLocales } from 'expo-localization';
import en from './Languages/en';
import fr from './Languages/fr';

i18n.translations = {en, fr};
// i18n.locale = getLocales()[0].languageCode;
i18n.locale = 'fr';
i18n.fallbacks = true;