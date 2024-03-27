import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Specify the projectId in the options object
    token = (await Notifications.getExpoPushTokenAsync({
      experienceId: '@gbaguidi/frontend', 
      projectId: '55019d4d-a5cf-40a9-9da7-064431133666', 
    })).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
}

export async function fetchNotifications(token) {
  // Fetch notifications using the token
  return [
    { message: 'Notification 1' },
    { message: 'Notification 2' },
    { message: 'Notification 3' },
  ];
}


// curl method
// Invoke-WebRequest -Uri "https://exp.host/--/api/v2/push/send" -Method Post -Headers $headers -Body $body
   
// StatusCode        : 200
// StatusDescription : OK
// Content           : {"data":{"status":"ok","id":"1c1a6e04-a0ae-44d5-ac0a-721544b3322f"}}
// RawContent        : HTTP/1.1 200 OK
//                     vary: Accept-Encoding, Origin
//                     x-frame-options: SAMEORIGIN
//                     x-content-type-options: nosniff
//                     Strict-Transport-Security: max-age=31536000; includeSubDomains
//                     Alt-Svc: h3=":443"; ma=259...
// Forms             : {}
// Headers           : {[vary, Accept-Encoding, Origin], [x-frame-options, SAMEORIGIN],
//                     [x-content-type-options, nosniff], [Strict-Transport-Security, max-age=31536000;      
//                     includeSubDomains]...}
// Images            : {}
// InputFields       : {}
// Links             : {}
// ParsedHtml        : mshtml.HTMLDocumentClass
// RawContentLength  : 68
