import { View, Text } from 'react-native'
import React, { useState } from 'react'

type variantType = "horizontal" | "vertical" | "diagonalX" | "diagonalY"

type Props = {
  variant?: variantType
}

const SOSStrike = ({ variant }: Props) => {

   const getDirStyle = (x: variantType | undefined) => {
    switch (x) {
      case "horizontal":
        return "w-[80px] -left-1/2"
      case "vertical":
        return "rotate-90 w-[80px] -left-1/2"
      case "diagonalX":
        return "rotate-45 w-[113.14px] -left-[35px]"
      case "diagonalY":
        return "-rotate-45 w-[113.14px] -left-[35px]"
      default:
        return "w-[80px] -left-1/2"
    }
  }
  return (
    <View 
      className={`absolute top-1/2 ${getDirStyle(variant)}`}
      style={{height : 2, backgroundColor : "black"}}
    >
      
    </View>
  )
}

export default SOSStrike