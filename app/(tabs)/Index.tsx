import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import { accomodation_categories } from "@/constants/categories";
import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";
import listingsData from "@/assets/data/airbnb-listings.json";

const Page = () => {
    const [category, setCategory] = useState(accomodation_categories[0].name);
    const listings = useMemo(() => listingsData as any, []);

    const onDataChanged = (category: string) => {
        setCategory(category);
    };

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    header: () => (
                        <ExploreHeader onCategoryChanged={onDataChanged} />
                    ),
                }}
            />
            <Listings category={category} listings={listings} />
        </View>
    );
};
export default Page;
