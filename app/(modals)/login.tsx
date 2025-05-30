import { useOAuth } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useCallback, useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'

import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants'
import { useWarmUpBrowser } from '@/hooks'

enum Strategy {
  Google = 'oauth_google',
  Apple = 'oauth_apple',
  Facebook = 'oauth_facebook',
}
const Page = () => {
  useWarmUpBrowser()
  const router = useRouter()

  const [isTyped, setIsTyped] = useState<boolean>(false)

  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' })
  const { startOAuthFlow: appleAuth } = useOAuth({ strategy: 'oauth_apple' })
  const { startOAuthFlow: facebookAuth } = useOAuth({ strategy: 'oauth_facebook' })

  const onSelectAuth = useCallback(
    (strategy: Strategy) => async () => {
      const selectedAuth = {
        [Strategy.Google]: googleAuth,
        [Strategy.Apple]: appleAuth,
        [Strategy.Facebook]: facebookAuth,
      }[strategy]

      try {
        const { createdSessionId, setActive } = await selectedAuth()

        if (createdSessionId && setActive) {
          setActive({ session: createdSessionId })
          router.back()
        }
      } catch (err) {
        console.error('OAuth error', err)
      }
    },
    [appleAuth, facebookAuth, googleAuth, router]
  )
  const handleTextChange = useCallback((text: string) => {
    setIsTyped(!!text)
  }, [])

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, styles.emailInput]}
        onChangeText={handleTextChange}
      />
      <TouchableOpacity
        style={[defaultStyles.btn, !isTyped && { backgroundColor: Colors.lightGrey }]}
      >
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.separatorView}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>or</Text>
        <View style={styles.separatorLine} />
      </View>

      <View style={styles.containerPadding}>
        <TouchableOpacity style={defaultStyles.btnOutline}>
          <Ionicons name="call-outline" style={defaultStyles.btnIcon} size={24} />
          <Text style={defaultStyles.btnOutlineText}>Continue with Phone</Text>
        </TouchableOpacity>
        <TouchableOpacity style={defaultStyles.btnOutline} onPress={onSelectAuth(Strategy.Apple)}>
          <Ionicons name="logo-apple" style={defaultStyles.btnIcon} size={24} />
          <Text style={defaultStyles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={defaultStyles.btnOutline} onPress={onSelectAuth(Strategy.Google)}>
          <Ionicons name="logo-google" style={defaultStyles.btnIcon} size={24} />
          <Text style={defaultStyles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={defaultStyles.btnOutline}
          onPress={onSelectAuth(Strategy.Facebook)}
        >
          <Ionicons name="logo-facebook" style={defaultStyles.btnIcon} size={24} />
          <Text style={defaultStyles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 26,
  },
  containerPadding: {
    gap: 15,
  },
  separatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  separatorLine: {
    flex: 1,
    borderBottomColor: Colors.black,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  separatorText: {
    color: Colors.grey,
  },
  emailInput: {
    marginBottom: 30,
  },
})
export default Page
