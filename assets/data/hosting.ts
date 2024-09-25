import { Ionicons } from '@expo/vector-icons'

type IconNames = keyof typeof Ionicons.glyphMap

export const hosting = [
  {
    title: 'List your spaces',
    icon: 'home-outline' as IconNames,
  },
  {
    title: 'Find a co-host',
    icon: 'person-add-outline' as IconNames,
  },
  {
    title: 'Host an experience',
    icon: 'footsteps-outline' as IconNames,
  },
]
