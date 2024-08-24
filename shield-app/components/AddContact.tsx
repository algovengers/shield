import {
  KeyboardAvoidingView,
  Image,
  TextInput,
  Platform,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { icons } from "@/constants";

type AddContactProps = {
  value1: string;
  value2: string;
  value3: string;
  onChangeText1: (text: string) => void;
  onChangeText2: (text: string) => void;
  onChangeText3: (text: string) => void;
};

const AddContact = ({ value1, value2, value3, onChangeText1, onChangeText2, onChangeText3 }: AddContactProps) => {
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="mt-7 pb-6 space-y-1 bg-rose-50 rounded-xl px-5"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="px-2 py-2.5 w-full">
            <Text className="text-base text-gray-500 font-pmedium my-1">
              Name
            </Text>

            <View className="flex flex-row justify-start items-center relative bg-rose-100 rounded-xl border-2 border-rose-300 focus:border-rose-400">
              <Image source={icons.person} className="w-6 h-6 ml-4 saturate-200" />
              <TextInput
                className="rounded-full py-1.5 px-4 font-psemibold text-[15px] flex-1 text-left"
                placeholder="Enter contact name"
                placeholderTextColor="#858585"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="px-2 py-2.5 w-full">
            <Text className="text-base text-gray-500 font-pmedium my-1">
              Email (optional)
            </Text>

            <View className="flex flex-row justify-start items-center relative bg-rose-100 rounded-xl border-2 border-rose-300 focus:border-rose-400">
              <Image source={icons.email} className="w-6 h-6 ml-4 saturate-200" />
              <TextInput
                className="rounded-full py-1.5 px-4 font-psemibold text-[15px] flex-1 text-left"
                placeholder="Enter contact name"
                placeholderTextColor="#858585"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="px-2 py-2.5 w-full">
            <Text className="text-base text-gray-500 font-pmedium my-1">
              Phone No.
            </Text>

            <View className="flex flex-row justify-start items-center relative bg-rose-100 rounded-xl border-2 border-rose-300 focus:border-rose-400">
              <Image source={icons.phone} className="w-6 h-6 ml-4" />
              <TextInput
                className="rounded-full py-1.5 px-4 font-psemibold text-[15px] flex-1 text-left"
                placeholder="Enter contact name"
                placeholderTextColor="#858585"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export default AddContact;
