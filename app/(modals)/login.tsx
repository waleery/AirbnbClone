import { defaultStyles } from "@/constants/Styles";
import colors from "@/constants/colors";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
const Page = () => {
    useWarmUpBrowser();

    return (
        <View style={styles.container}>
            <TextInput
                autoCapitalize="none"
                placeholder="Email"
                style={[defaultStyles.inputField, { marginBottom: 30 }]}
            />
            <TouchableOpacity style={defaultStyles.btn}>
                <Text style={defaultStyles.btnText}>Continue</Text>
            </TouchableOpacity>
            <View style={styles.separatorView}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>or</Text>
                <View style={styles.separatorLine} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 26,
    },
    separatorView: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        marginVertical: 30,
    },
    separatorLine: {
        flex: 1,
        borderBottomColor: "black",
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    separatorText: {
        color: colors.grey,
    },
});
export default Page;
