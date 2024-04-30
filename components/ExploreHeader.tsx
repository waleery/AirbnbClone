import { defaultStyles } from "@/constants/Styles";
import { accomodation_categories } from "@/constants/categories";
import colors from "@/constants/colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const ExploreHeader = () => {
    const itemsRef = useRef<Array<TouchableOpacity>>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const selectCategory = (index: number) => {
        setActiveIndex(index);
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <View style={styles.rowAction}>
                    <Link href={"/(modals)/booking"} asChild>
                        <TouchableOpacity style={styles.searchBtn}>
                            <Ionicons name="search" size={24} />
                            <View>
                                <Text style={defaultStyles.boldText}>
                                    Where to?
                                </Text>
                                <Text style={defaultStyles.thinText}>
                                    Anywhere · Any week
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity style={styles.filterBtn}>
                        <Ionicons name="options-outline" size={24} />
                    </TouchableOpacity>
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: "center",
                        gap: 16,
                        paddingHorizontal: 16,
                    }}
                >
                    {accomodation_categories.map((category, index) => (
                        <TouchableOpacity
                            key={index}
                            ref={(element) =>
                                (itemsRef.current[index] = element!)
                            }
                            style={
                                activeIndex === index
                                    ? styles.categoryBtnActive
                                    : styles.categoryBtn
                            }
                            onPress={() => selectCategory(index)}
                        >
                            <MaterialIcons
                                size={24}
                                name={category.icon as any}
                                color={
                                    activeIndex === index ? "#000" : colors.grey
                                }
                            />
                            <Text
                                style={
                                    activeIndex === index
                                        ? styles.categoryTextActive
                                        : styles.categoryText
                                }
                            >
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
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
        gap: 10,
    },
    filterBtn: {
        padding: 10,
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 24,
    },
    searchBtn: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderColor: "#c2c2c2",
        borderWidth: StyleSheet.hairlineWidth,
        padding: 12,
        borderRadius: 30,
        backgroundColor: "#fff",
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.07,
        shadowRadius: 8,
    },
    categoryText: {
        fontSize: 14,
        color: colors.grey,
    },
    categoryTextActive: {
        fontSize: 14,
        color: "#000",
    },
    categoryBtn: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        paddingBottom: 6,
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
    },
    categoryBtnActive: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        paddingBottom: 6,
        borderBottomColor: "#000",
        borderBottomWidth: 2,
    },
});
