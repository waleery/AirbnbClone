import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { View, StyleSheet } from "react-native";

import WishlistTiles from "@/components/WishlistTiles";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { wishlistEditMode } from "@/store/wishlistStore";

const Page = () => {
	const setEditMode = useSetAtom(wishlistEditMode);

	useEffect(() => {
		return () => {
			setEditMode(false);
		};
	}, [setEditMode]);

	return (
		<View style={[defaultStyles.flex, styles.container]}>
			<WishlistTiles />
		</View>
	);
};
export default Page;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		gap: 20,
	},
});
