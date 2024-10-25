import { useAuth } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'

const UnauthorizedProfile = () => {
  const { isSignedIn } = useAuth()
  const router = useRouter()

  const handleOpenLogin = useCallback(() => router.push('/(modals)/login'), [router])

  return (
    <SafeAreaView edges={['top']} style={[defaultStyles.container, styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
        </View>
        {!isSignedIn ? (
          <>
            <Text style={styles.headerSecond}>Log in to start planning your next trip.</Text>
            <TouchableOpacity
              style={{ ...styles.logInBtn, ...defaultStyles.btn }}
              onPress={handleOpenLogin}
            >
              <Text style={[defaultStyles.btnText, defaultStyles.font500]}>Log in</Text>
            </TouchableOpacity>
            <View style={styles.signUpContainer}>
              <Text style={styles.questionText}>Don&apos;t have account?</Text>
              <Link href="/(modals)/login" asChild>
                <Text style={styles.signUp}>Sign up</Text>
              </Link>
            </View>
          </>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  )
}
export default UnauthorizedProfile

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  headerContainer: {
    paddingVertical: 36,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  header: {
    fontSize: 30,
    fontWeight: '500',
  },
  headerSecond: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.grey,
    paddingTop: 12,
  },
  logInBtn: {
    marginTop: 40,
  },
  signUpContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    gap: 5,
    marginBottom: 40,
  },
  questionText: {
    fontWeight: '400',
    color: Colors.grey,
  },
  signUp: {
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
})