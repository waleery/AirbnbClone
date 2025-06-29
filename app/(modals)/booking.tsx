import { BlurView } from 'expo-blur'
import { useAtom, useSetAtom } from 'jotai'
import { useCallback, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'

import { BookingFooter, WhenCard, WhereCard, WhoCard } from '@/components'
import { daysStayFilterAtom, isFilteringAtom, groupsAtom, guestsIncludedFilterAtom } from '@/store'

const Page = () => {
  const setGuestsIncluded = useSetAtom(guestsIncludedFilterAtom)
  const setDaysStayFilterAtom = useSetAtom(daysStayFilterAtom)
  const [filterFlag, setFilterFlag] = useAtom(isFilteringAtom)
  const [groups, setGroups] = useAtom(groupsAtom)
  const [openCard, setOpenCard] = useState<number>(0)
  const [selectedPlace, setSelectedPlace] = useState<number>(0)

  useEffect(() => {
    if (filterFlag) {
      setFilterFlag(false)
    }
  }, [filterFlag, setFilterFlag])

  const onClearAll = useCallback(() => {
    setSelectedPlace(0)
    setOpenCard(0)
    setGroups((prev) => prev.map((item) => ({ ...item, count: 0 })))
    setGuestsIncluded(0)
    setDaysStayFilterAtom(null)
  }, [setDaysStayFilterAtom, setGroups, setGuestsIncluded])

  const filter = useCallback(() => {
    const totalPersonCount = groups.reduce((prev, current) => prev + current.count, 0)
    setGuestsIncluded(totalPersonCount)
    setFilterFlag(true)
  }, [groups, setFilterFlag, setGuestsIncluded])
  return (
    <BlurView intensity={70} style={styles.container} tint="light">
      {/* Where */}
      <WhereCard
        selectedPlace={selectedPlace}
        setSelectedPlace={setSelectedPlace}
        openCard={openCard}
        setOpenCard={setOpenCard}
      />
      
      {/* When */}
      <WhenCard openCard={openCard} setOpenCard={setOpenCard} />
      
      {/* Who */}
      <WhoCard openCard={openCard} setOpenCard={setOpenCard} />

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
