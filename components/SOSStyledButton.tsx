import {
  Pressable,
  PressableProps,
  StyleSheet,
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
  className,
  ...props
}: Props) => {
  console.log("[SOSStyledButton]selected", selected);
  const getClassName = (isSelected?: boolean) => {
    return isSelected ? "p-3 rounded-md bg-[#d3f5e4] sos-border-selected" : "p-3 rounded-md bg-white sos-border"
  }
  console.log(getClassName(selected))
  return (

    <Pressable
      className={`${getClassName(selected)} ${containerClassName}`}
      {...props}
      android_ripple={{ color: "gray" }}
    >
      {children}
    </Pressable>
  );
};

export default SOSStyledButton;

const styles = StyleSheet.create({});
