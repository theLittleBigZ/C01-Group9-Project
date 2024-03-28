import React, { useState, useEffect } from 'react';
import { styles} from '../Styling/Styles.js';

//get speech recognition from the web (webkit for chrome)
const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
console.log(new SpeechRecognition());
const mic = new SpeechRecognition();

mic.continuous = true;
mic.intermResults = true;
mic.lang = 'en-CA';

const synth = window.speechSynthesis;



const Listen = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [result, setResult] = useState(null);


    const speak = (result) => {
        if(result !== '') {
            setIsSpeaking(true);
            const speakText = new SpeechSynthesisUtterance(result);
            speakText.lang = 'en-CA';

            //once speak ends, console log
            speakText.onend = e => {
                console.log("Done speaking ....");
            }

            //on speak error
            speakText.onerror = e => {
                console.error('Error occurred');
            }

            synth.speak(speakText);
        }
        setIsSpeaking(false);
    }


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


    return (
        <>
        <div style={styles.container} className='container'>
            <div style={styles.container} className='box'>
                <h2 style={styles.Header}>Voice Command</h2>

                {isRecording ?
                <button style={styles.button} onClick={() => setIsRecording(prevState => !prevState)}>End</button>
                : <button style={styles.button} onClick={() => setIsRecording(prevState => !prevState)} disabled={result !== null}>Speak</button>}

                <button style={styles.button} onClick={() => speak(result)} disabled={isSpeaking || result === null}>Hear Reply</button>
                <button style={styles.button} onClick={() => setResult(null)}>Clear</button>
                <p>{result}</p>
            </div>

        </div>
        </>

    )

}
export default Listen;
