import { View, Text, Modal, Pressable } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import SOSHowTo from './SOSHowTo';

type Props = {
  visible: boolean
  onClose: () => void
}

const SOSHowToModal = ({ visible, onClose }: Props) => {
  return (
    <Modal  visible={visible} animationType="slide" >
      <View className="flex-1 p-4">
        <View className="w-full items-end justify-center">
          <Pressable onPress={onClose}>
            <MaterialCommunityIcons name="window-close" size={32} color="black" />
          </Pressable>
        </View>
        <SOSHowTo />
      </View>
    </Modal>
  )
}

export default SOSHowToModal