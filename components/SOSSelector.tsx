import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { SOSSlot } from '@/types/types'
import { useSavedColor } from '@/hooks/useSavedColor'

type SOSSelectorProps = {
  selected: SOSSlot
  onSelect: (x: SOSSlot) => void
}


const SOSSelector = ({ selected, onSelect }: SOSSelectorProps) => {

  const colorScheme = useSavedColor()

  return (
    <View className="flex flex-row p-12 gap-3">
      <Pressable 
        className={`flex-1 aspect-square border rounded-md items-center justify-center ${selected == SOSSlot.S ? "bg-gray-700" : ""} `} 
        onPress={() => onSelect(SOSSlot.S)}
        style={{ borderColor : 'black' }}
        >
        <Text 
          className={`text-[64px]`}
          style={{  
            color : selected == SOSSlot.S ? "white" : 'black',
            fontFamily: "Tempus-Sans"
           }}
          >S</Text>
      </Pressable>
      <Pressable
        className={`flex-1 aspect-square border rounded-md items-center justify-center ${selected == SOSSlot.O ? "bg-gray-700" : ""}`} 
        onPress={() => onSelect(SOSSlot.O)}
        style={{ borderColor : 'black' }}
        >
        <Text 
          className={`text-[64px]`}
          style={{  
            color : selected == SOSSlot.O ? "white" : 'black',
            fontFamily : "Tempus-Sans"
           }}
          >O</Text>
      </Pressable>
    </View>
  )
}

export default SOSSelector