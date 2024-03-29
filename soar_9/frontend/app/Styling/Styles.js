import { StyleSheet } from "react-native";
import { useState, useEffect } from 'react';
import { getTheme } from './Colours';
import { getFontSize } from "./FontSize";

export const useDynamicStyles = (theme, fontsize) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      padding: 25,
      justifyContent: 'center',
      flex: 1,
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
      textAlign: 'center'
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
        borderColor: theme.buttontext,
        borderRadius: 1,
        backgroundColor: theme.buttoncolour,
        borderColor: theme.buttontext,
        borderWidth: 1,
        fontSize: 20,
        color: theme.buttontext,
        textAlign: 'center',
        paddingVertical: 10
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
    },
    card : {
      backgroundColor: theme.buttoncolour,
      borderColor: theme.buttontext,
      borderWidth: 2,
      borderRadius: 20,
      padding: 20,
      margin: 10,
    },
    cardText: {
      color: theme.buttontext,
      fontSize: 20,
    },
    reminder: {
      backgroundColor: theme.buttoncolour,
      borderColor: theme.buttontext,
      borderWidth: 2,
      borderRadius: 20,
      padding: 20,
      margin: 10,
    },
    reminderText: {
      color: theme.buttontext,
      fontSize: 20,
    },
    reminderTitle: {
      color: theme.buttontext,
      fontSize: 30,
      fontWeight: 'bold',
    },
    errorBox: {
      backgroundColor: theme.error,
      padding: 10,
      margin: 10,
      borderRadius: 20,
    },
  });
};
export const getStyles = () => {
  const [styles, setStyles] = useState(useDynamicStyles(getTheme(), getFontSize()));
  useEffect(() => {
    const fetchAndSetStyle = async () => {
      const fetchedTheme = await getTheme();
      const fetchedFontSize = await getFontSize();
      console.log("Fetched Theme:", fetchedTheme);
      console.log("Fetched Font Size:", fetchedFontSize);
      const dynamicStyles = useDynamicStyles(fetchedTheme, fetchedFontSize);
      setStyles(dynamicStyles);
    };
    fetchAndSetStyle();
  }, []);


  return styles;
};
