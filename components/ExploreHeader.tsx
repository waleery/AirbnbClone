import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const ExploreHeader = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.rowAction}>
                    <Link href={"/(modals)/booking"} asChild>
                        <TouchableOpacity style={styles.searchBtn}>
                            <Ionicons name="search" size={24} />
                            <View>
                              <Text style={{fontWeight:'600'}}>Where to?</Text>
                              <Text>Anywhere · Any week</Text>
                            </View>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name="options-outline" size={24} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
export default ExploreHeader;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        height: 130,
        backgroundColor: "#fff",
    },
    rowAction: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 24,
        paddingBottom: 16,
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 24,
    },
    searchBtn: {
        flexDirection: "row",
        alignItems:'center',
        gap:10,
        borderColor:'#c2c2c2',
        borderWidth:StyleSheet.hairlineWidth
    },
});
