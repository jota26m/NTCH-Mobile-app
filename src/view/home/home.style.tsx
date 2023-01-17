import { StyleSheet } from "react-native";
import { colors } from "../../style/app.style";

export const styles = StyleSheet.create({
    subscribe: {
      borderRadius: 15,
      borderWidth: 2,
      padding: 10,
      width: '100%',
      borderColor: colors.primary,
      paddingBottom: 50
    },
    greeting: {
      textAlign: 'left',
      width: '100%',
      fontSize: 30,
      fontWeight: '200',
      color: colors.text,
      marginBottom: 15
    },
    subscribeText: {
      fontSize: 18,
      fontWeight: '400',
      color: colors.text,
      marginBottom: 8,
      textAlign: 'center'
    },
    subscribeButtonContainer: {
    },
    subscribeButton: {
      minWidth: '100%',
      position: 'absolute',
      bottom: -95
    }
  });