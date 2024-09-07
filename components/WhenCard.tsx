import { differenceInDays } from 'date-fns'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import React, { useCallback, useState } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import DateTimePicker, { DateType } from 'react-native-ui-datepicker'

import { defaultStyles } from '@/constants/Styles'
import { daysStayFilterAtom } from '@/store/listingsStore'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

interface Props {
  setOpenCard: (i: number) => void
  openCard: number
}

export default function WhenCard({ setOpenCard, openCard }: Props) {
  const [daysCount, setDaysCount] = useAtom(daysStayFilterAtom)

  const [startDate, setStartDate] = useState<DateType>(null)
  const [endDate, setEndDate] = useState<DateType>(null)
  const today = new Date().toISOString().substring(0, 10)

  const handleDateChange = useCallback(
    (dates: { startDate?: DateType; endDate?: DateType }) => {
      const start = dates.startDate ? dayjs(dates.startDate).toDate() : null
      const end = dates.endDate ? dayjs(dates.endDate).toDate() : null

      setStartDate(start)
      setEndDate(end)

      if (start && end) {
        const difference = differenceInDays(end, start)
        setDaysCount(difference > 0 ? difference : 1)
      } else if (start) {
        setDaysCount(1)
      } else {
        setDaysCount(0)
      }
    },
    [setDaysCount]
  )

  const displayPersonCount = () => {
    if (daysCount === 1) {
      return `${daysCount} day`
    } else if (daysCount && daysCount > 1) {
      return `${daysCount} days`
    }
    return 'Any week'
  }

  const handleOpenCard = useCallback(() => setOpenCard(1), [setOpenCard])
  return (
    <View>
      <View style={defaultStyles.card}>
        {openCard !== 1 && (
          <AnimatedTouchableOpacity
            onPress={handleOpenCard}
            style={defaultStyles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={defaultStyles.previewText}>When</Text>
            <Text style={defaultStyles.previewDate}>{displayPersonCount()}</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 1 && (
          <>
            <Text style={defaultStyles.cardHeader}>When your&apos;s trip?</Text>

            <Animated.View style={[defaultStyles.pX2, defaultStyles.pb2]}>
              <DateTimePicker
                mode="range"
                minDate={today}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
              />
            </Animated.View>
          </>
        )}
      </View>
    </View>
  )
}
