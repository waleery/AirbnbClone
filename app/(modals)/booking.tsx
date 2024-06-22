import { StyleSheet } from 'react-native'
import { BlurView } from 'expo-blur'

import { useState } from 'react'

import WhereCard from '@/components/WhereCard'
import WhenCard from '@/components/WhenCard'
import WhoCard from '@/components/WhoCard'
import BookingFooter from '@/components/BookingFooter'
import { useAtom, useSetAtom } from 'jotai'
import { daysStayFilterAtom, groupsAtom, guestsIncludedFilterAtom } from '@/store/listingsStore'

const Page = () => {
  const setGuestsIncluded = useSetAtom(guestsIncludedFilterAtom)
  const setDaysStayFilterAtom = useSetAtom(daysStayFilterAtom)
  const [groups, setGroups] = useAtom(groupsAtom)

  const [openCard, setOpenCard] = useState(0)
  const [daysCount, setDaysCount] = useState<number>(0)
  const [selectedPlace, setSelectedPalce] = useState(0)

  const onClearAll = () => {
    setSelectedPalce(0)
    setOpenCard(0)
    setGroups((prev) => prev.map((item) => ({...item, count:0})))
    setGuestsIncluded(0)
    setDaysStayFilterAtom(null)
  }

  const filter = () => {
    const totalPersonCount = groups.reduce((prev, current) => prev + current.count, 0)
    setGuestsIncluded(totalPersonCount)
    setDaysStayFilterAtom(daysCount)
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

      <WhenCard openCard={openCard} setOpenCard={setOpenCard} setDaysCount={setDaysCount}/>
      {/* Who */}

      <WhoCard
        openCard={openCard}
        setOpenCard={setOpenCard}
      />

      {/* Footer */}
      <BookingFooter onClearAll={onClearAll} filter={filter} />
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
