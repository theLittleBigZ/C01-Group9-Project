import { load } from '../../services/apiServices.js';
import {Appearance} from 'react-native';

export const themes = {
  default: {
    background: '#8c80ab',
    buttoncolour: '#28264C',
    secondary: '#bcb4d2',
    buttontext: 'white',
    headertext: 'black',
    positive: 'black', 
    negative: 'white',
  },
  light: {
    background: 'white',
    buttoncolour: '#34c0eb',
    secondary: 'gray',
    buttontext: 'black',
    headertext: 'black',
    positive: 'black',
    negative: 'red', 
  },
  dark: {
    background: 'black',
    buttoncolour: 'black',
    secondary: '#292829',
    buttontext: '#0081a8',
    headertext: '#0081a8',
    positive: '#0081a8',
    negative: '#802b0d', 
  },
  bluewhite: {
    background: '#153d7d',
    buttoncolour: '#c1c9d6',
    secondary: '#153d7d',
    buttontext: 'black',
    headertext: 'white',
    positive: '#c1c9d6',
    negative: '#c7cc93', 
  },
  contrast: {
    background: '#faf68e',
    buttoncolour: 'blue',
    secondary: 'orange',
    buttontext: 'white',
    headertext: 'black',
    positive: 'blue',
    negative: 'black', 
  },
};

export const getTheme = async () => {
  try {
    let value = await load();
    if (value !== null) {
      return themes[value.theme];
    }
    else{
      const colorScheme = Appearance.getColorScheme();
      if(themeMap.find(colorScheme) == undefined){
        return themes.default;
      }
      return themes[colorScheme];
    }
  }catch (error) {
    console.error('Error getting theme:', error);
    return themes.default;
  }
}

export const themeMap = [
  { label: 'Default', value: 'default'},
  { label: 'Light', value: 'light'}, 
  { label: 'Dark', value: 'dark'},
  { label: 'Blue-White', value: 'bluewhite'}, // for red-green blindness
  { label: 'High Contrast', value: 'contrast'}, // for people sensitive to low contrast
];
