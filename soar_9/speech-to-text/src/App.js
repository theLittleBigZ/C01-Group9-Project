import React from 'react';
import './App.css';
import STT from './components/STT';
import WebTTS from './components/WebTTS';
import { styles} from './Styling/Styles.js';

function App() {
  return (
    <div  style={styles.container}>
      <h1 style={styles.Header}>Speech-To-Text and Voice Commands</h1>
      <STT/>
      <WebTTS />
    </div>
  );
}

export default App;
