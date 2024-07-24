import WishlistHeader from '@/components/WishlistHeader'
import { defaultStyles } from '@/constants/Styles'
import { Link, Stack } from 'expo-router'
import { View, Text, StyleSheet, ListRenderItem, Image } from 'react-native'
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
    <View style={styles.tileBox}>
      {item.list.map((listItem) => (
        <Link href={`/listing/${listItem.id}`} asChild>
          <TouchableOpacity style={styles.touchable}>
            <Image source={{ uri: listItem.medium_url! }} style={styles.image} />
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  )

  return (
    <FlatList
      data={wishlists}
      renderItem={renderRow}
      numColumns={2}
      contentContainerStyle={styles.containerBox}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    gap: 20,
    flex: 1,
  },
  containerBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    paddingTop: 16,
    paddingHorizontal: 16,
    
  },

  tileBox: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor:'white',
    width: 150,
    height: 150,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  touchable: {
    width: '50%',
    height: '50%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensure the image covers the box properly
  },
})
