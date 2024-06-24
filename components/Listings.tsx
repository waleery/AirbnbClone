import { defaultStyles } from '@/constants/Styles'
import { Listing } from '@/types/listing'
import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet'
import { useEffect, useRef, useState } from 'react'
import {
  View,
  Text,
  ListRenderItem,
  StyleSheet,
} from 'react-native'
import ListingItem from './ListingItem'


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
})
export default Listings
