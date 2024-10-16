import { useAuth, useUser } from '@clerk/clerk-expo'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { Link, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import home from '@/assets/data/home.png'
import { hosting } from '@/assets/data/hosting'
import { legal } from '@/assets/data/legal'
import { settings } from '@/assets/data/settings'
import { support } from '@/assets/data/support'
import { tools } from '@/assets/data/tools'
import RenderOptions from '@/components/RenderOptions'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'

const Page = () => {
  const { signOut, isSignedIn } = useAuth()
  const router = useRouter()

  const { user } = useUser()

  const onCaptureImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.9,
      base64: true,
    })
    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`
      user?.setProfileImage({
        file: base64,
      })
    }
  }, [user])

  const handleSignOut = useCallback(async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }, [signOut])

  const handleOpenLogin = useCallback(() => router.push('/(modals)/login'), [router])

  return (
    <SafeAreaView edges={['top']} style={[defaultStyles.container, styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
          {isSignedIn && <Ionicons name="notifications-outline" size={32} />}
        </View>
        {!isSignedIn ? (
          <>
            <Text style={styles.headerSecond}>Log in to start planning your next trip.</Text>
            <TouchableOpacity
              style={{ ...styles.logInBtn, ...defaultStyles.btn }}
              onPress={handleOpenLogin}
            >
              <Text style={[defaultStyles.btnText, defaultStyles.font500]}>Log in</Text>
            </TouchableOpacity>
            <View style={styles.signUpContainer}>
              <Text style={styles.questionText}>Don&apos;t have account?</Text>
              <Link href="/(modals)/login" asChild>
                <Text style={styles.signUp}>Sign up</Text>
              </Link>
            </View>
          </>
        ) : null}
        {user && (
          <>
            <View style={styles.profileRow}>
              <View style={styles.profileInfoSection}>
                <TouchableOpacity onPress={onCaptureImage}>
                  <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
                </TouchableOpacity>
                <View style={styles.profileTextSection}>
                  <Text style={styles.name}>{user.firstName}</Text>
                  <Text style={styles.secondText}>Show profile</Text>
                </View>
              </View>
              <AntDesign name="right" size={20} color="black" />
            </View>
            <View style={styles.modal}>
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalHeader}>Airbnb your place</Text>
                <Text style={styles.modalSecondText}>
                  It&apos;s simple to get up and start earning
                </Text>
              </View>
              <View style={styles.modalImageContainer}>
                <Image source={home as ImageSourcePropType} style={styles.homeIcon} />
              </View>
            </View>
            <View style={styles.optionsSection}>
              <RenderOptions options={settings} title="Settings" />
              <RenderOptions options={hosting} title="Hosting" />
              <RenderOptions options={tools} title="Tools" />
              <RenderOptions options={support} title="Support" />
              <RenderOptions options={legal} title="Legal" />
            </View>
          </>
        )}

        {isSignedIn && (
          <Text onPress={handleSignOut} style={styles.logoutText}>
            Log out
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
export default Page

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
  headerSecond: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.grey,
    paddingTop: 12,
  },
  logInBtn: {
    marginTop: 40,
  },
  signUpContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    gap: 5,
    marginBottom: 40,
  },
  questionText: {
    fontWeight: '400',
    color: Colors.grey,
  },
  signUp: {
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  modal: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    overflow: 'visible',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGrey,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    marginBottom: 35,
  },
  modalTextContainer: {
    flex: 2,
    gap: 10,
  },
  modalImageContainer: {
    flex: 1,
  },
  homeIcon: {
    width: '100%',
    height: undefined,
    resizeMode: 'contain',
    aspectRatio: 1,
  },

  modalHeader: {
    fontSize: 18,
    fontWeight: '500',
  },
  modalSecondText: {
    fontWeight: '400',
    color: Colors.grey,
  },
  profileRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingBottom: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightGrey,
    marginBottom: 24,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  profileTextSection: {
    gap: 2,
  },
  profileInfoSection: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '400',
  },
  secondText: {
    fontSize: 15,
    fontWeight: '300',
  },
  logoutText: {
    marginVertical: 45,
    fontSize: 17,
    textDecorationLine: 'underline',
  },
  optionsSection: {
    gap: 35,
  },
})
