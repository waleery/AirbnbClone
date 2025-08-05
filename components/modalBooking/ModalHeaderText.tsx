/* eslint-disable react-native/no-inline-styles */
import { useCallback, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Pressable } from 'react-native-gesture-handler'

import Colors from '@/constants/Colors'

export const ModalHeaderText = () => {
  const [active, setActive] = useState<number>(0)

  const handleSetActive = useCallback((index: number) => () => setActive(index), [])
  return (
    <View style={styles.headerContainer}>
      <Pressable onPress={handleSetActive(0)}>
        <Text
          style={[
            styles.headerText,
            {
              color: active === 0 ? Colors.black : Colors.grey,
              textDecorationLine: active === 0 ? 'underline' : 'none',
            },
          ]}
        >
          Stays
        </Text>
      </Pressable>
      <Pressable onPress={handleSetActive(1)}>
        <Text
          style={[
            styles.headerText,
            {
              color: active === 1 ? Colors.black : Colors.grey,
              textDecorationLine: active === 1 ? 'underline' : 'none',
            },
          ]}
        >
          Experiences
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  headerText: {
    fontWeight: '500',
    fontSize: 18,
  },
})
