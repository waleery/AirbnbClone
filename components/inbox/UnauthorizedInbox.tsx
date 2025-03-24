import { useRouter } from 'expo-router'
import { useCallback } from 'react'
import { Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'

const UnauthorizedInbox = () => {
  const router = useRouter()

  const handlePressLogIn = useCallback(() => {
    router.push('/(modals)/login')
  }, [router])

  return (
    <SafeAreaView
      edges={['top']}
      style={[defaultStyles.pX2, defaultStyles.safeArea, styles.container]}
    >
      <Text style={styles.title}>Trips</Text>
      <Text style={styles.noTrips}>No trips yet</Text>
      <Text style={styles.noTripsSecond}>
        When you&apos;re ready to plan your next trip, we&apos;re here to help
      </Text>

      <TouchableOpacity onPress={handlePressLogIn} style={[defaultStyles.btn, styles.button]}>
        <Text style={[defaultStyles.btnText, defaultStyles.font500]}>Log in</Text>
      </TouchableOpacity>
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
  noTripsSecond: {
    paddingTop: 8,
    fontSize: 16,
  },
  button: { alignSelf: 'flex-start', paddingHorizontal: 30, marginTop: 38 },
})

export default UnauthorizedInbox
