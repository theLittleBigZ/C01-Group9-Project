import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, Redirect } from 'expo-router';
import Homescreen from './Homescreen.js';
import LoginPage from './LoginPage.js';

const index = () => {
    return (
        < LoginPage/>
    )
}

export default index

const styles = StyleSheet.create({})