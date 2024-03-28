import React from 'react';
import './App.css';
import STT from './components/STT';
import WebTTS from './components/WebTTS';

function App() {
  return (
    <div >
      <h1>Speech-To-Text and Voice Commands</h1>
      <STT/>
      <WebTTS />
    </div>
  );
}

export default App;
