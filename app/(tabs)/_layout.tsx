import { useAuth } from '@clerk/clerk-expo'
import { Tabs } from 'expo-router'
import { useSetAtom } from 'jotai'

import { EarnBottomSheet, IconRenderer, InboxHeader, WishlistHeader } from '@/components'
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
            tabBarIcon: (props) => (
              <IconRenderer option={{ icon: 'search', lib: 'Ionicons' }} {...props} />
            ),
          }}
        />
        <Tabs.Screen
          name="Wishlists"
          options={{
            tabBarLabel: 'Wishlists',
            headerShown: isSignedIn,
            tabBarIcon: (props) => (
              <IconRenderer option={{ icon: 'heart-outline', lib: 'Ionicons' }} {...props} />
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
            tabBarIcon: (props) => (
              <IconRenderer option={{ icon: 'airbnb', lib: 'FontAwesome5' }} {...props} />
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
            tabBarIcon: (props) => (
              <IconRenderer
                option={{ icon: 'message-outline', lib: 'MaterialCommunityIcons' }}
                {...props}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            tabBarLabel: isSignedIn ? 'Profile' : 'Log in',
            headerShown: false,
            tabBarIcon: (props) => (
              <IconRenderer
                option={{ icon: 'person-circle-outline', lib: 'Ionicons' }}
                {...props}
              />
            ),
          }}
        />
      </Tabs>
      <EarnBottomSheet />
    </>
  )
}
export default Layout
