import { defaultStyles } from '@/constants/Styles'
import { Listing } from '@/types/listing'
import { Ionicons } from '@expo/vector-icons'
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet'
import { Link } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native'
import Animated, { FadeIn, FadeOutLeft } from 'react-native-reanimated'

const ListingItem = ({ item }: { item: Listing }) => {
  const [imageError, setImageError] = useState(false)

  return (
    <Link href={`/listing/${item.id}`} asChild>
      <TouchableOpacity>
        <Animated.View style={styles.listing} entering={FadeIn.duration(200)} exiting={FadeOutLeft}>
          {imageError ? (
            <View
              style={styles.imagePlaceholder}
            >
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

interface Props {
  listings: Listing[]
  category: string
  refresh: number
}
const Listings = ({ category, listings: items, refresh }: Props) => {
  const [loading, setLoading] = useState(false)
  const listRef = useRef<BottomSheetFlatListMethods>(null)

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true })
    }
  }, [])

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 200)

    console.log('RELOAD LISTINGS, listings length:', items.length)
  }, [category])

  const renderRow: ListRenderItem<Listing> = ({ item }) =>
    item.medium_url ? <ListingItem item={item} /> : null

  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        data={loading ? [] : items}
        ref={listRef}
        renderItem={renderRow}
        ListHeaderComponent={<Text style={styles.info}>{items.length} homes</Text>}
      />
    </View>
  )
}

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
    width: "100%",
    height: 300,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
},
})
export default Listings
