import React, { useState, useEffect } from 'react';
import { styles} from '../Styling/Styles.js';
//import {themes} from '../Styling/Colours'

//get speech recognition from the web (webkit for chrome)
const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
console.log(new SpeechRecognition());
const mic = new SpeechRecognition();

mic.continuous = true;
mic.intermResults = true;
mic.lang = 'en-CA';

const STT = () => {

    const [isRecording, setIsRecording] = useState(false);
    const [result, setResult] = useState(null);


    //on change to isRecording, run handleRecording
    useEffect(() => {
        const handleRecording = () => {
            //if clicked to start recording
            if(isRecording) {
                mic.start()
                mic.onend = () => {
                    console.log('continue...')
                    mic.start();
                }
            } else{
                mic.stop();
                mic.onend =() => {
                    console.log('Stopped Mic on Click');
                }
            }
            mic.onstart = () => {
                console.log('Mic is on');
            }
            //get transcript, set as result
            mic.onresult = event => {
                const transcript = Array.from(event.results)
                .map(result => result[0])
                .map(result => result.transcript)
                .join('');
                console.log(transcript);
                setResult(transcript);
                mic.onerror = event => {
                    console.log(event.error)
                }
            }
        }
        handleRecording();
    }, [isRecording]);

    function handleCopyText() {
        var copyText = result; // Get the text result

        navigator.clipboard.writeText(copyText);  // Copy the text inside the text field
        alert("Copied: " + copyText + " to Clipboard"); // Alert the copied text
      }


    return (
        <>
        <div style={styles.container} className='container'>
            <div style={styles.container} className='box'>
                <h2 style={styles.Header}>Speech-To-Text</h2>

                {isRecording ?
                <button style={styles.button} onClick={() => setIsRecording(prevState => !prevState)}>Stop</button>
                : <button style={styles.button} onClick={() => setIsRecording(prevState => !prevState)}>Start</button>}

                <button style={styles.button} onClick={() => setResult(null)}>Clear</button>

                <button style={styles.button} onClick={handleCopyText} disabled={!result}>Copy Text to Clipboard</button>
                <p>{result}</p>
            </div>

        </div>
        </>

    )

}
export default STT;