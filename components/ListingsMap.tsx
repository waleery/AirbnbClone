import { Feature, ListingGeo } from "@/types/listingGeo";
import { useRouter } from "expo-router";
import { useCallback } from "react";
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
    const router = useRouter();

    const onMarkerSeleted = useCallback(
        (item: Feature) => () => {
            router.push(`/listing/${item.properties.id}`);
        },
        []
    );

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
                        onPress={onMarkerSeleted(item)}
                    >
                        <View style={styles.marker}>
                            <Text style={styles.markerPrice}>
                                € {item.properties.price}
                            </Text>
                        </View>
                    </Marker>
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
    marker: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        padding: 6,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius:6,
        shadowOffset:{
            width:1,
            height:10
        }
    },
    markerText:{
        fontSize:14
    }
});
