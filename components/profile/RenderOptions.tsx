import { AntDesign } from '@expo/vector-icons'
import { View, Text, StyleSheet } from 'react-native'

import { IconRenderer } from './ItemRenderer'

import Colors from '@/constants/Colors'
import { TOption } from '@/types'

type RenderOptionsProps = {
  options: TOption[]
  title?: string
  drawLastLine?: boolean
}

export const RenderOptions = ({ options, title, drawLastLine = false }: RenderOptionsProps) => {
  return (
    <View>
      {title && <Text style={styles.title}>{title}</Text>}
      {options.map((item, index) => {
        const borderBottomWidth =
          index === options.length - 1 && !drawLastLine ? 0 : StyleSheet.hairlineWidth
        return (
          <View key={item.title} style={[styles.settingItem, { borderBottomWidth }]}>
            <View style={styles.leftContainer}>
              <IconRenderer option={item} />
              <Text style={styles.settingText}>{item.title}</Text>
            </View>
            <AntDesign name="right" size={16} color="black" />
          </View>
        )
      })}
    </View>
  )
}

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
