import InboxHeader from '@/components/InboxHeader'
import { defaultStyles } from '@/constants/Styles'
import { messageTypes } from '@/constants/messageTypes'
import { Stack } from 'expo-router'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListRenderItem } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

import messagesDataRaw from '@/assets/data/messages.json'
import { Conversation } from '@/types/messages'
import { parseISO } from 'date-fns'
import MessageTile from '@/components/MessageTile'

const messagesData: Conversation[] = messagesDataRaw.map((message: any) => ({
  ...message,
  last_message_time: parseISO(message.last_message_time),
  messages: message.messages.map((msg: any) => ({
    ...msg,
    timestamp: parseISO(msg.timestamp),
  })),
}))

const Page = () => {
  const renderRow: ListRenderItem<Conversation> = ({ item }) => <MessageTile conversation={item} />

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
          contentContainerStyle={styles.scrollViewContentContainer}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
        >
          {messageTypes.map((type) => (
            <TouchableOpacity style={styles.chip}>
              <Text>{type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <FlatList data={messagesData} renderItem={renderRow} contentContainerStyle={styles.flatListContainer} />
      </View>
    </View>
  )
}
export default Page

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    gap: 20,

    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
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
    flexGrow: 0,
  },
  scrollViewContentContainer: {
    gap: 10,
  },
  flatListContainer: {
    gap: 20,
    flexGrow: 1,
  },
})
