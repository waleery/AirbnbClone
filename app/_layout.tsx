import { ClerkProvider, useAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { useFonts } from 'expo-font'
import { Stack, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import SpaceMonoFont from '../assets/fonts/SpaceMono-Regular.ttf'

import { ModalHeaderText } from '@/components'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key)
    } catch (error) {
      console.log(error)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (error) {
      console.log(error)
    }
  },
}

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: SpaceMonoFont,
    ...FontAwesome.font,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
      <GestureHandlerRootView style={defaultStyles.flex}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </ClerkProvider>
  )
}

function RootLayoutNav() {
  const router = useRouter()
  const { isLoaded, isSignedIn } = useAuth()

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/(modals)/login')
    }
  }, [isLoaded, isSignedIn, router])

  const handleGoBack = useCallback(() => router.back(), [router])

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/login"
        options={{
          presentation: 'modal',
          title: 'Log in or sign up',
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBack}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen name="listing/[id]" options={{ headerTitle: '', headerTransparent: true }} />
      <Stack.Screen
        name="(profilePage)/ProfilePage"
        options={{
          headerTransparent: true,
          title: '',
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBack}>
              <Ionicons name="chevron-back" size={22} color={Colors.black} />
            </TouchableOpacity>
          ),
          headerRight: () => <Text style={styles.logoutText}>Edit</Text>,
        }}
      />
      <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: 'transparentModal',
          headerTransparent: true,
          animation: 'fade',
          headerTitle: () => <ModalHeaderText />,
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBack} style={styles.headerLeft}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  )
}

const styles = StyleSheet.create({
  headerLeft: {
    backgroundColor: Colors.white,
    borderColor: Colors.grey,
    borderRadius: 20,
    borderWidth: 1,
    padding: 4,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
    textDecorationLine: 'underline',
    marginRight: 10,
  },
})
