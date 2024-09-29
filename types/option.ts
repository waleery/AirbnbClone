import { Ionicons } from '@expo/vector-icons'
import { ImageSourcePropType } from 'react-native'

type IconNames = keyof typeof Ionicons.glyphMap

interface OptionWithIcon {
  title: string
  icon: IconNames
  img?: never // When `icon` is present, `img` cannot exist
}

interface OptionWithImg {
  title: string
  img: ImageSourcePropType
  icon?: never // When `img` is present, `img` cannot exist
}

export type TOption = OptionWithIcon | OptionWithImg
