import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { Image } from 'react-native'

import { TOption } from '@/types/option' // Załaduj typ TOption

interface IconRendererProps {
  option: TOption // Używamy TOption
  size?: number
  color?: string
}

const IconRenderer: React.FC<IconRendererProps> = ({ option, size = 28, color = 'black' }) => {
  if ('img' in option) {
    return <Image source={option.img} style={{ width: size, height: size }} />
  }
  if ('icon' in option) {
    const IconComponent = option.lib === 'FontAwesome5' ? FontAwesome5 : Ionicons
    return <IconComponent name={option.icon} size={size} color={color} />
  }

  return null
}

export default IconRenderer