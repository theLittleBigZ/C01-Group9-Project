// Sending data to backend
import axios from "axios";
const BACKEND_URL = 'http://localhost:3000';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const register = async (username, email, password) => {
    console.log('Registering user:', username, email, password);
    try{
        await axios.post(`${BACKEND_URL}/register`, {username, email, password});
    }
    catch(e){
        console.error('Error registering user:', e);
    }
}

export const login = async (email, password) => {
    console.log('Logging in user:', email, password);
    try{
        let response = await axios.post(`${BACKEND_URL}/login`, {email, password});

        // check status code
        if (response.status !== 200){
            console.error('Error logging in user:', response);
            return;
        }
        // save token to local storage
        await AsyncStorage.setItem('@token', response.data.token);
        return response.data;
    }
    catch(e){
        console.error('Error logging in user:', e);
    }
}

export const logout = async () => {
    console.log('Logging out user');
    try{
        await AsyncStorage.removeItem('@token');
        axios.post(`${BACKEND_URL}/logout`, {}, {withCredentials: true});

    }
    catch(e){
        console.error('Error logging out user:', e);
    }
}

export const isLoggedIn = async () => {
    // Assuming you're storing the user's login status or token in AsyncStorage
    const userToken = await AsyncStorage.getItem('@UserToken');
    return !!userToken; // returns true if token exists, false otherwise
};



export const saveToBackend = async (settings) => {
    console.log('Attempting to send to backend', settings);
    if (await isLoggedIn()) {
        try {
            await axios.put(`${BACKEND_URL}/preferences`, settings, { withCredentials: true });
            console.log('Data successfully sent to backend');
        } catch (e) {
            console.error('Error sending to backend:', e);
        }
    } else {
        console.log('User not logged in, skipping backend update');
    }
};

export const loadFromBackend = async () => {
    console.log('Attempting to load from backend');
    if (await isLoggedIn()) {
        try {
            let response = await axios.get(`${BACKEND_URL}/preferences`, { withCredentials: true });
            console.log('Data loaded from backend');
            return JSON.stringify(response.data);
        } catch (e) {
            console.error('Error loading from backend:', e);
        }
    } else {
        console.log('User not logged in, skipping backend load');
        return null;
    }
};

export const saveToCache = async (settings) => {
    console.log('Saving to cache', settings);
    try {
        // add updated time to settings
        settings.updatedAt = new Date().toISOString();
        await AsyncStorage.setItem('@UserPreferences', JSON.stringify(settings));
        console.log('Preferences saved to cache');
        // Attempt to save to backend
        await saveToBackend(settings);
    } catch (e) {
        console.error('Error saving to cache:', e);
    }
};

export const load = async () => {
    console.log('Loading from cache or backend');
    try {
        let valueCache = await AsyncStorage.getItem('@UserPreferences');
        let valueBackend = await loadFromBackend();

        if (!valueCache) {
            console.log('No cached preferences found, trying backend');
            return valueBackend ? JSON.parse(valueBackend) : null;
        }

        const cache = JSON.parse(valueCache);
        if (!valueBackend) {
            console.log('Returning cached preferences');
            return cache;
        }

        const backend = JSON.parse(valueBackend);
        // If both are available, return the latest
        if (new Date(cache.updatedAt) > new Date(backend.updatedAt)) {
            console.log('Returning newer cached preferences');
            return cache;
        } else {
            console.log('Returning newer backend preferences');
            return backend;
        }
    } catch (e) {
        console.error('Error loading data:', e);
        return null;
    }
};


