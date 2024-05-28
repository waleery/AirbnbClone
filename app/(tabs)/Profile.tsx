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
            {user && (
                <View style={styles.card}>

                </View>
            )}
            {isSignedIn && (
                <Button
                    title="Log out"
                    onPress={() => signOut()}
                    color={colors.dark}
                />
            )}
            {!isSignedIn ? (
                <Link href="/(modals)/login" asChild>
                    <Button title="Log In" color={colors.dark}/>{" "}
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
    card:{
        backgroundColor:'#fff',
        padding:24,
        borderRadius:16,
        marginHorizontal:24,
        marginTop:24,
        elevation:2,
        shadowColor:'#000',
        shadowOpacity:0.2,
        shadowRadius:6,
        shadowOffset:{
            width:1,
            height:2,
        },
        alignItems:'center',
        gap:14,
        marginBottom:24
    }
});
