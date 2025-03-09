import { Link, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AirBnbYourHome } from './AirBnbYourHome'

import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'

import { unautorizedSettings } from '@/assets/data'
import { RenderOptions } from './RenderOptions'

export const UnauthorizedProfile = () => {
  const router = useRouter()

  const handleOpenLogin = useCallback(() => router.push('/(modals)/login'), [router])

  return (
    <SafeAreaView edges={['top']} style={[defaultStyles.container, styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
        </View>

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
        <AirBnbYourHome />

        <View style={styles.optionsSection}>
          <RenderOptions options={unautorizedSettings} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  headerContainer: {
    marginTop: 36,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 14,
  },
  header: {
    fontSize: 30,
    fontWeight: '500',
  },
  headerSecond: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.grey,
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
  optionsSection: {
    gap: 35,
    marginBottom: 40,
  },
})
