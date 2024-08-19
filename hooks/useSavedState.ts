import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'

export const useSavedState = <T>(key: string, initialValue: T) => {
  const [value, setStateValue] = React.useState<T>(initialValue)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  const setValue = async (val: React.SetStateAction<T>) => {
    let S;
    if(val instanceof Function) {
      setStateValue(val(value))
      S = val(value)
    }else {
      setStateValue(val)
      S = val
    }
    try {
      const jsonValue = JSON.stringify({ data: S })
      await AsyncStorage.setItem(key, jsonValue)
    } catch (e) {
      console.log(e)
    }
  }
  

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(key)
        if (jsonValue != null) {
          const data = JSON.parse(jsonValue)
          setStateValue(data.data)
        }   
        setIsLoading(false)
      } catch(e) {
        console.log(e)
      }
    }
    loadData()

  }, [key])

  return [value, setValue, isLoading] as [T, React.Dispatch<React.SetStateAction<T>>, boolean]
}