import React from 'react';
import { View, Text } from 'react-native';
import AppOpener from '../services/appOpener';

const App = () => {
    return (
      <View>
        <Text>My App</Text>
        <AppOpener appName="com.whatsapp" /> {'com.whatsapp'}
      </View>
    );
  };
  
  export default App;