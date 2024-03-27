import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { registerForPushNotificationsAsync, fetchNotifications } from '../services/notificationsService.js';
import { notify } from '../services/apiServices.js';
import { Button } from 'react-native-paper';


const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = await registerForPushNotificationsAsync();
            setToken(token);
            const notifications = await fetchNotifications(token);
            setNotifications(notifications);
        };

        fetchData();
    }, []);

    const handleNotify = async () => {
        if (!token) {
            console.error('No token found');
            return;
        }
        try {
            await notify('Test notification', 'This is a test notification', token);
            console.log('Notification Done');
        } catch (e) {
            console.error('Error sending notification:', e);
        }
    };

    return (
        <View>
            <Text>Notifications</Text>
            <Button onPress={handleNotify}>Send test notification</Button>
        </View>
    );
};

export default Notifications;