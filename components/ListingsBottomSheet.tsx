import { Listing } from "@/types/listing";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import { View, Text } from "react-native";
import Listings from "./Listings";

interface Props {
    listings: Listing[];
    category: string;
}

const ListingsBottomSheet = ({ listings, category }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoitns = useMemo(() => ["10%", "100%"], []);

    return (
        <BottomSheet ref={bottomSheetRef} snapPoints={snapPoitns}>
            <View style={{ flex: 1 }}>
                <Listings listings={listings} category={category} />
            </View>
        </BottomSheet>
    );
};
export default ListingsBottomSheet;
