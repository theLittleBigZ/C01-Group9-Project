import { load } from '../../services/apiServices.js';
import {Appearance} from 'react-native';

export const themes = {
  default: {
    background: '#8c80ab',
    buttoncolour: '#28264C',
    secondary: '#bcb4d2',
    buttontext: 'white',
    headertext: 'black',
    toggleoff: 'gray',
    toggleon: 'pink',
  },
  light: {
    background: 'white',
    buttoncolour: '#34c0eb',
    secondary: 'gray',
    buttontext: 'black',
    headertext: 'black',
    toggleoff: 'gray',
    toggleon: 'green',
  },
  dark: {
    background: 'black',
    buttoncolour: 'black',
    secondary: '#292829',
    buttontext: '#0081a8',
    headertext: '#0081a8',
    toggleoff: 'gray',
    toggleon: '#0081a8',
  },
  bluewhite: {
    background: '#153d7d',
    buttoncolour: '#c1c9d6',
    secondary: '#153d7d',
    buttontext: 'black',
    headertext: 'white',
    toggleoff: 'gray',
    toggleon: 'blue',
  },
  contrast: {
    background: '#faf68e',
    buttoncolour: 'blue',
    secondary: 'orange',
    buttontext: 'white',
    headertext: 'black',
    toggleoff: 'gray',
    toggleon: 'blue',
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
