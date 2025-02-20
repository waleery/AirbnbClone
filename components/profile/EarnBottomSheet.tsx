import { AntDesign } from '@expo/vector-icons'
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
  const [pricePerNight] = useState(351)
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
        <Pressable style={styles.backContainer} onPress={handleCloseEarnBottomSheet}>
          <AntDesign name="arrowleft" size={18}  />
        </Pressable>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Airbnb it.</Text>
          <Text style={[styles.header, { color: Colors.black }]}>You could earn</Text>
          <View style={styles.animatedNumberContainer}>
            <AnimatedNumbers
              includeComma
              animateToNumber={value * pricePerNight}
              fontStyle={styles.animatedNumber}
              animationDuration={1000}
            />
            <Text style={styles.animatedNumber}> zł</Text>
          </View>
        </View>
        <Text style={hiddenTextStyle}>
          <Text style={styles.underlineText}>{value === 1 ? '1 night' : `${value} nights`}</Text>
          <Text> at an estimated {pricePerNight} zł a night</Text>
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
        <Text style={styles.estimateText}>Learn how we estimate your earnings</Text>

        <View style={styles.placeContainer}>
          <AntDesign name="search1" size={18} color={Colors.primary} />
          <Text>
            <Text style={styles.placeCity}>Berlin</Text>
            <Text style={styles.placeCitySecond}> · Entire place · 2 bedrooms</Text>
          </Text>
        </View>
      </SafeAreaView>
      {showLoadingDots && <LoadingDots />}
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  sheetContainer: {
    backgroundColor: Colors.white,
    overflow: 'visible',
  },
  backContainer: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    padding: 5,
    display: 'flex',
    alignSelf: 'flex-start',
    borderRadius: 50,

    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
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
  estimateText: {
    marginTop: 30,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 13,
    color: Colors.grey,
  },
  placeContainer:{
    marginTop: 35,
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 30,
    paddingVertical:15,
    paddingHorizontal:25,
    flexDirection: 'row',
    gap:10,
    alignItems: 'center'
  },
  placeCity:{
    fontWeight:'600'
  },
  placeCitySecond:{
    color:Colors.grey 
  }
})
