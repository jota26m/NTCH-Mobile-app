import { StyleSheet } from "react-native";
import { colors } from "../../style/app.style";

export const styles = StyleSheet.create({
    buttonContainer: {
        paddingVertical: 10,
        width: '100%',
    },
    button: {
        width: '100%',
        borderRadius: 20,
        alignContent: 'center',
        justifyContent: 'center',
        height: 60,
        maxHeight: 60,
        backgroundColor: colors.primary
    },
    buttonText: {
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#ffffff',
        fontSize: 18
    }
});