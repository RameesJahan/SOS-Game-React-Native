import { View, Text, Pressable, PressableProps } from 'react-native'
import React from 'react'

interface Props extends PressableProps{
  title?: string
  color?: string
}

const SOSMenuButton = ({ title, color, ...props }: Props) => {
  return (
    <Pressable 
      {...props}
      android_ripple={{ color: "gray" }}
      className={`w-full p-2 rounded-md border items-center justify-center border-[${color}]`}
      // style={{ borderColor: color }}
      >
      <Text className='text-xl' style={{ fontFamily: "Tempus-Sans", color }}>{title}</Text>
    </Pressable>
  )
}

export default SOSMenuButton