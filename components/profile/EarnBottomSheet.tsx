import { Ionicons } from '@expo/vector-icons'
import BottomSheet from '@gorhom/bottom-sheet'
import { createRef, useMemo, useEffect, useState, useCallback } from 'react'
import { View, StyleSheet, Pressable, Text } from 'react-native'
import AnimatedNumbers from 'react-native-animated-numbers'
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
  const [value, setValue] = useState(1)
  const [isOpen, setIsOpen] = useState(false)
  const [showLoadingDots, setShowLoadingDots] = useState(false)
  const [isVisibleText, setIsVisibleText] = useState(true)
  const price = useSharedValue(1)
  const minPrice = useSharedValue(1)
  const maxPrice = useSharedValue(30)
  const [sliderHeight, setSliderHeight] = useState(5)
  const snapPoints = useMemo(() => ['100%', '100%'], [])

  //to simulate loading data
  useEffect(() => {
    if (isOpen) {
      const timeout = setTimeout(() => setShowLoadingDots(false), 800)
      const timeout2 = setTimeout(() => {
        setValue(7)
        price.value = 7
      }, 1500)
      return () => {
        setValue(1)
        price.value = 1

        clearTimeout(timeout)
        clearTimeout(timeout2)
      }
    } else {
      setShowLoadingDots(true)
    }
  }, [isOpen, price])

  const handleChangeBottomSheetState = useCallback((index: number) => {
    setIsOpen(index !== -1)
  }, [])

  const handleSliderChange = useCallback((value: number) => {
    setValue(Math.round(value))
  }, [])

  const handleStartSliding = useCallback(() => {
    setSliderHeight(8)
    setIsVisibleText(false)
  }, [])
  const handleEndSliding = useCallback(() => {
    setSliderHeight(5)
    setIsVisibleText(true)
  }, [])

  const sliderBubble = useCallback(() => {
    return (
      <View style={styles.bubbleContainer}>
        <Text style={styles.bubbleText}>{value === 1 ? '1 night' : `${value} nights`}</Text>
      </View>
    )
  }, [value])

  const hiddenTextStyle = useMemo(
    () => [styles.hideText, { opacity: isVisibleText ? 1 : 0 }],
    [isVisibleText]
  )

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
          <Text style={styles.header}>Airbnb it.</Text>
          <Text style={[styles.header, { color: Colors.black }]}>You could earn</Text>
          <View style={styles.animatedNumberContainer}>
            <AnimatedNumbers
              includeComma
              animateToNumber={value * 300}
              fontStyle={styles.animatedNumber}
              animationDuration={1000}
            />
            <Text style={styles.animatedNumber}> zł</Text>
          </View>
        </View>
        <Text style={hiddenTextStyle}>
          <Text style={styles.underlineText}>{value === 1 ? '1 night' : `${value} nights`}</Text>
          <Text> at an estimated 300 zł a night</Text>
        </Text>
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
            bubbleTranslateY={-50}
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
    color: Colors.primary,
  },
  animatedNumber: {
    fontSize: 55,
    fontWeight: '600',
    textAlign: 'center',
  },
  animatedNumberContainer: {
    marginTop: 30,
    flexDirection: 'row',
  },
  sliderContainer: {
    marginTop: 40,
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
  hideText: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 16,
    color: Colors.black,
  },
  underlineText: {
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
})
