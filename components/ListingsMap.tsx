import { ListingGeo } from "@/types/listingGeo";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-maps";

interface Props {
    listings: ListingGeo[];
}

const ListingsMap = ({ listings }: Props) => {
    return (
        <View style={styles.container}>
            <MapView style={styles.map}/>
        </View>
    );
};
export default ListingsMap;
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    map:{
        width:"100%",
        height:"100%"
    }
})
