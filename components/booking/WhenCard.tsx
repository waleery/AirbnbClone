import { differenceInDays } from 'date-fns'
import dayjs from 'dayjs'
import { useAtom } from 'jotai'
import React, { useCallback, useMemo, useState } from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import DateTimePicker, { DateType } from 'react-native-ui-datepicker'

import { defaultStyles } from '@/constants'
import { daysStayFilterAtom } from '@/store'

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

interface Props {
  setOpenCard: (i: number) => void
  openCard: number
}

export const WhenCard = ({ setOpenCard, openCard }: Props) => {
  const [daysCount, setDaysCount] = useAtom(daysStayFilterAtom)

  const [startDate, setStartDate] = useState<DateType>(null)
  const [endDate, setEndDate] = useState<DateType>(null)
  const today = new Date()

  const computeDaysCount = (start: Date | null, end: Date | null) => {
    if (start && end) {
      const diff = differenceInDays(end, start)
      return diff > 0 ? diff : 1
    }
    return start ? 1 : 0
  }

  const handleDateChange = useCallback(
    ({ startDate, endDate }: { startDate?: DateType; endDate?: DateType }) => {
      const start = startDate ? dayjs(startDate).toDate() : null
      const end = endDate ? dayjs(endDate).toDate() : null

      setStartDate(start)
      setEndDate(end)
      setDaysCount(computeDaysCount(start, end))
    },
    [setDaysCount]
  )

  const displayPersonCount = useMemo(() => {
    if (daysCount === 1) {
      return `${daysCount} day`
    } else if (daysCount && daysCount > 1) {
      return `${daysCount} days`
    }
    return 'Add dates'
  }, [daysCount])

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
            <Text style={defaultStyles.previewDate}>{displayPersonCount}</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 1 && (
          <>
            <Text style={defaultStyles.cardHeader}>When&apos;s your trip?</Text>

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
