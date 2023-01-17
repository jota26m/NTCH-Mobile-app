import { StyleSheet } from "react-native";
import { colors } from "../../../../../../style/app.style";

export const styles = StyleSheet.create({
    contentContainer: {
    },
    header: {
      width: '100%',
      marginTop: 10
    },
    headerText: {
      fontSize: 18,
      fontWeight: '200',
      color: '#000000',
      textAlign: 'center',
    },
    container: {
      height: '100%',
      width: '100%',
      flexDirection: 'column',
    },
    measurementButtonsContainer: {
      flexDirection: 'row',
      maxHeight: 100
    },
    measurementButton: {
      flex: 1
    },
    noiseSourceTextInput: {
      borderWidth: 1,
      borderRadius: 10,
      flex: 1,
      padding: 15
    },
    pointInfoContainer: {
      width: '100%',
      flexDirection: 'row',
      minHeight: 30,
      marginRight: 5,
      marginVertical: 15
    },
    point: {
      flex: 1,
      width: '100%',
      flexDirection: 'column',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.primary,
      overflow: "hidden",
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
    },
    pointText: {
      flex: 1,
      textAlign: 'center',
      color: '#ffffff',
      fontSize: 12
    },
    pointValue: {
      flex: 3,
      textAlign: 'center',
      color: '#ffffff',
      fontSize: 25,
    },
    measurementContainer: {
      flex: 1,
      backgroundColor: colors.primary,
      minHeight: 30,
      overflow: "hidden",
      marginLeft: 5,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center'
    },
    measurement: {

    },
  });