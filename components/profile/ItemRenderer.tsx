import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { Image } from 'react-native'

import { TOption } from '@/types'

interface IconRendererProps {
  option: TOption
  size?: number
  color?: string
}

const getIconComponent = (lib?: string) => {
  switch (lib) {
    case 'FontAwesome5':
      return FontAwesome5
    case 'MaterialCommunityIcons':
      return MaterialCommunityIcons
    default:
      return Ionicons
  }
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
    const IconComponent = getIconComponent(option.lib)
    return <IconComponent name={option.icon} size={size} color={color} />
  }

  return null
}
