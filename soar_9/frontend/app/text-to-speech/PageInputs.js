import i18n from "../Translations/PrimaryLanguage";

const questionnaireText = () => {
  questionnaireText =
`${i18n.t('settings')}\n
  ${i18n.t('enablespeechtotext')}\n
  ${i18n.t('fontsize')}\n
  ${i18n.t('small')}\n
  ${i18n.t('medium')}\n
  ${i18n.t('large')}\n
  ${i18n.t('language')}\n
  ${i18n.t('theme')}\n
  ${i18n.t('brightness')}\n
  ${i18n.t('select')}${i18n.t('frequentlyused')}${i18n.t('apps')}\n
  ${i18n.t('home')}`;

  return questionnaireText;
}
