import InboxHeader from '@/components/InboxHeader'
import { defaultStyles } from '@/constants/Styles'
import { messageTypes } from '@/constants/messageTypes'
import { Stack } from 'expo-router'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
const Page = () => {
  return (
    <View style={defaultStyles.flex}>
      <Stack.Screen
        options={{
          header: () => <InboxHeader />,
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Messages</Text>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollView}
          showsHorizontalScrollIndicator={false}
        >
          {messageTypes.map((type) => (
            <TouchableOpacity style={styles.chip}>
              <Text>{type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}
export default Page

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    marginBottom: 15,
  },
  chip: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 50,
  },
  scrollView: {
    gap: 10,
  },
})
