import { View, Text,Image as IMG, ImageProps, ImageSourcePropType, Dimensions, DimensionValue } from 'react-native'
import React, { useState } from 'react'
import { Image as RNImage } from 'expo-image'

type Props = {
  source: ImageSourcePropType
  width?: DimensionValue
  height?: number | string
}

const Image = ({ source, width, height }: Props): JSX.Element => {
  const [heightA, setHeight] = useState<number>(100)
  const [widthA, setWidth] = useState(100)
  IMG.getSize(IMG.resolveAssetSource(source).uri,(w, h) => {
    const d_w = Dimensions.get("window").width - 16
    setHeight(h * (d_w / w))
  })
  return (
    <RNImage
      contentFit='contain'
      source={source}
      style={{ height: heightA, width: '100%' }}
    />
  )
}

export default Image