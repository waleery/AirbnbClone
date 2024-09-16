import { useAuth, useUser } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { Link } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import { View, Text, Button, StyleSheet, Image } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'

import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { SafeAreaView } from 'react-native-safe-area-context'

const Page = () => {
  const { signOut, isSignedIn } = useAuth()

  const { user } = useUser()
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [email, setEmail] = useState(user?.emailAddresses[0].emailAddress)
  const [edit, setEdit] = useState(false)

  useEffect(() => {
    if (!user) return
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.emailAddresses[0].emailAddress)
  }, [user])

  const onSaveUser = useCallback(async () => {
    setEdit(false)
    try {
      if (!firstName || !lastName) return
      await user?.update({
        firstName,
        lastName,
      })
    } catch (error) {
      console.log(error)
    }
  }, [firstName, lastName, user])

  const onCaptureImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.75,
      base64: true,
    })

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`
      user?.setProfileImage({
        file: base64,
      })
    }
  }, [user])

  const handleSetEdit = useCallback(() => setEdit(true), [setEdit])

  const handleSignOut = useCallback(async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }, [signOut])

  return (
    <SafeAreaView edges={['top']} style={[defaultStyles.container, styles.container]}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
          <Text style={styles.headerSecond}>Log in to start planning your next trip.</Text>
        </View>
        {!isSignedIn ? (
          <Link href="/(modals)/login" asChild>
            <Button title="Log In" color={Colors.dark} />
          </Link>
        ) : null}
      </ScrollView>
      {user && (
        <View style={styles.card}>
          <TouchableOpacity onPress={onCaptureImage}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>
          <View style={styles.inputView}>
            {edit ? (
              <View style={styles.editRow}>
                <TextInput
                  placeholder="First name"
                  value={firstName || ''}
                  onChangeText={setFirstName}
                  style={[defaultStyles.inputField, styles.inputWidth]}
                />
                <TextInput
                  placeholder="Last name"
                  value={lastName || ''}
                  onChangeText={setLastName}
                  style={[defaultStyles.inputField, styles.inputWidth]}
                />
                <TouchableOpacity onPress={onSaveUser}>
                  <Ionicons name="checkmark-outline" size={24} color={Colors.dark} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.editRow}>
                <Text style={styles.name}>
                  {firstName} {lastName}
                </Text>
                <TouchableOpacity onPress={handleSetEdit}>
                  <Ionicons name="create-outline" size={24} color={Colors.dark} />
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Text>{email}</Text>
          <Text>Since {user?.createdAt?.toLocaleDateString()}</Text>
        </View>
      )}
      {isSignedIn && <Button title="Log out" onPress={handleSignOut} color={Colors.dark} />}
    </SafeAreaView>
  )
}
export default Page

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
  headerContainer: {
    paddingTop: 36,
  },
  header: {
    fontSize: 30,
    fontWeight: '500',
  },
  headerSecond: {
    fontSize: 20,
    fontWeight: '400',
    color: Colors.grey,
    paddingTop: 12
  },
  card: {
    backgroundColor: Colors.white,
    padding: 24,
    borderRadius: 16,
    marginHorizontal: 24,
    marginTop: 24,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: 'center',
    gap: 14,
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  editRow: {
    flex: 1,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  inputView: {
    flexDirection: 'row',
    gap: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  inputWidth: {
    width: 100,
  },
})
