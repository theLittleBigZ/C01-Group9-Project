import { Stack } from "expo-router";
import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

export default function Layout() {

    function getTime() {
        var date = new Date();
	    var current_time = date.getHours().toString().padStart(2, '0')+":"+date.getMinutes().toString().padStart(2, '0');
        return (current_time)
    }

    function getDate() {
        const date = new Date().toUTCString();
        const extractedDateTime = date.slice(0, 16);
        return(extractedDateTime)
    }

    const [time, setTime] = useState(getTime());
    const [date, setDate] = useState(getDate());



    useEffect(() => {
        const updateScreen = setInterval(() => {
            setTime(getTime());
            setDate(getDate());
        }, 6000)
        //return () => clearInterval(updateScreen)
    }, [time, date])

    return (
        <Stack style={{
            width: '100%',
        }}
        screenOptions={{
            headerStyle: {
                backgroundColor: '#1f0160',
                width: '100%',
            },
            headerTintColor: "'#1f0160'",
            headerTitleStyle: {
                fontWeight: "bold",
                color: 'white',
                textAlign: 'center',
            }
        }}

        >
            <Stack.Screen name="Homescreen" options={{
                //title: time+ ' '+date,
                headerTitle: props => (<Text style={{
                    fontWeight: "bold",
                    color: 'white',
                    width: '100%',
                    justifyContent: 'center',
                }}>{time+' '+date}</Text>)
            }}/**options={{headerShown: false}} */ />
            <Stack.Screen name="Profile" options={{
                title: 'Profile Page'
            }}/>
            <Stack.Screen name="AllApps" options={{
                title: 'View All Apps'
            }}/>
        </Stack>
    )
}