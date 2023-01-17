import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 10,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    contentContainer: {
      marginTop: '40%',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: 5,
      margin: 15,
      overflow: 'hidden'
    },
    greeting: {
      fontSize: 50,
      fontWeight: '200',
      color: '#000000',
      marginBottom: 15
    },
    makeSignIn: {
      fontSize: 16,
      fontWeight: '400',
      color: '#000000',
      marginBottom: 8
    },
    registerButtonContainer: {
      paddingVertical: 20,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'row'
    }
  });