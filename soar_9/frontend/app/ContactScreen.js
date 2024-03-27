import React, { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import { View, Text, Pressable, StyleSheet, ScrollView, FlatList } from 'react-native';
import * as Linking from 'expo-linking'
import { Divider, TextInput } from 'react-native-paper'; 
import i18n from './Translations/PrimaryLanguage';
import { router } from 'expo-router';
import { getStyles } from './Styling/Styles';

const ContactScreen = () => {
  const [contactsData, setContactsData] = useState([]);
  const [favouriteContacts, setFavouriteContacts] = useState([]);
  const [pageState, setPageState] = useState(1);
  const [searchResult, setSearchResult] = useState([]);

  const styles = getStyles();


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
    const { data } = await Contacts.getContactsAsync(
      {fields: [Contacts.Fields.ID, Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers],
       sort: "firstName" });
      return data || []; // Ensure that data is an array or provide a default empty array
  };

  function callContact(contact) {
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) {
      const buttoncolourNumber = contact.phoneNumbers.find((phone) => phone.isbuttoncolour) || contact.phoneNumbers[0];
      console.log(buttoncolourNumber);
      console.log('Calling:', buttoncolourNumber.number);
      Linking.openURL("tel:" + buttoncolourNumber.number);
    } else {
      console.log("This contact does not have a phone number associated with it,");
    }
  }

  function handleFavourite(contact, op) {
    const isFavourite = favouriteContacts.some(favContact => favContact.id === contact.id);

    if (isFavourite){
      console.log("removing favourite " + contact.firstName)
      setFavouriteContacts((prevFavouriteContacts) => prevFavouriteContacts.filter((favContact) => favContact.id!==contact.id));
    }
    else{
      console.log("adding favourite " + contact.firstName)
      setFavouriteContacts((prevFavouriteContacts) => [...favouriteContacts, contact]);
    }
  }
  
  function search(query) {
    setSearchResult(contactsData.filter(
      (contact) => (contact.firstName.startsWith(query) || contact.lastName.startsWith(query))));
      //and then just change it so it displays search results instead of contacts data
  }

  const Contact = ({contact}) => (
    <View style={[styles.container, {borderColor: 'black',  borderWidth: 2,
        borderRadius: 10}]}>
          <Text style={styles.text}>
            {contact.firstName}
            {contact.lastName ? ` ${contact.lastName}` : ""}
          </Text>
          <Pressable style={styles.button} onPress={() => callContact(contact)}>
            <Text style={styles.text}>Call</Text>
          </Pressable> 
          {favouriteContacts.some(favContact => favContact.id === contact.id) ? (
            <Pressable style={styles.button} onPress={() => handleFavourite(contact)}>
              <Text style={styles.text}>Remove Favourite</Text>
            </Pressable>
          ):(
            <Pressable style={styles.button} onPress={() => handleFavourite(contact)}>
              <Text style={styles.text}>Add Favourite</Text>
            </Pressable>
          )} 
        </View>);

  return (
    <View style={styles.container}>
      {pageState === 1 ? (
        favouriteContacts && favouriteContacts.length > 0 ? (
          <FlatList style={styles.text} data={favouriteContacts} 
            renderItem={({item}) => (
              //only show contacts that are still available in the device
              contactsData.some(availableContact => availableContact.id === item.id) ? (
                //render contact if available
                <Contact contact={item}/>
              ) : (
                //if not available remove from favourites
                <Text>No contact</Text>
                //handleFavourite(item)
              )
        )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}/>
            
            ):(
              <Text style={styles.text}>No favourite contacts yet!</Text>
            )
        ):(
        <FlatList style={styles.text} data={contactsData} 
          renderItem={({item}) => (<Contact contact={item}/>)}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}/>
        )}
      
    <View style={styles.container}>
    <Divider/>
    <Text style={[styles.text]}>{i18n.t('navigateto')}:</Text>
    {pageState == 0 ? (
      <Pressable style={styles.button} onPress={() => setPageState(1)}>
        <Text style={[styles.text, {fontSize:20}]}>{i18n.t('Favourite Contacts')}</Text>
      </Pressable>
    ):(
      <Pressable style={styles.button} onPress={() => setPageState(0)}>
      <Text style={[styles.text, {fontSize:20}]}>{i18n.t('All Contacts')}</Text>
      </Pressable>
    )}
    <Pressable style={styles.button} onPress={() => router.replace("/Homescreen")}>
                <Text style={[styles.text, {fontSize:20}]}>{i18n.t('home')}</Text>
            </Pressable>
    </View>
  </View>
  );
};


export default ContactScreen;
