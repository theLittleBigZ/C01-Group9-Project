    import React, { useEffect , useState} from "react";
    import { View, Text, Pressable, FlatList, TextInput } from "react-native";
    import { getStyles } from "./Styling/Styles";
    import i18n from "./Translations/PrimaryLanguage";
    import { router } from "expo-router";
    import { loadReminders, updateReminder, deleteAllReminders, deleteReminder } from "../services/apiServices";
    import DateTimePicker from "@react-native-community/datetimepicker";
    import { Picker } from "@react-native-picker/picker";
    import { Alert } from "react-native";

    const repeatIntervals = ['None', 'Daily', 'Weekly'];

    const ViewReminders = () => {
        const [reminders, setReminders] = useState([]);
        const [newTitle, setNewTitle] = useState('');
        const [newReminder, setNewReminder] = useState('');
        const [newDate, setNewDate] = useState(new Date());
        const [newTime, setNewTime] = useState(new Date());
        const [newInterval, setNewInterval] = useState('None');
        const [newEndDate, setNewEndDate] = useState(new Date());
        const [showDate, setShowDate] = useState(false);
        const [showTime, setShowTime] = useState(false);
        const [showInterval, setShowInterval] = useState(false);
        const [showEndDate, setShowEndDate] = useState(false);
        
        const styles = getStyles();

        useEffect(() => {
            const fetchReminders = async () => {
                let data = await loadReminders();
                console.log("reminders: ", data);
                data = data.map(reminder => ({ ...reminder, isEditing: false }));
                setReminders(data);
            };
            fetchReminders();
        }, []);

        const toggleShowDate = () => {
            setShowDate(!showDate);
        }

        const toggleShowTime = () => {
            setShowTime(!showTime);
        }

        const toggleShowInterval = () => {
            setShowInterval(!showInterval);
        }

        const toggleShowEndDate = () => {
            setShowEndDate(!showEndDate);
        }

        const handleDeleteReminder = async (id) => {
            await deleteReminder(id);
            const data = await loadReminders();
            setReminders(data);
        }

        const setOldInfo = async (id) => {
            const reminderToEdit = reminders.find(rem => rem.id === id);
            setNewTitle(reminderToEdit.title);
            setNewReminder(reminderToEdit.reminder);
            setNewDate(new Date(reminderToEdit.date));
            setNewTime(new Date(reminderToEdit.time));
            setNewInterval(reminderToEdit.interval);
            setNewEndDate(new Date(reminderToEdit.end));
        }

        const handleEditReminder = async (id) => {

            console.log('id:', id);
            // setOldInfo(id);
            setReminders(reminders.map(rem => rem.id === id ? { ...rem, isEditing: !rem.isEditing } : rem));

            const reminderToEdit = reminders.find(rem => rem.id === id);

            if (reminderToEdit.isEditing) {
                const updatedReminder = {
                    title: newTitle || reminderToEdit.title,
                    reminder: newReminder || reminderToEdit.reminder,

                    date: newDate || reminderToEdit.date,
                    time: newTime || reminderToEdit.time,
                    interval: newInterval || reminderToEdit.interval,
                    end: newEndDate || reminderToEdit.end
                };

                console.log('updatedReminder:', updatedReminder);
                // if new time  is less than 2 minutes from now, alert user
                let current = new Date(newDate);
                current.setHours(newTime.getHours(), newTime.getMinutes());
                if (current.getTime() < new Date().getTime() + 120000) {
                    Alert.alert('Please select a time at least 2 minutes in the future. Changes not saved');
                    return;
                }
                await updateReminder(id, updatedReminder);
                console.log('reminder updated');
                const data = await loadReminders();
                setReminders(data);
            }
        }
        
            return (
                <View style={styles.container}>
                    <Text style={styles.Header}>{i18n.t("reminders")}</Text>
                    < FlatList 
                        data={reminders}
                        renderItem={({ item }) => (
                            <View style={styles.reminder}>
                                {item.isEditing ? (
                                    <>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={setNewTitle}
                                        value={newTitle}
                                        placeholder={i18n.t('title')}
                                        placeholderTextColor={styles.input.color}
                                        cursorColor={styles.input.borderColor}
                                    />
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={setNewReminder}
                                        value={newReminder}
                                        placeholder={i18n.t('reminder')}
                                        placeholderTextColor={styles.input.color}
                                        cursorColor={styles.input.borderColor}
                                    />

                                    <Pressable style={styles.button} onPress={toggleShowDate}>
                                        <Text style={styles.text}>{i18n.t('date')}</Text>
                                    </Pressable>
                                    {showDate && (
                                        <DateTimePicker
                                            value={newDate}
                                            minimumDate={new Date()}
                                            mode="date"
                                            display="spinner"
                                            onChange={(event, selectedDate) => {
                                                setNewDate(selectedDate || newDate);
                                            }}
                                        />
                                    )}
                                    <Pressable style={styles.button} onPress={toggleShowTime}>
                                        <Text style={styles.text}>{i18n.t('time')}</Text>
                                    </Pressable>
                                    {showTime && (
                                        <DateTimePicker
                                            value={newTime}
                                            minimumDate={new Date()}
                                            mode="time"
                                            display="spinner"
                                            onChange={(event, selectedTime) => {
                                                setNewTime(selectedTime || newTime);
                                            }}
                                        />
                                    )}

                                    <Pressable style={styles.button} onPress={toggleShowInterval}>
                                        <Text style={styles.text}>{i18n.t('frequency')}</Text>
                                    </Pressable>
                                    {showInterval && (
                                        <Picker
                                            selectedValue={newInterval}
                                            onValueChange={value => setNewInterval(value)}
                                            style={styles.pickerstyle.inputAndroid}
                                        >
                                            {repeatIntervals.map(interval => (
                                                <Picker.Item key={interval} label={interval} value={interval} />
                                            ))}
                                        </Picker>
                                    )}
                                    <Pressable style={styles.button} onPress={toggleShowEndDate}>
                                        <Text style={styles.text}>{i18n.t('pickEndDate')}</Text>
                                    </Pressable>
                                    {showEndDate && (
                                        <DateTimePicker
                                            value={newEndDate}
                                            minimumDate={new Date()}
                                            mode="date"
                                            display="spinner"
                                            onChange={(event, selectedDate) => {
                                                setNewEndDate(selectedDate || newEndDate);
                                                setShowEndDate(false);
                                            }}
                                        />
                                    )}
                                    </> ) : (
                                        
                                    <>
                                <Text style={[styles.contactName, {color: styles.icon.color}]}>{item.title}</Text>
                                <Text style={[styles.contactName, {color: styles.icon.color}]}>{item.reminder}</Text>
                                <Text style={[styles.contactName, {color: styles.icon.color}]}>Set for {new Date(item.date).toLocaleDateString(undefined,{
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',})} , {new Date(item.time).toLocaleTimeString(undefined,{
                                        //hide year and month
                                        hour: '2-digit',
                                        minute: '2-digit',})
                                    }  </Text>
                                { item.interval !== 'None' && (
                                    <>
                                    <Text  style={[styles.contactName, {color: styles.icon.color}]}>{i18n.t('frequency')}{item.interval} </Text>
                                    <Text  style={[styles.contactName, {color: styles.icon.color}]}>{i18n.t('pickEndDate')}{new Date(item.end).toLocaleDateString(undefined,{
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',})} </Text>
                                    </>
                                ) }
                                
                                </>
                                )}
                            <Pressable style={styles.reminderButton} onPress={() => handleEditReminder(item.id)}>
                                <Text style={styles.text}>{item.isEditing ? 'Save' : 'Edit'}</Text>
                            </Pressable>
                            <Pressable style={styles.reminderButton} onPress={() => handleDeleteReminder(item.id)}>
                                <Text style={styles.text}>{i18n.t('Delete')}</Text>
                            </Pressable>   
                            </View>
                            
        
                        )}
                        keyExtractor={item => item.id}
                        
                    />
                    <Pressable style={styles.button} onPress={() => router.replace("/AddReminder")}>
                        <Text style={styles.text}>{i18n.t('addReminder')}</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={() => router.replace("/Homescreen")}>
                        <Text style={styles.text}>{i18n.t('home')}</Text>
                    </Pressable>
                </View>
            );

    };

    export default ViewReminders;
