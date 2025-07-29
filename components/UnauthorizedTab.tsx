import { useRouter } from 'expo-router'
import { useCallback } from 'react'
import { Text, StyleSheet } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { defaultStyles } from '@/constants'
import Colors from '@/constants/Colors'

type UnauthorizedTabProps = {
  title: string
  firstText: string
  secondText: string
}
export const UnauthorizedTab = ({ title, firstText, secondText }: UnauthorizedTabProps) => {
  const router = useRouter()

  const handlePressLogIn = useCallback(() => {
    router.push('/(modals)/login')
  }, [router])

  return (
    <SafeAreaView
      edges={['top']}
      style={[defaultStyles.pX2, defaultStyles.safeArea, styles.container]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.noTrips}>{firstText}</Text>
      <Text style={styles.noTripsSecond}>{secondText}</Text>

      <Pressable onPress={handlePressLogIn} style={[defaultStyles.btn, styles.button]}>
        <Text style={[defaultStyles.btnText, defaultStyles.font500]}>Log in</Text>
      </Pressable>
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
