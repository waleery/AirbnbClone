import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useCallback, useRef, useState } from 'react'
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ViewToken,
  Image,
  Text,
  Pressable,
} from 'react-native'

import Colors from '@/constants/Colors'

const { width } = Dimensions.get('window')

type CarouselProps = {
  items: string[]
  onPress?: () => void
}

const Carousel: React.FC<CarouselProps> = ({ items, onPress = () => {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageError, setImageError] = useState(false)

  const flatListRef = useRef<FlatList<string>>(null)

  const handleImageError = useCallback(() => setImageError(true), [])

  const onViewableItemsChanged = React.useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0) // Użycie "??" dla bezpieczeństwa
      }
    }
  ).current

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }

  const handleOnPress = useCallback(() => {
    onPress()
  }, [onPress])

  const keyExtractor = useCallback((_: string, index: number) => index.toString(), [])
  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      if (imageError) {
        return (
          <View style={styles.imagePlaceholder}>
            <MaterialCommunityIcons name="image-off-outline" size={50} color={Colors.primary} />
            <Text>Image failed to load</Text>
          </View>
        )
      } else {
        return (
          <Pressable onPress={handleOnPress}>
            <Image source={{ uri: item }} style={styles.image} onError={handleImageError} />
          </Pressable>
        )
      }
    },
    [handleImageError, imageError, handleOnPress]
  )
  const handleDotPress = useCallback(
    (index: number) => () => {
      setCurrentIndex(index)
      flatListRef.current?.scrollToIndex({ index, animated: true }) // Przesuń FlatList
    },
    []
  )
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        keyExtractor={keyExtractor}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={renderItem}
      />
      {items.length > 1 && (
        <View style={styles.dotsContainer}>
          {items.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
              onPress={handleDotPress(index)}
            />
          ))}
        </View>
      )}
    </View>
  )
}

export default Carousel

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width - 32,
    height: 300,
    borderRadius: 10,
  },
  dotsContainer: {
    position:'absolute',
    bottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: Colors.veryLightGrey,
    marginHorizontal: 3.5,
    opacity: 0.5,
  },
  activeDot: {
    backgroundColor: Colors.white,
    opacity: 1,
  },
  imagePlaceholder: {
    width: width - 32,
    height: 300,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.veryLightGrey,
  },
})
