import React, { PropsWithChildren, useEffect } from 'react'
import { Text } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

type Props = {
 innerClass?: string
 style: Object
}

const AnimatedText = ({ children, innerClass, style }: PropsWithChildren<Props>) => {
  const position = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: position.value
        }
      ]
    }
  })

  useEffect(() => {
    position.value = withRepeat(
      withTiming(20, {
        duration: 1000,
      }),
      -1,
      true
    );
  }, [])


  return (
    <Animated.View style={[animatedStyle]}>
      <Text className={innerClass} style={style}>
        {children}
      </Text>
    </Animated.View>
  )
}

export default AnimatedText