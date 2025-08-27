import { Stack } from "expo-router";
import { useAtomValue } from "jotai";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import listingsDataGeo from "@/assets/data/json/airbnb-listings.geo.json";
import {
	bottomSheetRef,
	ExploreHeader,
	ListingsBottomSheet,
	ListingsMap,
} from "@/components";
import { defaultStyles, accommodation_categories } from "@/constants";
import { filteredListingsAtom } from "@/store";
import { ListingGeo } from "@/types";
import { Pressable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

const Page = () => {
	const [category, setCategory] = useState<string>(
		accommodation_categories[0].name,
	);
	const listings = useAtomValue(filteredListingsAtom);
	const listingsGeo = useMemo(() => listingsDataGeo as ListingGeo, []);

	const [mapVisible, setMapVisible] = useState<boolean>(false);

	const onDataChanged = useCallback((category: string) => {
		setCategory(category);
	}, []);

	const showMap = useCallback(() => {
		bottomSheetRef.current?.expand();
		// setRefresh(refresh + 1);
		setMapVisible(true);
	}, []);

	return (
		<View style={defaultStyles.flex}>
			<Stack.Screen
				options={{
					header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
				}}
			/>

			<ListingsMap listings={listingsGeo} />
			<ListingsBottomSheet listings={listings} category={category} />
			{!mapVisible && (
				<View style={styles.absoluteBtn}>
					<Pressable onPress={showMap} style={styles.btn}>
						<Text style={[defaultStyles.white, defaultStyles.boldText]}>
							Map
						</Text>
						<Ionicons name="map" size={17} color={"#fff"} />
					</Pressable>
				</View>
			)}
		</View>
	);
};
export default Page;

const styles = StyleSheet.create({
	absoluteBtn: {
		position: "absolute",
		bottom: 25,
		width: "100%",
		alignItems: "center",
	},
	btn: {
		backgroundColor: Colors.dark,
		padding: 13,
		paddingHorizontal: 20,
		alignItems: "center",
		flexDirection: "row",
		borderRadius: 30,
		gap: 8,
	},
});
