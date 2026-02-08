import "../global.css"
import { SoundContextProvider } from '@/context/sound-context'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const AppLayout = () => {

  return (
    <SoundContextProvider>
      <StatusBar hidden />  
      <Stack screenOptions={{ headerShown: false, animation: "simple_push"}} />
    </SoundContextProvider>
  )
}

export default AppLayout
