import React, { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import { View, Text, Pressable, StyleSheet, ScrollView, FlatList } from 'react-native';
import * as Linking from 'expo-linking'
import { Divider, TextInput } from 'react-native-paper'; 
import i18n from './Translations/PrimaryLanguage';
import { router } from 'expo-router';
import { getStyles } from './Styling/Styles';
import TTS from './text-to-speech/TTS';

const ContactScreen = () => {
  const [contactsData, setContactsData] = useState([]);
  const [favouriteContacts, setFavouriteContacts] = useState([]);
  const [pageState, setPageState] = useState(1);
  const [searchResult, setSearchResult] = useState([]);
  const [TTStext, setTTStext] = useState('');

  const styles = getStyles();



  useEffect(() => {
    const getTTStext = () => {
      let text = i18n.t('favouriteContacts') + '\n'
      favouriteContacts.forEach(favContact => {
        if(favContact.firstName != undefined){
          text += `${favContact.firstName}\n`;
        }
      });
      text += i18n.t('navigateto') + '\n' + i18n.t('allContacts')+ '\n' + i18n.t('home') + '\n';
      return text
    }
    setTTStext(getTTStext());
}, [favouriteContacts]);


  useEffect(() => {
    const fetchData = async () => {
      const status = await askForContactPermission();
      if (status === "granted"){
        const data = await getAllContacts();
        setContactsData(data);
        setSearchResult(data);
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
      const primaryNumber = contact.phoneNumbers.find((phone) => phone.isPrimary) || contact.phoneNumbers[0];
      console.log(primaryNumber);
      console.log('Calling:', primaryNumber.number);
      Linking.openURL("tel:" + primaryNumber.number);
    } else {
      console.log("This contact does not have a phone number associated with it,");
    }
  }

  function handleFavourite(contact) {
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
    const result = contactsData.filter(
      (contact) => ((contact.firstName !== undefined && contact.firstName.toLowerCase().startsWith(query.toLowerCase())) 
        || (contact.lastName !== undefined && contact.lastName.toLowerCase().startsWith(query.toLowerCase()))));
    //if no contacts start with the string, return any contacts that contain it
    if (result.length === 0){
      console.log("no such contacts")
      const regex = new RegExp(query, 'i');
      setSearchResult(contactsData.filter((contact) => (regex.test(contact.firstName) || regex.test(contact.lastName))));
      return
    } 
    setSearchResult(result);
    console.log("searching for: " + query);
  }

  const Contact = ({contact}) => (
    <View style={[styles.container, {borderColor: styles.button.backgroundColor,  borderWidth: 2,
        borderRadius: 10}]}>
          <Text style={styles.questionfont}>
            {contact.firstName ? `${contact.firstName.trim()}` : ""}
            {contact.lastName ? ` ${contact.lastName.trim()}` : ""}
          </Text>
          <Pressable style={styles.button} onPress={() => callContact(contact)}>
            <Text style={styles.text}>{i18n.t('call')}</Text>
          </Pressable> 
          {favouriteContacts.some(favContact => favContact.id === contact.id) ? (
            <Pressable style={styles.button} onPress={() => handleFavourite(contact)}>
              <Text style={styles.text}>{i18n.t('removeFavourite')}</Text>
            </Pressable>
          ):(
            <Pressable style={styles.button} onPress={() => handleFavourite(contact)}>
              <Text style={styles.text}>{i18n.t('addFavourite')}</Text>
            </Pressable>
          )} 
        </View>
  );

  return (
    <View style={styles.container}>
      {pageState === 1 ? (
        <View style={styles.container}>
          <Text style={styles.Header}>{i18n.t('favouriteContacts')}</Text>
          <TTS input={TTStext} styles={styles}/>
          <Divider/>
          {favouriteContacts && favouriteContacts.length > 0 ? (
            <FlatList style={styles.text} data={favouriteContacts} 
              renderItem={({item}) => (
                //only show contacts that are still available in the device
                contactsData.some(availableContact => availableContact.id === item.id) ? (
                  //render contact if available
                  <Contact contact={item}/>
                ) : (
                  //if not available remove from favourites
                  handleFavourite(item)))}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={() => <View style={{ height: 10 }} />}/>
              ):(
                <View style={[styles.container, {justifyContent: 'center'}]}>
                  <Text style={styles.Header}>{i18n.t('noFavouriteContacts')}</Text>
                </View>
              )}
        </View>
        ):(
        <View style={styles.container}>
          <TextInput 
            style={styles.input}
            placeholderTextColor={styles.input.color}
            cursorColor={styles.input.borderColor}
            ref={input => { this.textInput = input }} 
            onChangeText={query => search(query)} 
            placeholder={i18n.t('searchContacts')}/>
                      
          <Pressable style={styles.button} onPress={() => {setSearchResult(""); this.textInput.clear(); search("")}}>
            <Text style={styles.text}>{i18n.t('clearSearch')}</Text>
            </Pressable>
          <FlatList style={styles.text} data={searchResult} 
            renderItem={({item}) => (<Contact contact={item}/>)}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}/>
        </View>
        )
      }
  
      <Divider/>
      <Text style={styles.Header}>{i18n.t('navigateto')}:</Text>
      {pageState == 0 ? (
        <Pressable style={styles.button} onPress={() => setPageState(1)}>
          <Text style={styles.text}>{i18n.t('favouriteContacts')}</Text>
        </Pressable>
      ):(
        <Pressable style={styles.button} onPress={() => setPageState(0)}>
        <Text style={styles.text}>{i18n.t('allContacts')}</Text>
        </Pressable>
      )}
      <Pressable style={styles.button} onPress={() => router.replace("/Homescreen")}>
          <Text style={styles.text}>{i18n.t('home')}</Text>
      </Pressable>
  </View>
  );
};


export default ContactScreen;
