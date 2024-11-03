import { useUser } from '@clerk/clerk-expo'
import { Image, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Colors from '@/constants/Colors'
export default function ProfilePage() {
  const { user } = useUser()

  console.log(user)
  return (
    <SafeAreaView edges={['top']} style={[styles.container]}>
      <View style={styles.modal}>
        <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
      </View>
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
  modal: {
    flexDirection: 'row',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGrey,
    borderRadius: 15,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  avatar: {
    width: '25%',
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
})
