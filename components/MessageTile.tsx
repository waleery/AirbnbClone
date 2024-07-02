import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { useAtomValue } from 'jotai'
import { listingsAtom } from '@/store/listingsStore'
import { Conversation } from '@/types/messages'
import { getDate, getMonth, getYear } from 'date-fns'
import { defaultStyles } from '@/constants/Styles'

const MessageTile = ({ conversation }: { conversation: Conversation }) => {
  const accomodation = useAtomValue(listingsAtom).find(
    (accomodatiom) => accomodatiom.id === conversation.accomodation_id.toString()
  )
  // Pobranie ostatniej wiadomości z listy
  const lastMessage = conversation.messages.slice(-1)[0]

  const formatDateLastMessage = useMemo(() => {
    const currentDate = new Date() // Utwórz nowy obiekt daty, reprezentujący bieżącą datę i czas
    const currentYear = getYear(currentDate) % 100

    const year = getYear(conversation.last_message_time) % 100
    const month = getMonth(conversation.last_message_time) + 1
    const day = getDate(conversation.last_message_time)

    if (currentYear == year) {
      return `${day}.${month}`
    }
    return `${day}.${month}.${year}`
  }, [])

  return (
    <View style={styles.messagesContainer}>
      <View>
        <Image source={{ uri: accomodation?.medium_url! }} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.firstLine}>
          <Text style={styles.hostName}>{accomodation?.host_name}</Text>
          <Text style={styles.hostName}>{formatDateLastMessage}</Text>
        </View>
        <Text style={styles.hostName} numberOfLines={1} ellipsizeMode="tail">
          {lastMessage.message}
        </Text>
        <View>
          <Text style={defaultStyles.thinText}>{conversation.accomodation_date} · {accomodation?.city}</Text>
        </View>
      </View>
    </View>
  )
}

export default MessageTile

const styles = StyleSheet.create({
  messagesContainer: {
    gap: 20,
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    justifyContent:'space-between'
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  hostName: {
    fontWeight: '300',
  },
  firstLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
