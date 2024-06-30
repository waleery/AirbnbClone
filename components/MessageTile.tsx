import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAtomValue } from 'jotai'
import { listingsAtom } from '@/store/listingsStore'
import { Conversation } from '@/types/messages'

const MessageTile = ({ conversation }: { conversation: Conversation }) => {
  const accomodation = useAtomValue(listingsAtom).find(
    (accomodatiom) => accomodatiom.id === conversation.accomodation_id.toString()
  )
  console.log(accomodation?.medium_url)
  return (
    <View style={styles.messagesContainer}>
      <View>
        <Image
          source={{ uri: accomodation?.medium_url! }}
          style={styles.image}
        />
      </View>
      <View></View>
    </View>
  )
}

export default MessageTile

const styles = StyleSheet.create({
  messagesContainer: {
    gap: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
})
