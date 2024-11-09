import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import profile from '@/assets/data/json/profile.json'
import Colors from '@/constants/Colors'
import { Profile } from '@/types/profile'

export default function ProfilePage() {
  const { user } = useUser()

  const profileData = profile as Profile
  return (
    <SafeAreaView edges={['top']} style={[styles.container]}>
      <View style={styles.modal}>
        <View style={styles.leftSide}>
          <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          <Text style={styles.firstName}>{user?.firstName}</Text>
          <Text style={styles.guest}>{profileData.guest ? 'Guest' : null}</Text>
        </View>
        <View style={styles.rightSide}>
          <View>
            <Text style={styles.numberModal}>{profileData.revievs}</Text>
            <Text style={styles.infoNumberModal}>Reviews</Text>
            <View style={styles.separatorLine} />
            <Text style={styles.numberModal}>{profileData.yearsOnAirbnb}</Text>
            <Text style={styles.infoNumberModal}>Years on Airbnb</Text>
          </View>
        </View>
      </View>
      <View style={styles.placeTextContainer}>
        <Ionicons name="globe-outline" size={24} color="black" />
        <Text style={styles.placeText}>
          Lives in {profileData.city}, {profileData.country}
        </Text>
      </View>
      <View style={styles.separatorLine} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  modal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGrey,
    borderRadius: 15,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    paddingVertical: 30,
    marginBottom: 30,
  },
  leftSide: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: '70%',
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: Colors.grey,
    marginBottom: 5,
  },
  firstName: {
    fontSize: 29,
    fontWeight: '600',
  },
  guest: {
    fontSize: 15,
    fontWeight: '500',
  },
  rightSide: {
    width: '30%',
  },
  numberModal: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 3,
  },
  infoNumberModal: {
    fontSize: 10,
    fontWeight: '400',
  },
  separatorLine: {
    borderBottomColor: Colors.mediumGrey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 12,
  },
  placeTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 30,
  },
  placeText: {
    fontSize: 17,
    fontWeight: '400',
  },
})
