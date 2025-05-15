import { useSetAtom } from 'jotai'
import { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import { WishlistTiles } from '@/components/wishlist/WishlistTiles'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants'
import { wishlistEditMode } from '@/store'

export const AuthorizedWhishlist = () => {
  const setEditMode = useSetAtom(wishlistEditMode)

  useEffect(() => {
    return () => {
      setEditMode(false)
    }
  }, [setEditMode])

  return (
    <View style={[defaultStyles.flex, styles.container]}>
      <WishlistTiles />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    gap: 20,
  },
})
