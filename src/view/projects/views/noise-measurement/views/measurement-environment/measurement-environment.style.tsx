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
    resultGroup: {
      width: '100%',
      flexDirection: 'column',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.primary,
      height: 100
    },
    resultGroupTop: {
      backgroundColor: colors.primary,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    resultGroupReceptor: {

    },
    resultGroupBottom: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'

    },
    resultGroupValue: {

    },
  });