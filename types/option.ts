import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { ImageSourcePropType } from 'react-native'

type IoniconsIconNames = keyof typeof Ionicons.glyphMap
type FontAwesomeIconNames = keyof typeof FontAwesome5.glyphMap

// Dodajemy oba zbiory do IconNames
type IconNames = IoniconsIconNames | FontAwesomeIconNames

interface OptionWithIcon {
  title: string
  icon: IconNames
  lib?: string
  img?: never // When `icon` is present, `img` cannot exist
}

interface OptionWithImg {
  title: string
  img: ImageSourcePropType
  icon?: never // When `img` is present, `img` cannot exist
}

export type TOption = OptionWithIcon | OptionWithImg
