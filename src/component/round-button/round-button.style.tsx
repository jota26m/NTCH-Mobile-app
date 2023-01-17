import { StyleSheet } from "react-native";
import { colors } from "../../style/app.style";

export const styles = StyleSheet.create({
    buttonContainer: {
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        height: 70,
        maxHeight: 70,
        width: 70,
        maxWidth: 70,
        borderRadius: 35,
        backgroundColor: colors.secondary,
    },
    buttonText: {
        textTransform: 'uppercase',
        color: '#ffffff',
        fontSize: 50,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginVertical: 10,
        lineHeight:50
    }
});