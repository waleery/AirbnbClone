import React from 'react'
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'

import { defaultStyles } from '@/constants'

const mockData = {
  img: 'https://a0.muscache.com/im/pictures/bced1392-9538-41df-92d9-f058a7188b0f.jpg?aki_policy=medium',
  type: 'Room',
  district: 'Mokotów',
}
const tileWidth = Dimensions.get('window').width * 0.35

export const StartPage = () => {
  return (
    <View style={[defaultStyles.flex, styles.container]}>
      <Text style={[styles.header, defaultStyles.boldText]}>Popular homes in Warsaw</Text>
      <View style={styles.tileContainer}>
        <View style={styles.tile}>
          <Image source={{ uri: mockData.img }} style={styles.image} />
        </View>
        <Text>
          {mockData.type} in {mockData.district}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  header: {
    marginTop: 30,
    fontSize: 20,
  },
  tile: {
    borderRadius: 20,
    width: tileWidth,
    height: tileWidth,
    overflow: 'hidden', // 👈 dodaj to
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  tileContainer: {},
})
