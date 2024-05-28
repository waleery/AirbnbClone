import { defaultStyles } from "@/constants/Styles";
import colors from "@/constants/colors";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    Image,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
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

    const onSaveUser = async () => {
        setEdit(false);
        try {
            if (!firstName || !lastName) return;
            await user?.update({
                firstName,
                lastName,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const onCaptureImage = async () => {};

    return (
        <SafeAreaView style={defaultStyles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Profile</Text>
                <Ionicons name="notifications-outline" size={26} />
            </View>
            {user && (
                <View style={styles.card}>
                    <TouchableOpacity onPress={onCaptureImage}>
                        <Image
                            source={{ uri: user?.imageUrl }}
                            style={styles.avatar}
                        />
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", gap: 6 }}>
                        {edit ? (
                            <View style={styles.editRow}>
                                <TextInput
                                    placeholder="First name"
                                    value={firstName || ""}
                                    onChangeText={setFirstName}
                                    style={[
                                        defaultStyles.inputField,
                                        { width: 100 },
                                    ]}
                                />
                                <TextInput
                                    placeholder="Last name"
                                    value={lastName || ""}
                                    onChangeText={setLastName}
                                    style={[
                                        defaultStyles.inputField,
                                        { width: 100 },
                                    ]}
                                />
                                <TouchableOpacity onPress={onSaveUser}>
                                    <Ionicons
                                        name="checkmark-outline"
                                        size={24}
                                        color={colors.dark}
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.editRow}>
                                <Text
                                    style={{ fontSize: 22, fontWeight: "bold" }}
                                >
                                    {firstName} {lastName}
                                </Text>
                                <TouchableOpacity onPress={() => setEdit(true)}>
                                    <Ionicons
                                        name="create-outline"
                                        size={24}
                                        color={colors.dark}
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>

                    <Text>{email}</Text>
                    <Text>Since {user?.createdAt?.toLocaleDateString()}</Text>
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
                    <Button title="Log In" color={colors.dark} />
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
    card: {
        backgroundColor: "#fff",
        padding: 24,
        borderRadius: 16,
        marginHorizontal: 24,
        marginTop: 24,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        alignItems: "center",
        gap: 14,
        marginBottom: 24,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.grey,
    },
    editRow: {
        flex: 1,
        height: 60,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },
});
