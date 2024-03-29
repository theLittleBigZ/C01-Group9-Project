import React, { useState, useEffect } from 'react';
import { getStyles} from '../Styling/Styles.js';
import Form from 'react-bootstrap/Form';
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
    const [lang, setLang] = useState('en-CA');


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

    const onChangeLang = (e) => {
        mic.lang = e.target.value;
        console.log(mic.lang);
    }


    return (
        <>
        <div style={styles.container} className='container'>
            <div style={styles.question} className='box'>
                <h2 style={styles.Header}>Speech-To-Text</h2>


                <Form.Select style={styles.button} onChange={onChangeLang}>
                    <option>Select Language</option>
                    <option value="ar-SA">العربية (Arabic)</option>
                    <option value="bn-BD">বাংলা (Bengali)</option>
                    <option value="en-CA">English (Canadian)</option>
                    <option value="fr-FR">Français (French)</option>
                    <option value="hi-IN">हिंदी (Hindi)</option>
                    <option value="id-ID">Bahasa Indonesia (Indonesian)</option>
                    <option value="zh-CN">中文 (Mandarin)</option>
                    <option value="pt-PT">Língua Portuguesa (Portuguese)</option>
                    <option value="ru-RU">русский язык (Russian)</option>
                    <option value="es-ES">Español (Spanish)</option>
                    <option value="th-TH">ภาษาไทย (Thai)</option>
                </Form.Select>

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