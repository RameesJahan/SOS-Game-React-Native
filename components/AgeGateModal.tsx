import React, { useRef, useState } from "react";
import { Modal, Text, TextInput, View, Pressable, Alert, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAgeContext } from "@/context/age-context";
import TermsOfUse from "@/app/about/termsofuse/index";

const AgeGateModal = () => {
  const { isAgeGateComplete, setBirthDate, isLoading } = useAgeContext();

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [inputError, setInputError] = useState({
    month: undefined as string | undefined,
    day: undefined as string | undefined,
    year: undefined as string | undefined,
  });

  const monthInputRef = useRef<TextInput>(null);
  const dayInputRef = useRef<TextInput>(null);
  const yearInputRef = useRef<TextInput>(null);

  // Do not render anything until we are sure loading is done
  if (isLoading || isAgeGateComplete) {
    return null;
  }

  const validateMonth = (month: string) => {
    const m = parseInt(month, 10);
    if (isNaN(m) || m < 1 || m > 12) {
      setInputError({
        ...inputError,
        month: "Invalid Month",
      });
      return true;
    }
    else {
      setInputError({
        ...inputError,
        month: undefined,
      });
      return false;
    }
  }

  const validateDay = (day: string) => {
    const d = parseInt(day, 10);
    if (isNaN(d) || d < 1 || d > 31) {
      setInputError({
        ...inputError,
        day: "Invalid Day",
      });
      return true;
    }
    else {
      setInputError({
        ...inputError,
        day: undefined,
      });
      return false;
    }
  }

  const validateYear = (year: string) => {
    const y = parseInt(year, 10);
    if (isNaN(y) || y < 1900 || y > new Date().getFullYear()) {
      setInputError({
        ...inputError,
        year: "Invalid Year",
      });
      return true;
    }
    else {
      setInputError({
        ...inputError,
        year: undefined,
      });
      return false;
    }
  }

  const handleSubmit = () => {
    // Basic validation
    const m = parseInt(month, 10);
    const d = parseInt(day, 10);
    const y = parseInt(year, 10);

    const currentYear = new Date().getFullYear();

    if (validateMonth(month)) {
      Alert.alert("Invalid Month", "Please enter a valid month (1-12).");
      return;
    }
    if (validateDay(day)) {
      Alert.alert("Invalid Day", "Please enter a valid day (1-31).");
      return;
    }
    if (validateYear(year)) {
      Alert.alert("Invalid Year", "Please enter a valid year.");
      return;
    }

    // Check valid date
    const date = new Date(y, m - 1, d);
    if (
      date.getFullYear() !== y ||
      date.getMonth() !== m - 1 ||
      date.getDate() !== d
    ) {
      Alert.alert("Invalid Date", "Please enter a valid birth date.");
      return;
    }

    // Date is valid, store it as an ISO string
    // This is stored freely without collecting any PII remotely.
    setBirthDate(date.toISOString());
  };

  return (
    <Modal visible={!isAgeGateComplete} animationType="slide">
      <View className="flex-1 bg-sos-bg">
        <SafeAreaView className="flex-1 px-6 justify-center">

          <View className="bg-white p-6 rounded-3xl sos-border shadow-card items-center">
            <Text
              className="text-2xl text-sos-ink font-bold mb-4 text-center"
              style={{ fontFamily: "Tempus-Sans" }}
            >
              When were you born?
            </Text>

            <Text
              className="text-base text-gray-600 mb-8 text-center"
              style={{ fontFamily: "Tempus-Sans" }}
            >
              Please enter your birth date to continue.
            </Text>

            <View className="flex-row items-start justify-between w-full mb-8">

              <View className="flex-1 mr-2">
                <Text className="text-sm text-gray-500 mb-2 font-bold" style={{ fontFamily: "Tempus-Sans" }}>Month</Text>
                <TextInput
                  ref={monthInputRef}
                  onSubmitEditing={() => {
                    if (validateMonth(month)) return;
                    dayInputRef.current?.focus()
                  }}
                  onBlur={() => validateMonth(month)}
                  returnKeyType="next"
                  className="bg-gray-100 p-4 rounded-xl text-center text-xl sos-border"
                  placeholder="MM"
                  placeholderTextColor="#6B7280"
                  keyboardType="number-pad"
                  textContentType="birthdateMonth"
                  maxLength={2}
                  value={month}
                  onChangeText={setMonth}
                />
                {inputError.month && (
                  <Text className="text-red-500 text-xs mb-2 font-bold" style={{ fontFamily: "Tempus-Sans" }}>
                    {inputError.month}
                  </Text>
                )}
              </View>

              <View className="flex-1 mx-2">
                <Text className="text-sm text-gray-500 mb-2 font-bold" style={{ fontFamily: "Tempus-Sans" }}>Day</Text>
                <TextInput
                  ref={dayInputRef}
                  onSubmitEditing={() => {
                    if (validateDay(day)) return;
                    yearInputRef.current?.focus()
                  }}
                  onBlur={() => validateDay(day)}
                  returnKeyType="next"
                  className="bg-gray-100 p-4 rounded-xl text-center text-xl sos-border"
                  placeholder="DD"
                  placeholderTextColor="#6B7280"
                  textContentType="birthdateDay"
                  keyboardType="number-pad"
                  maxLength={2}
                  value={day}
                  onChangeText={setDay}
                />
                {inputError.day && (
                  <Text className="text-red-500 text-xs mb-2 font-bold" style={{ fontFamily: "Tempus-Sans" }}>
                    {inputError.day}
                  </Text>
                )}
              </View>

              <View className="flex-1 ml-2">
                <Text className="text-sm text-gray-500 mb-2 font-bold" style={{ fontFamily: "Tempus-Sans" }}>Year</Text>
                <TextInput
                  ref={yearInputRef}
                  onSubmitEditing={handleSubmit}
                  onBlur={() => validateYear(year)}
                  returnKeyType="done"
                  className="bg-gray-100 p-4 rounded-xl text-center text-xl sos-border"
                  placeholder="YYYY"
                  placeholderTextColor="#6B7280"
                  keyboardType="number-pad"
                  textContentType="birthdateYear"
                  maxLength={4}
                  value={year}
                  onChangeText={setYear}
                />
                {inputError.year && (
                  <Text className="text-red-500 text-xs mb-2 font-bold" style={{ fontFamily: "Tempus-Sans" }}>
                    {inputError.year}
                  </Text>
                )}
              </View>
            </View>

            <Pressable
              onPress={handleSubmit}
              className={`w-full rounded-xl py-4 items-center justify-center sos-border active:opacity-90 ${month && day && year ? 'bg-sos-green' : 'bg-gray-300'
                }`}
              disabled={!month || !day || !year}
            >
              <Text
                className="text-xl uppercase text-sos-ink font-bold"
                style={{ fontFamily: "Tempus-Sans" }}
              >
                Continue
              </Text>
            </Pressable>

            <Text className="text-sm text-gray-600 text-center mt-6 px-2" style={{ fontFamily: "Tempus-Sans" }}>
              By tapping Continue, you agree to our{" "}
              <Text
                className="text-sos-green font-bold underline"
                onPress={() => setShowTerms(true)}
              >
                Terms of Use
              </Text>
              {" "}and{" "}
              <Text
                className="text-sos-green font-bold underline"
                onPress={() => Linking.openURL("https://kaakkatech.github.io/sos-game-privacy-policy/")}
              >
                Privacy Policy
              </Text>.
            </Text>
          </View>

        </SafeAreaView>
      </View>

      <Modal visible={showTerms} animationType="slide" onRequestClose={() => setShowTerms(false)}>
        <SafeAreaView className="flex-1 bg-white">
          <Pressable onPress={() => setShowTerms(false)} className="p-4 border-b border-gray-200 flex-row items-center">
            <Text className="text-sos-ink text-lg font-bold" style={{ fontFamily: "Tempus-Sans" }}>← Close Terms</Text>
          </Pressable>
          <View className="flex-1">
            <TermsOfUse />
          </View>
        </SafeAreaView>
      </Modal>
    </Modal>
  );
};

export default AgeGateModal;
