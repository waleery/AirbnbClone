import { format, parseISO } from 'date-fns'
import { Stack, useRouter } from 'expo-router'
import { useCallback } from 'react'
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

import hello from '@/assets/data/hello.png'
import visitedPlaces from '@/assets/data/visitedPlaces.json'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { WhereBeen } from '@/types/visitedPlaces'

const Page = () => {
  const visited: WhereBeen[] = visitedPlaces.map((place) => ({
    ...place,
    date_from: parseISO(place.date_from),
    date_to: parseISO(place.date_to),
  }))

  const router = useRouter()

  const handleOnPresStartSearching = useCallback(() => router.push('/'), [router])

  const renderDate = (date_from: Date, date_to: Date) => {
    const yearFrom = format(date_from, 'yyyy')
    const yearTo = format(date_to, 'yyyy')

    if (format(date_from, 'MMM') === format(date_to, 'MMM')) {
      return `${format(date_from, 'MMM dd')}-${format(date_to, 'dd')}, ${yearFrom}`
    }

    return `${format(date_from, 'MMM dd')}-${format(date_to, 'MMM dd')}, ${yearFrom === yearTo ? yearFrom : `${yearFrom} - ${yearTo}`}`
  }

  return (
    <View style={defaultStyles.flex}>
      <SafeAreaView edges={['top']} style={[styles.container]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Trips</Text>
          <View style={styles.noTrips}>
            <Image source={hello as ImageSourcePropType} style={styles.helloIcon} />
            <Text style={styles.noTripsText1}>No trips booked...yet!</Text>
            <Text style={styles.noTripsText2}>
              Time to dust off your bags and start planning your next adventure.
            </Text>
            <TouchableOpacity
              style={[defaultStyles.btn, defaultStyles.pX5]}
              onPress={handleOnPresStartSearching}
            >
              <Text style={[defaultStyles.btnText, defaultStyles.font500]}>Start searching</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.whereText}>Where you&apos;ve been</Text>

          <View style={styles.placesContainer}>
            {visited.map((place) => (
              <View key={place.id} style={styles.place}>
                <Image source={{ uri: place.medium_url }} style={styles.image} />
                <View style={styles.placeText}>
                  <Text style={styles.city}>{place.city}</Text>
                  <Text style={styles.host}>Hosted by {place.host}</Text>
                  <Text style={styles.host}>{renderDate(place.date_from, place.date_to)}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}
export default Page

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    paddingTop: 16,
    marginBottom: 20,
  },
  noTrips: {
    paddingVertical: 16,
    paddingHorizontal: 20,

    borderWidth: StyleSheet.hairlineWidth,
    borderBlockColor: Colors.grey,

    borderRadius: 10,
    alignItems: 'center',
    gap: 20,
    marginBottom: 40,
  },
  noTripsText1: {
    fontSize: 18,
    fontWeight: '600',
  },
  noTripsText2: {
    fontWeight: '300',
    fontSize: 13,
    textAlign: 'center',
  },
  helloIcon: {
    marginVertical: 8,
    width: 50,
    height: 50,
  },
  whereText: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 30,
  },
  placesContainer: {
    gap: 30,
  },
  image: {
    borderRadius: 10,
    width: 80,
    height: 80,
    resizeMode: 'cover',
  },
  place: {
    flexDirection: 'row',
    gap: 20,
  },
  city: {
    fontSize: 18,
    fontWeight: '500',
  },
  host: {
    fontSize: 16,
    fontWeight: '300',
  },
  placeText: {
    justifyContent: 'center',
    gap: 2,
  },
})
