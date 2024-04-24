import { useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { View, Text, Button } from "react-native";
const Page = () => {
    const { signOut, isSignedIn } = useAuth();
    return (
        <View>
            <Button title="Sign out" onPress={() => signOut()} />
            {!isSignedIn ? (
                <Link href="/(modals)/login">
                    <Text>Log in</Text>
                </Link>
            ) : null}
        </View>
    ); 
};
export default Page;
