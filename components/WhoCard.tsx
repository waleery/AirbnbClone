import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { GuestsGroup } from '@/types/guestsGroups'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
interface Props {
  setOpenCard: (i: number) => void
  openCard: number
  groups: GuestsGroup[]
  addPerson: (index: number) => void
  removePerson: (index: number) => void
}

const WhoCard = ({ setOpenCard, openCard, groups, addPerson, removePerson }: Props) => {
  return (
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
              <View key={index} style={[styles.guestItem, index + 1 < 4 && styles.itemBorder]}>
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
  )
}

const styles = StyleSheet.create({
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

export default WhoCard
