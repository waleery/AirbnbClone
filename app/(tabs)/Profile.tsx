import { defaultStyles } from "@/constants/Styles";
import colors from "@/constants/colors";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, SafeAreaView } from "react-native";
const Page = () => {
    const { signOut, isSignedIn } = useAuth();

    const { user } = useUser();
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress);
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        if (!user) return;
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.emailAddresses[0].emailAddress);
    }, [user]);

    const onSaveUser = async () => {};

    const onCaptureImage = async () => {};

    return (
        <SafeAreaView style={defaultStyles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Profile</Text>
                <Ionicons name="notifications-outline" size={26} />
            </View>
            {isSignedIn && <Button title="Log out" onPress={() => signOut()} color={colors.dark} />}
            {!isSignedIn ? (
                <Link href="/(modals)/login">
                    <Text>Login</Text>
                </Link>
            ) : null}
        </SafeAreaView>
    );
};
export default Page;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 24,
        alignItems: "center",
    },
    header: {
        fontSize: 24,
        fontWeight: "500",
    },
});
