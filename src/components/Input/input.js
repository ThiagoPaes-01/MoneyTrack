import { forwardRef } from "react";
import { TextInput } from "react-native";
import { color } from "../../Global/color";

export const Input = forwardRef(function Input({ style, ...props }, ref) {
  return (
    <TextInput
      ref={ref}
      style={[
        { flex: 1, fontSize: 14, color: color.colors.textPrimary },
        style,
      ]}
      placeholderTextColor={color.colors.textMuted}
      {...props}
    />
  );
});
