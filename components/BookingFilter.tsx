import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Animated, { SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/Styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
interface Props {
  onClearAll: () => void
}

const BookingFilter = ({ onClearAll }: Props) => {
  const router = useRouter()

  return (
    <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
      <View style={styles.footer}>
        <TouchableOpacity onPress={onClearAll} style={defaultStyles.center}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={router.back}
          style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
        >
          <Ionicons name="search-outline" size={24} color={'#fff'} style={defaultStyles.btnIcon} />
          <Text style={[defaultStyles.btnText, { fontWeight: '500' }]}>Search</Text>
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
})

export default BookingFilter
