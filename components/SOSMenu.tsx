import { View, Text, ImageBackground } from 'react-native'
import React, { PropsWithChildren } from 'react'

type Props = {
  title: string
}

const SOSMenu = ({ title,children }: PropsWithChildren<Props>) => {
  return (
    <View className='w-3/4 rounded-md overflow-hidden'>
      <ImageBackground
          className="flex justify-center items-center p-4"
          source={require("@/assets/images/paper-bg.jpg")}
          >
          <Text style={{ fontFamily: "Tempus-Sans" }} className="text-4xl">{title}</Text>
          <View className="w-full mt-2 gap-y-[8px]">
            {children}
          </View>
      </ImageBackground>
    </View>
  )
}

export default SOSMenu