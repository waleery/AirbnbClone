import { View, Text, StyleSheet, Touchable, ScrollView, Image } from 'react-native'
import { BlurView } from 'expo-blur'
import Animated, { FadeIn, FadeOut, SlideInDown } from 'react-native-reanimated'
import { defaultStyles } from '@/constants/Styles'
import { useRouter } from 'expo-router'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import Colors from '@/constants/Colors'
import { places } from '@/assets/data/places'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

//@ts-ignore
import DatePicker from 'react-native-modern-datepicker';

const Page = () => {
  const router = useRouter()

  const [openCard, setOpenCard] = useState(1)
  const [selectedPlace, setSelectedPalce] = useState(0)

  const today = new Date().toISOString().substring(0,10)
  console.log(today)
  const onClearAll = () => {
    setSelectedPalce(0)
    setOpenCard(0)
  }
  return (
    <BlurView intensity={70} style={styles.container} tint="light">
      {/* Where */}
      <View style={styles.card}>
        {openCard != 0 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(0)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Where</Text>
            <Text style={styles.previewDate}>I'm flexible</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 0 && (
          <>
            <Text style={styles.cardHeader}>Where to?</Text>
            <Animated.View style={styles.cardBody}>
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
              contentContainerStyle={styles.scroolViewStyle}
            >
              {places.map((item, i) => (
                <TouchableOpacity onPress={() => setSelectedPalce(i)}>
                  <Image
                    key={i}
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

      {/* When */}
      <View style={styles.card}>
        {openCard != 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewDate}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 1 && (
          <>
            <Text style={styles.cardHeader}>When your's trip?</Text>

            <Animated.View style={styles.cardBody}>
              <DatePicker current={today} selected={today}/>
            </Animated.View>
          </>
        )}
      </View>

      {/* Who */}
      <View style={styles.card}>
        {openCard != 2 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(2)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>Who</Text>
            <Text style={styles.previewDate}>Add guests</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 2 && (
          <Animated.View>
            <Text style={styles.cardHeader}>Who's comming?</Text>
          </Animated.View>
        )}
      </View>

      {/* Footer */}
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View
          style={styles.footer}
        >
          <TouchableOpacity onPress={onClearAll} style={defaultStyles.center}>
            <Text
              style={styles.clearText}
            >
              Clear all
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={router.back}
            style={[defaultStyles.btn, { paddingRight: 20, paddingLeft: 50 }]}
          >
            <Ionicons
              name="search-outline"
              size={24}
              color={'#fff'}
              style={defaultStyles.btnIcon}
            />
            <Text style={[defaultStyles.btnText, { fontWeight: '500' }]}>Search</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </BlurView>
  )
}
export default Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    gap: 14,
  },
  cardPreview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  previewText: {
    fontWeight: '500',
    fontSize: 14,
    color: Colors.grey,
  },
  previewDate: {
    fontWeight: '500',
    fontSize: 14,
    color: Colors.dark,
  },
  cardHeader: {
    fontSize: 24,
    padding: 20,
    fontWeight: '500',
  },
  cardBody: {
    paddingHorizontal: 20,
  },
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
  scroolViewStyle: {
    gap: 25,
    paddingLeft: 20,
    paddingBottom: 20,
  },
  footer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearText:{
    fontSize: 18,
    fontWeight: '500',
    textDecorationLine: 'underline',
  }
})
