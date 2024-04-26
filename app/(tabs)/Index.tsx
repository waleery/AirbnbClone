import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import { Stack } from "expo-router";
import { View } from "react-native";

const Page = () => {
    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{ header: () => <ExploreHeader /> }} />
            <Listings />
        </View>
    );
};
export default Page;
