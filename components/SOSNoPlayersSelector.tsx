import { View, Text, Pressable } from 'react-native'
import React from 'react'

type Props = {
  selected: number,
  onSelect: (value: number) => void
  onSelectAi: () => void
}

const SOSNoPlayersSelector = ({ selected, onSelect, onSelectAi }: Props) => {
  const arr = new Array(5).fill(0);
  return (
    <View className="flex flex-row justify-center items-center gap-2 w-full">
      <Pressable
            className={"flex-1 border rounded-md items-center justify-center " + (selected == -1 ? "bg-gray-700" : "")}
            onPress={() => onSelectAi()}
          >
            <Text 
              className={"text-2xl py-2 " + (selected == -1 ? "text-white" : "")}
              style={{ fontFamily: "Tempus-Sans" }}
              >
                1P
            </Text>
          </Pressable>
      {
        arr.map((_, index) => (
          <Pressable
            key={index}
            className={"flex-1 border rounded-md items-center justify-center " + (selected == index ? "bg-gray-700" : "")}
            onPress={() => onSelect(index)}
          >
            <Text 
              className={"text-2xl py-2 " + (selected == index ? "text-white" : "")}
              style={{ fontFamily: "Tempus-Sans" }}
              >
                {index + 2}P
            </Text>
          </Pressable>
        ))
      }
    </View>
  )
}

export default SOSNoPlayersSelector