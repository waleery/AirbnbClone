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

const Page = () => {
  const router = useRouter()

  const [openCard, setOpenCard] = useState(0)
  const [selectedPlace, setSelectedPalce] = useState(0)
  const [groups, setGroups] = useState(guestsGroups)

  const today = new Date().toISOString().substring(0, 10)
  console.log(today)
  const onClearAll = () => {
    setSelectedPalce(0)
    setOpenCard(0)
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
          <>
            <Text style={styles.cardHeader}>Who's comming?</Text>

            <Animated.View style={styles.cardBody}>
              {groups.map((item, index) => (
                <View
                  key={index}
                  style={[styles.guestItem, index + 1 < guestsGroups.length && styles.itemBorder]}
                >
                  <View>
                    <Text style={{ fontWeight: '700', fontSize: 14 }}>{item.name}</Text>
                    <Text style={{ fontSize: 14, color: Colors.grey }}>{item.text}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <TouchableOpacity
                      disabled={!(groups[index].count > 0)}
                      onPress={() => removePerson(index)}
                    >
                      <Ionicons
                        name="remove-circle-outline"
                        size={26}
                        color={groups[index].count > 0 ? Colors.grey : '#cdcdcd'}
                      />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, textAlign: 'center', minWidth: 20 }}>
                      {item.count}
                    </Text>
                    <TouchableOpacity onPress={() => addPerson(index)}>
                      <Ionicons name="add-circle-outline" size={26} color={Colors.grey} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Animated.View>
          </>
        )}
      </View>

      {/* Footer */}
      <Animated.View style={defaultStyles.footer} entering={SlideInDown.delay(200)}>
        <View style={styles.footer}>
          <TouchableOpacity onPress={onClearAll} style={defaultStyles.center}>
            <Text style={styles.clearText}>Clear all</Text>
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearText: {
    fontSize: 18,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  guestItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  itemBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey,
  },
})
