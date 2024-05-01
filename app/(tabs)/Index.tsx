import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import { accomodation_categories } from "@/constants/categories";
import { Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

const Page = () => {

    const [category, setCategory] = useState(accomodation_categories[0].name)

    const onDataChanged = (category: string)=> {
        setCategory(category)
    }

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{ header: () => <ExploreHeader onCategoryChanged={onDataChanged}/> }} />
            <Listings />
        </View>
    );
};
export default Page;
