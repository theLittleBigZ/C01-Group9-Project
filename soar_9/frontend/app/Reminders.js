import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Alert, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getStyles } from './Styling/Styles.js';
import { loadReminders, addReminder, deleteReminder, updateReminder} from '../services/apiServices.js';
import i18n from './Translations/PrimaryLanguage.js';
import { Platform } from 'react-native';
import { router } from 'expo-router';

const repeatIntervals = ["None", "Daily", "Weekly", "Bi-Weekly", "Monthly"];

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState('');
  const [reminder, setReminder] = useState('');
  const [dateTime, setDateTime] = useState(new Date());
  const [repeatInterval, setRepeatInterval] = useState("None");
  const [endDate, setEndDate] = useState(new Date());
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [showFrequencyViewer, setShowFrequencyViewer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const styles = getStyles();

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        let reminders = await loadReminders();
        reminders = reminders.map(r => ({ ...r, isEditing: false }))
        setReminders(reminders);
      } catch (error) {
        console.error('Error fetching reminders:', error);
      }
    };

    fetchReminders();
  }, []);

  const handleSubmit = async () => {
    if (isEditing) {
      try {
        await updateReminder(editingId, title, reminder, dateTime);
        const updatedList = reminders.map(item => item._id === editingId ? { _id: editingId, title, reminder, dateTime, repeatInterval, endDate} : item);
        setReminders(updatedList);
        Alert.alert("Reminder Updated");
      } catch (error) {
        console.error('Error updating reminder:', error);
        Alert.alert("Error updating reminder", error.message);
      }
    } else {
      try {
        // Assuming addReminder returns the new reminder with an _id field
        console.log('Adding reminder:', title, reminder, dateTime);
        // Check if title and reminder are not empty
        if (!title || !reminder || !dateTime) {
          Alert.alert("Title, Reminder, and Date/Time are required");
          return;
        }
        if(Platform.OS === 'ios'){
          const newReminder = await addReminder(reminders.length + 1, title, reminder, dateTime, repeatInterval, endDate);
          setReminders([...reminders, newReminder]);
        } else{
          const newReminder = await addReminder(reminders.length + 1, title, reminder, time, repeatInterval, endDate);
          setReminders([...reminders, newReminder]);
        }
      } catch (error) {
        console.error('Error adding reminder:', error);
        Alert.alert("Error adding reminder", error.message);
      }
    }
    // Reset form
    setIsEditing(false);
    setTitle('');
    setReminder('');
    setDateTime(new Date());
    setDate(new Date());
    setTime(new Date());
    setEditingId(null);
    setRepeatInterval("None");
    setEndDate(new Date());
  };

  const handleEditReminder = (id) => {
    setReminders(reminders.map(rem => rem._id === id ? { ...rem, isEditing: !rem.isEditing } : rem));
    const reminderToEdit = reminders.find(rem => rem._id === id);
    if (reminderToEdit) {
      console.log("Edited Info  :" + "title: " +title, "reminder: " + reminder, "time: "+time, "date: " + date, "repeatintervale: "+ repeatInterval, endDate);
      console.log('Editing reminder:', reminderToEdit);
      setTitle(reminderToEdit.title);
      setReminder(reminderToEdit.reminder);
      setDateTime(new Date(reminderToEdit.time));
      setDate(new Date(reminderToEdit.time));
      setTime(new Date(reminderToEdit.time));
      setIsEditing(true);
      setEditingId(id);
      setRepeatInterval(reminderToEdit.repeatInterval);
      setEndDate(new Date(reminderToEdit.endDate));
    }
  };

  const handleInputChange = (text, id, field) => {
    // setShowDateTimePicker(false);
    const updatedReminders = reminders.map(rem => rem._id === id ? { ...rem, [field]: text } : rem);
    setReminders(updatedReminders);
  };

  const handleDateTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateTime;
    console.log('Selected date:', currentDate);
    setDateTime(currentDate);
    if (Platform.OS === 'android') {
      setShowDateTimePicker(true);
    }
    if(editingId){
      const updatedReminders = reminders.map(rem => rem._id === editingId ? { ...rem, time: currentDate } : rem);
      setReminders(updatedReminders); 
    }

  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowDateTimePicker(false);
    const currentDate = selectedDate || endDate;
    console.log('Selected end date:', currentDate);
    setEndDate(currentDate);

    if(editingId){
      const updatedReminders = reminders.map(rem => rem._id === editingId ? { ...rem, endDate: currentDate } : rem);
      setReminders(updatedReminders); 
    }
  };


  const handleDeleteReminder = async (id) => {
    try {
      await deleteReminder(id);
      setReminders(reminders.filter(rem => rem._id !== id));
      Alert.alert("Reminder Deleted");
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  const toggleDateTimePicker = () => {
    setShowDateTimePicker(!showDateTimePicker);
  }

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  }

  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  }

  const toggleEndDate = () => {
    setShowEndDate(!showEndDate);
  }

  const toggleFrequencyViewer = () => {
    setShowFrequencyViewer(!showFrequencyViewer);
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date; // Use selected date or fall back to the current date state
    setDate(currentDate); // Update the date state
    setShowDatePicker(false);
  
  };
  
  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time; // Use selected time or fall back to the current time state
    console.log("currenttime: " + currentTime);
    setTime(currentTime); // Update the time state
    setShowTimePicker(false);

  };


if(Platform.OS === 'ios'){
  return (

    <View style={styles.container}>
      <Text style={styles.Header}>{i18n.t('reminders')}</Text>
      <FlatList
    data={reminders}
    renderItem={({ item }) => (
    <View style={styles.reminder}>
      {item.isEditing ? (
        <>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange(text, item._id, 'title')}
            value={item.title}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange(text, item._id, 'reminder')}
            value={item.reminder}
          />
          <Pressable style={styles.button} onPress={() => toggleDateTimePicker()}>
            <Text style={styles.text}>{i18n.t('pickDateTime')}</Text>
          </Pressable>
          {showDateTimePicker && (
            <DateTimePicker
              value={new Date(item.time)}
              mode="datetime"
              is24Hour={true}
              display="spinner"
              onChange={handleDateTimeChange}
            />
          )}
         <Pressable style={styles.button} onPress={() => toggleFrequencyViewer()}>
          <Text style={styles.text}>{i18n.t('frequency') }</Text>
        </Pressable>
          {showFrequencyViewer && (
            <Picker
              selectedValue={item.repeatInterval}
              onValueChange={(text) => handleInputChange(text, item._id, 'repeatInterval')}
            >
              {repeatIntervals.map(interval => (
                <Picker.Item key={interval} label={interval} value={interval} />
              ))}
            </Picker>
          )}
          {item.repeatInterval !== "None" && (
            <>
              <Text style={styles.subHeader}>{i18n.t('pickEndDate')}</Text>
              <DateTimePicker
                value={new Date(item.endDate)}
                mode="date"
                display="default"
                minimumDate={new Date()}
                onChange={handleEndDateChange}
              />
            </>
          )}
        </>
      ) : (
        <>
          <Text style={styles.reminderTitle}>{item.title}</Text>
          <Text style={styles.reminderText}>{item.reminder}</Text>
          <Text style={styles.reminderText}>{new Date(item.time).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',})}</Text>
          {item.repeatInterval !== "None" && (
            <Text style={styles.reminderText}>Repeat: {item.repeatInterval}</Text>
          )}
          {item.repeatInterval !== "None" && (
            <Text style={styles.reminderText}>End Date: {new Date(item.endDate).toLocaleDateString()}</Text>
          )}
        </>
        )}
        <Pressable style={styles.button} onPress={() => handleEditReminder(item._id)}>
          <Text style={styles.text}>{item.isEditing ? 'Save' : 'Edit'}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleDeleteReminder(item._id)}>
          <Text style={styles.text}>{i18n.t('Delete')}</Text>
        </Pressable>
      </View>
    )}
    keyExtractor={item => item._id.toString()}
    />

    < Text style = {styles.Header} > {i18n.t('addReminder')} </Text>
    <TextInput
      style={styles.input}
      onChangeText={setTitle}
      value={title}
      placeholder={i18n.t('title')}
    />
    <TextInput
      style={styles.input}
      onChangeText={setReminder}
      value={reminder}
      placeholder={i18n.t('reminder')}
    />

      <Pressable style={styles.button} onPress={() => toggleDateTimePicker()}>
        <Text style={styles.text}>{i18n.t('frequency') }</Text>
      </Pressable>
      <DateTimePicker
        minimumDate={new Date()}
        value={dateTime}
        mode="datetime"
        is24Hour={true}
        display="spinner"
        // onChange={handleDateTimeChange}
      />


    <Pressable style={styles.button} onPress={() => toggleFrequencyViewer()}>
      <Text style={styles.text}>{i18n.t('frequency')}</Text>
    </Pressable>
    {showFrequencyViewer && (
      <Picker
        selectedValue={repeatInterval}
        onValueChange={setRepeatInterval}
      >
        {repeatIntervals.map(interval => (
          <Picker.Item key={interval} label={interval} value={interval} />
        ))}
      </Picker>
    )} 
    {/* if repeatInterval is not None, show the end date picker */}
    
    {repeatInterval !== "None" && (
      <>
        <Text style={styles.subHeader}>{i18n.t('pickEndDate')}</Text>
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={handleEndDateChange}
        />
      </>
    )}

    <Pressable style={styles.button} onPress={handleSubmit}>
      <Text style={styles.text}>{i18n.t('submit')}</Text>
    </Pressable>
  </View>
  ); } 
  else {return (
    <View style={styles.container}>
      <Text style={styles.Header}>{i18n.t('reminders')}</Text>
      <FlatList
    data={reminders}
    renderItem={({ item }) => (
    <View style={styles.reminder}>
      {item.isEditing ? (
        <>
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange(text, item._id, 'title')}
            value={item.title}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange(text, item._id, 'reminder')}
            value={item.reminder}
          />
      <Pressable style={styles.button} onPress={() => toggleDatePicker()}>
        <Text style={styles.text}>Pick Date</Text>
      </Pressable>
      {showDatePicker && 
      <DateTimePicker
        minimumDate={new Date()}
        value={date}
        mode="datetime"
        is24Hour={true}
        display="spinner"
        // onChange={handleDateTimeChange}
      />}

      <Pressable style={styles.button} onPress={() => toggleTimePicker()}>
        <Text style={styles.text}>PickTime</Text>
      </Pressable>
      {showTimePicker &&
      <DateTimePicker
        minimumDate={new Date()}
        value={time}
        mode="time"
        is24Hour={true}
        display="spinner"
        // onChange={handleDateTimeChange}
      />}
         <Pressable style={styles.button} onPress={() => toggleFrequencyViewer()}>
          <Text style={styles.text}>{i18n.t('frequency') }</Text>
        </Pressable>
          {showFrequencyViewer && (
            <Picker
              selectedValue={item.repeatInterval}
              onValueChange={(text) => handleInputChange(text, item._id, 'repeatInterval')}
            >
              {repeatIntervals.map(interval => (
                <Picker.Item key={interval} label={interval} value={interval} />
              ))}
            </Picker>
          )}
            <>
               <Pressable style={styles.button} onPress={() => toggleEndDate()}>
                <Text style={styles.text}>{i18n.t('pickEndDate')}</Text>
              </Pressable>
              {showEndDate && 
              <DateTimePicker
                value={new Date(item.endDate)}
                mode="date"
                display="spinner"
                minimumDate={new Date()}
                // onChange={handleEndDateChange}
              />}
            </>
        </>
      ) : (
        <>
          <Text style={styles.reminderTitle}>{item.title}</Text>
          <Text style={styles.reminderText}>{item.reminder}</Text>
          <Text style={styles.reminderText}>{new Date(item.time).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',})}</Text>
          {item.repeatInterval !== "None" && (
            <Text style={styles.reminderText}>Repeat: {item.repeatInterval}</Text>
          )}
          {item.repeatInterval !== "None" && (
            <Text style={styles.reminderText}>End Date: {new Date(item.endDate).toLocaleDateString()}</Text>
          )}
        </>
        )}
        <Pressable style={styles.button} onPress={() => handleEditReminder(item._id)}>
          <Text style={styles.text}>{item.isEditing ? 'Save' : 'Edit'}</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => handleDeleteReminder(item._id)}>
          <Text style={styles.text}>{i18n.t('Delete')}</Text>
        </Pressable>
      </View>
    )}
    keyExtractor={item => item._id.toString()}
    />

     < Text style = {styles.Header} > {i18n.t('addReminder')} </Text>
    <TextInput
      style={styles.input}
      onChangeText={setTitle}
      value={title}
      placeholder={i18n.t('title')}
    />
    <TextInput
      style={styles.input}
      onChangeText={setReminder}
      value={reminder}
      placeholder={i18n.t('reminder')}
    />

      <Pressable style={styles.button} onPress={() => toggleDatePicker()}>
        <Text style={styles.text}>Pick Date</Text>
      </Pressable> 
      {showDatePicker && 
      <DateTimePicker
        minimumDate={new Date()}
        value={date}
        mode="date"
        is24Hour={true}
        display="spinner"
        onChange={handleDateChange}
      />}

      <Pressable style={styles.button} onPress={() => toggleTimePicker()}>
        <Text style={styles.text}>PickTime</Text>
      </Pressable>
      {showTimePicker &&
      <DateTimePicker
        minimumDate={new Date()}
        value={time}
        mode="time"
        is24Hour={true}
        display="spinner"
        onChange={handleTimeChange}
      />}

    {/* <Pressable style={styles.button} onPress={() => toggleFrequencyViewer()}>
      <Text style={styles.text}>{i18n.t('frequency')}</Text>
    </Pressable>
    {showFrequencyViewer && (
      <Picker
        selectedValue={repeatInterval}
        onValueChange={setRepeatInterval}
      >
        {repeatIntervals.map(interval => (
          <Picker.Item key={interval} label={interval} value={interval} />
        ))}
      </Picker>
    )}  */}
    {/* if repeatInterval is not None, show the end date picker */}
    
    {repeatInterval !== "None" && (
      <>
        <Pressable style={styles.button} onPress={() => toggleEndDate()}>
          <Text style={styles.text}>{i18n.t('pickEndDate')}</Text>
        </Pressable>
        {showEndDate && 
        <DateTimePicker
          value={new Date(item.endDate)}
          mode="date"
          display="spinner"
          minimumDate={new Date()}
          // onChange={handleEndDateChange}
        />}
      </>
    )}

    <Pressable style={styles.button} onPress={handleSubmit}>
      <Text style={styles.text}>{i18n.t('submit')}</Text>
    </Pressable>
    {/* <Pressable style={styles.button} onPress={() => router.replace("/")}>
        <Text style={styles.text}>{i18n.t('home')}</Text>
    </Pressable> */}

  </View>
  )}
};

export default Reminders;
