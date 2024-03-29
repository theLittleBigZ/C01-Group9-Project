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

        //automatically remove expired reminders / reminders with end date before today
        if (value) {
            const reminders = JSON.parse(value);
            const today = new Date();
            const updatedReminders = reminders.filter((r) => new Date(r.endDate) > today);
            await AsyncStorage.setItem('@Reminders', JSON.stringify(updatedReminders));
            // delete expired reminders from cache
            AsyncStorage.setItem('@Reminders', JSON.stringify(updatedReminders));
            console.log('Reminders updated:', updatedReminders);
            return updatedReminders;
        }
        let reminders = value ? JSON.parse(value) : [];
        // return local storage value if not logged in
        return reminders;
    } catch (e) {
        console.error('Error loading reminders:', e);
        return [];
    }

}

export const addReminder = async (id,title, reminder, time, interval, endDate ) => {
    console.log('Adding reminder:', reminder);
    try {
        let reminders = await loadReminders();
        const newReminder = { _id:id, title:title, reminder:reminder, time:time, interval:interval, endDate:endDate};
        reminders.push(newReminder);
        await AsyncStorage.setItem('@Reminders', JSON.stringify(reminders));
        // create notification for reminder
        await createNotificationForReminder(newReminder);
        console.log('Reminder notification added');
        console.log('Reminder added');
        // Attempt to add to backend
        return newReminder;
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

export const updateReminder = async (id, title, reminder, time, interval, endDate) => {
    console.log('Updating reminder:', id);
    try {
        let reminders = await loadReminders();
        const index = reminders.findIndex((r) => r.id === id);
        if (index !== -1) {
            reminders[index] = { id, title, reminder, time, interval, endDate };
            await AsyncStorage.setItem('@Reminders', JSON.stringify(reminders));

            // remove the old notification
            console.log('Cancelling old notification:', reminders[index].id);
            await Notifications.cancelScheduledNotificationAsync(reminders[index].id);

            // create notification for reminder
            console.log('Creating new notification for reminder:', reminders[index].id);
            await createNotificationForReminder(reminders[index]);
            
            console.log('Reminder updated');
            // Attempt to update in backend
        }
    } catch (e) {
        console.error('Error updating reminder:', e);
    }
}

export const createNotificationForReminder = async (reminder) => {
    console.log('Creating notification for reminder:', reminder);

    let trigger;
    const time = new Date(reminder.time); // Assuming reminder.dateTime is a Date object
    console.log('Reminder time:', time);
    switch (reminder.interval) {
        case "None":
            trigger = time;
            break;
        case "Daily":
            trigger = { hour: time.getHours(), minute: time.getMinutes(), repeats: true };
            break;
        case "Weekly":
            trigger = { weekDay: time.getDay(), hour: time.getHours(), minute: time.getMinutes(), repeats: true };
            break;
        case "Bi-Weekly":
            // For bi-weekly, you might need to manually handle it as `expo-notifications` does not support bi-weekly directly
            console.error("Bi-Weekly is not directly supported. Consider a custom implementation.");
            break;
        case "Monthly":
            // Same as Bi-Weekly, handling monthly repeats directly isn't supported, consider a workaround
            console.error("Monthly is not directly supported. Consider a custom implementation.");
            break;
        default:
            console.error("Unsupported repeat interval");
            return;
    }

    try {
        const notificationId = await Notifications.scheduleNotificationAsync({
            content: {
                title: reminder.title,
                body: reminder.reminder,
            },
            trigger,
        });
        console.log('Notification created with ID:', notificationId);
    } catch (e) {
        console.error('Error creating notification:', e);
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








