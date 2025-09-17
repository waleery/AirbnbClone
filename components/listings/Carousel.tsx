import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useCallback, useMemo, useRef, useState } from 'react'
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

import roomExample from '@/assets/images/room_example.jpg'
import roomExample2 from '@/assets/images/room_example_2.jpg'
import roomExample3 from '@/assets/images/room_example_3.jpg'
import Colors from '@/constants/Colors'

const { width } = Dimensions.get('window')

type CarouselProps = {
  items: string[]
  onPress?: () => void
}

const additionalImages = [roomExample, roomExample2, roomExample3]

export const Carousel: React.FC<CarouselProps> = ({ items, onPress = () => {} }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [imageError, setImageError] = useState<boolean>(false)

  const flatListRef = useRef<FlatList<string>>(null)

  const allImages = useMemo(() => [...items, ...additionalImages], [items])

  const handleImageError = useCallback(() => setImageError(true), [])

  const onViewableItemsChanged = React.useRef<
    ({ viewableItems }: { viewableItems: ViewToken[] }) => void
  >(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index ?? 0)
    }
  }).current

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }

  const handleOnPress = useCallback(() => {
    onPress()
  }, [onPress])

  const keyExtractor = useCallback((_: string, index: number) => index.toString(), [])
  const renderItem = useCallback(
    ({ item }: { item: string | number }) => {
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
            <Image
              // Temporary fix: Expo can't load images from our host due to HTTPS/CORS issues.
              // Using images.weserv.nl as a proxy for testing only — remove for production.
              source={
                typeof item === 'string'
                  ? { uri: `https://images.weserv.nl/?url=${encodeURIComponent(item)}` }
                  : item
              }
              style={styles.image}
              onError={handleImageError}
            />
          </Pressable>
        )
      }
    },
    [handleImageError, imageError, handleOnPress]
  )

  const handleDotPress = useCallback(
    (index: number) => () => {
      setCurrentIndex(index)
      flatListRef.current?.scrollToIndex({ index, animated: true })
    },
    []
  )
  return (
    <View style={styles.backgroundContainer}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={allImages}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          keyExtractor={keyExtractor}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          renderItem={renderItem}
        />
        {allImages.length > 1 && (
          <View style={styles.dotsContainer}>
            {allImages.map((image, index) => (
              <TouchableOpacity
                key={image}
                style={[styles.dot, currentIndex === index && styles.activeDot]}
                onPress={handleDotPress(index)}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    borderRadius: 10,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width - 32,
    height: 350,
  },
  dotsContainer: {
    position: 'absolute',
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
    height: 350,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.veryLightGrey,
  },
})
