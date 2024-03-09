import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:3000';


// Save user settings
export const saveUserSettings = async (settings) => {
    console.log('Saving user settings:', settings);
  try {
    const jsonValue = JSON.stringify(settings);
    await AsyncStorage.setItem('@UserSettings', jsonValue);

    // sending to backend
    // axios.post(`${BACKEND_URL}/buttons`, settings);
  } catch (e) {
    // saving error
    console.error('Error saving user settings:', e);
  }
};

// Load user settings
export const loadUserSettings = async () => {
    console.log('Loading user settings', settings);
  try {
    const jsonValue = await AsyncStorage.getItem('@UserSettings');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // loading error
    console.error('Error loading user settings:', e);
  }
};

// Clear user settings
export const clearUserSettings = async () => {
  try {
    await AsyncStorage.removeItem('@UserSettings');
  } catch(e) {
    // remove error
    console.error('Error clearing user settings:', e);
  }
};

// Fetch the button states from the backend
export const fetchButtonStatesFromBackend = async () => {
  const response = await axios.get(`${BACKEND_URL}/buttons`);
  return response.data;
};


