import { Ionicons } from '@expo/vector-icons'
import BottomSheet from '@gorhom/bottom-sheet'
import { useCallback, useMemo, useRef, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { Listings } from './Listings'

import { defaultStyles } from '@/constants'
import Colors from '@/constants/Colors'
import { Listing } from '@/types'

interface Props {
  listings: Listing[]
  category: string
}

export const ListingsBottomSheet = ({ listings, category }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const snapPoitns = useMemo<string[]>(() => ['10%', '100%'], [])
  const [refresh, setRefresh] = useState<number>(0)

  const showMap = useCallback(() => {
    bottomSheetRef.current?.collapse()
    setRefresh(refresh + 1)
  }, [refresh])

  return (
    <BottomSheet
      index={1}
      ref={bottomSheetRef}
      snapPoints={snapPoitns}
      topInset={-50}
      handleIndicatorStyle={{ backgroundColor: Colors.grey }}
      style={styles.sheetContainer}
    >
      <View style={defaultStyles.flex}>
        <Listings listings={listings} category={category} refresh={refresh} />
        <View style={styles.absoluteBtn}>
          <TouchableOpacity onPress={showMap} style={styles.btn}>
            <Text style={[defaultStyles.white, defaultStyles.boldText]}>Map</Text>
            <Ionicons name="map" size={17} color={'#fff'} />
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  )
}

const styles = StyleSheet.create({
  absoluteBtn: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 13,
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 30,
    gap: 8,
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
