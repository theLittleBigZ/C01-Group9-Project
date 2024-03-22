import { View, Text, TextInput, Pressable } from 'react-native';
import { Divider } from 'react-native-paper';
import React, { useState } from 'react';
import { router } from 'expo-router';
import i18n from './Translations/PrimaryLanguage';
import { register } from '../services/apiServices.js'; // Assuming you have a similar function for registration
import { useStyles } from './Styling/Styles.js';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const styles = useStyles();

  const handleRegister = async () => {
    // Simple validation for example purposes
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Assuming your register function can now accept a username along with email and password
      const response = await register(username, email, password);
      console.log('response:', response);
      if (response.status === 201) {
        router.replace("/LoginPage"); // Redirect to login page after successful registration
      } else {
        setError(response.message || 'An unknown error occurred');
      }
    } catch (e) {
      setError(e.message || 'An error occurred during registration');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Header}>{i18n.t('register')}</Text>
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
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
        />
      </View>
      <Divider />

      <View style={styles.question}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
      </View>
      <Divider />

      <View style={styles.question}>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Password"
        />
      </View>
      <Divider />

      <View style={styles.question}>
        <TextInput
          style={styles.input}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
          placeholder="Confirm Password"
        />
      </View>
      <Divider />

      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={[styles.words, { fontSize: 20 }]}>{i18n.t('register')}</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.replace("/LoginPage")}>
        <Text style={[styles.words, { fontSize: 20 }]}>{i18n.t('haveAccount')}</Text>
      </Pressable>
    </View>
  );
}

export default RegisterPage;
