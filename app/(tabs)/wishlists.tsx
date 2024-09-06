import { Stack } from 'expo-router'
import { View, StyleSheet } from 'react-native'

import WishlistHeader from '@/components/WishlistHeader'
import WishlistTiles from '@/components/WishlistTiles'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'

const Page = () => {
  return (
    <View style={defaultStyles.flex}>
      <Stack.Screen
        options={{
          header: () => <WishlistHeader />,
        }}
      />
      <View style={styles.container}>
        <WishlistTiles />
      </View>
    </View>
  )
}
export default Page

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    gap: 20,
    flex: 1,
  },
})
