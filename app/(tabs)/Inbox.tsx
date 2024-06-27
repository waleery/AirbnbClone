import InboxHeader from '@/components/InboxHeader'
import { defaultStyles } from '@/constants/Styles'
import { Stack } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'
const Page = () => {
  return (
    <View style={defaultStyles.flex}>
      <Stack.Screen
        options={{
          header: () => <InboxHeader />,
        }}
      />
      <View style={styles.container}></View>
    </View>
  )
}
export default Page

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex:1,
  },
})
