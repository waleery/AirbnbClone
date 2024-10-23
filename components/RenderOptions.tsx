import { AntDesign } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'

import IconRenderer from './ItemRenderer'

import Colors from '@/constants/Colors'
import { TOption } from '@/types'

const RenderOptions = ({ options, title }: { options: TOption[]; title: string }) => {
  return (
    <View>
      <Text style={styles.title}>{title}</Text>
      {options.map((item) => (
        <View key={item.title} style={styles.settingItem}>
          <View style={styles.leftContainer}>
            <IconRenderer option={item} />
            <Text style={styles.settingText}>{item.title}</Text>
          </View>
          <AntDesign name="right" size={20} color="black" />
        </View>
      ))}
    </View>
  )
}

export default RenderOptions

const styles = StyleSheet.create({
  title: {
    paddingBottom: 20,
    fontSize: 25,
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightGrey,
  },
  leftContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    fontWeight: '400',
  },
})
