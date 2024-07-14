import { Animated, Button, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import { useAtomValue } from 'jotai'
import { listingsAtom } from '@/store/listingsStore'
import { Conversation } from '@/types/messages'
import { getDate, getMonth, getYear } from 'date-fns'
import { defaultStyles } from '@/constants/Styles'
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons'
import { RectButton, Swipeable } from 'react-native-gesture-handler'
import { AnimatedInterpolation } from 'react-native-gesture-handler/lib/typescript/components/Swipeable'

// Definiowanie typów kluczy
type IconKey = 'Archive' | 'Star'

const iconMap: Record<IconKey, JSX.Element> = {
  Archive: <Entypo name="archive" size={20} color="white" />,
  Star: <AntDesign name="star" size={20} color="white" />,
}

const MessageTile = ({ conversation }: { conversation: Conversation }) => {
  const accomodation = useAtomValue(listingsAtom).find(
    (accomodatiom) => accomodatiom.id === conversation.accomodation_id?.toString()
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
  const hostImageSize = conversation.hosts?.length === 1 ? 42 : 32
  let hostImagePositions = []

  switch (conversation.hosts?.length) {
    case 1:
      hostImagePositions = [{ translateY: 15, translateX: 10 }]
      break
    case 2:
      hostImagePositions = [
        { translateY: -9, translateX: 9 },
        { translateY: 9, translateX: -9 },
      ]
      break
    default:
      hostImagePositions = [
        { translateY: -9, translateX: 9 },
        { translateY: 9, translateX: -9 },
      ]
      break
  }

  const renderRightAction = (
    text: IconKey,
    color: string,
    x: number,
    progress: AnimatedInterpolation
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    })

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <Pressable style={[styles.rightAction, { backgroundColor: color }]}>
          {iconMap[text]}
          <Text style={styles.actionText}>{text}</Text>
        </Pressable>
      </Animated.View>
    )
  }

  const renderRightActions = (progress: AnimatedInterpolation) => (
    <View style={{ width: 128, flexDirection: 'row' }}>
      {renderRightAction('Star', '#00A699', 128, progress)}
      {renderRightAction('Archive', '#484848', 64, progress)}
    </View>
  )

  return (
    <Swipeable
      renderRightActions={renderRightActions}
      friction={1}
      leftThreshold={40}
      rightThreshold={40}
      childrenContainerStyle={styles.messagesContainer}
      containerStyle={{ overflow: 'visible' }}
    >
      <View>
        {conversation.customer_service ? (
          <View style={styles.customerServiceImage}>
            <FontAwesome5 name="airbnb" size={30} color={'white'} />
          </View>
        ) : (
          <Image source={{ uri: accomodation?.medium_url! }} style={styles.image} />
        )}
        {conversation.hosts?.map((host, index) => {
          if (index < 2) {
            return (
              <Image
                source={{ uri: host?.image }}
                style={[
                  styles.hostImage,
                  {
                    width: hostImageSize,
                    height: hostImageSize,
                    transform: [
                      { translateY: hostImagePositions[index]?.translateY || 0 },
                      { translateX: hostImagePositions[index]?.translateX || 0 },
                    ],
                  },
                ]}
              />
            )
          }
          return null
        })}
      </View>
      <View style={styles.textContainer}>
        <View style={styles.firstLine}>
          <Text style={defaultStyles.thinText}>
            {conversation.customer_service ? 'Airbnb Customer Service' : accomodation?.host_name}
          </Text>
          <Text style={defaultStyles.thinText}>{formatDateLastMessage}</Text>
        </View>
        <Text style={defaultStyles.thinText} numberOfLines={1} ellipsizeMode="tail">
          {lastMessage.message}
        </Text>
        <View>
          <Text style={defaultStyles.thinText}>
            {conversation.customer_service
              ? 'Welcome'
              : `${conversation.accomodation_date}  · ${accomodation?.city}`}
          </Text>
        </View>
      </View>
    </Swipeable>
  )
}

export default MessageTile

const styles = StyleSheet.create({
  messagesContainer: {
    gap: 20,
    flexDirection: 'row',
    paddingVertical:10
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 10,
    borderBottomRightRadius: 40,
  },
  customerServiceImage: {
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 50,
  },
  hostName: {
    fontWeight: '300',
  },
  firstLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  hostImage: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    bottom: 0,
    right: 0,
    transform: [{ translateY: 15 }, { translateX: 10 }],
  },
  rightAction: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    //alignItems: 'flex-end',
  },
  actionText: {
    color: 'white',
  },
})
