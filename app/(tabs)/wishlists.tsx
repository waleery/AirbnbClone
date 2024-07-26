import WishlistHeader from '@/components/WishlistHeader'
import { defaultStyles } from '@/constants/Styles'
import { Link, Stack } from 'expo-router'
import { View, Text, StyleSheet, ListRenderItem, Image } from 'react-native'

import WishlistTiles from '@/components/WishlistTiles'

const Page = () => {
  return (
    <View style={defaultStyles.flex}>
      <Stack.Screen
        options={{
          header: () => <WishlistHeader />,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Wishlist</Text>
        <WishlistTiles />
      </View>
    </View>
  )
}
export default Page

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    gap: 20,
    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
})
