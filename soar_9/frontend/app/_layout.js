import { Stack } from "expo-router";
import Homescreen from "./Homescreen";

export default function Layout() {

    function getTime() {
        var date = new Date();
	    var current_time = date.getHours()+":"+date.getMinutes();
        return (current_time)
    }

    function getDate() {
        const date = new Date().toUTCString();
        const extractedDateTime = date.slice(0, 16);
        return(extractedDateTime)
    }

    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: '#1f0160',
            },
            headerTintColor: "'#1f0160'",
            headerTitleStyle: {
                fontWeight: "bold",
                color: 'white',
            }
        }}

        >
            <Stack.Screen name="Homescreen"options={{
                title: getTime()+' '+getDate(),
            }}/**options={{headerShown: false}} */ />
            <Stack.Screen name="Profile" />
            <Stack.Screen name="AllApps" />
        </Stack>
    )
}