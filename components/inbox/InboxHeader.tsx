import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'

export const InboxHeader = () => {
  return (
    <SafeAreaView edges={['top']} style={[defaultStyles.pX2, defaultStyles.safeArea]}>
      <View style={styles.btnBox}>
        <TouchableOpacity style={styles.topBtn}>
          <Ionicons name="options-outline" size={24} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topBtn}>
          <Ionicons name="search" size={24} />
        </TouchableOpacity>
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
