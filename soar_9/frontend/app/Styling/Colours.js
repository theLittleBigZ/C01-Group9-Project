import { loadCache } from '../../services/apiServices.js';
import {Appearance} from 'react-native';

export const themes = {
  default: {
    background: '#8c80ab',
    buttoncolour: '#28264C',
    secondary: '#bcb4d2',
    buttontext: 'white',
    headertext: 'black',
    positive: 'white', 
    negative: 'black',
  },
  light: {
    background: 'white',
    buttoncolour: '#34c0eb',
    secondary: 'gray',
    buttontext: 'black',
    headertext: 'black',
    positive: '#34c0eb',
    negative: 'black', 
  },
  dark: {
    background: 'black',
    buttoncolour: 'black',
    secondary: '#292829',
    buttontext: '#0081a8',
    headertext: '#0081a8',
    positive: '#0081a8',
    negative: '#c1c9d6', 
  },
  bluewhite: {
    background: '#153d7d',
    buttoncolour: '#c1c9d6',
    secondary: '#c7cc93',
    buttontext: 'black',
    headertext: 'white',
    positive: '#c7cc93',
    negative: '#c1c9d6', 
  },
  contrast: {
    background: '#faf68e',
    buttoncolour: 'blue',
    secondary: 'black',
    buttontext: 'white',
    headertext: 'black',
    positive: 'blue',
    negative: 'black', 
  },
};

export const getTheme = async () => {
  try {
    let value = await loadCache();
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
    // console.error('Error getting theme:', error);
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
