import Colors from "@/constants/colors";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    tabBarLabel: "Explore",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" color={color} size={size}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="wishlists"
                options={{
                    tabBarLabel: "Wishlists",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart-outline" color={color} size={size}/>
                    ),
                }}
            />
        </Tabs>
    );
};
export default Layout;
