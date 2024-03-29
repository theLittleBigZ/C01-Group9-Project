import React, { useState, useEffect } from 'react';
import { getStyles} from '../Styling/Styles.js';

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

    const styles = getStyles();
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
                if(result === null) {
                    setResult(transcript)
                } else {
                    setResult(result + ' ' + transcript);
                }

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
            <div style={styles.question} className='box'>
                <h2 style={styles.Header}>Speech-To-Text</h2>

                {isRecording ?
                <button style={styles.button} onClick={() => setIsRecording(prevState => !prevState)}>
                    <span style={styles.text}>Stop</span>
                </button>
                : <button style={styles.button} onClick={() => setIsRecording(prevState => !prevState)}>
                    <span style={styles.text}>Start</span>
                </button>}

                <button style={styles.button} onClick={() => setResult(null)}>
                    <span style={styles.text}>Clear</span>
                </button>

                <button style={styles.button} onClick={handleCopyText} disabled={!result}>
                    <span style={styles.text}>Copy Text to Clipboard</span>
                </button>

                <div>
                    <p>{result}</p>
                </div>

            </div>

        </div>
        </>

    )

}
export default STT;