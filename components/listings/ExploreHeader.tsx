import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { Link } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { accommodation_categories } from '@/constants/categories'

interface Props {
  onCategoryChanged: (category: string) => void
}
export const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null)
  const itemsRef = useRef<TouchableOpacity[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const getRefHandler = useCallback(
    (index: number) => (element: TouchableOpacity | null) => {
      if (!element) return
      itemsRef.current[index] = element
    },
    []
  )

  const selectCategory = useCallback(
    (index: number) => () => {
      const selectedItem = itemsRef.current[index]

      selectedItem.measure((x) => {
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
        <View style={styles.rowAction}>
          <Link href={'/(modals)/booking'} asChild>
            <TouchableOpacity style={styles.searchBtn}>
              <Ionicons name="search" size={24} />
              <View>
                <Text style={defaultStyles.boldText}>Where to?</Text>
                <Text style={defaultStyles.thinText}>Anywhere · Any week</Text>
              </View>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={24} />
          </TouchableOpacity>
        </View>
        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.acommodationsScrollView}
        >
          {accommodation_categories.map((category, index) => (
            <TouchableOpacity
              key={index}
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
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
  },
  rowAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 10,
  },
  filterBtn: {
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGrey,
    borderRadius: 24,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },
  searchBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: Colors.lightGrey,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 12,
    borderRadius: 30,
    backgroundColor: Colors.white,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.07,
    shadowRadius: 8,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: Colors.transparent,
  },
  categoryBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingBottom: 6,
    borderBottomColor: Colors.black,
    borderBottomWidth: 2,
  },
  acommodationsScrollView: {
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 16,
  },
})