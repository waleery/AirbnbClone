import { Feature, ListingGeo } from "@/types/listingGeo";
import { useRouter } from "expo-router";
import { memo, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView from "react-native-map-clustering";
import { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface Props {
    listings: ListingGeo;
}

const INITIAL_REGION = {
    latitude: 51,
    longitude: 11,
    latitudeDelta: 9,
    longitudeDelta: 9,
};

const ListingsMap = memo(({ listings }: Props) => {
    const router = useRouter();

    const onMarkerSeleted = useCallback(
        (item: Feature) => () => {
            router.push(`/listing/${item.properties.id}`);
        },
        []
    );

    const renderCluster = (cluster: any) => {
        const { id, geometry, onPress, properties, } = cluster;
        const points = properties.point_count;

        return (
            <Marker
                key={`cluster-${id}`}
                coordinate={{
                    longitude: geometry.coordinates[0],
                    latitude: geometry.coordinates[1],
                }}
                onPress={onPress}
            >
                <View style={styles.marker}>
                    <Text style={{ ...styles.markerText, textAlign: "center" }}>
                        {points}
                    </Text>
                </View>
            </Marker>
        );
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsMyLocationButton
                initialRegion={INITIAL_REGION}
                clusterColor="#fff"
                clusterTextColor="#000"
                renderCluster={renderCluster}
                radius={45}
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
                            <Text style={styles.markerText}>
                                € {item.properties.price}
                            </Text>
                        </View>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
});
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
        padding: 7,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowRadius: 6,
        shadowOffset: {
            width: 1,
            height: 10,
        },
    },
    markerText: {
        fontSize: 14,
        fontWeight: "700",
    },
});
