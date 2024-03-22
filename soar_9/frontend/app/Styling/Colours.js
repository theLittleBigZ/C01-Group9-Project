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
    buttoncolour: '#eb4034',
    secondary: 'teal',
    buttontext: 'black',
    headertext: 'black',
    toggleoff: 'gray',
    toggleon: 'green',
  },
  dark: {
    background: 'black',
    buttoncolour: 'white',
    secondary: 'gray',
    buttontext: 'black',
    headertext: 'white',
    toggleoff: 'gray',
    toggleon: 'green',
  },
  bluewhite: {
    background: '#8c80ab',
    buttoncolour: '#28264C',
    secondary: '#bcb4d2',
    buttontext: 'white',
    headertext: 'black',
    toggleoff: 'gray',
    toggleon: 'green',
  },
  contrast: {
    background: '#8c80ab',
    buttoncolour: '#28264C',
    secondary: '#bcb4d2',
    buttontext: 'white',
    headertext: 'black',
    toggleoff: 'gray',
    toggleon: 'green',
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
  { label: 'High Contrast', value: 'contrast'},
];
