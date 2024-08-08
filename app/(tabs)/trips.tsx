import { defaultStyles } from '@/constants/Styles'
import { Stack } from 'expo-router'
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
const Page = () => {
  return (
    <View style={defaultStyles.flex}>
      <Stack.Screen
        options={{
          headerShown: false, // Wyłączenie nagłówka
        }}
      />
      <SafeAreaView edges={['top']} style={[ styles.container]}>
        <Text style={styles.title}>Trips</Text>
      </SafeAreaView>
    </View>
  )
}
export default Page

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    gap: 20,
    flex: 1,
    paddingTop:20
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
})
