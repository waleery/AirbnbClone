import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { SlideInDown } from 'react-native-reanimated'

import { defaultStyles } from '@/constants/Styles'

interface Props {
  onClearAll: () => void
  filter: () => void
}

const BookingFooter = ({ onClearAll, filter }: Props) => {
  const router = useRouter()

  const handlePressFilter = useCallback(() => {
    filter()
    router.back()
  }, [filter, router])

  return (
    <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
      <View style={styles.footer}>
        <TouchableOpacity onPress={onClearAll} style={defaultStyles.center}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePressFilter} style={[defaultStyles.btn, styles.button]}>
          <Ionicons name="search-outline" size={24} color={'#fff'} style={defaultStyles.btnIcon} />
          <Text style={[defaultStyles.btnText, defaultStyles.font500]}>Search</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearText: {
    fontSize: 18,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  button: { paddingRight: 20, paddingLeft: 50 },
})

export default BookingFooter
