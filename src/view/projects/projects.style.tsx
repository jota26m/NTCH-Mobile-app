import { StyleSheet } from "react-native";
import { colors } from "../../style/app.style";

export const styles = StyleSheet.create({
    contentContainer: {
      
    },
    header: {
      width: '100%',
      marginTop: 5
    },
    headerText: {
      fontSize: 20,
      fontWeight: '200',
      color: '#000000',
      textAlign: 'left',
    },
    searchContainer: {
      width: '100%'
    },
    addButton: {
      position: 'absolute',
      bottom: '5%'
    },
    projectsContainer: {
      height: '100%',
      width: '100%',
      flexDirection: 'column',
    },
    menuButton: {
        marginLeft: 10,
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingRight: 5
    },
    menuIcon: {
        color: '#ffffff'
    },
  });