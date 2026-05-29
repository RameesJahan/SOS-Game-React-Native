import React from 'react';
import { Text, View, Linking } from 'react-native';

const Credits = () => {
  return (
    <View>
      <Text className="text-xl text-sos-ink font-bold mb-4 text-center" style={{ fontFamily: "Tempus-Sans" }}>
        Credits
      </Text>

      <Text className="text-base text-sos-ink font-bold mb-1" style={{ fontFamily: "Tempus-Sans" }}>
        Game Images
      </Text>
      <Text className="text-sm text-gray-600 mb-4" style={{ fontFamily: "Tempus-Sans", lineHeight: 20 }}>
        • <Text className="text-sos-green underline" onPress={() => Linking.openURL('https://www.freepik.com')}>Freepik</Text>
        {'\n'}• License: Free for personal and commercial use, with attribution required.
      </Text>

      <Text className="text-base text-sos-ink font-bold mb-1" style={{ fontFamily: "Tempus-Sans" }}>
        Background Music
      </Text>
      <Text className="text-sm text-gray-600 mb-6" style={{ fontFamily: "Tempus-Sans", lineHeight: 20 }}>
        • Flush Why
        {'\n'}• License: Free to use, with attribution required.
      </Text>

      <Text className="text-sm text-gray-500 text-center" style={{ fontFamily: "Tempus-Sans", lineHeight: 20 }}>
        We appreciate the work of these creators and thank them for providing high-quality resources.
      </Text>
    </View>
  );
};

export default Credits;