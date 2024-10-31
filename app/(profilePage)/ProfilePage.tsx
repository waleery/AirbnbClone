import { Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Colors from '@/constants/Colors'
export default function ProfilePage() {
  return (
    <SafeAreaView edges={['top']} style={[styles.container]}>
      <Text>ProfilePage</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
})
