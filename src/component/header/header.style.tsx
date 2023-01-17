import { noAuto } from "@fortawesome/fontawesome-svg-core";
import { Platform, StyleSheet } from "react-native";
import { colors } from "../../style/app.style";

export const styles = StyleSheet.create({
    headerContainer: {
        height: Platform.OS === 'ios' ? 100 : 65,
        maxHeight: Platform.OS === 'ios' ? 100 : 65,
        backgroundColor: colors.primary,
        paddingTop: Platform.OS === 'ios' ? 35 : 5,
        paddingBottom: 5
    },
    imageContainer: {
        flex: 1
    },
    imageBackground: {
        resizeMode: 'contain',
    },
    buttonsContainer: {
        paddingTop: Platform.OS === 'ios' ? 35 : 5,
        flexDirection: 'row'
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
    backButton: {
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingLeft: 5
    },
    backIcon: {
        color: '#ffffff'
    },
    rightButtonsContainer: {
        flexDirection: 'row',
        marginLeft: 'auto',
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
        paddingLeft: 5
    }
});