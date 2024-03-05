import React, { useEffect, useState, useRef } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';

function AddApp({saveApp, sampleApps}) {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef=useRef(null);
    const viewRef=useRef(null);

    return (
        <View ref={viewRef}>
            <Menu
                ref={dropdownRef}
                visible={dropdownOpen}
                onDismiss={() => setDropdownOpen(false)}
                anchor={
                    <Button
                        placeholder='add app'
                        placeholderTextColor={'grey'}
                        onPress={(e)=>setDropdownOpen(true)}
                        title='Select app to save'
                        //style={styles.input}
                    />
                }
                anchorPosition='bottom'
            >
                {sampleApps.map((app)=>(
                    <Menu.Item eventKey={app.appName} title={app.appName} onPress={()=>{saveApp(app.appName); setDropdownOpen(false)}} />
                ))}
            </Menu>
        </View>
    );
}
export default AddApp;

const styles = StyleSheet.create({
    //input: {
    //  height: 40,
    //  borderColor: 'gray',
    //  borderWidth: 1,
    //  marginBottom: 10,
    //  paddingHorizontal: 10,
    //},
    // dropdownItem: {
    //     position: 'absolute',
    //     zIndex: 5000,
    //     top: '50px !important',
    //     left: '50px !important',
    //     backgroundColor: 'blue',
    // }
});