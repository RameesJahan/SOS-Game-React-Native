import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";

type Props = {
  title?: string;
  selected?: boolean;
  children?: React.ReactNode;
} & PressableProps;

const SOSStyledButton = ({ title, selected, children, ...props }: Props) => {
  return (
    <Pressable
      {...props}
      android_ripple={{ color: "gray" }}
      className={`p-3 rounded-tr-md rounded-bl-md ${
        selected ? "sos-border-selected" : "sos-border"
      }`}
    >
      {children}
    </Pressable>
  );
};

export default SOSStyledButton;

const styles = StyleSheet.create({});
