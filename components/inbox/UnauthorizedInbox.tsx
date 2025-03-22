import { Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'

const UnauthorizedInbox = () => {
  return (
    <SafeAreaView
      edges={['top']}
      style={[defaultStyles.pX2, defaultStyles.safeArea, styles.container]}
    >
      <Text style={styles.title}>Trips</Text>
      <Text style={styles.noTrips}> No trips yet</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: '500',
    paddingTop: 16,
  },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  noTrips: {
    fontWeight: '500',
    fontSize: 20,
    paddingTop: 48,
  },
})

export default UnauthorizedInbox
