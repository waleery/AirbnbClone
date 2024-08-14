import { Ionicons } from '@expo/vector-icons'
import { parseISO } from 'date-fns'
import { Stack } from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListRenderItem } from 'react-native'
import { FlatList, Swipeable } from 'react-native-gesture-handler'

import messagesDataRaw from '@/assets/data/messages.json'
import InboxHeader from '@/components/InboxHeader'
import MessageTile from '@/components/MessageTile'
import { defaultStyles } from '@/constants/Styles'
import { messageTypes } from '@/constants/messageTypes'
import { Conversation } from '@/types/messages'

const messagesData: Conversation[] = messagesDataRaw.map((message: any) => ({
  ...message,
  last_message_time: parseISO(message.last_message_time),
  messages: message.messages.map((msg: any) => ({
    ...msg,
    timestamp: parseISO(msg.timestamp),
  })),
}))

const Page = () => {
  const [selectedType, setSelectedType] = useState<string>('All')
  const [openSwipeable, setOpenSwipeable] = useState<React.RefObject<Swipeable> | null>(null)

  const renderRow: ListRenderItem<Conversation> = ({ item }) => (
    <MessageTile
      conversation={item}
      openSwipeable={openSwipeable}
      setOpenSwipeable={setOpenSwipeable}
      key={item.conversation_id}
    />
  )
  const handleSelectMessagesType = useCallback(
    (type: string) => () => {
      setSelectedType(type)
    },
    []
  )

  const filteredMessagesData = useMemo(() => {
    if (selectedType === 'All') {
      return messagesData
    }
    if (selectedType === 'Customer service') {
      return messagesData.filter((conversation) => conversation.customer_service)
    }
    return messagesData.filter((conversation) => !conversation.customer_service)
  }, [selectedType])

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
            <TouchableOpacity
              key={type}
              style={[styles.chip, selectedType === type && styles.selectedChip]}
              onPress={handleSelectMessagesType(type)}
            >
              <Text style={selectedType === type && styles.selectedChipText}>{type}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {filteredMessagesData.length > 0 ? (
          <FlatList
            data={filteredMessagesData}
            renderItem={renderRow}
            contentContainerStyle={styles.flatListContainer}
          />
        ) : (
          <View style={styles.noMessagesContainer}>
            <Ionicons name="chatbubble-outline" size={50} color="#888" />
            <Text style={styles.noMessagesText}>No messages available</Text>
            <Text style={styles.noMessagesText}>
              When you receive a new message, it will appear here.
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}
export default Page

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    //padding: 16,
    gap: 20,

    flex: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  chip: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
  },
  selectedChip: {
    backgroundColor: '#000',
  },
  selectedChipText: {
    color: 'white',
  },
  scrollView: {
    flexGrow: 0,
    paddingHorizontal: 16,
  },
  scrollViewContentContainer: {
    gap: 10,
  },
  flatListContainer: {
    flexGrow: 1,
  },
  noMessagesContainer: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  noMessagesText: {
    textAlign: 'center',
  },
})
