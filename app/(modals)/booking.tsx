import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { defaultStyles } from "@/constants/Styles";
const Page = () => {
    return (
        <BlurView intensity={70} style={styles.container} tint="light">
            <Text>Booking</Text>
        </BlurView>
    );
};
export default Page;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
