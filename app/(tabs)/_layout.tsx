import Colors from "@/constants/Colors";
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
                name="Index"
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
            <Tabs.Screen
                name="trips"
                options={{
                    tabBarLabel: "Trips",
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="airbnb" color={color} size={size}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="Inbox"
                options={{
                    tabBarLabel: "Inbox",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="message-outline" color={color} size={size}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="Profile"
                options={{
                    tabBarLabel: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-circle-outline" color={color} size={size}/>
                    ),
                }}
            />
        </Tabs>
    );
};
export default Layout;
