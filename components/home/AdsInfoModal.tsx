import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Modal, Pressable, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SOSStyledButton from "@/components/SOSStyledButton";
import Image from "../ResizedImage";

interface AdsInfoModalProps {
  visible: boolean;
  onClose: () => void;
  onRemoveAds: () => void;
}

const AdsInfoModal: React.FC<AdsInfoModalProps> = ({
  visible,
  onClose,
  onRemoveAds,
}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View className="flex-1 bg-white">
        <SafeAreaView style={{ flex: 1 }}>
          <View className="flex-1 px-4 pt-2">
            <View className="w-full flex-row items-center justify-between mb-4">
              <Text
                className="text-2xl text-sos-ink"
                style={{ fontFamily: "Tempus-Sans" }}
              >
                About Ads
              </Text>
              <Pressable onPress={onClose} className="p-2">
                <MaterialCommunityIcons
                  name="window-close"
                  size={32}
                  color="black"
                />
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerClassName="pb-10"
            >
              <Text
                className="text-lg text-gray-700 mb-6"
                style={{ fontFamily: "Tempus-Sans" }}
              >
                This game contains ads to help support its continued development. We understand ads can interrupt your experience, so we offer a way to completely remove them!
              </Text>

              {/* Step 1 */}
              <View className="mb-8">
                <View className="flex-row items-start mb-3">
                  <MaterialCommunityIcons name="numeric-1-circle" size={28} color="black" className="mt-0.5" />
                  <Text className="text-lg text-sos-ink ml-3 flex-1 font-bold" style={{ fontFamily: "Tempus-Sans" }}>
                    Open the Menu on the Home screen and tap on "Remove Ads".
                  </Text>
                </View>
                <View className="w-full bg-gray-200 rounded-xl items-center justify-center sos-border overflow-hidden">
                  <Image source={require("@/assets/images/ad-sc-1.jpeg")} />
                </View>
              </View>

              {/* Step 2 */}
              <View className="mb-8">
                <View className="flex-row items-start mb-3">
                  <MaterialCommunityIcons name="numeric-2-circle" size={28} color="black" className="mt-0.5" />
                  <Text className="text-lg text-sos-ink ml-3 flex-1 font-bold" style={{ fontFamily: "Tempus-Sans" }}>
                    Watch 3 short rewarded video ads in the "Remove Ads" section.
                  </Text>
                </View>
                <View className="w-full bg-gray-200 rounded-xl items-center justify-center sos-border overflow-hidden">
                  <Image source={require("@/assets/images/ad-sc-2.jpeg")} />
                </View>
              </View>

              {/* Step 3 */}
              <View className="mb-8">
                <View className="flex-row items-start mb-3">
                  <MaterialCommunityIcons name="numeric-3-circle" size={28} color="black" className="mt-0.5" />
                  <Text className="text-lg text-sos-ink ml-3 flex-1 font-bold" style={{ fontFamily: "Tempus-Sans" }}>
                    Unlock 6 days of ad-free gameplay! Progress is saved automatically.
                  </Text>
                </View>
                <View className="w-full bg-gray-200 rounded-xl items-center justify-center sos-border overflow-hidden">
                  <Image source={require("@/assets/images/ad-sc-3.jpeg")} />
                </View>
              </View>

              {/* Pro Tip */}
              <View className="bg-sos-green/20 p-5 rounded-2xl sos-border mb-8 flex-row items-start">
                <MaterialCommunityIcons name="star-circle" size={28} color="black" className="mt-0.5" />
                <View className="ml-3 flex-1">
                  <Text className="text-lg text-sos-ink font-bold mb-1" style={{ fontFamily: "Tempus-Sans" }}>
                    Pro Tip:
                  </Text>
                  <Text className="text-base text-sos-ink" style={{ fontFamily: "Tempus-Sans" }}>
                    You can extend your ad-free period by watching more ads before it expires (1 ad = 2 extra days).
                  </Text>
                </View>
              </View>

              <Pressable
                onPress={onRemoveAds}
                className="w-full rounded-xl py-4 items-center justify-center bg-sos-green sos-border active:opacity-90 shadow-card"
              >
                <Text
                  className="text-xl uppercase text-sos-ink font-bold"
                  style={{ fontFamily: "Tempus-Sans" }}
                >
                  Go to Remove Ads
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

export default AdsInfoModal;
