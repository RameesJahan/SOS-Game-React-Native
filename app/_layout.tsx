import React, { useEffect, useState } from 'react'
import { SplashScreen, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AppLayout = () => {
  
  

  return (
    <>
      <StatusBar hidden />  
      <Stack screenOptions={{ headerShown: false, animation: "simple_push"}} />
    </>
  )
}

export default AppLayout