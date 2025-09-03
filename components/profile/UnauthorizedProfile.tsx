import { useRouter } from 'expo-router'
import { useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Pressable, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import { AirBnbYourHome } from './AirBnbYourHome'
import { RenderOptions } from './RenderOptions'

import { unauthorizedSettings } from '@/assets/data'
import { defaultStyles } from '@/constants'
import Colors from '@/constants/Colors'

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
        <Pressable style={{ ...defaultStyles.btn, ...styles.logInBtn }} onPress={handleOpenLogin}>
          <Text style={[defaultStyles.btnText, defaultStyles.font500]}>Log in or sign up</Text>
        </Pressable>

        <AirBnbYourHome />

        <View style={styles.optionsSection}>
          <RenderOptions options={unauthorizedSettings} />
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
    fontWeight: '600',
  },
  headerSecond: {
    fontSize: 18,
    fontWeight: '400',
    color: Colors.grey,
  },
  logInBtn: {
    marginTop: 28,
    marginBottom: 40,
    backgroundColor: Colors.black,
  },
  optionsSection: {
    gap: 35,
    marginBottom: 40,
  },
})
