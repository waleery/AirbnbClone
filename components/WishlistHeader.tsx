import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { defaultStyles } from '@/constants/Styles'

const WishlistHeader = () => {
  return (
    <SafeAreaView edges={['top']} style={[defaultStyles.pX2, defaultStyles.safeArea]}>
        <Text>Test</Text>
    </SafeAreaView>
  )
}

export default WishlistHeader
