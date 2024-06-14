import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";
import { accomodation_categories } from "@/constants/categories";
import { Stack } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";
import listingsDataGeo from "@/assets/data/airbnb-listings.geo.json";
import { ListingGeo } from "@/types/listingGeo";

import ListingsMap from "@/components/ListingsMap";
import ListingsBottomSheet from "@/components/ListingsBottomSheet";
import { defaultStyles } from "@/constants/Styles";
import { useAtom } from "jotai";
import { listingsAtom } from "@/store/listingsStore";

const Page = () => {
    const [category, setCategory] = useState(accomodation_categories[0].name);
    const [listings] = useAtom(listingsAtom);
    const listingsGeo = useMemo(() => listingsDataGeo as ListingGeo, []);

    const onDataChanged = (category: string) => {
        setCategory(category);
    };

    return (
        <View style={defaultStyles.flex}>
            <Stack.Screen
                options={{
                    header: () => (
                        <ExploreHeader onCategoryChanged={onDataChanged} />
                    ),
                }}
            />
            {/* <Listings category={category} listings={listings} /> */}
            <ListingsMap listings={listingsGeo} />
            <ListingsBottomSheet listings={listings} category={category} />
        </View>
    );
};
export default Page;
