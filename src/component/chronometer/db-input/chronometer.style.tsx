import { StyleSheet } from "react-native";
import { colors } from "../../../style/app.style";

export const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    inputGroup: {
        width: '100%',
        flexDirection: 'column',
        flex: 1,
        backgroundColor: colors.primary,
        borderRadius: 20,
        overflow: 'hidden'
    },
    top: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: colors.secondary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottom: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: colors.primary
    },
    input: {
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        height: '100%',
        backgroundColor: '#ffffff',
        borderColor: colors.primary,
        borderWidth: 0.18,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 17
    },
    left: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    right: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    },
    text: {
        color: '#ffffff'
    }
});