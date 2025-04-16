import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

import Carousel from './Carousel'

import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { Listing } from '@/types'

interface Props {
  item: Listing
}
export const ListingItem = ({ item }: Props) => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false)
  const router = useRouter()

  const handleFavourite = useCallback(() => {
    setIsFavourite(!isFavourite)
  }, [])

  const handlePress = useCallback(() => {
    router.push(`/listing/${item.id}`)
  }, [item.id, router])

  return (
    <Animated.View
      style={styles.listing}
      entering={FadeIn.duration(300)}
      exiting={FadeOut.duration(300)}
    >
      <Carousel items={[item.xl_picture_url!]} onPress={handlePress} />
      <TouchableOpacity style={styles.favouriteBtn} onPress={handleFavourite}>
        <Svg fill={Colors.primary} height="100%" width="100%">
          <Path
            fill={isFavourite ? Colors.primary : Colors.grey}
            stroke={Colors.white}
            strokeWidth="1.5"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </Svg>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.typeAndPriceContainer}>
          <View style={styles.shortInfo}>
            <Text style={[defaultStyles.biggerText, styles.infoText]}>{item.name}</Text>
            {item.review_scores_rating ? (
              <View style={styles.ratingInfo}>
                <Ionicons name="star" size={16} />
                <Text style={[styles.starText, defaultStyles.biggerText]}>
                  {item.review_scores_rating / 20}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={defaultStyles.mediumGap}>
            <Text>{item.room_type}</Text>
            <View style={styles.priceInfo}>
              <Text style={[defaultStyles.boldText, defaultStyles.biggerText]}>€ {item.price}</Text>
              <Text style={defaultStyles.biggerText}>night</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginTop: 5,
    marginBottom: 5,
    zIndex: 1,
  },
  favouriteBtn: {
    position: 'absolute',
    top: 30,
    right: 30,
    overflow: 'hidden',
    width: '7%',
    height: '7%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shortInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 20,
  },
  ratingInfo: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  priceInfo: {
    flexDirection: 'row',
    gap: 4,
  },
  infoText: {
    flex: 1,
    alignItems: 'flex-start',
  },
  typeAndPriceContainer: {
    gap: 3,
  },
  starText: {
    fontWeight: '500',
  },
})
