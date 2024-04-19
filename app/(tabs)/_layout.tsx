import Colors from "@/constants/Colors";
import { Tabs } from "expo-router";


const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
            }}
        >
            <Tabs.Screen name="Index" options={{ tabBarLabel: "Explore" }} />
        </Tabs>
    );
};
export default Layout;
