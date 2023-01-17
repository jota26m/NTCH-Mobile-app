import { StyleSheet } from "react-native";
import { colors } from "../../style/app.style";

export const styles = StyleSheet.create({
    buttonContainer: {
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        borderRadius: 15,
        backgroundColor: colors.primary
    },
    buttonText: {
        alignSelf: 'center',
        textTransform: 'uppercase',
        color: '#ffffff',
        fontSize: 40
    },
    icon: {
        color: '#ffffff',
    }
});