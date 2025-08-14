import { useUser } from '@clerk/clerk-expo'
import { FontAwesome6, Ionicons } from '@expo/vector-icons'
import { parseISO } from 'date-fns'
import { useCallback, useMemo } from 'react'
import {
  Image,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import profile from '@/assets/data/json/profile.json'
import { defaultStyles } from '@/constants'
import Colors from '@/constants/Colors'
import { Review } from '@/types'
import { confirmedInformation, Profile } from '@/types/profile'
import { ProfileSection } from '@/components/profile/ProfileSection'

const confirmedInformationLabels: Record<keyof confirmedInformation, string> = {
  identity: 'Identity',
  emailAddress: 'Email address',
  phoneNumber: 'Phone number',
}
const timeSince = (dateInput: Date) => {
  const now = new Date()
  const date = new Date(dateInput)

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

  const profileData: Profile = useMemo(
    () => ({
      ...profile,
      reviews: profile.reviews.map((review) => ({
        ...review,
        date: parseISO(review.date),
      })),
    }),
    []
  )

  const placeSection = useMemo(
    () => (
      <View style={styles.placeTextContainer}>
        <Ionicons name="globe-outline" size={24} color="black" />
        <Text style={styles.placeText}>
          Lives in {profileData.city}, {profileData.country}
        </Text>
      </View>
    ),
    [profileData.city, profileData.country]
  )

  const renderRow: ListRenderItem<Review> = useCallback(
    ({ item }) => (
      <View
        style={[
          styles.reviewTile,
          {
            width: Dimensions.get('window').width * 0.8,
          },
        ]}
      >
        <Text style={styles.reviewComment}>{`"${item.comment}"`}</Text>
        <View style={styles.bottomReview}>
          <Image source={{ uri: item.user.profileImage }} style={styles.reviewAvatar} />

          <View style={styles.nameAndDate}>
            <Text style={styles.reviewName}>{item.user.name}</Text>
            <Text style={styles.reviewDate}>{timeSince(item.date)}</Text>
          </View>
        </View>
      </View>
    ),
    []
  )

  const reviewSection = useMemo(
    () => (
      <>
        <Text style={styles.reviewsTest}>
          {profileData.guest
            ? `What Hosts are saying about ${user?.firstName}`
            : `${user?.firstName}'s reviews`}
        </Text>

        <FlatList
          data={profileData.reviews}
          renderItem={renderRow}
          contentContainerStyle={styles.containerBox}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.flatListStyle}
          pagingEnabled
        />
        <TouchableOpacity style={[defaultStyles.btn, styles.reviewsButton]}>
          <Text style={styles.reviewsButtonText}>
            Show all {profileData.reviews?.length} reviews
          </Text>
        </TouchableOpacity>
      </>
    ),
    [profileData.guest, profileData.reviews, renderRow, user?.firstName]
  )

  const confirmedInformationsSection = useMemo(
    () => (
      <>
        <Text
          style={styles.confirmedInformationsText}
        >{`${user?.firstName}'s confirmed information`}</Text>
        {Object.entries(profileData.confirmedInformation).map(([key, value]) =>
          value ? (
            <View key={`confirmed-info-${key}-${value}`} style={styles.confirmedInformationRow}>
              <FontAwesome6 name="check" size={24} color="black" />
              <Text style={styles.confirmedInformationRowText}>
                {confirmedInformationLabels[key as keyof confirmedInformation]}
              </Text>
            </View>
          ) : null
        )}
        <Text style={styles.learnText}>Learn about identity verification</Text>
      </>
    ),
    [profileData.confirmedInformation, user?.firstName]
  )

  return (
    <SafeAreaView edges={['top']} style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollViewStyle}>
        <ProfileSection profileData={profileData} />
        {placeSection}
        <View style={styles.separatorLine} />
        {reviewSection}
        <View style={styles.separatorLine} />
        {confirmedInformationsSection}
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
  confirmedInformationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 12,
  },
  confirmedInformationRowText: {
    fontSize: 17,
  },
  reviewTile: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.mediumGrey,
    padding: 25,
    borderRadius: 10,
    justifyContent: 'space-between',
    gap: 20,
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
    width: '25%',
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
  containerBox: {
    gap: 30,
  },
  scrollViewStyle: {
    overflow: 'visible',
  },
  flatListStyle: {
    overflow: 'visible',
  },
  learnText: {
    marginTop: 10,
    marginBottom: 50,
    fontSize: 14,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
})
