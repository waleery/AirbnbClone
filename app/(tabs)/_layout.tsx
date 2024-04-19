import Colors from "@/constants/colors";
import { Tabs } from "expo-router";


const Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.primary,
            }}
        >
            <Tabs.Screen name="index" options={{ tabBarLabel: "Explore" }} />
        </Tabs>
    );
};
export default Layout;
