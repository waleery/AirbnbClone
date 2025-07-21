import { BottomSheetFlatList, BottomSheetFlatListMethods } from '@gorhom/bottom-sheet'
import { useCallback, useEffect, useRef, useState } from 'react'
import { View, Text, ListRenderItem, StyleSheet } from 'react-native'

import { ListingItem } from './ListingItem'

import { defaultStyles } from '@/constants'
import { Listing } from '@/types'

interface Props {
  listings: Listing[]
  category: string
  refresh: number
}

export const Listings = ({ category, listings: items, refresh }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const listRef = useRef<BottomSheetFlatListMethods>(null)

  useEffect(() => {
    if (refresh) {
      listRef.current?.scrollToOffset({ offset: 0, animated: true })
    }
  }, [refresh])

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    }, 200)
  }, [category, items.length])

  const renderRow: ListRenderItem<Listing> = useCallback(
    ({ item }) => (item.medium_url ? <ListingItem item={item} /> : null),
    []
  )

  return (
    <View style={defaultStyles.container}>
      <BottomSheetFlatList
        data={loading ? [] : items}
        ref={listRef}
        renderItem={renderRow}
        ListHeaderComponent={
          !loading ? <Text style={styles.info}>{items.length} homes</Text> : null
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  info: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 4,
    fontWeight: '500',
  },
})
