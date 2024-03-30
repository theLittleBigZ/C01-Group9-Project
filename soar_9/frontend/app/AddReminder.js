import React, {useState, useEffect} from "react";
import {View, Text, StyleSheet, ScrollView, Pressable, FlatList, Alert} from "react-native";
import {getStyles} from "./Styling/Styles";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { addReminder } from "../services/apiServices";
import i18n from "./Translations/PrimaryLanguage";
import {router} from "expo-router";
import { Platform } from "react-native";
import { TextInput } from "react-native-paper";

const repeatIntervals = ['None', 'Daily', 'Weekly'];

const AddReminder = () => {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [reminder, setReminder] = useState('');
    const [repeatInterval, setRepeatInterval] = useState("None");
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
    const styles = getStyles();
    const [frequency, setFrequency] = useState('None');
    const [showFrequency, setShowFrequency] = useState(false);
    const [endDate, setEndDate] = useState(new Date());
    const [showEndDate, setShowEndDate] = useState(false);

    const handleAddReminder = async () => {
        if (!title || !reminder || !date, !time) {
            Alert.alert('Please fill all fields');
            return;
        }

        // Make sure time is at least 2 minutes in the future
        if (new Date(time).getTime() < new Date().getTime() + 120000) {
            Alert.alert('Please select a time at least 2 minutes in the future');
            return;
        }
        const toAdd = {
            id: Math.random().toString(36).substring(7),
            title: title,
            reminder: reminder,
            date: date,
            time: time,
            interval: repeatInterval,
            end: endDate
        };
        console.log('toAdd:', toAdd);
        await addReminder(toAdd);
        Alert.alert('Reminder added successfully');

        //Reset form

        setTitle('');
        setReminder('');
        setDate(new Date());
        setTime(new Date());
        setRepeatInterval("None");
        setEndDate(new Date());
    };

    const toggleShowDate = () => {
        setShowDate(!showDate);
    }

    const toggleShowTime = () => {
        setShowTime(!showTime);
    }


    const toggleShowEndDate = () => {
        setShowEndDate(!showEndDate);
    }

    const toggleShowFrequency = () => {
        setShowFrequency(!showFrequency);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.Header}>{i18n.t('addReminder')}</Text>
            <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder={i18n.t('title')}
                placeholderTextColor={styles.input.color}
                cursorColor={styles.input.borderColor}
            />

            <TextInput
                style={styles.input}
                onChangeText={setReminder}
                value={reminder}
                placeholder={i18n.t('reminder')}
                placeholderTextColor={styles.input.color}
                cursorColor={styles.input.borderColor}
            />

            <Pressable style={styles.button} onPress={toggleShowDate}>
                <Text style={styles.text}>{i18n.t('pickDateTime')}</Text>
            </Pressable>
            {showDate && (
                <DateTimePicker
                    value={date}
                    minimumDate={new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowDate(false);
                        setDate(selectedDate || date);
                    }}
                />
            )}    
            {showDate && (
                <DateTimePicker
                    value={time}
                    minimumDate={new Date()}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                        setShowTime(false);
                        setTime(selectedTime || time);
                    }}
                />
            )}

            <Pressable style={styles.button} onPress={toggleShowFrequency}>
                <Text style={styles.text}>{i18n.t('frequency')}</Text>
            </Pressable>
            {showFrequency && (
                <Picker
                    selectedValue={repeatInterval}
                    onValueChange={(itemValue) => {
                        setRepeatInterval(itemValue);
                    }}
                >
                    {repeatIntervals.map((interval) => (
                        <Picker.Item label={interval} value={interval} key={interval} />
                    ))}
                </Picker>
            )}

            { repeatInterval !== 'None' && (
                <Pressable style={styles.button} onPress={toggleShowEndDate}>
                    <Text style={styles.text}>{i18n.t('pickEndDate')}</Text>
                </Pressable>
            )}
            {showEndDate && (
                <DateTimePicker
                    minimumDate={new Date()}
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setShowEndDate(false);
                        setEndDate(selectedDate || endDate);
                    }}
                />
            )}
        
            <Pressable style={styles.button} onPress={handleAddReminder}>
                <Text style={styles.text}>{i18n.t('addReminder')}</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => router.replace("/ViewReminders")}>
                <Text style={styles.text}>{i18n.t('reminders')}</Text>
            </Pressable>

            <Pressable style={styles.button} onPress={() => router.replace("/Homescreen")}>
                <Text style={styles.text}>{i18n.t('home')}</Text>
            </Pressable>

        </View>

    );
};

export default AddReminder;

