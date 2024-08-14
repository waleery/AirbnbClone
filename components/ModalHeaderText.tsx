import { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import colors from '@/constants/Colors'
const ModalHeaderText = () => {
  const [active, setActive] = useState(0)
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => setActive(0)}>
        <Text
          style={[
            styles.headerText,
            {
              color: active === 0 ? '#000' : colors.grey,
              textDecorationLine: active === 0 ? 'underline' : 'none',
            },
          ]}
        >
          Stays
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setActive(1)}>
        <Text
          style={[
            styles.headerText,
            {
              color: active === 1 ? '#000' : colors.grey,
              textDecorationLine: active === 1 ? 'underline' : 'none',
            },
          ]}
        >
          Experiences
        </Text>
      </TouchableOpacity>
    </View>
  )
}
export default ModalHeaderText

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
