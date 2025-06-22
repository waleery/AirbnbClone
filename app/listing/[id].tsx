import { Ionicons } from '@expo/vector-icons'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useCallback, useLayoutEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Share } from 'react-native'
import Animated, {
  SlideInDown,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated'

import listingsData from '@/assets/data/json/airbnb-listings.json'
import { defaultStyles } from '@/constants'
import Colors from '@/constants/Colors'
import { Listing } from '@/types'

const IMG_HEIGHT = 300
const { width } = Dimensions.get('window')

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const listing = (listingsData as Listing[]).find((item) => item.id === id)

  const scrollRef = useAnimatedRef<Animated.ScrollView>()
  const scrollOffset = useScrollViewOffset(scrollRef)

  const navigation = useNavigation()

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollOffset.value, [0, IMG_HEIGHT / 2], [0, 1]),
    }
  })

  const shareListing = useCallback(async () => {
    if (listing?.name && listing?.listing_url) {
      try {
        await Share.share({
          title: listing.name,
          url: listing.listing_url,
        })
      } catch (error) {
        console.error(error)
      }
    } else {
      console.error('Listing details are missing.')
    }
  }, [listing?.listing_url, listing?.name])

  const handleGoBack = useCallback(() => navigation.goBack(), [navigation])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Animated.View style={[styles.header, headerAnimatedStyle]}></Animated.View>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundBtn} onPress={shareListing}>
            <Ionicons name="share-outline" size={20} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundBtn}>
            <Ionicons name="heart-outline" size={20} color={'#000'} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity style={styles.roundBtn} onPress={handleGoBack}>
          <Ionicons name="chevron-back" size={20} color={'#000'} />
        </TouchableOpacity>
      ),
    })
  }, [handleGoBack, headerAnimatedStyle, navigation, shareListing])

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-IMG_HEIGHT, 0, IMG_HEIGHT], [2, 1, 1]),
        },
      ],
    }
  })

  return (
    listing && (
      <View style={styles.container}>
        <Animated.ScrollView
          contentContainerStyle={styles.paddingBottom100}
          ref={scrollRef}
          scrollEventThrottle={0.2}
        >
          {listing.xl_picture_url ? (
            <Animated.Image
              source={{ uri: listing.xl_picture_url }}
              style={[styles.image, imageAnimatedStyle]}
            />
          ) : null}
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{listing.name}</Text>
            <Text style={styles.location}>
              {listing.room_type} in {listing.smart_location}
            </Text>
            <Text style={styles.rooms}>
              {listing.guests_included}{' '}
              {listing.guests_included && listing.guests_included > 1 ? 'guests' : 'guest'} ·{' '}
              {listing.bedrooms} bedrooms · {listing.bathrooms} bathrooms
            </Text>
            {listing.review_scores_rating ? (
              <View style={styles.textRating}>
                <Ionicons name="star" size={16} />
                <Text style={styles.ratings}>
                  <Text style={styles.rating_number}>{listing.review_scores_rating / 20}</Text> ·{' '}
                  {listing.number_of_reviews} reviews
                </Text>
              </View>
            ) : null}
            <View style={styles.divider} />
            <View style={styles.hostView}>
              <Image source={{ uri: listing.host_picture_url }} style={styles.host} />

              <View>
                <Text style={styles.hostText}>Hosted by {listing.host_name || 'N/A'}</Text>
                <Text>Host since: {listing.host_since || 'unknown'}</Text>
              </View>
            </View>
            <View style={styles.divider} />
            <Text style={styles.description}>{listing.description}</Text>
          </View>
        </Animated.ScrollView>
        <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200).duration(900)}>
          <View style={styles.score}>
            <TouchableOpacity style={styles.footerText}>
              <Text style={styles.footerPrice}>€ {listing.price}</Text>
              <Text style={styles.nightText}>night</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[defaultStyles.btn, defaultStyles.pX2]}>
              <Text style={defaultStyles.btnText}>Reserve</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    )
  )
}
export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  image: {
    height: IMG_HEIGHT,
    width,
  },
  infoContainer: { padding: 24, backgroundColor: Colors.white },
  name: { fontSize: 26, fontWeight: '600' },
  location: { fontSize: 16, marginTop: 15, fontWeight: '500' },
  rooms: { fontSize: 16, color: Colors.grey, marginVertical: 4 },
  score: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratings: { fontSize: 16 },
  rating_number: {
    fontWeight: '500',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  hostView: { marginVertical: 5, flexDirection: 'row', alignItems: 'center', gap: 12 },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostText: {
    fontWeight: '500',
    fontSize: 16,
  },
  nightText: {
    marginTop: 2,
  },
  description: { fontSize: 16, marginTop: 10 },
  footerText: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  footerPrice: { fontSize: 18, fontWeight: 'bold' },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  textRating: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  roundBtn: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    color: Colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGrey,
  },
  header: {
    backgroundColor: Colors.white,
    height: 100,
    borderBottomColor: Colors.lightGrey,
    borderWidth: StyleSheet.hairlineWidth,
  },
  paddingBottom100: {
    paddingBottom: 100,
  },
})
