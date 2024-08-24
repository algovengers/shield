import { icons } from "@/constants";
import { InputFieldProps } from "@/types/type";
import { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const InputField = ({
  label,
  placeholder,
  icon,
  labelStyle,
  value,
  onChangeText,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {

  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text
            className={`text-lg text-rose-100 font-pbold my-1 ${labelStyle}`}
          >
            {label}
          </Text>

          <View
            className={`flex flex-row justify-start items-center relative bg-rose-200 rounded-full border-2 border-rose-500 focus:border-rose-600 ${containerStyle}`}
          >
            {icon && (
              <Image
                source={icon}
                className={`w-6 h-6 ml-4 saturate-200 ${iconStyle}`}
              />
            )}
            <TextInput
              className={`rounded-full py-2.5 px-4 font-psemibold text-[15px] flex-1 text-left ${inputStyle}`}
              placeholder={placeholder}
              placeholderTextColor="#858585"
              value={value}
              onChangeText={onChangeText}
              secureTextEntry={secureTextEntry && !showPassword}
              {...props}
            />

            {label === "Password" && (
              <TouchableWithoutFeedback onPress={() => setShowPassword(!showPassword)}>
                <Image
                  source={!showPassword ? icons.eye : icons.eyeHide}
                  className="w-6 h-6 mr-4"
                  resizeMode="contain"
                />
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
