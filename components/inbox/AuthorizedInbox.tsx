import { Ionicons } from '@expo/vector-icons'
import { parseISO } from 'date-fns'
import { useCallback, useMemo, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ListRenderItem } from 'react-native'
import { FlatList, Swipeable } from 'react-native-gesture-handler'

import messagesDataRaw from '@/assets/data/json/messages.json'
import { MessageTile } from '@/components'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import { messageTypes } from '@/constants/messageTypes'
import { Conversation } from '@/types'

const messagesData: Conversation[] = messagesDataRaw.map((message) => ({
  ...message,
  last_message_time: parseISO(message.last_message_time),
  messages: message.messages.map((msg) => ({
    ...msg,
    timestamp: parseISO(msg.timestamp),
  })),
}))

export const AuthorizedInbox = () => {
  const [selectedType, setSelectedType] = useState<string>('All')
  const [openSwipeable, setOpenSwipeable] = useState<React.RefObject<Swipeable> | null>(null)

  const renderRow: ListRenderItem<Conversation> = useCallback(
    ({ item }) => (
      <MessageTile
        conversation={item}
        openSwipeable={openSwipeable}
        setOpenSwipeable={setOpenSwipeable}
        key={item.conversation_id}
      />
    ),
    [openSwipeable]
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
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
    backgroundColor: Colors.veryLightGrey,
    borderRadius: 50,
  },
  selectedChip: {
    backgroundColor: Colors.black,
  },
  selectedChipText: {
    color: Colors.white,
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
