import React, { useEffect } from 'react';
import * as Contacts from 'expo-contacts';
import { View, Text, Button, StyleSheet } from 'react-native';

const ContactScreen = () => {
    useEffect(() => {
        askForContactPermission();
      }, []);

    const askForContactPermission = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Contact permission denied');
        }
      };

    const getContacts = async () => {
        const { status, data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.ID, Contacts.Fields.FirstName, Contact.Fields.LastName, Contacts.Fields.PhoneNumbers],
        });
    
        if (status === 'granted') {
          console.log('Contacts:', data);
          // Want to display contact cards and allow for favouriting and search
        } else {
          console.log('Contact permission denied');
          // Handle denial or use a fallback
        }
     };

    return (
      <View style={styles.container}>
        {data.map((contact) => (
          <View key={contact.ID}>
            <Text style={styles.text}>{contact.Name}</Text>
          </View>
        ))}
      </View>
     );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default ContactScreen;


  