import { Stack } from 'expo-router'
import { useAtom } from 'jotai'
import { useCallback, useMemo, useState } from 'react'
import { View } from 'react-native'

import listingsDataGeo from '@/assets/data/airbnb-listings.geo.json'
import ExploreHeader from '@/components/ExploreHeader'
import ListingsBottomSheet from '@/components/ListingsBottomSheet'
import ListingsMap from '@/components/ListingsMap'
import { defaultStyles } from '@/constants/Styles'
import { accomodation_categories } from '@/constants/categories'
import { filteredListingsAtom } from '@/store/listingsStore'
import { ListingGeo } from '@/types'

const Page = () => {
  const [category, setCategory] = useState(accomodation_categories[0].name)
  const [listings] = useAtom(filteredListingsAtom)
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
