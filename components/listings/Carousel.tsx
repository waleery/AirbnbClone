import React, { useCallback, useRef, useState } from 'react'
import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ViewToken,
} from 'react-native'

import Colors from '@/constants/Colors'

const { width } = Dimensions.get('window')

type CarouselProps = {
  items: string[]
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList<string>>(null)

  const onViewableItemsChanged = React.useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0) // Użycie "??" dla bezpieczeństwa
      }
    }
  ).current

  const viewabilityConfig = { viewAreaCoveragePercentThreshold: 50 }

  const keyExtractor = useCallback((_: string, index: number) => index.toString(), [])
  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.slide}>
        <Text style={styles.slideText}>{item}</Text>
      </View>
    ),
    []
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
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.lightGrey,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: Colors.black,
  },
})
