import { FlatList } from 'react-native-gesture-handler'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { View, ListRenderItem, Image, StyleSheet, Text } from 'react-native'
import { Link } from 'expo-router'

import wishlistData from '@/assets/data/wishlist.json'
import { Wishlist } from '@/types/whishlist'
const wishlists: Wishlist[] = wishlistData as Wishlist[]

const WishlistTiles = () => {
  const wishlists: Wishlist[] = wishlistData as Wishlist[]

  const renderRow: ListRenderItem<Wishlist> = ({ item }) => (
    <View style={styles.wishlistContainer}>
      <View style={styles.shadowContainer}>
        <View style={styles.tile}>
          {item.recently_viewed ? (
            item.list.slice(0,4).map((listItem, index) => (
              <Link key={index} href={`/listing/${listItem.id}`} asChild>
                <TouchableOpacity style={styles.touchable}>
                  <Image source={{ uri: listItem.medium_url! }} style={styles.image} />
                </TouchableOpacity>
              </Link>
            ))
          ) : (
            <Link href={`/listing/${item.list[0].id}`} asChild>
              <TouchableOpacity style={styles.touchableFull}>
                <Image source={{ uri: item.list[0].medium_url! }} style={styles.image} />
              </TouchableOpacity>
            </Link>
          )}
        </View>
      </View>
      <View style={styles.wishlistTexts}>
        <Text style={styles.wishlistTitle}>{item.name}</Text>
        <Text style={styles.wishlistCount}>{item.list.length} saved</Text>
      </View>
    </View>
  )

  return (
    <FlatList
      data={wishlists}
      renderItem={renderRow}
      numColumns={2}
      contentContainerStyle={styles.containerBox}
      columnWrapperStyle={styles.columnWrapper}
    />
  )
}

export default WishlistTiles

const styles = StyleSheet.create({
  containerBox: {
    flex: 1,
    width: '100%',
    paddingTop:10,
    paddingHorizontal: 16,
    gap: 20,
  },
  shadowContainer: {
    borderRadius: 10,
    elevation: 2,
    shadowColor: '000',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  tile: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor:'#fff',
    width: 160,
    height: 160,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  touchable: {
    width: '50%',
    height: '50%',
  },
  touchableFull: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  wishlistContainer: {
    gap: 10,
  },
  wishlistTexts: {
    gap: 5,
  },
  wishlistTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  wishlistCount: {
    fontSize: 14,
    fontWeight: '300',
  },
})
