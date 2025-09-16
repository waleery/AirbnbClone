import { Entypo, Ionicons } from '@expo/vector-icons'
import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'

import { defaultStyles } from '@/constants'
import Colors from '@/constants/Colors'

const mockData = {
  img: 'https://a0.muscache.com/im/pictures/bced1392-9538-41df-92d9-f058a7188b0f.jpg?aki_policy=medium',
  type: 'Room',
  district: 'Mokotów',
  price: 120,
  duration: 3,
  rating: 4.96,
}
const tileWidth = Dimensions.get('window').width * 0.35

export const StartPage = () => {
  return (
    <View style={[defaultStyles.flex, styles.container]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.headerText, defaultStyles.boldText]}>Popular homes in Warsaw</Text>
        <Entypo name="chevron-right" size={22} color="black" />
      </View>
      <View style={styles.tileContainer}>
        <View style={styles.tile}>
          <Image source={{ uri: mockData.img }} style={styles.image} />
        </View>
        <Text style={[defaultStyles.font500]}>
          {mockData.type} in {mockData.district}
        </Text>
        <View style={styles.shortInfo}>
          <Text style={styles.subtitle}>
            {mockData.price}zł for {mockData.duration} nights
          </Text>
          <Ionicons name="star" size={10} color={Colors.grey} />
          <Text style={styles.subtitle}>{mockData.rating}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  headerText: {
    fontSize: 20,
  },
  headerContainer: {
    marginTop: 30,
    marginBottom: 16,
    gap: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tile: {
    borderRadius: 20,
    width: tileWidth,
    height: tileWidth,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {},
  subtitle: {
    color: Colors.grey,
    fontSize: 12,
  },
  tileContainer: {
    flexWrap: 'wrap',
    width: tileWidth,
    gap:4
  },
  shortInfo: { flexDirection: 'row', alignItems: 'center', gap: 4 },
})
