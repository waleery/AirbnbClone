import { Image, ImageStyle } from 'expo-image'
import React, { useCallback, useState } from 'react'
import { StyleProp } from 'react-native'

import roomExample from '@/assets/images/room_example.jpg'

type ListingImageProps = {
  uri?: string | null
  style?: StyleProp<ImageStyle>
}

export const ListingImage: React.FC<ListingImageProps> = ({ uri, style }) => {
  const [hasError, setHasError] = useState<boolean>(false)

  const handleError = useCallback(() => {
    setHasError(true)
  }, [])

  return (
    <Image source={uri && !hasError ? { uri } : roomExample} onError={handleError} style={style} />
  )
}
