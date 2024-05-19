import { Feature } from "@/types/listingGeo";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface Props {
    listings: ListingGeo;
}

const INITIAL_REGION = {
    latitude: 51,
    longitude: 11,
    latitudeDelta: 9,
    longitudeDelta: 9,
};

const ListingsMap = ({ listings }: Props) => {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsMyLocationButton
                initialRegion={INITIAL_REGION}
            >
                {listings.features.map((item: Feature) => (
                    <Marker
                        key={item.properties.id}
                        coordinate={{
                            latitude: +item.properties.latitude,
                            longitude: +item.properties.longitude,
                        }}
                    />
                ))}
            </MapView>
        </View>
    );
};
export default ListingsMap;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: "100%",
        height: "100%",
    },
});
