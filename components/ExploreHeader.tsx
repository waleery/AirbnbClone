import { defaultStyles } from '@/constants/Styles'
import { accomodation_categories } from '@/constants/categories'
import colors from '@/constants/Colors'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { useRef, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Haptics from 'expo-haptics'

interface Props {
  onCategoryChanged: (category: string) => void
}
const ExploreHeader = ({ onCategoryChanged }: Props) => {
  const scrollRef = useRef<ScrollView>(null)
  const itemsRef = useRef<Array<TouchableOpacity>>([])
  const [activeIndex, setActiveIndex] = useState(0)

  const selectCategory = (index: number) => {
    const selectedItem = itemsRef.current[index]

    selectedItem.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true })
    })

    setActiveIndex(index)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)

    onCategoryChanged(accomodation_categories[index].name)
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
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
          {accomodation_categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              ref={(element) => (itemsRef.current[index] = element!)}
              style={activeIndex === index ? styles.categoryBtnActive : styles.categoryBtn}
              onPress={() => selectCategory(index)}
            >
              <MaterialIcons
                size={24}
                name={category.icon as any}
                color={activeIndex === index ? '#000' : colors.grey}
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
export default ExploreHeader

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: '#fff',
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
    borderColor: colors.grey,
    borderRadius: 24,elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },
  searchBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderColor: '#c2c2c2',
    borderWidth: StyleSheet.hairlineWidth,
    padding: 12,
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
  },
  categoryText: {
    fontSize: 14,
    color: colors.grey,
  },
  categoryTextActive: {
    fontSize: 14,
    color: '#000',
  },
  categoryBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  categoryBtnActive: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingBottom: 6,
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  },
  acommodationsScrollView: {
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 16,
  },
})
