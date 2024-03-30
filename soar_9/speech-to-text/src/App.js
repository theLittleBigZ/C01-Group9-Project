import React from 'react';
import './App.css';
import STT from './components/STT';
import WebTTS from './components/WebTTS';
import { getStyles} from './Styling/Styles.js';

function App() {
  const styles = getStyles();
  return (
    <div  style={styles.container}>
      <h2 style={styles.Header}>Speech-To-Text and Voice Commands</h2>
      <STT/>
      <WebTTS />
    </div>
  );
}

export default App;
