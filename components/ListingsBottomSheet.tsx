import { Listing } from "@/types/listing";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef } from "react";
import { View, Text } from "react-native";
import Listings from "./Listings";
import colors from "@/constants/colors";

interface Props {
    listings: Listing[];
    category: string;
}

const ListingsBottomSheet = ({ listings, category }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoitns = useMemo(() => ["10%", "100%"], []);

    return (
        <BottomSheet index={1} ref={bottomSheetRef} snapPoints={snapPoitns} handleIndicatorStyle={{backgroundColor:colors.grey}}>
            <View style={{ flex: 1 }}>
                <Listings listings={listings} category={category} />
            </View>
        </BottomSheet>
    );
};
export default ListingsBottomSheet;
