import { StyleSheet } from "react-native";
import { colors } from "../../style/app.style";

export const styles = StyleSheet.create({
    buttonContainer: {
        height: 80,
        maxHeight: 80,
        paddingVertical: 10,
        width: '100%',
    },
    input: {
        width: '100%',
        borderRadius: 20,
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: colors.primaryBack,
        borderColor: colors.primary,
        borderWidth: 0.18,
        padding: 10,
        textAlign: 'left'
    }
});