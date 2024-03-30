// Sending data to backend
import axios from "axios";
import publicIP from 'react-native-public-ip';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

const BACKEND_URL = 'http://192.168.1.137:3000'; // change to your backend URL



export const register = async (username, email, password) => {
    console.log('Registering user:', username, email, password);
    try{
        const response = await axios.post(`${BACKEND_URL}/register`, {username, email, password});
        console.log('responses:', response);
        if (response.status !== 201){
            console.error('Error registering user:', response);
        }
        else{
            console.log('User registered successfully:', response);
            return response;
        }
    }
    catch(e){
        console.error('Error registering user:', e);
        return e;
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
        response.data.success = true;
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
    const userToken = await AsyncStorage.getItem('@token');
    console.log('User token:', userToken);
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
            // console.error('Error loading from backend:', e);
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

export const loadCache = async () => {
    console.log('Loading from cache');
    try {
        let value = await AsyncStorage.getItem('@UserPreferences');
        console.log('Preferences loaded from cache:', value);
        return value ? JSON.parse(value) : null;
    }
    catch (e) {
        console.error('Error loading from cache:', e);
        return null;
    }
};

export const notify = async (title, message, token) => {
    console.log('Sending notification to token:', token);
    try {
        await axios.post(`${BACKEND_URL}/sendNotification`, { title, body: message, token });
        console.log('Notification sent');
    } catch (e) {
        console.error('Error sending notification:', e);
    }
}

export const loadReminders = async () => {
    console.log('Loading reminders');
    // load from local storage and backend
    try {
        let value = await AsyncStorage.getItem('@Reminders');
        console.log('Reminders loaded from local storage:', value);
        if (value) {
            const reminders = JSON.parse(value);
        }
        let reminders = value ? JSON.parse(value) : [];
        // return local storage value if not logged in
        return reminders;
    } catch (e) {
        console.error('Error loading reminders:', e);
        return [];
    }

}

export const addReminder = async ( reminder ) => {
    console.log('Adding reminder:', reminder);
    try {
        let reminders = await loadReminders();
        if (reminders === null) {
            reminders = [];
        }
        reminders.push(reminder);
        await AsyncStorage.setItem('@Reminders', JSON.stringify(reminders));
        console.log('Reminder added');

        // create notification for reminder
        console.log('Creating notification for reminder:', reminder.id);
        await createNotificationForReminder(reminder);
    } catch (e) {
        console.error('Error adding reminder:', e);
    }
    
}
    

export const deleteReminder = async (id) => {
    console.log('Deleting reminder:', id);
    try {
        let reminders = await loadReminders();
        console.log('Reminders before:', reminders);
        reminders = reminders.filter((r) => r._id !== id);
        console.log('Reminders after:', reminders);
        await AsyncStorage.setItem('@Reminders', JSON.stringify(reminders));
        // remove the notification
        // console.log('Cancelling notification:', id);
        // try {
        //     await Notifications.cancelScheduledNotificationAsync(id);
        // } catch (e) {
        //     console.error('Error cancelling notification:', e);
        // }
        
        console.log('Reminder deleted');
    } catch (e) {
        console.error('Error deleting reminder:', e);
    }
}

export const updateReminder = async (id, updatedReminder) => {
    console.log('Updating reminder:', id, updatedReminder);
    try {
        let reminders = await loadReminders();
        const index = reminders.findIndex((r) => r._id === id);
        if (index === -1) {
            console.error('Reminder not found:', id);
            return;
        }

        // check if the date or time has changed
        if (reminders[index].date !== updatedReminder.date || reminders[index].time !== updatedReminder.time) {
            // cancel the old notification
            console.log('Cancelling old notification:', id);
            try {
                await Notifications.cancelScheduledNotificationAsync(id);
            } catch (e) {
                console.error('Error cancelling notification:', e);
            }

            // create a new notification
            console.log('Creating new notification for updated reminder:', updatedReminder.id);
            await createNotificationForReminder(updatedReminder);
        }
        reminders[index] = updatedReminder;
        await AsyncStorage.setItem('@Reminders', JSON.stringify(reminders));
        console.log('Reminder updated');
    } catch (e) {
        console.error('Error updating reminder:', e);
    }
}


export const createNotificationForReminder = async (reminder) => {
    console.log('Creating notification for reminder:', reminder);
  
    // Calculate the time for the notification
    let notificationDate = new Date(reminder.date);
    notificationDate.setHours(reminder.time.getHours());
    notificationDate.setMinutes(reminder.time.getMinutes());
    notificationDate.setSeconds(0);
  
    // Define the base content and trigger for the notification
    const notification = {
      content: {
        title: reminder.title || "Reminder", // Added a fallback title
        body: reminder.reminder,
        data: { id: reminder.id },
      },
      trigger: {
        hour: notificationDate.getHours(),
        minute: notificationDate.getMinutes(),
        second: 0,
      },
    };
  
    // Adjust the trigger for intervals
    if (reminder.interval === "Daily") {
      notification.trigger.repeats = true; // Make it repeat daily
    } else if (reminder.interval === "Weekly") {
      notification.trigger.weekDay = notificationDate.getDay(); // For weekly repeat, specify the day of the week
      notification.trigger.repeats = true;
    } else {
      // For non-repeating, set the exact date and time
      notification.trigger = notificationDate;
    }
  
    // Schedule the notification
    try {
      const notificationId = await Notifications.scheduleNotificationAsync(notification);
      console.log('Notification scheduled with ID:', notificationId);
      return notificationId; // Optionally return the notification ID for future reference
    } catch (e) {
      console.error('Error creating notification:', e);
      throw e; // Re-throw the error for handling upstream if necessary
    }
}; 


export const deleteAllReminders = async () => {
    console.log('Deleting all reminders');
    try {
        await AsyncStorage.removeItem('@Reminders');
        console.log('All reminders deleted');
        // Attempt to delete all from backend
    } catch (e) {
        console.error('Error deleting all reminders:', e);
    }
}

export const addFavContact = async (contact) => {
    console.log('Adding favourite contact:', contact);
    try {
        let favContacts = await loadFavContacts();
        favContacts.push(contact);
        await AsyncStorage.setItem('@FavouriteContacts', JSON.stringify(favContacts));
        console.log('Favourite contact added');
    } catch (e) {
        console.error('Error adding favourite contact:', e);
    }
}

export const loadFavContacts = async () => {
    console.log('Loading favourite contacts');
    try {
        let value = await AsyncStorage.getItem('@FavouriteContacts');
        console.log('Favourite contacts loaded:', value);
        return value ? JSON.parse(value) : [];
    } catch (e) {
        console.error('Error loading favourite contacts:', e);
        return [];
    }
}

export const deleteFavContact = async (id) => {
    console.log('Deleting favourite contact:', id);
    try {
        let favContacts = await loadFavContacts();
        favContacts = favContacts.filter((c) => c.id !== id);
        await AsyncStorage.setItem('@FavouriteContacts', JSON.stringify(favContacts));
        console.log('Favourite contact deleted');
    } catch (e) {
        console.error('Error deleting favourite contact:', e);
    }
}








