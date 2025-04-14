import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { ImageSourcePropType } from 'react-native'

type IoniconsIconNames = keyof typeof Ionicons.glyphMap
type FontAwesomeIconNames = keyof typeof FontAwesome5.glyphMap
type MaterialCommunityIconsNames = keyof typeof MaterialCommunityIcons.glyphMap

type IconNames = IoniconsIconNames | FontAwesomeIconNames | MaterialCommunityIconsNames
type IconLibrary = 'Ionicons' | 'FontAwesome5' | 'MaterialCommunityIcons'

interface OptionWithIcon {
  title?: string
  icon: IconNames
  lib?: IconLibrary
  img?: never // When `icon` is present, `img` cannot exist
}

interface OptionWithImg {
  title?: string
  img: ImageSourcePropType
  icon?: never // When `img` is present, `img` cannot exist
}

export type TOption = OptionWithIcon | OptionWithImg
