import { useEffect, useRef } from 'react'
import { StyleSheet, View, Animated } from 'react-native'

import Colors from '@/constants/Colors'

type LoadingDotsProps = {
  numberOfDots?: number
}

export const LoadingDots = ({ numberOfDots = 3 }: LoadingDotsProps) => {
  const dots = useRef([...Array(numberOfDots)].map(() => new Animated.Value(0))).current

  useEffect(() => {
    const sequence = (dot: Animated.Value) =>
      Animated.sequence([
        Animated.timing(dot, {
          toValue: -15,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dot, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])

    const animation = Animated.loop(Animated.stagger(150, dots.map(sequence)))

    animation.start()

    return () => animation.stop()
  }, [dots])

  return (
    <View style={styles.loadingContainer}>
      {dots.map((dot, i) => (
        <Animated.View key={i} style={[styles.dot, { transform: [{ translateY: dot }] }]} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginHorizontal: 4,
  },
})
