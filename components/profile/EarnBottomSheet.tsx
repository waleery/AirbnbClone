import BottomSheet from '@gorhom/bottom-sheet'
import { createRef, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'

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
  const snapPoints = useMemo(() => ['100%', '100%'], [])

  return (
    <BottomSheet
      ref={earnBottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      handleIndicatorStyle={styles.indicator}
      style={[styles.sheetContainer]}
      enablePanDownToClose={true}
    >
      <View style={defaultStyles.flex}></View>
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
})
