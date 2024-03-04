import * as Permissions from 'expo-permissions';

const Contacts = () => {
    useEffect(() => {
        askForContactPermission();
      }, []);

    const askForContactPermission = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status !== 'granted') {
          console.log('Contact permission denied');
        }
    };

    const getContacts = async () => {
        const { status, data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
    
        if (status === 'granted') {
          console.log('Contacts:', data);
          // Want to display contact cards and allow for favouriting and search
        } else {
          console.log('Contact permission denied');
          // Handle denial or use a fallback
        }
      };
}


  