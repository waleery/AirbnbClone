import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const InboxHeader = () => {
  return (
    <SafeAreaView edges={['top']}>
        <Text>Header</Text>
    </SafeAreaView>
  )
}

export default InboxHeader

const styles = StyleSheet.create({})