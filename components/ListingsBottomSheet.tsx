import { Listing } from "@/types/listing";
import BottomSheet from "@gorhom/bottom-sheet";
import { useMemo, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Listings from "./Listings";
import colors from "@/constants/colors";
import { defaultStyles } from "@/constants/Styles";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

interface Props {
    listings: Listing[];
    category: string;
}

const ListingsBottomSheet = ({ listings, category }: Props) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoitns = useMemo(() => ["10%", "100%"], []);
    const [refresh, setRefresh] = useState(-0)

    const showMap = () => {
        bottomSheetRef.current?.collapse()
        setRefresh(refresh+1)
    };

    return (
        <BottomSheet
            index={1}
            ref={bottomSheetRef}
            snapPoints={snapPoitns}
            handleIndicatorStyle={{ backgroundColor: colors.grey }}
            style={styles.sheetContainer}

        >
            <View style={{ flex: 1 }}>
                <Listings listings={listings} category={category}  refresh={refresh}/>
                <View style={styles.absoluteBtn}>
                    <TouchableOpacity onPress={showMap} style={styles.btn}>
                        <Text style={{color:'#fff'}}>Map</Text>
                        <Ionicons name="map" size={20} color={"#fff"} />
                    </TouchableOpacity>
                </View>
            </View>
        </BottomSheet>
    );
};
export default ListingsBottomSheet;
const styles = StyleSheet.create({
    absoluteBtn: {
        position: "absolute",
        bottom: 30,
        width: "100%",
        alignItems: "center",
    },
    btn: {
        backgroundColor: colors.dark,
        padding: 16,
        height: 50,
        alignItems: "center",
        flexDirection: "row",
        borderRadius:30,
        gap: 8 
    },
    sheetContainer:{
        backgroundColor:"#fff",
        borderRadius:10,
        elevation:4,
        shadowColor:"#000",
        shadowOpacity:0.3,
        shadowRadius:4,
        shadowOffset:{
            width:1,
            height:1
        }
    }
});
