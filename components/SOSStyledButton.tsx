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
  containerClassName?: string;
} & PressableProps;

const SOSStyledButton = ({
  title,
  selected,
  children,
  containerClassName,
  ...props
}: Props) => {
  return (
    <Pressable
      {...props}
      android_ripple={{ color: "gray" }}
      className={`p-3 rounded-tr-md rounded-bl-md ${
        selected ? "sos-border-selected" : "sos-border"
      } ${containerClassName}`}
    >
      {children}
    </Pressable>
  );
};

export default SOSStyledButton;

const styles = StyleSheet.create({});
