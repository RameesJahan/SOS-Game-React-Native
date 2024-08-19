import { View, Text } from 'react-native'
import React from 'react'

type Props = {}

const SOSHomeLogo = (props: Props) => {
  return (
    <View className='p-1'>
      <Text className="text-4xl leading-[0] text-neutral-950" style={{ fontFamily: "Tempus-Sans" }}>
        <Text className='line-through'>
          <Text className='text-red-600'>S</Text>
          <Text className='text-blue-600'>O</Text>
          <Text className='text-red-600'>S</Text>
        </Text>
        {" Game"}
      </Text>
    </View>
  )
}

export default SOSHomeLogo