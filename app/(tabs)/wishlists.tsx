import WishlistHeader from '@/components/WishlistHeader'
import { defaultStyles } from '@/constants/Styles'
import { Link, Stack } from 'expo-router'
import { View, Text, StyleSheet, ListRenderItem } from 'react-native'
import wishlistData from '@/assets/data/wishlist.json'
import { Wishlist } from '@/types/whishlist'
import { FlatList } from 'react-native-gesture-handler'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
const wishlists: Wishlist[] = wishlistData as Wishlist[]

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

const WishlistTiles = () => {
  const wishlists: Wishlist[] = wishlistData as Wishlist[]

  const renderRow: ListRenderItem<Wishlist> = ({ item }) => (
    <View>
      <View style={styles.tileBox}>
        {item.list.map((listItem) => (
          <Link href={`/listing/${listItem.id}`} asChild>
            <TouchableOpacity>
              <Text key={listItem.id} style={styles.listItemId}>
                {listItem.id}
              </Text>
            </TouchableOpacity>
          </Link>
        ))}
      </View>

      <Text style={styles.itemName}>{item.name}</Text>
    </View>
  )

  return (
    <FlatList
      data={wishlists}
      renderItem={renderRow}
      numColumns={2}
    />
  )
}

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

  tileBox: {
    borderWidth: 2,
  },
})
