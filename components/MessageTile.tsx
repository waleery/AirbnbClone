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
        <Image source={{ uri: accomodation?.host_picture_url }} style={styles.hostImage} />
      </View>
      <View style={styles.textContainer}>
        <View style={styles.firstLine}>
          <Text style={defaultStyles.thinText}>{accomodation?.host_name}</Text>
          <Text style={defaultStyles.thinText}>{formatDateLastMessage}</Text>
        </View>
        <Text style={defaultStyles.thinText} numberOfLines={1} ellipsizeMode="tail">
          {lastMessage.message}
        </Text>
        <View>
          <Text style={defaultStyles.thinText}>
            {conversation.accomodation_date} · {accomodation?.city}
          </Text>
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
    justifyContent: 'space-between',
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 10,
  },
  hostName: {
    fontWeight: '300',
  },
  firstLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hostImage:{
    position:'absolute',
    width: 40,
    height: 40,
    borderRadius:50,
    borderWidth:2,
    borderColor:'#fff',
    bottom:0,
    right:0,
    transform: [{ translateY: 15 }, { translateX: 10 }]
  }
})
