import { View, Text, TextInput, Pressable } from 'react-native';
import { Divider } from 'react-native-paper';
import React, { useState } from 'react';
import { router } from 'expo-router';
import i18n from './Translations/PrimaryLanguage';
import { login } from '../services/apiServices.js';
import { getStyles } from './Styling/Styles.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const styles = getStyles();


  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      if (response.success) {
        router.replace("/Homescreen");
      } else {
        // Assuming the response includes an error message under `message` key
        setError(response.message || 'An unknown error occurred');
      }
    } catch (e) {
      setError(e.message || 'An error occurred during login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Header}>{i18n.t('signin')}</Text>
      <Divider />

      {error !== '' && (
        <View style={styles.errorBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <Divider />

      <View style={styles.question}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          placeholderTextColor={styles.input.color}
          cursorColor={styles.input.borderColor}
        />
      </View>
      <Divider />

      <View style={styles.question}>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          placeholderTextColor={styles.input.color}
          cursorColor={styles.input.borderColor}
        />
      </View>
      <Divider />

      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.text}>{i18n.t('signin')}</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.replace("/RegisterPage")}>
        <Text style={styles.text}>{i18n.t('register')}</Text>
      </Pressable>

    </View>
  );
}

export default LoginPage;
