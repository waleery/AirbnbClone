import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity } from '@gorhom/bottom-sheet'
import { Link } from 'expo-router'
import { useAtomValue } from 'jotai'
import { Image, StyleSheet, Text, View } from 'react-native'

import { wishlistEditMode } from '@/store/wishlistStore'
import { Wishlist } from '@/types/whishlist'

export const WishlistItem = ({ wishlist }: { wishlist: Wishlist }) => {
  const editMode = useAtomValue(wishlistEditMode)

  return (
    <View style={styles.wishlistContainer}>
      <View style={styles.shadowContainer}>
        <View style={styles.tile}>
          {wishlist.recently_viewed ? (
            wishlist.list.slice(0, 4).map((listItem, index) => (
              <Link key={index} href={`/listing/${listItem.id}`} asChild>
                <TouchableOpacity style={getItemStyle(index)}>
                  <Image source={{ uri: listItem.medium_url }} style={styles.image} />
                </TouchableOpacity>
              </Link>
            ))
          ) : (
            <View style={styles.tileContainer}>
              <Link href={`/listing/${wishlist.list[0].id}`} asChild>
                <TouchableOpacity style={styles.touchableFull}>
                  <Image source={{ uri: wishlist.list[0].medium_url }} style={styles.image} />
                </TouchableOpacity>
              </Link>
              {editMode && (
                <View style={styles.remove}>
                  <Ionicons name="close" size={17} color="black" />
                </View>
              )}
            </View>
          )}
        </View>
      </View>
      <View style={styles.wishlistTexts}>
        <Text style={styles.wishlistTitle}>{wishlist.name}</Text>
        <Text style={styles.wishlistCount}>{wishlist.list.length} saved</Text>
      </View>
    </View>
  )
}

const getItemStyle = (index: number) => {
  switch (index) {
    case 0:
      return styles.item1
    case 1:
      return styles.item2
    case 2:
      return styles.item3
    case 3:
      return styles.item4
    default:
      return styles.item1
  }
}

const styles = StyleSheet.create({
  shadowContainer: {
    borderRadius: 10,
    elevation: 2,
    shadowColor: '000',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  tileContainer: {
    width: 160,
    height: 160,
  },
  tile: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#fff',
    width: 160,
    height: 160,
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  item1: {
    width: '50%',
    height: '50%',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  item2: {
    width: '50%',
    height: '50%',
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  item3: {
    width: '50%',
    height: '50%',
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: '#fff',
  },
  item4: {
    width: '50%',
    height: '50%',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#fff',
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
  remove: {
    position: 'absolute',
    borderWidth: 2,
    backgroundColor: '#fff',
    left: '6%',
    top: '6%',
    padding: 3,
    borderRadius: 50,
    borderColor: 'transparent',
  },
})
