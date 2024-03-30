import { fontsizes } from "./FontSize";
import {themes} from "./Colours";

const theme = themes.default;
const fontsize = fontsizes.Medium;

export const getStyles = () => {
  return {
    container: {
      backgroundColor: theme.background,
      padding: 20,
      alignItems: 'center',
      flexDirection: 'column',
    },
    button: {
      margin: 10,
      flexDirection:'row',
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.buttoncolour,
      borderColor: theme.buttontext,
      borderWidth: 1,
      borderRadius: 20, 
      width: '90%',
    },
    Header: {
      fontSize: fontsize.header,
      fontWeight: 'bold',
      color: theme.headertext,
      width: '100%',
      textAlign: 'center',
    },
    icon: {
      padding: 5,
      fontSize: fontsize.icon,
      color: theme.buttontext,
      borderColor: theme.buttontext,
      borderWidth: 2,
      borderRadius: 10,
    },
    input: {
      borderColor: theme.buttontext,
      backgroundColor: theme.buttoncolour,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      color: theme.buttontext,
      fontSize: fontsize.input,
    },
    item: {
      flex: 1,
      margin: 10, 
      fontSize: fontsize.text,
      color: theme.buttontext,
    },
    keypadNumber: {
      padding: 10,
      flex: 1,
      borderRadius: 50,
      margin: 10,
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.buttoncolour,
      borderColor: theme.buttontext,
      borderWidth: 2,
      width: '10%',
    },
    question: {
      margin: 10,
      flexDirection:'column',
      padding: 10,
    },
    questionfont: {
      color: theme.headertext,
      fontSize: fontsize.question,
      marginBottom: 10,
      fontWeight: '400',
    },
    text: {
      color: theme.buttontext,
      textAlign: 'center',
      fontSize: fontsize.text,
      fontWeight: 'bold',
    },
    selectedButton: {
      backgroundColor: theme.secondary,
    },
    positive: theme.positive,
    negative: theme.negative,
    pickerstyle: {
      inputIOS: {
        backgroundColor: theme.buttoncolour,
        color: theme.buttontext,
        borderColor: theme.buttontext,
        borderWidth: 5,
        fontsize: fontsize.input
      },
      inputAndroid: {
        backgroundColor: theme.buttoncolour,
        color: theme.buttontext,
        borderColor: theme.buttontext,
        borderWidth: 5,
        fontsize: fontsize.input,
      },
    },
    ttsbutton:{
      margin: 10, 
      padding: 15,
      borderRadius: 50,
      fontSize: fontsize.icon,
      backgroundColor: theme.buttoncolour,
      borderColor: theme.buttontext,
      borderWidth: 1,
    }
  };
};
