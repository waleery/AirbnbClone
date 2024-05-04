import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { View, Text, FlatList, ListRenderItem } from "react-native";
interface Props {
    listings: any[];
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

    const renderRow: ListRenderItem<any> = ({ item }) => {
        return <Link href={`/listing/${item.id}`}>Go there</Link>;
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
export default Listings;
