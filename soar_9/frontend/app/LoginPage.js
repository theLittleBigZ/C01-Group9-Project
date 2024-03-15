import { View, Text, TextInput, Pressable} from 'react-native';
import { Divider } from 'react-native-paper'; 
import styles from './Styles';
import React, {useState} from 'react';
import {router } from 'expo-router';
import I18n from './Translations/PrimaryLanguage';


const LoginPage = () =>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  return(
    <View style={styles.container}>
      <Text style={styles.Header}>{I18n.t('signin')}</Text>
      <Divider/>

       <View style={styles.question}>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
        </View>
        <Divider/>

        <View style={styles.question}>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
          />
        </View>
        <Divider/>

        <Pressable style={styles.button} onPress={() => router.replace("/Homescreen")}>
          <Text style={[styles.words, {fontSize:20}]}>{I18n.t('signin')}</Text>
        </Pressable>
    </View>
  )

}

export default LoginPage;