import { useAuth } from '@clerk/clerk-expo'
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { useSetAtom } from 'jotai'

import { EarnBottomSheet, InboxHeader, WishlistHeader } from '@/components'
import Colors from '@/constants/Colors'
import { wishlistEditMode } from '@/store'

const Layout = () => {
  const { isSignedIn } = useAuth()
  const setEditMode = useSetAtom(wishlistEditMode)

  return (
    <>
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
            headerShown: isSignedIn,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart-outline" color={color} size={size} />
            ),
            header: () => <WishlistHeader />,
          }}
          listeners={{
            blur: () => {
              setEditMode(false)
            },
          }}
        />
        <Tabs.Screen
          name="Trips"
          options={{
            tabBarLabel: 'Trips',
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="airbnb" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="Inbox"
          options={{
            headerShown: isSignedIn,
            header: () => <InboxHeader />,
            tabBarLabel: 'Messages',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="message-outline" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarLabel: isSignedIn ? 'Profile' : 'Log in',
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-circle-outline" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
      <EarnBottomSheet />
    </>
  )
}
export default Layout
