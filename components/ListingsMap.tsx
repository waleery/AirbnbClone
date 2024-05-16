import { ListingGeo } from "@/types/listingGeo";
import { View, Text } from "react-native";

interface Props {
    listings: ListingGeo[];
}

const ListingsMap = ({ listings }: Props) => {
    return (
        <View>
            <Text>ListingsMap</Text>
        </View>
    );
};
export default ListingsMap;
