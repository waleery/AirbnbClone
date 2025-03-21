import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'

const UnauthorizedInbox = () => {
  return (
    <SafeAreaView edges={['top']} style={[defaultStyles.pX2, defaultStyles.safeArea, styles.container]}>
      <Text style={styles.title}>Trips</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '500',
    paddingTop: 16,
    marginBottom: 20,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
})

export default UnauthorizedInbox