import React, { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';

const ContactScreen = () => {
  const [contactsData, setContactsData] = useState([]);
  //const [favouriteContacts, setFavouriteContacts] = useState([]);

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

  /*function addFavourite(contact) {
    setFavouriteContacts(contact);
  }*/

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollViewContainer}>
        {contactsData.map((contact) => (
          <View key={contact.id} style={styles.container}>
            <Text  style={styles.text}>
              {contact.firstName}
              {contact.lastName ? `${contact.lastName}` : ""}
            </Text>
            <Pressable onPress={() => callContact(contact)}>
              <Text>Call</Text>
            </Pressable> 
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
/*
<Pressable onPress={() => addFavourite(contact)}>
              <Text>Add Favourite</Text>
            </Pressable>*/

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  scrollViewContainer: {
    paddingVertical: 20,
  },
});

export default ContactScreen;