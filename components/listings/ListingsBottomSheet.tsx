import { Ionicons } from '@expo/vector-icons'
import BottomSheet from '@gorhom/bottom-sheet'
import { createRef, useCallback, useMemo, useRef, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'

import { Listings } from './Listings'

import { defaultStyles } from '@/constants'
import Colors from '@/constants/Colors'
import { Listing } from '@/types'

interface Props {
  listings: Listing[]
  category: string
  onSheetChange?: (isExpanded: boolean) => void
}

export const bottomSheetRef = createRef<BottomSheet>()

export const ListingsBottomSheet = ({ listings, category, onSheetChange }: Props) => {
  const snapPoints = useMemo<string[]>(() => ['10%', '100%'], [])
  const [refresh, setRefresh] = useState<number>(0)

  const handleSheetChanges = useCallback(
    (index: number) => {
      onSheetChange?.(index === 0)
    },
    [onSheetChange]
  )

  return (
    <BottomSheet
      index={0}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      topInset={-50}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      style={styles.sheetContainer}
      onChange={handleSheetChanges}
    >
      <View style={defaultStyles.flex}>
        <Listings listings={listings} category={category} refresh={refresh} />
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  absoluteBtn: {
    position: 'absolute',
    bottom: 25,
    width: '100%',
    alignItems: 'center',
  },
  sheetContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderRadius: 0,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
})
