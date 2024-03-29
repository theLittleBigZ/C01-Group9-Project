/*
remember to: 

(1) npm install react-native-intent-launcher <- required dependence

(2) add the below to the android/app/src/main/AndroidManifest.xml (create on build):
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />

<intent-filter>
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.HOME" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.LAUNCHER" />
</intent-filter>

<activity
    android:name=".MainActivity"
    android:theme= //leave as default
    android:exported="true"
    android:launchMode="singleTask"
    android:stateNotNeeded="true"
>
*/
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import IntentLauncher from 'react-native-intent-launcher';

// appName is required in the from of com.example.app (i.e. whatsapp is com.whatsapp && chrome is com.android.chrome)
const AppOpener = ({ appName }) => {
  const openApp = async () => {
    try {
      await IntentLauncher.startActivity({
        action: IntentLauncher.ACTION_MAIN,
        category: IntentLauncher.CATEGORY_LAUNCHER,
        packageName: appName, 
      });
    } catch (error) {
      console.error('Error opening app:', error);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={openApp}>
        <Text>Open {appName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppOpener;