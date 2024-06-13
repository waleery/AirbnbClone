import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { Ionicons } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { GuestsGroup } from '@/types/guestsGroups'
import { defaultStyles } from '@/constants/Styles'

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
    <View style={defaultStyles.card}>
      {openCard != 2 && (
        <AnimatedTouchableOpacity
          onPress={() => setOpenCard(2)}
          style={defaultStyles.cardPreview}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <Text style={defaultStyles.previewText}>Who</Text>
          <Text style={defaultStyles.previewDate}>Add guests</Text>
        </AnimatedTouchableOpacity>
      )}
      {openCard === 2 && (
        <>
          <Text style={defaultStyles.cardHeader}>Who's comming?</Text>

          <Animated.View style={defaultStyles.cardBody}>
            {groups.map((item, index) => (
              <View key={index} style={[styles.guestItem, index + 1 < 4 && styles.itemBorder]}>
                <View>
                  <Text style={styles.groupName}>{item.name}</Text>
                  <Text style={styles.groupText}>{item.text}</Text>
                </View>

                <View style={styles.managePersonCount}>
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
                  <Text style={styles.personCount}>{item.count}</Text>
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
  groupName: { fontWeight: '700', fontSize: 14 },
  groupText: { fontSize: 14, color: Colors.grey },
  managePersonCount: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  personCount: { fontSize: 16, textAlign: 'center', minWidth: 20 },
})

export default WhoCard
