import InboxHeader from '@/components/InboxHeader'
import { defaultStyles } from '@/constants/Styles'
import { Stack } from 'expo-router'
import { View, Text } from 'react-native'
const Page = () => {
  return (
    <View style={defaultStyles.flex}>
      <Stack.Screen
        options={{
          header: () => <InboxHeader />,
        }}
      />
    </View>
  )
}
export default Page
