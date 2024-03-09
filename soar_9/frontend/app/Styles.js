import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8c80ab',
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    margin: 10,
    flexDirection:'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#28264C',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 20, 
    width: '90%',
  },
  Header: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: 'black',
    width: '100%',
    textAlign: 'center'
  },
  icon: {
    padding: 5,
    fontSize: 50,
    color: 'white',
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  item: {
    flex: 1,
    margin: 10, 
    fontSize: 30,
    color: 'white',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  question: {
    margin: 10,
    flexDirection:'column',
    padding: 10,
  },
  questionfont: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: '450',
  },
  slider: {
    height: 50,
    width: '100%',
  },
  words: {
    color: 'white',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});

export default styles;