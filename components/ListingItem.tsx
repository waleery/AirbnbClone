import { Link } from 'expo-router'
import Animated, { FadeIn, FadeOutLeft } from 'react-native-reanimated'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useState } from 'react'
import { Listing } from '@/types/listing'
import { Ionicons } from '@expo/vector-icons'
import { defaultStyles } from '@/constants/Styles'

interface Props {
  item: Listing
}
const ListingItem = ({ item }: Props) => {
  const [imageError, setImageError] = useState(false)

  return (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={styles.listing} entering={FadeIn.duration(200)} exiting={FadeOutLeft}>
          {imageError ? (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="alert-circle-outline" size={50} color="red" />
              <Text>Image failed to load</Text>
            </View>
          ) : (
            <Image
              source={{ uri: item.medium_url! }}
              style={styles.image}
              onError={() => setImageError(true)}
            />
          )}
          <TouchableOpacity style={styles.favouriteBtn}>
            <Ionicons name="heart-outline" size={24} />
          </TouchableOpacity>
          <View style={styles.shortInfo}>
            <Text style={defaultStyles.biggerText}>{item.name}</Text>
            {item.review_scores_rating ? (
              <View style={styles.ratingInfo}>
                <Ionicons name="star" size={16} />
                <Text style={[defaultStyles.boldText, defaultStyles.biggerText]}>
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
        </Animated.View>
      </TouchableOpacity>
    </Link>
  )
}
export default ListingItem

const styles = StyleSheet.create({
  listing: {
    padding: 16,
    gap: 10,
    marginVertical: 16,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  favouriteBtn: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  shortInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  info: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 4,
  },
  imagePlaceholder: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
})
