import { Image, ImageStyle } from 'expo-image'
import React, { useCallback, useState } from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'

import Colors from '@/constants/Colors'

type HostAvatarProps = {
  uri?: string
  name?: string
  size?: number
  style?: StyleProp<ViewStyle & ImageStyle>
}

export const HostAvatar: React.FC<HostAvatarProps> = ({ uri, name, size = 50, style }) => {
  const [hasError, setHasError] = useState<boolean>(false)

  const handleError = useCallback(() => {
    setHasError(true)
  }, [])

  const sizeStyle = { width: size, height: size, borderRadius: size / 2 }

  if (!uri || hasError) {
    const initial = name?.trim().charAt(0).toUpperCase() || '?'

    return (
      <View style={[styles.fallback, style, sizeStyle]}>
        <Text style={[styles.initial, { fontSize: size * 0.4 }]}>{initial}</Text>
      </View>
    )
  }

  return <Image source={{ uri }} style={[styles.image, style, sizeStyle]} onError={handleError} />
}

const styles = StyleSheet.create({
  image: {
    backgroundColor: Colors.veryLightGrey,
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark,
  },
  initial: {
    color: Colors.white,
    fontWeight: '600',
  },
})
