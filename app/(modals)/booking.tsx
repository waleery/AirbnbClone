import { View, Text, StyleSheet, Touchable, ScrollView, Image } from 'react-native'
import { BlurView } from 'expo-blur'
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/Styles'
import { useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import Colors from '@/constants/Colors'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

const guestsGroups = [
  {
    name: 'Adults',
    text: 'Ages 13 or above',
    count: 0,
  },
  {
    name: 'Children',
    text: 'Ages 2-12',
    count: 0,
  },
  {
    name: 'Infants',
    text: 'Under 2',
    count: 0,
  },
  {
    name: 'Pest',
    text: 'Pets allowed',
    count: 0,
  },
]

import WhereCard from '@/components/WhereCard'
import WhenCard from '@/components/WhenCard'
import WhoCard from '@/components/WhoCard'
import BookingFilter from '@/components/BookingFilter'

const Page = () => {

  const [openCard, setOpenCard] = useState(0)
  const [selectedPlace, setSelectedPalce] = useState(0)
  const [groups, setGroups] = useState(guestsGroups)

  const onClearAll = () => {
    setSelectedPalce(0)
    setOpenCard(0)
    setGroups(guestsGroups)
  }

  const addPerson = (index: number) => {
    const newGroups = [...groups]
    newGroups[index].count++
    setGroups(newGroups)
  }

  const removePerson = (index: number) => {
    const newGroups = [...groups]
    if (newGroups[index].count > 0) {
      newGroups[index].count--
      setGroups(newGroups)
    }
  }
  return (
    <BlurView intensity={70} style={styles.container} tint="light">
      {/* Where */}
      
      <WhereCard selectedPlace={selectedPlace} setSelectedPlace={setSelectedPalce} openCard={openCard} setOpenCard={setOpenCard} />
      {/* When */}
      
      <WhenCard openCard={openCard} setOpenCard={setOpenCard} />
      {/* Who */}
      
      <WhoCard openCard={openCard} setOpenCard={setOpenCard} groups={guestsGroups} addPerson={addPerson} removePerson={removePerson} />

      {/* Footer */}
      <BookingFilter onClearAll={onClearAll} />
    </BlurView>
  )
}
export default Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
})
