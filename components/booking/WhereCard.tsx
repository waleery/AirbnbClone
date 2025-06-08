import { Ionicons } from '@expo/vector-icons'
import { useCallback } from 'react'
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import { places } from '@/assets/data'
import { defaultStyles } from '@/constants'
import Colors from '@/constants/Colors'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
interface Props {
  setOpenCard: (i: number) => void
  openCard: number
  setSelectedPlace: (i: number) => void
  selectedPlace: number
}
export const WhereCard = ({ setOpenCard, openCard, setSelectedPlace, selectedPlace }: Props) => {
  const handleOpenCard = useCallback(() => setOpenCard(0), [setOpenCard])

  const handleSelectPlace = useCallback(
    (i: number) => () => setSelectedPlace(i),
    [setSelectedPlace]
  )

  return (
    <View style={defaultStyles.card}>
      {openCard !== 0 && (
        <AnimatedTouchableOpacity
          onPress={handleOpenCard}
          style={defaultStyles.cardPreview}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <Text style={defaultStyles.previewText}>Where</Text>
          <Text style={defaultStyles.previewDate}>I&apos;m flexible</Text>
        </AnimatedTouchableOpacity>
      )}
      {openCard === 0 && (
        <>
          <Text style={defaultStyles.cardHeader}>Where to?</Text>
          <Animated.View style={defaultStyles.pX2}>
            <View style={styles.searchSection}>
              <Ionicons name="search" size={20} color={'black'} style={styles.searchIcon} />
              <TextInput
                style={styles.inputField}
                placeholder="Search destination"
                placeholderTextColor={Colors.grey}
              />
            </View>
          </Animated.View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewStyle}
          >
            {places.map((item, i) => (
              <TouchableOpacity onPress={handleSelectPlace(i)} key={i}>
                <Image
                  source={item.img}
                  style={selectedPlace === i ? styles.placeSelected : styles.place}
                />
                <Text
                  style={[styles.titleText, selectedPlace === i ? defaultStyles.boldText : null]}
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  searchSection: {
    height: 50,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 8,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  inputField: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  searchIcon: {
    padding: 10,
  },
  place: {
    width: 110,
    height: 110,
    borderRadius: 10,
  },
  placeSelected: {
    width: 110,
    height: 110,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.grey,
  },
  scrollViewStyle: {
    gap: 25,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  titleText: {
    paddingTop: 6,
  },
})
