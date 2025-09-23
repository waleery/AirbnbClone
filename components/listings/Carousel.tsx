import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
  ImageErrorEventData,
  ActivityIndicator,
  ViewToken,
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
  const [errorImages, setErrorImages] = useState<Record<number, boolean>>({})
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({})

  const flatListRef = useRef<FlatList<string>>(null)

  const allImages = useMemo(() => [...items, ...additionalImages], [items])

  const handleImageError = useCallback((index: number, event: ImageErrorEventData) => {
    console.log(`Image ${index} failed to load:`, event)
    setErrorImages((prev) => ({ ...prev, [index]: true }))
    setLoadingImages((prev) => ({ ...prev, [index]: false }))
  }, [])

  const handleImageLoadStart = useCallback((index: number) => {
    setLoadingImages((prev) => ({ ...prev, [index]: true }))
  }, [])

  const handleImageLoadEnd = useCallback((index: number) => {
    setLoadingImages((prev) => ({ ...prev, [index]: false }))
  }, [])

  const onViewableItemsChanged = useRef<
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
    ({ item, index }: { item: string | number; index: number }) => {
      const hasError = errorImages[index]
      const isLoading = loadingImages[index]

      if (hasError) {
        return (
          <View style={styles.imagePlaceholder}>
            <MaterialCommunityIcons name="image-off-outline" size={50} color={Colors.primary} />
            <Text>Image failed to load</Text>
          </View>
        )
      }

      return (
        <Pressable onPress={handleOnPress}>
          <View style={styles.imageWrapper}>
            {isLoading && (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={Colors.primary} />
              </View>
            )}
            <Image
              source={
                typeof item === 'string'
                  ? { uri: `https://images.weserv.nl/?url=${encodeURIComponent(item)}` }
                  : item
              }
              style={styles.image}
              // eslint-disable-next-line react/jsx-no-bind
              onLoadStart={() => handleImageLoadStart(index)}
              // eslint-disable-next-line react/jsx-no-bind
              onLoadEnd={() => handleImageLoadEnd(index)}
              // eslint-disable-next-line react/jsx-no-bind
              onError={(error) => handleImageError(index, error)}
            />
          </View>
        </Pressable>
      )
    },
    [
      errorImages,
      loadingImages,
      handleImageError,
      handleImageLoadStart,
      handleImageLoadEnd,
      handleOnPress,
    ]
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
            {allImages.map((_, index) => (
              <TouchableOpacity
                key={index}
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
  imageWrapper: {
    width: width - 32,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width - 32,
    height: 350,
    borderRadius: 10,
  },
  loaderContainer: {
    zIndex: 2,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
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
