import { Ionicons } from '@expo/vector-icons'

type IconNames = keyof typeof Ionicons.glyphMap

export const settings = [
  {
    title: 'Personal information',
    icon: 'person-circle-outline' as IconNames,
  },
  {
    title: 'Payments and payouts',
    icon: 'cash-outline' as IconNames,
  },
  {
    title: 'Taxes',
    icon: 'document-outline' as IconNames,
  },
  {
    title: 'Login & security',
    icon: 'shield-outline' as IconNames,
  },
  {
    title: 'Accessibility',
    icon: 'accessibility-outline' as IconNames,
  },
  {
    title: 'Translation',
    icon: 'language-outline' as IconNames,
  },
  {
    title: 'Notifications',
    icon: 'notifications-outline' as IconNames,
  },
  {
    title: 'Privacy and sharing',
    icon: 'lock-closed-outline' as IconNames,
  },
]
