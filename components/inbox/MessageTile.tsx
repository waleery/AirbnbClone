import { AntDesign, Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { getDate, getMonth, getYear } from 'date-fns'
import { useAtomValue } from 'jotai'
import React, { useCallback, useMemo, useRef } from 'react'
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
// @ts-expect-error - Importing `AnimatedInterpolation` from 'react-native-gesture-handler' is correct,
// but TypeScript may not recognize it due to issues with type definitions in the library.
import { AnimatedInterpolation } from 'react-native-gesture-handler/lib/typescript/components/Swipeable'

import { defaultStyles } from '@/constants'
import Colors from '@/constants/Colors'
import { listingsAtom } from '@/store'
import { Conversation } from '@/types'

type IconKey = 'Archive' | 'Star'

const iconMap: Record<IconKey, JSX.Element> = {
  Archive: <Entypo name="archive" size={16} color="white" />,
  Star: <AntDesign name="star" size={16} color="white" />,
}

type MessageTileProps = {
  conversation: Conversation
  setOpenSwipeable: React.Dispatch<React.SetStateAction<React.RefObject<Swipeable> | null>>
  openSwipeable: React.RefObject<Swipeable> | null
}

export const MessageTile = ({
  conversation,
  setOpenSwipeable,
  openSwipeable,
}: MessageTileProps) => {
  const accomodation = useAtomValue(listingsAtom).find(
    (accomodatiom) => accomodatiom.id === conversation.accomodation_id?.toString()
  )

  const lastMessage = conversation.messages.slice(-1)[0]
  const swipeableRef = useRef<Swipeable>(null)

  const formatDateLastMessage = useMemo(() => {
    const date = new Date(conversation.last_message_time)
    const currentYear = getYear(new Date())

    const year = getYear(date)
    const month = getMonth(date) + 1
    const day = getDate(date)

    return year === currentYear ? `${day}.${month}` : `${day}.${month}.${year % 100}`
  }, [conversation.last_message_time])

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

  const handleStarPress = () => {
    console.log('Star pressed')
  }

  const handleArchivePress = () => {
    console.log('Archive pressed')
  }

  const renderRightAction = (
    text: IconKey,
    color: string,
    x: number,
    progress: AnimatedInterpolation,
    onPress: () => void
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    })

    return (
      <Animated.View style={[defaultStyles.flex, { transform: [{ translateX: trans }] }]}>
        <Pressable style={[styles.rightAction, { backgroundColor: color }]} onPress={onPress}>
          {iconMap[text]}
          <Text style={styles.actionText}>{text}</Text>
        </Pressable>
      </Animated.View>
    )
  }

  const renderRightActions = useCallback((progress: AnimatedInterpolation) => {
    const actions: { text: IconKey; color: string; x: number; onPress: () => void }[] = [
      { text: 'Star', color: '#00A699', x: 128, onPress: handleStarPress },
      { text: 'Archive', color: '#484848', x: 64, onPress: handleArchivePress },
    ]

    return (
      <View style={styles.rightActions}>
        {actions.map(({ text, color, x, onPress }) =>
          renderRightAction(text, color, x, progress, onPress)
        )}
      </View>
    )
  }, [])
  const handleSwipeableOpen = useCallback(
    (swipeable: React.RefObject<Swipeable>) => () => {
      if (openSwipeable && openSwipeable !== swipeable) {
        openSwipeable.current?.close()
      }
      setOpenSwipeable(swipeable)
    },
    [openSwipeable, setOpenSwipeable]
  )

  const renderHostImage = (host: { image: string | undefined }, index: number) => (
    <Image
      key={`host-${index}`}
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

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      onSwipeableWillOpen={handleSwipeableOpen(swipeableRef)}
      rightThreshold={10}
      childrenContainerStyle={styles.messagesContainer}
      containerStyle={styles.swipableContainer}
    >
      <View>
        {conversation.customer_service ? (
          <View style={styles.customerServiceImage}>
            <FontAwesome5 name="airbnb" size={30} color={'white'} />
          </View>
        ) : accomodation?.medium_url ? (
          <Image source={{ uri: accomodation?.medium_url }} style={styles.image} />
        ) : null}
        {conversation.hosts?.slice(0, 2).map(renderHostImage)}
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
        <View style={styles.bottomText}>
          <Text style={defaultStyles.thinText}>
            {conversation.customer_service
              ? 'Welcome'
              : `${conversation.accomodation_date}  · ${accomodation?.city}`}
          </Text>
          {conversation.favourite && <Ionicons name="star" color={Colors.grey} />}
        </View>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  messagesContainer: {
    gap: 20,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 8,
    borderBottomRightRadius: 40,
  },
  rightActions: {
    width: 128,
    flexDirection: 'row',
  },
  customerServiceImage: {
    width: 65,
    height: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
    borderRadius: 50,
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
    borderColor: Colors.white,
    bottom: 0,
    right: 0,
    transform: [{ translateY: 15 }, { translateX: 10 }],
  },
  rightAction: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    flex: 1,
  },
  actionText: { fontSize: 12, color: Colors.white, fontWeight: '500' },
  swipableContainer: {
    overflow: 'visible',
  },
  bottomText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
