import { load, isLoggedIn } from '../../services/apiServices.js';


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

export const getThemeName = async () => {
  try {
    let value = await load();
    // let loggedin = await isLoggedIn();
    console.log(value);
    if (value !== null) {
      return value.theme;
    }
    return 'default';
  }catch (error) {
    console.error('Error getting theme:', error);
  }
}

export const getTheme = async () => {
  try {
    let value = await load();
    // let loggedin = await isLoggedIn();
    console.log(value);
    if (value !== null) {
      return themes[value.theme];
    }
    return themes.default;
  }catch (error) {
    console.error('Error getting theme:', error);
  }
}

export const thememap = [
  { label: 'Default', value: 'default'},
  { label: 'Light', value: 'light'}, 
  { label: 'Dark', value: 'dark'},
  { label: 'Blue-White', value: 'bluewhite'}, // for red-green blindness
  { label: 'High Contrast', value: 'contrast'}, // for people sensitive to low contrast
];
