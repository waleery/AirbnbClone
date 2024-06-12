import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native-gesture-handler'
//@ts-ignore
import DatePicker from 'react-native-modern-datepicker'
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
      <View style={styles.card}>
        {openCard != 1 && (
          <AnimatedTouchableOpacity
            onPress={() => setOpenCard(1)}
            style={styles.cardPreview}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(200)}
          >
            <Text style={styles.previewText}>When</Text>
            <Text style={styles.previewDate}>Any week</Text>
          </AnimatedTouchableOpacity>
        )}
        {openCard === 1 && (
          <>
            <Text style={styles.cardHeader}>When your's trip?</Text>

            <Animated.View style={[styles.cardBody, { paddingBottom: 20 }]}>
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
})
