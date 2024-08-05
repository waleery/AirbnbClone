import { FlatList } from 'react-native-gesture-handler'
import { ListRenderItem, StyleSheet } from 'react-native'

import wishlistData from '@/assets/data/wishlist.json'
import { Wishlist } from '@/types/whishlist'
import { WishlistItem } from './WishlistItem'

const WishlistTiles = () => {
  const renderRow: ListRenderItem<Wishlist> = ({ item }) => <WishlistItem wishlist={item} />
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
  }
})
