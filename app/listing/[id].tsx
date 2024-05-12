import { useLocalSearchParams } from "expo-router";
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from "react-native";
import listingsData from "@/assets/data/airbnb-listings.json";
import { Listing } from "@/types/listing";
import Animated, { SlideInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import { defaultStyles } from "@/constants/Styles";

const IMG_HEIGHT = 300;
const { width } = Dimensions.get("window");

const Page = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const listing = (listingsData as Listing[]).find((item) => item.id === id);

    return (
        listing && (
            <View style={styles.container}>
                <Animated.ScrollView>
                    <Animated.Image
                        source={{ uri: listing.xl_picture_url! }}
                        style={styles.image}
                    />
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{listing.name}</Text>
                        <Text style={styles.location}>
                            {listing.room_type} in {listing.smart_location}
                        </Text>
                        <Text style={styles.rooms}>
                            {listing.guests_included}{" "}
                            {listing.guests_included &&
                            listing.guests_included > 1
                                ? "guests"
                                : "guest"}{" "}
                            · {listing.bedrooms} bedrooms · {listing.bathrooms}{" "}
                            bathrooms
                        </Text>
                        {listing.review_scores_rating ? (
                            <Text
                                style={{
                                    flexDirection: "row",
                                    gap: 4,
                                    alignItems: "flex-start",
                                }}
                            >
                                <Ionicons name="star" size={16} />
                                <Text style={styles.ratings}>
                                    {listing.review_scores_rating / 20} ·{" "}
                                    {listing.number_of_reviews} reviews
                                </Text>
                            </Text>
                        ) : null}
                        <View style={styles.divider} />
                        <View style={styles.hostView}>
                            <Image
                                source={{ uri: listing.host_picture_url }}
                                style={styles.host}
                            />

                            <View>
                                <Text
                                    style={{ fontWeight: "500", fontSize: 16 }}
                                >
                                    Hosted by {listing.host_name}
                                </Text>
                                <Text>Host since: {listing.host_since}</Text>
                            </View>
                        </View>
                        <View style={styles.divider} />
                        <Text style={styles.description}>
                            {listing.description}
                        </Text>
                    </View>
                </Animated.ScrollView>
                <Animated.View
                    style={defaultStyles.footer}
                    entering={SlideInDown.delay(200).duration(900)}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <TouchableOpacity style={styles.footerText}>
                            <Text style={styles.footerPrice}>
                                € {listing.price}
                            </Text>
                            <Text style={{marginTop:2}}>night</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[defaultStyles.btn, {paddingHorizontal:20}]}>
                             <Text style={defaultStyles.btnText}>Reserve</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        )
    );
};
export default Page;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    image: {
        height: IMG_HEIGHT,
        width: width,
    },
    infoContainer: { padding: 24, backgroundColor: "#fff" },
    name: { fontSize: 26, fontWeight: "bold" },
    location: { fontSize: 18, marginTop: 10 },
    rooms: { fontSize: 16, color: colors.grey, marginVertical: 4 },
    ratings: { fontSize: 16 },
    divider: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: colors.grey,
        marginVertical: 16,
    },
    hostView: { flexDirection: "row", alignItems: "center", gap: 12 },
    host: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: colors.grey,
    },
    description: { fontSize: 16, marginTop: 10 },
    footerText: {
        height: "100%",
        justifyContent: "center",
        alignItems:"center",
        flexDirection: "row",
        gap: 4,
    },
    footerPrice: { fontSize: 18, fontWeight: "bold" },
});
