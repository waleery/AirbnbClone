import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

import { InboxHeader, WishlistHeader } from '@/components'
import Colors from '@/constants/Colors'

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
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => <Ionicons name="search" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="Wishlists"
        options={{
          tabBarLabel: 'Wishlists',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={color} size={size} />
          ),
          header: () => <WishlistHeader />,
          unmountOnBlur: true,
        }}
      />
      <Tabs.Screen
        name="Trips"
        options={{
          tabBarLabel: 'Trips',
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="airbnb" color={color} size={size} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Inbox"
        options={{
          header: () => <InboxHeader />,
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  )
}
export default Layout
