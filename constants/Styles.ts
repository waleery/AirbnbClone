import { StyleSheet } from "react-native";
import colors from "./colors";

export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FDFFFF",
    },
    inputField: {
        height: 44,
        borderWidth: 1,
        borderColor: "#ABABAB",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#fff",
    },
    btn: {
        backgroundColor: colors.primary,
        height: 50,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        color:'#fff',
        fontSize:16,
    }
});
