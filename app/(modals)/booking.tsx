import { StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'

import { useState } from 'react'

import WhereCard from '@/components/WhereCard'
import WhenCard from '@/components/WhenCard'
import WhoCard from '@/components/WhoCard'
import BookingFooter from '@/components/BookingFooter'
import { guestsGroups } from '@/constants/guestsGroups'
import { GuestsGroup } from '@/types/guestsGroups'
import { useAtom } from 'jotai'
import { guestsIncludedFilterAtom } from '@/store/listingsStore'

const Page = () => {
  const [guestsIncluded, setGuestsIncluded] = useAtom(guestsIncludedFilterAtom);

  const [openCard, setOpenCard] = useState(0)
  const [selectedPlace, setSelectedPalce] = useState(0)
  const [groups, setGroups] = useState<GuestsGroup[]>(guestsGroups)

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

  const filter = () => {
    const totalPersonCount = groups.reduce((prev, current) => prev + current.count, 0)
    setGuestsIncluded(totalPersonCount)
  }
  return (
    <BlurView intensity={70} style={styles.container} tint="light">
      {/* Where */}

      <WhereCard
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPalce}
        openCard={openCard}
        setOpenCard={setOpenCard}
      />
      {/* When */}

      <WhenCard openCard={openCard} setOpenCard={setOpenCard} />
      {/* Who */}

      <WhoCard
        openCard={openCard}
        setOpenCard={setOpenCard}
        groups={guestsGroups}
        addPerson={addPerson}
        removePerson={removePerson}
      />

      {/* Footer */}
      <BookingFooter onClearAll={onClearAll} filter={filter}/>
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
