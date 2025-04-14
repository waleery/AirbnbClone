import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { Image } from 'react-native'

import { TOption } from '@/types'

interface IconRendererProps {
  option: TOption
  size?: number
  color?: string
}

export const IconRenderer: React.FC<IconRendererProps> = ({
  option,
  size = 28,
  color = 'black',
}) => {
  if ('img' in option) {
    return <Image source={option.img} style={{ width: size, height: size }} />
  }
  if ('icon' in option) {
    const IconComponent = option.lib === 'FontAwesome5' ? FontAwesome5 : option.lib === 'MaterialCommunityIcons' ? MaterialCommunityIcons : Ionicons
    return <IconComponent name={option.icon} size={size} color={color} />
  }

  return null
}
