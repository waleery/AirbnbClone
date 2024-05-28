import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
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
        <View>
            <View style={styles.headerContainer}>
                <Text>Profile</Text>
                <Ionicons name="notifications-outline" size={26} />
            </View>
            <Button title="Log out" onPress={() => signOut()} />
            {!isSignedIn ? (
                <Link href="/(modals)/login">
                    <Text>Login</Text>
                </Link>
            ) : null}
        </View>
    );
};
export default Page;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 24,
        alignItems:"center"
    },
});
