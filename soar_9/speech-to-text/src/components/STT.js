import React, { useState, useEffect } from 'react';

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
        alert("Copied the text: " + copyText); // Alert the copied text
      }


    return (
        <>
        <h1>Speech to Text and Voice Commands</h1>
        <div className='container'>
            <div className='box'>
                <h2>Speech-To-Text</h2>

                {isRecording ?
                <button onClick={() => setIsRecording(prevState => !prevState)}>Stop</button>
                : <button onClick={() => setIsRecording(prevState => !prevState)}>Start</button>}

                <button onClick={() => setResult(null)}>Clear</button>

                <button onClick={handleCopyText} disabled={!result}>Copy Text to Clipboard</button>
                <p>{result}</p>
            </div>

        </div>
        </>

    )

}
export default STT;