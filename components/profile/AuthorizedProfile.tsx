import { useAuth, useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import { useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AirBnbYourHome } from './AirBnbYourHome'
import { ProfileSection } from './ProfileSection'
import { RenderOptions } from './RenderOptions'

import { hosting, legal, settings, support, tools } from '@/assets/data'
import { defaultStyles } from '@/constants'
import Colors from '@/constants/Colors'

export const AuthorizedProfile = () => {
  const { signOut } = useAuth()
  // const { user } = useUser()
  const router = useRouter()

  // const onCaptureImage = useCallback(async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     quality: 0.9,
  //     base64: true,
  //   })
  //   if (!result.canceled && user) {
  //     const base64 = `data:image/png;base64,${result.assets[0].base64}`
  //     await user.setProfileImage({ file: base64 })
  //   }
  // }, [user])

  const handleSignOut = useCallback(async () => {
    await signOut()
  }, [signOut])

  const navigateToProfilePage = useCallback(() => {
    router.push('/(profilePage)/ProfilePage')
  }, [router])

  return (
    <SafeAreaView edges={['top']} style={[defaultStyles.container, styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false} style={defaultStyles.overflowVisible}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
          <Ionicons name="notifications-outline" size={32} />
        </View>
        <View style={styles.profileRow}>
          <Pressable onPress={navigateToProfilePage}>
            <ProfileSection />
          </Pressable>
        </View>

        <AirBnbYourHome />

        <View style={styles.optionsSection}>
          <RenderOptions options={settings} title="Settings" drawLastLine />
          <RenderOptions options={hosting} title="Hosting" drawLastLine />
          <RenderOptions options={tools} title="Tools" drawLastLine />
          <RenderOptions options={support} title="Support" drawLastLine />
          <RenderOptions options={legal} title="Legal" />
        </View>
        <Text onPress={handleSignOut} style={styles.logoutText}>
          Log out
        </Text>

        <Text onPress={handleSignOut} style={styles.versionText}>
          VERSION 25.09.1 (204163)
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  headerContainer: {
    paddingVertical: 36,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header: {
    fontSize: 30,
    fontWeight: '500',
  },
  profileRow: {
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightGrey,
    marginBottom: 24,
  },
  logoutText: {
    marginVertical: 45,
    fontSize: 17,
    textDecorationLine: 'underline',
  },
  optionsSection: {
    gap: 35,
  },
  versionText: {
    fontSize: 10,
    marginBottom: 20,
    color: Colors.grey,
  },
})
