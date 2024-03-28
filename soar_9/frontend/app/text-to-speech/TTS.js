import { View, Pressable, Text } from 'react-native';
import * as Speech from 'expo-speech';
import { getLanguage } from './LanguageTTS';
import { FaPlay, FaStop } from 'react-icons/fa'; // Importing play and stop icons from Font Awesome


export function TTS({input, styles}) {

    const language = async () => {return await getLanguage()}


    const speak = async () => {
        const getLang = await language();
        console.log("your input :" + input);
        const options = {
            language: getLang,
        };
    
        try {
            Speech.speak(input, options);
        } catch (error) {
            console.error("Speech API error:", error);
        }
    };

    const stop = async () => {
        try {
            await Speech.stop();
        } catch (error) {
            console.error("Stop error:", error);
        }
    }


    return (
        <View style={[styles.question, {flexDirection: 'row', width: '100%', justifyContent:'flex-end'}]}>
            <Pressable style={styles.ttsbutton} onPress={speak}>
                <FaPlay style={styles.text}/>
            </Pressable>
            <Pressable style={styles.ttsbutton} onPress={stop}>
                <FaStop style={styles.text} />
            </Pressable>
        </View>
    );
}
export default TTS;