import { useCallback, useMemo } from 'react'
import { ListRenderItem, StyleSheet, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import { WishlistItem } from './WishlistItem'

import wishlistData from '@/assets/data/json/wishlist.json'
import { Wishlist } from '@/types'

export const WishlistTiles = () => {
  const renderRow: ListRenderItem<Wishlist> = useCallback(
    ({ item }) => <WishlistItem wishlist={item} />,
    []
  )
  const renderHeader = useMemo(() => <Text style={styles.title}>Wishlist</Text>, [])

  return (
    <FlatList
      data={wishlistData as Wishlist[]}
      renderItem={renderRow}
      numColumns={2}
      contentContainerStyle={styles.containerBox}
      columnWrapperStyle={styles.columnWrapper}
      ListHeaderComponent={renderHeader}
    />
  )
}

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
  title: {
    fontSize: 30,
    fontWeight: '500',
  },
})
