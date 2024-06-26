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
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import Colors from '@/constants/Colors'
import { places } from '@/assets/data/places'
import { defaultStyles } from '@/constants/Styles'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
interface Props {
  setOpenCard: (i: number) => void
  openCard: number
  setSelectedPlace: (i: number) => void
  selectedPlace: number
}
export default function WhereCard({
  setOpenCard,
  openCard,
  setSelectedPlace,
  selectedPlace,
}: Props) {
  return (
    <View style={defaultStyles.card}>
      {openCard != 0 && (
        <AnimatedTouchableOpacity
          onPress={() => setOpenCard(0)}
          style={defaultStyles.cardPreview}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <Text style={defaultStyles.previewText}>Where</Text>
          <Text style={defaultStyles.previewDate}>I'm flexible</Text>
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
              <TouchableOpacity onPress={() => setSelectedPlace(i)} key={i}>
                <Image
                  source={item.img}
                  style={selectedPlace === i ? styles.placeSelected : styles.place}
                />
                <Text
                  style={[{ paddingTop: 6 }, selectedPlace === i ? { fontWeight: 'bold' } : null]}
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
    borderColor: '#ABABAB',
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  inputField: {
    flex: 1,
    backgroundColor: '#fff',
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
    paddingLeft: 20,
    paddingBottom: 20,
  },
})
