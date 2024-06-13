import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
//@ts-ignore
import DatePicker from 'react-native-modern-datepicker'
import { defaultStyles } from '@/constants/Styles'
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity)

interface Props {
  setOpenCard: (i: number) => void
  openCard: number
}

export default function WhenCard({
  setOpenCard,
  openCard,
}: Props) {
  const today = new Date().toISOString().substring(0, 10)

  return (
    <View>
      <View style={defaultStyles.card}>
        {openCard != 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={defaultStyles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={defaultStyles.previewText}>When</Text>
            <Text style={defaultStyles.previewDate}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 1 && (
          <>
            <Text style={defaultStyles.cardHeader}>When your's trip?</Text>

            <Animated.View style={[defaultStyles.cardBody, { paddingBottom: 20 }]}>
              <DatePicker
                current={today}
                selected={today}
                mode={'Calendar'}
                options={{ borderColor: 'transparent', mainColor: Colors.primary }}
              />
            </Animated.View>
          </>
        )}
      </View>
    </View>
  )
}
