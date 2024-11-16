import { useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { parseISO } from 'date-fns'
import { Image, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import profile from '@/assets/data/json/profile.json'
import Colors from '@/constants/Colors'
import { Profile } from '@/types/profile'

export default function ProfilePage() {
  const { user } = useUser()

  const profileData: Profile = {
    ...profile,
    reviews: profile.reviews.map((review) => ({
      ...review,
      date: parseISO(review.date),
    })),
  }

  return (
    <SafeAreaView edges={['top']} style={[styles.container]}>
      <View style={styles.modal}>
        <View style={styles.leftSide}>
          <View style={styles.imageBox}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
            {profileData.verified && (
              <View style={styles.verfied}>
                <Ionicons name="shield-checkmark" size={17} color="white" />
              </View>
            )}
          </View>
          <Text style={styles.firstName}>{user?.firstName}</Text>
          <Text style={styles.guest}>{profileData.guest ? 'Guest' : null}</Text>
        </View>
        <View style={styles.rightSide}>
          <View>
            <Text style={styles.numberModal}>{profileData.reviews?.length}</Text>
            <Text style={styles.infoNumberModal}>Reviews</Text>
            <View style={styles.separatorLineModal} />
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

      <Text style={styles.reviewsTest}>
        {profileData.guest
          ? `What Hosts are saying about ${user?.firstName}`
          : `${user?.firstName}'s reviews`}
      </Text>
      <View style={styles.separatorLine} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
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
  imageBox: {
    width: '70%',
    aspectRatio: 1,
    marginBottom: 5,
  },
  avatar: {
    aspectRatio: 1,
    borderRadius: 50,
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
  separatorLineModal: {
    borderBottomColor: Colors.mediumGrey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 12,
  },
  separatorLine: {
    borderBottomColor: Colors.mediumGrey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 35,
  },
  placeTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  placeText: {
    fontSize: 17,
    fontWeight: '400',
  },
  reviewsTest: {
    fontSize: 20,
    paddingRight: '30%',
    fontWeight: '600',
  },
  verfied: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    width: '30%',
    height: '30%',
    borderRadius: 100,
  },
})
