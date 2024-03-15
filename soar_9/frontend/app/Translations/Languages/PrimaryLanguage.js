// Translations.js
import * as Localization from 'expo-localization';
import i18n from 'react-native-i18n';
import {en, ar, bn, fa, fr, hi, id, zh, pt, ru, es, th, bo, ur, vi} from './Languages/Languages.js';

// const lang = Localization.getLocales[0];
// {en, ar, bn, fa, fr, hi, id, zh, pt, ru, es, th, bo, ur, vi}
i18n.translations = {en, fr, ar, bn, fa, hi, id, zh, pt, ru, es, th, bo, ur, vi};
i18n.locale = 'en';
i18n.fallbacks = true;

export default i18n;
