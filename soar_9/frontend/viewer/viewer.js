import React, { useState, useEffect} from 'react';
import "../viewer/viewer.css";
import ToggleButton from '../viewer/ToggleButton'; // Import the ToggleButton component
import { fetchButtonStatesFromBackend, updateButtonStateOnBackend } from '../api.mjs';
import { StyleSheet, View, Text} from 'react-native';

function Viewer() {
  // State to keep track of the button's toggled status
  const [buttons, setButtons] = useState([]);

  // Fetch the button states from the backend
  useEffect(() => {
    fetchButtonStatesFromBackend().then(fetchedButtons => {
      setButtons(fetchedButtons);
    });
  }, []); // Empty dependency array means this effect runs once on mount
  

  // Function to toggle the button
  function toggleButton(id) {
    console.log(id);
    const updatedButtons = buttons.map(button => {
      if (button._id === id) {
        // state = state === 'on' ? 'off' : 'on'; // Adjusted to use button.state
        button.state = button.state === 'on' ? 'off' : 'on'; // Adjusted to use button.state
      }
      return button;
    });
  
    setButtons(updatedButtons);
  
    // Send the updated state to the backend
    console.log("id", id);
    console.log("state", updatedButtons.find(button => button._id === id));
    updateButtonStateOnBackend(id, updatedButtons.find(button => button._id === id).state);
  }
  

  // Render "no button" text if no buttons are added
  if (buttons.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No button</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <ToggleButton
        key={button._id} // Assuming each button has a unique ID
        number={button.id} // Or any other identifier you use
        isToggled = {button.state}
        onToggle={() => toggleButton(button._id)} // Pass the function to handle toggling
      />
      
      ))}
    </View>
  );
  
}

export default Viewer;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});