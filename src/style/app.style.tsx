import { StyleSheet } from "react-native";

export const colors = {
    primary: '#839c37',
    primaryBack: '#839c3722',
    secondary: '#888888',
    background: '#007785',
    buttonPrimary: '#E8807B',
    alert: '#E8D064',
    text: '#838383'

}

export const appStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
    },
    secondaryButton: {
      height: 30,
      backgroundColor: colors.secondary
    }

});