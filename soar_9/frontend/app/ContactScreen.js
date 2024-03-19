import React, { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import styles from './Styling/Styles.js';
import { Divider } from 'react-native-paper'; 
import i18n from './Translations/PrimaryLanguage';
import { router } from 'expo-router';

const ContactScreen = () => {
  const [contactsData, setContactsData] = useState([]);
  const [favouriteContacts, setFavouriteContacts] = useState([]);


  useEffect(() => {
      const fetchData = async () => {
        const status = await askForContactPermission();
        if (status === "granted"){
          const data = await getAllContacts();
          setContactsData(data);
        }
      };
  
      fetchData();
  }, []);

  const askForContactPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    console.log('Contact permission status:', status);
    /*if (status !== 'granted') {
      console.log('Contact permission denied');
    }*/
    return status;
  };

  const getAllContacts = async () => {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.ID, Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers],
    });
      //console.log('Contacts:', data);
      return data || []; // Ensure that data is an array or provide a default empty array
  };

  function callContact(contact) {
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      const primaryNumber = contact.phoneNumbers.find((phone) => phone.isPrimary) || contact.phoneNumbers[0];
      console.log(primaryNumber);
      console.log('Calling:', primaryNumber.number);
      Linking.openURL("tel:" + primaryNumber.number);
    } else {
      console.log("This contact does not have a phone number associated with it,");
    }
  }

  function handleFavourite(contact, op) {
    if (favouriteContacts.includes(contact) && op == "remove"){
      console.log("removing favourite " + contact.firstName)
      setFavouriteContacts((prevFavouriteContacts) => prevFavouriteContacts.filter((favContact) => favContact.id!==contact.id));
      console.log("after removing: " + favouriteContacts);
    }
    else if (!favouriteContacts.includes(contact) && op == "add"){
      console.log("adding favourite " + contact.firstName)
      setFavouriteContacts((prevFavouriteContacts) => [...favouriteContacts, contact]);
      console.log("after adding: " + favouriteContacts);
    }
    else{
      console.log("Operation has already been performed.")
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.appList}>
        <View>
        {favouriteContacts.map((contact) => (
          <View key={contact.id} style={styles.container}>
            <Text>
              {contact.firstName}
              {contact.lastName ? `${contact.lastName}` : ""}
            </Text>
            <Pressable style={styles.button} onPress={() => callContact(contact)}>
              <Text>Call</Text>
            </Pressable> 
            <Pressable style={styles.button} onPress={() => handleFavourite(contact, "remove")}>
              <Text>Remove Favourite</Text>
            </Pressable>
          </View>
        ))}
        </View>
        <View>
        {contactsData.map((contact) => (
          <View key={contact.id} style={styles.container}>
            <Text>
              {contact.firstName}
              {contact.lastName ? `${contact.lastName}` : ""}
            </Text>
            <Pressable style={styles.button} onPress={() => callContact(contact)}>
              <Text>Call</Text>
            </Pressable> 
            <Pressable style={styles.button} onPress={() => handleFavourite(contact, "add")}>
              <Text>Add Favourite</Text>
            </Pressable>
          </View>
        ))}
        </View>
      </ScrollView>
      <Divider/>
      <Pressable style={styles.button} onPress={() => router.replace("/Homescreen")}>
        <Text style={[styles.words, {fontSize:20}]}>{i18n.t('home')}</Text>
      </Pressable>
    </View>
  );
};


export default ContactScreen;