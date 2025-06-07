import { Stack } from 'expo-router'
import { useAtomValue } from 'jotai'
import { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'

import listingsDataGeo from '@/assets/data/json/airbnb-listings.geo.json'
import { ExploreHeader, ListingsBottomSheet, ListingsMap } from '@/components'
import { defaultStyles,accommodation_categories } from '@/constants'
import { filteredListingsAtom } from '@/store'
import { ListingGeo } from '@/types'

const Page = () => {
  const [category, setCategory] = useState<string>(accommodation_categories[0].name)
  const listings = useAtomValue(filteredListingsAtom)
  const listingsGeo = useMemo(() => listingsDataGeo as ListingGeo, [])

  const onDataChanged = useCallback((category: string) => {
    setCategory(category)
  }, [])

  return (
    <View style={defaultStyles.flex}>
      <Stack.Screen
        options={{
          header: () => <ExploreHeader onCategoryChanged={onDataChanged} />,
        }}
      />

      <ListingsMap listings={listingsGeo} />
      <ListingsBottomSheet listings={listings} category={category} />
    </View>
  )
}
export default Page
