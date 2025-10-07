import React, { useEffect, useState } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SoundContextProvider } from '@/context/sound-context'

const AppLayout = () => {
  
  

  return (
    <SoundContextProvider>
      <StatusBar hidden />  
      <Stack screenOptions={{ headerShown: false, animation: "simple_push"}} />
    </SoundContextProvider>
  )
}

export default AppLayout