import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { defaultStyles } from '@/constants/Styles'

const UnauthorizedInbox = () => {
  return (
    <SafeAreaView edges={['top']} style={[defaultStyles.pX2, defaultStyles.safeArea]}>
      <Text>UnauthorizedInbox</Text>
    </SafeAreaView>
  )
}

export default UnauthorizedInbox