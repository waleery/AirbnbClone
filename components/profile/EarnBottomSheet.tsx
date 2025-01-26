import BottomSheet from '@gorhom/bottom-sheet'
import { createRef, useMemo, useEffect, useRef, useState, useCallback } from 'react'
import { View, StyleSheet, Animated } from 'react-native'
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
      const timeout = setTimeout(() => setShowLoadingDots(false), 600)
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
        {showLoadingDots && <LoadingDots />}
      </SafeAreaView>
    </BottomSheet>
  )
}

const LoadingDots = () => {
  const dot1 = useRef(new Animated.Value(0)).current
  const dot2 = useRef(new Animated.Value(0)).current
  const dot3 = useRef(new Animated.Value(0)).current

  useEffect(() => {
    const sequence = (dot: Animated.Value) =>
      Animated.sequence([
        Animated.timing(dot, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(dot, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])

    const animation = Animated.loop(
      Animated.stagger(150, [sequence(dot1), sequence(dot2), sequence(dot3)])
    )

    animation.start()

    return () => animation.stop()
  }, [])

  return (
    <View style={styles.loadingContainer}>
      <Animated.View style={[styles.dot, { opacity: dot1 }]} />
      <Animated.View style={[styles.dot, { opacity: dot2 }]} />
      <Animated.View style={[styles.dot, { opacity: dot3 }]} />
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
  container: { paddingHorizontal: 16 },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject, // Rozciąga element na cały ekran
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginHorizontal: 5,
  },
})
