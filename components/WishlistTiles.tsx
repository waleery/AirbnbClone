import { FlatList } from 'react-native-gesture-handler'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { View, ListRenderItem, Image, StyleSheet } from 'react-native'
import { Link } from 'expo-router'

import wishlistData from '@/assets/data/wishlist.json'
import { Wishlist } from '@/types/whishlist'
const wishlists: Wishlist[] = wishlistData as Wishlist[]

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

export default WishlistTiles

const styles = StyleSheet.create({
  containerBox: {
    display: 'flex',
    flexDirection: 'row',
  },
  tileBox: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'white',
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
    resizeMode: 'cover',
  },
})
