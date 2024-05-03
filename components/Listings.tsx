import { useEffect, useRef, useState } from "react";
import { View, Text, FlatList } from "react-native";

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
        console.log("RELOAD LISTINGS");
    }, [category]);

    return (
        <View>
            <FlatList data={loading ? [] : items} ref={listRef}  renderItem={()=>()}/>
        </View>
    );
};
export default Listings;
