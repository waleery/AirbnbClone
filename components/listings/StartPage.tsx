import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { defaultStyles } from '@/constants'
import Colors from '@/constants/Colors'

export const StartPage = () => {
  return (
    <View style={defaultStyles.flex}>
      <Text style={[styles.header, defaultStyles.boldText]}>Popular homes in Warsaw</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    fontSize: 20,
  },
})
