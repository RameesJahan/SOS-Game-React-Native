import { View, Text, Switch } from 'react-native'
import React from 'react'

type Props = {
  value: boolean
  onValueChange: (value: boolean) => void
}

const SOSMusicToggle = ({ value, onValueChange }: Props) => {
  return (
    <View className="flex flex-row items-center justify-between w-full p-2 mt-1">
      <Text className="text-2xl" style={{ fontFamily: "Tempus-Sans" }}>Music</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#767577" }}
        thumbColor={value ? "#000000" : "#f4f3f4"}
        value={value}
        onValueChange={onValueChange}
        style={{ transform: [{ scale: 1.4 }] }}
       />
    </View>
  )
}

export default SOSMusicToggle