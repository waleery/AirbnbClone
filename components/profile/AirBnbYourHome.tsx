import React from 'react'
import { View, Text, Image, ImageSourcePropType, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { handlePresentEarnBottomSheet } from './EarnBottomSheet'

import home from '@/assets/images/home.png'
import Colors from '@/constants/Colors'

export const AirBnbYourHome = () => {
  return (
    <TouchableOpacity onPress={handlePresentEarnBottomSheet}>
      <View style={styles.modal}>
        <View style={styles.modalTextContainer}>
          <Text style={styles.modalHeader}>Airbnb your home</Text>
          <Text style={styles.modalSecondText}>It&apos;s simple to get up and start earning</Text>
        </View>
        <View style={styles.modalImageContainer}>
          <Image source={home as ImageSourcePropType} style={styles.homeIcon} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 7,
    overflow: 'visible',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.lightGrey,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    marginBottom: 35,
  },
  modalTextContainer: {
    flex: 2,
    gap: 10,
  },
  modalImageContainer: {
    flex: 1,
  },
  homeIcon: {
    width: '100%',
    height: undefined,
    resizeMode: 'contain',
    aspectRatio: 1,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: '500',
  },
  modalSecondText: {
    fontWeight: '400',
    color: Colors.grey,
  },
})
