import { Listing } from "@/types/listing";
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

    const renderRow: ListRenderItem<Listing> = ({ item }) => {
        return (
            <Link href={`/listing/${item.id}`} asChild>
                <TouchableOpacity>
                    <View style={styles.listing}>
                        <Image source={{uri: item.medium_url!}} style={styles.image} />
                    </View>
                </TouchableOpacity>
            </Link>
        );
    };
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
    listing:{
        padding:16
    },
    image:{
        width:'100%',
        height:300,
        borderRadius:10
    }
})
export default Listings;
