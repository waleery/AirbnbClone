import { useUser } from '@clerk/clerk-expo'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import { parseISO } from 'date-fns'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import profile from '@/assets/data/json/profile.json'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { confirmedIndormation, Profile } from '@/types/profile'

const confirmedInformationLabels: Record<keyof confirmedIndormation, string> = {
  identity: 'Identity',
  emailAddress: 'Email address',
  phoneNumber: 'Phone number',
}
const timeSince = (dateString: Date) => {
  const now = new Date()
  const date = new Date(dateString)

  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24)

  const years = Math.floor(diffInDays / 365)
  const months = Math.floor((diffInDays % 365) / 30)

  if (years > 0) {
    return years === 1 ? `${years} year ago` : `${years} years ago`
  }
  if (months > 0) {
    return months === 1 ? `${months} month ago` : `${months} months ago`
  }
  return 'less than a month ago'
}

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
      <ScrollView showsVerticalScrollIndicator={false}>
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

        <View style={styles.reviewTile}>
          {profileData.reviews && profileData.reviews.length > 0 && (
            <>
              <Text style={styles.reviewComment}>{`"${profileData.reviews[0].comment}"`}</Text>
              <View style={styles.bottomReview}>
                <Image
                  source={{ uri: profileData.reviews[0].user.profileImage }}
                  style={styles.reviewAvatar}
                />

                <View style={styles.nameAndDate}>
                  <Text style={styles.reviewName}>{profileData.reviews[0].user.name}</Text>
                  <Text style={styles.reviewDate}>{timeSince(profileData.reviews[0].date)}</Text>
                </View>
              </View>
            </>
          )}
        </View>

        <TouchableOpacity style={[defaultStyles.btn, styles.reviewsButton]}>
          <Text style={styles.reviewsButtonText}>
            Show all {profileData.reviews?.length} reviews
          </Text>
        </TouchableOpacity>
        <View style={styles.separatorLine} />
        <Text
          style={styles.confirmedInformationsText}
        >{`${user?.firstName}'s confirmed information`}</Text>
        {Object.entries(profileData.confirmedIndormation).map(([key, value]) =>
          value ? (
            <View key={key} style={styles.connfirmedInformationRow}>
              <FontAwesome6 name="check" size={24} color="black" />
              <Text style={styles.connfirmedInformationRowText}>
                {confirmedInformationLabels[key as keyof confirmedIndormation]}
              </Text>
            </View>
          ) : null
        )}
      </ScrollView>
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
    marginBottom: 25,
  },
  confirmedInformationsText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
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
  connfirmedInformationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 12,
  },
  connfirmedInformationRowText: {
    fontSize: 17,
  },
  reviewTile: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.mediumGrey,
    padding: 25,
    borderRadius: 10,
    gap: 30,
    maxWidth: '85%',
  },
  reviewComment: {
    fontSize: 15,
    fontWeight: '400',
  },
  reviewName: {
    fontSize: 15,
    fontWeight: '600',
  },
  reviewDate: {
    fontSize: 13,
    fontWeight: '400',
  },
  nameAndDate: {
    gap: 2,
  },
  reviewAvatar: {
    width: '15%',
    aspectRatio: 1,
    borderRadius: 50,
  },
  bottomReview: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  reviewsButton: {
    marginTop: 30,
    backgroundColor: Colors.transparent,
    borderWidth: 1,
  },
  reviewsButtonText: {
    fontSize: 15,
    fontWeight: '500',
  },
})
