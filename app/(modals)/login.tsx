import { defaultStyles } from "@/constants/Styles";
import colors from "@/constants/colors";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { Ionicons } from "@expo/vector-icons";
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

            <View style={styles.containerPadding}>
                <TouchableOpacity style={defaultStyles.btnOutline}>
                    <Ionicons name="call-outline" style={defaultStyles.btnIcon} size={24}/>
                    <Text style={defaultStyles.btnOutlineText}>
                        Continue with Phone
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={defaultStyles.btnOutline}>
                    <Ionicons name="logo-apple" style={defaultStyles.btnIcon} size={24}/>
                    <Text style={defaultStyles.btnOutlineText}>
                        Continue with Apple
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={defaultStyles.btnOutline}>
                    <Ionicons name="logo-google" style={defaultStyles.btnIcon} size={24}/>
                    <Text style={defaultStyles.btnOutlineText}>
                        Continue with Google
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={defaultStyles.btnOutline}>
                    <Ionicons name="logo-facebook" style={defaultStyles.btnIcon} size={24}/>
                    <Text style={defaultStyles.btnOutlineText}>
                        Continue with Facebook
                    </Text>
                </TouchableOpacity>
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
    containerPadding:{
        gap:15
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
