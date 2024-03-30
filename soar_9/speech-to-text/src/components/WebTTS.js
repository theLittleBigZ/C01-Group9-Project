import React, { useState, useEffect } from 'react';
import { getStyles} from '../Styling/Styles.js';

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
    const [response, setResponse] = useState(null);
    const styles = getStyles();

    const speak = (response) => {
        if(response !== '') {
            setIsSpeaking(true);
            const speakText = new SpeechSynthesisUtterance(response);
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


    const converse = async (transcript) => {
        try {
        const response = await fetch('https://ttpeqnda.the403.xyz/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'tinyllama',
            prompt: transcript,
            stream: false
          })
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.text();  // Use .text() instead of .json()
        setResponse(data);  // Now data should be a string
      } catch (error) {
        console.error('Error:', error);
      }
        //setResponse(response);
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
                converse(transcript);
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
            <div style={styles.question} className='box'>
                <h2 style={styles.Header}>Voice Command</h2>

                <div>
                    {isRecording ?
                    <button style={styles.button} onClick={() => setIsRecording(prevState => !prevState)}>
                        <span style={styles.text}>End</span>
                    </button>
                    : <button style={styles.button} onClick={() => setIsRecording(prevState => !prevState)} disabled={response !== null}>
                        <span style={styles.text}>Speak</span>
                    </button>}

                    <button style={styles.button} onClick={() => speak(response)} disabled={isSpeaking || response === null}>
                        <span style={styles.text}>Hear Reply</span>
                    </button>

                    <button style={styles.button} onClick={() => setResponse(null)}>
                        <span style={styles.text}>Clear</span>
                    </button>
                </div>

                <div>
                    <p style={styles.text}>{response}</p>
                </div>

            </div>

        </div>
        </>

    )

}
export default Listen;
