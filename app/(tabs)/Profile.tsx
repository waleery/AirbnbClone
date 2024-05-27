import { useAuth, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
const Page = () => {
    const { signOut, isSignedIn } = useAuth();

    const {user} = useUser()
    const [firstName, setFirstName]= useState(user?.firstName)
    const [lastName, setLastName]= useState(user?.lastName)
    const [email, setEmail]= useState(user?.emailAddresses)
    const [edit, setEdit]= useState(false)

    useEffect(() => {
        if(!user){
            return
        }
    }, [user]);
    
    return (
        <View>
            <Button title="Log out" onPress={() => signOut()} />
            {!isSignedIn ? (
                <Link href="/(modals)/login">
                    <Text>Log in</Text>
                </Link>
            ) : null}
        </View>
    ); 
};
export default Page;
