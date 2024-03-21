import React, { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native';
import * as Linking from 'expo-linking';
import styles from './Styling/Styles.js';
import { Divider } from 'react-native-paper'; 
import i18n from './Translations/PrimaryLanguage';
import { router } from 'expo-router';

const FavouriteContacts = ({favouriteContacts, handleFavourite, callContact}) => {

    return(
        <View>
            <ScrollView style={styles.appList}>
                {favouriteContacts && favouriteContacts.length > 0 ? (
                        favouriteContacts.map((contact) => (
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
                            ))
                      ) : (
                        <Text>No favourite contacts yet!</Text>
                      )  
                    }
            </ScrollView>
            <Divider/>
            <Pressable style={styles.button} onPress={() => router.replace("/AllContacts")}>
                <Text style={[styles.words, {fontSize:20}]}>{i18n.t('All Contacts')}</Text>
                </Pressable>
            <Pressable style={styles.button} onPress={() => router.replace("/Homescreen")}>
                <Text style={[styles.words, {fontSize:20}]}>{i18n.t('home')}</Text>
                </Pressable>
        </View>
    );
};

export default FavouriteContacts;