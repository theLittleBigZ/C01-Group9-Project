import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { registerForPushNotificationsAsync } from '../services/notificationsService.js';

const Notifications = () => {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = await registerForPushNotificationsAsync();
            console.log(token);
            console.log('Fetching notifications for token:', token);
            // Fetch notifications using the token
            // const notifications = await fetchNotifications(token);
            // setNotifications(notifications);
        };

        fetchData();
    }, []);

  return (
    <View>
      {/* <Text>Notifications:</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.message}</Text>}
      /> */}
      <Text>Notifications</Text>
    </View>
  );
};

export default Notifications;
