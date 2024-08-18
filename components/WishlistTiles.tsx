import { useCallback } from 'react'
import { ListRenderItem, StyleSheet } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { WishlistItem } from './WishlistItem'

import wishlistData from '@/assets/data/wishlist.json'
import { Wishlist } from '@/types/whishlist'

const WishlistTiles = () => {
  const renderRow: ListRenderItem<Wishlist> = useCallback(
    ({ item }) => <WishlistItem wishlist={item} />,
    []
  )
  return (
    <FlatList
      data={wishlistData as Wishlist[]}
      renderItem={renderRow}
      numColumns={2}
      contentContainerStyle={styles.containerBox}
      columnWrapperStyle={styles.columnWrapper}
    />
  )
}

export default WishlistTiles

const styles = StyleSheet.create({
  containerBox: {
    flex: 1,
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 16,
    gap: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
})
