import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import listingsData from '@/assets/data/airbnb-listings.json'
import { Listing } from "@/types/listing";
const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const listing = (listingsData as Listing[]).find((item) => item.id == id)
    console.log(listing)
    return (
        <View>
            <Text>Page</Text>
        </View>
    );
};
export default Page;
