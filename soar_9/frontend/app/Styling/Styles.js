import { StyleSheet } from "react-native";
import { useState, useEffect } from 'react';
import { getTheme } from './Colours';
import { getFontSize } from "./FontSize";

export const useDynamicStyles = (theme, fontsize) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      padding: 20,
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
      fontFamily: 'monospace',
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
    modalView: {
      margin: 20,
      backgroundColor: theme.backgroundColor,
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    question: {
      margin: 10,
      flexDirection:'column',
      padding: 10,
    },
  keypadNumber: {
    color: theme.buttontext,
    padding: 10,
    flex: 1,
    borderRadius: 50,
    margin: 10,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.button,
    borderColor: 'black',
    borderWidth: 2,
    width: '10%',
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
      fontFamily: 'monospace',
    },
    selectedButton: {
      backgroundColor: theme.secondary,
    },
    bottomNav: {
      backgroundColor: theme.secondary,
      width: '100%',
      justifyContent: 'flex-end',
    },
    headerfont: {
      color: theme.headertext,
      textAlign: 'center',
      fontSize: fontsize.header,
      fontWeight: 'bold',
      fontFamily: 'monospace',
    },
    positive: theme.positive,
    negative: theme.negative,
    pickerstyle: {
      inputIOS: {
        borderColor: theme.buttontext,
        borderRadius: 5,
        backgroundColor: theme.buttoncolour,
        borderColor: theme.buttontext,
        borderWidth: 5,
        fontsize: fontsize.input
      },
      inputAndroid: {
        backgroundColor: theme.buttoncolour,
        borderColor: theme.buttontext,
        color: theme.buttontext,
        borderRadius: 5,
        borderColor: theme.buttontext,
        borderWidth: 5,
        fontsize: fontsize.input
      },
    },
  });
};
export const getStyles = () => {
  const [styles, setStyles] = useState(useDynamicStyles(getTheme(), getFontSize()));
  useEffect(() => {
    const fetchAndSetStyle = async () => {
      const fetchedTheme = await getTheme();
      const fetchedFontSize = await getFontSize();
      const dynamicStyles = useDynamicStyles(fetchedTheme, fetchedFontSize);
      setStyles(dynamicStyles);
    };
    fetchAndSetStyle();
  }, []);


  return styles;
};
