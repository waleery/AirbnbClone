import { useRouter } from 'expo-router'
import { memo, useCallback } from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import MapView from 'react-native-map-clustering'
import { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps'

import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { Feature, ListingGeo } from '@/types'

interface Props {
  listings: ListingGeo
}

interface Cluster {
  id: string
  geometry: {
    coordinates: [number, number]
  }
  properties: {
    point_count: number
  }
  onPress: () => void
}

const INITIAL_REGION = {
  latitude: 52.420008,
  longitude: 13.404954,
  latitudeDelta: 1,
  longitudeDelta: 1,
}

export const ListingsMap = memo(({ listings }: Props) => {
  const router = useRouter()

  const onMarkerSeleted = useCallback(
    (item: Feature) => () => {
      router.push(`/listing/${item.properties.id}`)
    },
    [router]
  )

  const renderCluster = useCallback((cluster: Cluster) => {
    const { id, geometry, onPress, properties } = cluster
    const points = properties.point_count

    return (
      <Marker
        key={`cluster-${id}`}
        coordinate={{
          longitude: geometry.coordinates[0],
          latitude: geometry.coordinates[1],
        }}
        onPress={onPress}
      >
        <View style={styles.marker}>
          <Text style={[styles.markerText, defaultStyles.textCenter]}>{points}</Text>
        </View>
      </Marker>
    )
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
        showsUserLocation={true}
        showsMyLocationButton
        initialRegion={INITIAL_REGION}
        clusterColor="#fff"
        clusterTextColor="#000"
        renderCluster={renderCluster}
        radius={45}
        mapPadding={{ top: 0, bottom: 60, left: 0, right: 0 }}
      >
        {listings.features.map((item: Feature) => (
          <Marker
            key={item.properties.id}
            coordinate={{
              latitude: +item.properties.latitude,
              longitude: +item.properties.longitude,
            }}
            onPress={onMarkerSeleted(item)}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>€ {item.properties.price}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  marker: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 7,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOpacity: 0.5,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontWeight: '700',
  },
})