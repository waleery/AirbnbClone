import { Ionicons } from '@expo/vector-icons'
import BottomSheet from '@gorhom/bottom-sheet'
import { createRef, useMemo, useEffect, useRef, useState, useCallback } from 'react'
import { View, StyleSheet, Animated, Pressable, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'

export const earnBottomSheetRef = createRef<BottomSheet>()

// METHODS
export const handlePresentEarnBottomSheet = () => {
  earnBottomSheetRef.current?.expand?.()
}

export const handleCloseEarnBottomSheet = () => {
  earnBottomSheetRef.current?.close?.()
}

export const EarnBottomSheet = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [showLoadingDots, setShowLoadingDots] = useState(false)

  const snapPoints = useMemo(() => ['100%', '100%'], [])

  //to simulate loading data
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => setShowLoadingDots(false), 800)
      return () => clearTimeout(timeout)
    } else {
      setShowLoadingDots(true)
    }
  }, [isOpen])

  const handleChangeBottomSheetState = useCallback((index: number) => {
    setIsOpen(index !== -1)
  }, [])

  return (
    <BottomSheet
      ref={earnBottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      handleIndicatorStyle={styles.indicator}
      style={styles.sheetContainer}
      enablePanDownToClose
      animationConfigs={{ duration: 500 }}
      onChange={handleChangeBottomSheetState}
    >
      <SafeAreaView edges={['top']} style={[defaultStyles.container, styles.container]}>
        <Pressable onPress={handleCloseEarnBottomSheet}>
          <Ionicons name="close-outline" size={20} />
        </Pressable>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Your home could make xxxx zł on Airbnb</Text>
        </View>
      </SafeAreaView>
      {showLoadingDots && <LoadingDots />}
    </BottomSheet>
  )
}

const LoadingDots = ({ numberOfDots = 3 }: { numberOfDots?: number }) => {
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
  }, [])

  return (
    <View style={styles.loadingContainer}>
      {dots.map((dot, i) => (
        <Animated.View key={i} style={[styles.dot, { transform: [{ translateY: dot }] }]} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: Colors.white,
  },
  indicator: {
    display: 'none',
  },
  container: { paddingHorizontal: 20 },
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
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  header: {
    fontSize: 35,
    fontWeight: '600',
    textAlign: 'center',
  },
})
