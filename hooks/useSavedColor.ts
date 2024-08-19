import { Colors } from "@/constants/Colors"
import { useState } from "react"

export const useSavedColor = () => {
  const [color, setColor] = useState<string>(Colors.themes.red)

  return color
}