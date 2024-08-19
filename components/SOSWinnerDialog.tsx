import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import TransparentModal from './TransparentModal'
import SOSMenu from './SOSMenu'
import SOSMenuButton from './SOSMenuButton'

type Props = {
  visible: boolean
  onClose: (X: WinnerCloseType) => void
  winner: string[]
}

export enum WinnerCloseType {
  RESTART,
  QUIT
}

const SOSWinnerDialog = ({ visible, onClose, winner }: Props) => {
  return (
    <TransparentModal
      onRequestClose={() => onClose(WinnerCloseType.QUIT)}
      visible={visible}
      presentationStyle="overFullScreen"
      animationType="fade"
    >
      <SOSMenu title={winner.length > 1 ? "Winners" : "Winner"}>
        <View className="w-full aspect-square p-2">
          <ImageBackground 
            className="w-full h-full items-center justify-center" 
            source={require("@/assets/images/ic-trophy.png")}
            imageStyle={{ resizeMode: "contain", opacity: 0.1 }}
            >
            <Text className="text-3xl text-center" style={{ fontFamily: "Tempus-Sans" }}>
              { winner.length > 1 ? winner.join("\n") : winner[0]}
            </Text>
          </ImageBackground>
        </View>
        <View className="flex-row items-center">
          <View className="w-1/2 p-2">
            <SOSMenuButton title="Restart" onPress={() => onClose(WinnerCloseType.RESTART)} />
          </View>
          <View className="w-1/2 p-2">
            <SOSMenuButton title="Quit" onPress={() => onClose(WinnerCloseType.QUIT)} color="red" />
          </View>
        </View>
      </SOSMenu>

    </TransparentModal>
  )
}

export default SOSWinnerDialog