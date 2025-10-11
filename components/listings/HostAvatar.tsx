import { Image } from 'expo-image'
import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Colors from '@/constants/Colors'

type HostAvatarProps = {
  uri?: string
  name?: string
  size?: number
}

export const HostAvatar: React.FC<HostAvatarProps> = ({ uri, name, size = 50 }) => {
  const [hasError, setHasError] = useState<boolean>(false)

  const handleError = useCallback(() => {
    setHasError(true)
  }, [])

  const sizeStyle = { width: size, height: size, borderRadius: size / 2 }

  if (!uri || hasError) {
    const initial = name?.trim().charAt(0).toUpperCase() || '?'

    return (
      <View style={[styles.fallback, sizeStyle]}>
        <Text style={[styles.initial, { fontSize: size * 0.4 }]}>{initial}</Text>
      </View>
    )
  }

  return <Image source={{ uri }} style={[styles.image, sizeStyle]} onError={handleError} />
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
