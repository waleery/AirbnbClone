import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'

const InboxHeader = () => {
  return (
    <SafeAreaView edges={['top']} style={{ paddingHorizontal: 20 }}>
      <View style={{ display: 'flex', flexDirection: 'row-reverse', gap: 10 }}>
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

export default InboxHeader

const styles = StyleSheet.create({
  topBtn: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },
})
