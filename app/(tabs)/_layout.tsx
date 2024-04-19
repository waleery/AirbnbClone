import { Tabs } from "expo-router";
const Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen name="Index" options={{ tabBarLabel: "Explore" }} />
        </Tabs>
    );
};
export default Layout;
