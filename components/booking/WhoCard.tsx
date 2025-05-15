import { Ionicons } from '@expo/vector-icons'
import { useAtom } from 'jotai'
import React, { useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants'
import { groupsAtom } from '@/store'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)
interface Props {
  setOpenCard: (i: number) => void
  openCard: number
}

export const WhoCard = ({ setOpenCard, openCard }: Props) => {
  const [groups, setGroups] = useAtom(groupsAtom)

  const addPerson = useCallback(
    (index: number) => () => {
      const newGroups = [...groups]
      newGroups[index].count++
      setGroups(newGroups)
    },
    [groups, setGroups]
  )

  const removePerson = useCallback(
    (index: number) => () => {
      const newGroups = [...groups]
      if (newGroups[index].count > 0) {
        newGroups[index].count--
        setGroups(newGroups)
      }
    },
    [groups, setGroups]
  )

  const displayPersonCount = useCallback(() => {
    const personCount = groups.reduce((prev, current) => prev + current.count, 0)
    if (personCount === 1) {
      return `${personCount} person`
    } else if (personCount > 1) {
      return `${personCount} persons`
    }
    return 'Add person'
  }, [groups])

  const handleOpenCard = useCallback(() => {
    setOpenCard(2)
  }, [setOpenCard])
  return (
    <View style={defaultStyles.card}>
      {openCard !== 2 && (
        <AnimatedTouchableOpacity
          onPress={handleOpenCard}
          style={defaultStyles.cardPreview}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <Text style={defaultStyles.previewText}>Who</Text>
          <Text style={defaultStyles.previewDate}>{displayPersonCount()}</Text>
        </AnimatedTouchableOpacity>
      )}
      {openCard === 2 && (
        <>
          <Text style={defaultStyles.cardHeader}>Who&apos;s coming?</Text>

          <Animated.View style={defaultStyles.pX2}>
            {groups.map((item, index) => (
              <View key={index} style={[styles.guestItem, index + 1 < 4 && styles.itemBorder]}>
                <View>
                  <Text style={styles.groupName}>{item.name}</Text>
                  <Text style={styles.groupText}>{item.text}</Text>
                </View>

                <View style={styles.managePersonCount}>
                  <TouchableOpacity
                    disabled={!(groups[index].count > 0)}
                    onPress={removePerson(index)}
                  >
                    <Ionicons
                      name="remove-circle-outline"
                      size={26}
                      color={groups[index].count > 0 ? Colors.grey : '#cdcdcd'}
                    />
                  </TouchableOpacity>
                  <Text style={styles.personCount}>{item.count}</Text>
                  <TouchableOpacity onPress={addPerson(index)}>
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
