import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { defaultStyles } from '@/constants/Styles'
import { wishlistEditMode } from '@/store/wishlistStore'
import { useAtom, useAtomValue } from 'jotai'

const WishlistHeader = () => {
  const [editMode, setEditMode] = useAtom(wishlistEditMode);

  const toggleWishlistEditMode = () => {
    setEditMode(prevMode => !prevMode);
  };
  return (
    <SafeAreaView edges={['top']} style={[defaultStyles.pX2, defaultStyles.safeArea]}>
      <Pressable onPress={toggleWishlistEditMode}>
        <View style={styles.btnBox}>
          <Text style={styles.edit}>{editMode ? 'Done' : 'Edit'}</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  )
}

export default WishlistHeader

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
