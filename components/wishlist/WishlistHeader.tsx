import { useAtom } from 'jotai'
import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { defaultStyles } from '@/constants/Styles'
import { wishlistEditMode } from '@/store'

export const WishlistHeader = () => {
  const [editMode, setEditMode] = useAtom(wishlistEditMode)

  const toggleWishlistEditMode = useCallback(() => {
    setEditMode((prevMode) => !prevMode)
  }, [setEditMode])

  return (
    <SafeAreaView
      edges={['top']}
      style={[defaultStyles.pX2, defaultStyles.safeArea, defaultStyles.pb1]}
    >
      <Pressable onPress={toggleWishlistEditMode}>
        <View style={styles.btnBox}>
          <Text style={styles.edit}>{editMode ? 'Done' : 'Edit'}</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  btnBox: {
    flexDirection: 'row-reverse',
  },
  edit: {
    fontSize: 17,
    paddingRight: 10,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
})
