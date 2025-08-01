import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { defaultStyles } from '@/constants'
import Colors from '@/constants/Colors'

export const InboxHeader = () => {
  return (
    <SafeAreaView edges={['top']} style={[defaultStyles.pX2, defaultStyles.safeArea]}>
      <View style={styles.btnBox}>
        <Pressable style={styles.topBtn}>
          <Ionicons name="options-outline" size={24} />
        </Pressable>
        <Pressable style={styles.topBtn}>
          <Ionicons name="search" size={24} />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  btnBox: {
    display: 'flex',
    flexDirection: 'row-reverse',
    gap: 10,
  },
  topBtn: {
    padding: 10,
    backgroundColor: Colors.veryLightGrey,
    borderRadius: 24,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },
})
