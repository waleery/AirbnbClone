import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { Link, Stack, useRouter } from 'expo-router'
import { View, Text, StyleSheet, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useCallback } from 'react'

const Page = () => {
  const router = useRouter()

  const handleOnPresStartSearching = useCallback(() => router.push('/'), [])

  return (
    <View style={defaultStyles.flex}>
      <Stack.Screen
        options={{
          headerShown: false, // Wyłączenie nagłówka
        }}
      />
      <SafeAreaView edges={['top']} style={[styles.container]}>
        <Text style={styles.title}>Trips</Text>
        <View style={styles.noTrips}>
          <Image source={require('@/assets/data/hello.png')} style={styles.helloIcon} />
          <Text style={styles.noTripsText1}>No trips booked...yet</Text>
          <Text style={styles.noTripsText2}>
            Time to dust off your bags and start planning your next adventure
          </Text>
          <TouchableOpacity
            style={[defaultStyles.btn, { paddingHorizontal: 50 }]}
            onPress={handleOnPresStartSearching}
          >
            <Text style={[defaultStyles.btnText, { fontWeight: '500' }]}>Start searching</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}
export default Page

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    gap: 20,
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  noTrips: {
    marginHorizontal: 16,
    padding: 16,

    borderWidth: StyleSheet.hairlineWidth,
    borderBlockColor: Colors.grey,

    borderRadius: 10,
    alignItems: 'center',
    gap: 20,
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
})
