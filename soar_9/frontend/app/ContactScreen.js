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
  const [pageState, setPageState] = useState(1);


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
    return status;
  };

  const getAllContacts = async () => {
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.ID, Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers],
    });
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
    const isFavourite = favouriteContacts.some(favContact => favContact.id === contact.id);

    if (isFavourite){
      console.log("removing favourite " + contact.firstName)
      setFavouriteContacts((prevFavouriteContacts) => prevFavouriteContacts.filter((favContact) => favContact.id!==contact.id));
      console.log("after removing: " + favouriteContacts);
    }
    else{
      console.log("adding favourite " + contact.firstName)
      setFavouriteContacts((prevFavouriteContacts) => [...favouriteContacts, contact]);
      console.log("after adding: " + favouriteContacts);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.appList}>
        {pageState === 1 ? (
            favouriteContacts && favouriteContacts.length > 0 ? (
              favouriteContacts.map((contact) => (
                <View key={contact.id} style={styles.container}>
                  <Text>
                    {contact.firstName}
                    {contact.lastName ? ` ${contact.lastName}` : ""}
                  </Text>
                  <Pressable style={styles.button} onPress={() => callContact(contact)}>
                    <Text>Call</Text>
                  </Pressable> 
                  <Pressable style={styles.button} onPress={() => handleFavourite(contact)}>
                    <Text>Remove Favourite</Text>
                  </Pressable>
                </View>
              ))
            ) : (
              <Text>No favourite contacts yet!</Text>
            )
        ) : (
          contactsData.map((contact) => (
            <View key={contact.id} style={styles.container}>
              <Text>
                {contact.firstName}
                {contact.lastName ? ` ${contact.lastName}` : ""}
              </Text>
              <Pressable style={styles.button} onPress={() => callContact(contact)}>
                <Text>Call</Text>
              </Pressable> 
              {favouriteContacts.some(favContact => favContact.id === contact.id) ? (
                <Pressable style={styles.button} onPress={() => handleFavourite(contact)}>
                  <Text>Remove Favourite</Text>
                </Pressable>
              ):(
                <Pressable style={styles.button} onPress={() => handleFavourite(contact)}>
                  <Text>Add Favourite</Text>
                </Pressable>
              )}
              
            </View>
          ))
        )}
      </ScrollView>
      <View >
        <Divider/>
        {pageState == 0 ? (
          <Pressable style={styles.button} onPress={() => setPageState(1)}>
            <Text style={[styles.words, {fontSize:20}]}>{i18n.t('Favourite Contacts')}</Text>
          </Pressable>
        ):(
          <Pressable style={styles.button} onPress={() => setPageState(0)}>
          <Text style={[styles.words, {fontSize:20}]}>{i18n.t('All Contacts')}</Text>
          </Pressable>
        )}
        
        <Pressable style={styles.button} onPress={() => router.replace("/Homescreen")}>
          <Text style={[styles.words, {fontSize:20}]}>{i18n.t('home')}</Text>
        </Pressable>
      </View>
    </View>
  );
};


export default ContactScreen;