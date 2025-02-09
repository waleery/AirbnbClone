import { Ionicons } from '@expo/vector-icons'
import BottomSheet from '@gorhom/bottom-sheet'
import { createRef, useMemo, useEffect, useState, useCallback } from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import { Slider } from 'react-native-awesome-slider'
import { useSharedValue } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

import { LoadingDots } from '../LoadingDots'

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
  const price = useSharedValue(50)
  const minPrice = useSharedValue(0)
  const maxPrice = useSharedValue(100)
  const [sliderHeight, setSliderHeight] = useState(5)
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

  const handleSliderChange = useCallback(
    (value: number) => {
      price.value = value
    },
    [price]
  )

  const handleStartSliding = useCallback(() => setSliderHeight(8), [])
  const handleEndSliding = useCallback(() => setSliderHeight(5), [])

  const sliderBubble = useCallback(() => {
    return (
      <View style={styles.bubbleContainer}>
        <Text style={styles.bubbleText}>{Math.round(price.value)} zł</Text>
      </View>
    )
  }, [price.value])

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
          <Text style={styles.header}>
            Your home could make {Math.round(price.value)} zł on Airbnb
          </Text>
        </View>
        <View style={styles.sliderContainer}>
          <Slider
            progress={price}
            minimumValue={minPrice}
            maximumValue={maxPrice}
            style={styles.slider}
            onValueChange={handleSliderChange}
            steps={20}
            snapToStep={true}
            markStyle={{ backgroundColor: Colors.transparent }}
            theme={{
              minimumTrackTintColor: Colors.primary,
            }}
            onSlidingStart={handleStartSliding}
            onSlidingComplete={handleEndSliding}
            containerStyle={styles.sliderTrackStyle}
            sliderHeight={sliderHeight}
            bubbleMaxWidth={80}
            bubbleTranslateY={-35}
            renderBubble={sliderBubble}
            hapticMode="step"
          />
        </View>
      </SafeAreaView>
      {showLoadingDots && <LoadingDots />}
    </BottomSheet>
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
  sliderContainer: {
    marginTop: 50,
    alignItems: 'center',
  },
  slider: {
    width: '80%',
    height: 40,
  },
  sliderTrackStyle: {
    borderRadius: 10,
  },
  bubbleContainer: {
    backgroundColor: Colors.black,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    paddingHorizontal: 3,
    paddingVertical: 5,
    height: 40,
  },
  bubbleText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
})
