import { Listing } from "@/types/listing";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    FlatList,
    ListRenderItem,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
interface Props {
    listings: Listing[];
    category: string;
}
const Listings = ({ category, listings: items }: Props) => {
    const [loading, setLoading] = useState(false);
    const listRef = useRef<FlatList>(null);

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 200);

        console.log("RELOAD LISTINGS, listings length:", items.length);
    }, [category]);

    const renderRow: ListRenderItem<Listing> = ({ item }) =>
        item.medium_url ? (
            <Link href={`/listing/${item.id}`} asChild>
                <TouchableOpacity>
                    <View style={styles.listing}>
                        <Image
                            source={{ uri: item.medium_url }}
                            style={styles.image}
                            onError={() => {
                                console.log("Problem with loading medium_url from item: ", item.id);                                // Tutaj możesz wyświetlić domyślny obrazek zastępczy lub inny komunikat
                            }}
                        />
                    </View>
                    <TouchableOpacity style={styles.favouriteBtn}>
                        <Ionicons name="heart-outline" size={24} />
                    </TouchableOpacity>
                </TouchableOpacity>
            </Link>
        ) : null;

    return (
        <View>
            <FlatList
                data={loading ? [] : items}
                ref={listRef}
                renderItem={renderRow}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    listing: {
        padding: 16,
    },
    image: {
        width: "100%",
        height: 300,
        borderRadius: 10,
    },
    favouriteBtn: {
        position: "absolute",
        top: 30,
        right: 30,
    },
});
export default Listings;
