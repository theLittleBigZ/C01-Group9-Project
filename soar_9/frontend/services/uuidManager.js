import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const UUID_KEY = 'unique_device_id';

export const getOrCreateUUID = async () => {
  try {
    // Try to fetch the UUID from local storage
    let deviceId = await AsyncStorage.getItem(UUID_KEY);

    if (deviceId) {
      // UUID exists, return it
      console.log(`Device UUID is: ${deviceId}`);
      return deviceId;
    } else {
      // UUID doesn't exist, generate a new one
      deviceId = uuid.v4(); // Generate a new UUID
      await AsyncStorage.setItem(UUID_KEY, deviceId); // Store the new UUID
      console.log(`Generated and stored new UUID: ${deviceId}`);
      return deviceId;
    }
  } catch (error) {
    console.error('Failed to get or create device UUID:', error);
  }
};


