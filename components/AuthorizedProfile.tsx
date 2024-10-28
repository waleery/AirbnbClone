import { useAuth, useUser } from '@clerk/clerk-expo'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { useCallback } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import RenderOptions from './RenderOptions'

import { hosting, legal, settings, support, tools } from '@/assets/data'
import home from '@/assets/images/home.png'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'

export const AuthorizedProfile = () => {
  const { signOut } = useAuth()
  const { user } = useUser()

  const onCaptureImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.9,
      base64: true,
    })
    if (!result.canceled && user) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`
      await user.setProfileImage({ file: base64 })
    }
  }, [user])

  const handleSignOut = useCallback(async () => {
    await signOut()
  }, [signOut])

  return (
    <SafeAreaView edges={['top']} style={[defaultStyles.container, styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
          <Ionicons name="notifications-outline" size={32} />
        </View>
        <View style={styles.profileRow}>
          <View style={styles.profileInfoSection}>
            <TouchableOpacity onPress={onCaptureImage}>
              <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
            </TouchableOpacity>
            <View style={styles.profileTextSection}>
              <Text style={styles.name}>{user?.firstName}</Text>
              <Text style={styles.secondText}>Show profile</Text>
            </View>
          </View>

          <AntDesign name="right" size={20} />
        </View>
        <View style={styles.modal}>
          <View style={styles.modalTextContainer}>
            <Text style={styles.modalHeader}>Airbnb your place</Text>
            <Text style={styles.modalSecondText}>It&apos;s simple to get up and start earning</Text>
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
        <Text onPress={handleSignOut} style={styles.logoutText}>
          Log out
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
