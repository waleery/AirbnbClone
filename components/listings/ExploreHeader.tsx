import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { Link } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { defaultStyles, accommodation_categories } from '@/constants'
import Colors from '@/constants/Colors'

interface ExploreHeaderProps {
  onCategoryChanged: (category: string) => void
}
export const ExploreHeader = ({ onCategoryChanged }: ExploreHeaderProps) => {
  const scrollRef = useRef<ScrollView>(null)
  const itemsRef = useRef<React.RefObject<View>[]>([])
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const getRefHandler = useCallback(
    (index: number) => (element: View | null) => {
      if (!element) return
      itemsRef.current[index] = { current: element }
    },
    []
  )

  const selectCategory = useCallback(
    (index: number) => () => {
      const selectedItem = itemsRef.current[index]

      selectedItem.current?.measure((x) => {
        scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true })
      })

      setActiveIndex(index)
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

      onCategoryChanged(accommodation_categories[index].name)
    },
    [onCategoryChanged]
  )

  return (
    <SafeAreaView style={defaultStyles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <Link href={'/(modals)/booking'} asChild>
          <TouchableOpacity style={styles.searchBtn}>
            <Ionicons name="search" size={12} />
            <Text style={styles.headerText}>Start your search</Text>
          </TouchableOpacity>
        </Link>
        <View style={styles.typesContainer}>
          {accommodation_categories.map((category, index) => (
            <TouchableOpacity
              key={category.name}
              ref={getRefHandler(index)}
              style={activeIndex === index ? styles.categoryBtnActive : styles.categoryBtn}
              onPress={selectCategory(index)}
            >
              <MaterialIcons
                size={24}
                name={category.icon as keyof typeof MaterialIcons.glyphMap}
                color={activeIndex === index ? Colors.black : Colors.grey}
              />
              <Text style={activeIndex === index ? styles.categoryTextActive : styles.categoryText}>
                {category.name}
              </Text>

              <View
                style={activeIndex === index ? styles.categoryBarActive : styles.categoryBar}
              ></View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  searchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    padding: 20,
    borderRadius: 30,
    backgroundColor: Colors.white,
    margin: 16,
    zIndex: 1,

    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  categoryText: {
    fontSize: 14,
    color: Colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    color: Colors.black,
  },
  categoryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  categoryBtnActive: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  categoryBar: {
    height: 2,
    width: '100%',
  },
  categoryBarActive: {
    height: 2,
    width: '100%',
    backgroundColor: Colors.black,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  typesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 40,
    elevation: 4,
    shadowColor: Colors.lightGrey,
    shadowOpacity: 0.3,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    overflow: 'visible',
    backgroundColor: Colors.white,
  },
  headerText: {
    fontSize: 13,
    fontWeight: '500',
  },
})
