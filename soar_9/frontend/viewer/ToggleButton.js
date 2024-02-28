import React, { useState } from 'react';
import "../viewer/viewer.css";



const ToggleButton = ({ number, isToggled, onToggle }) => {
  // No longer uses internal state for toggle status
  console.log("ToggleButton", number, isToggled);

  return (
    <button onClick={onToggle}> {/* Calls the passed onToggle function */}
      Button {number} is {isToggled === 'on' ? 'On' : 'Off'}
    </button>
  );
};

export default ToggleButton;
