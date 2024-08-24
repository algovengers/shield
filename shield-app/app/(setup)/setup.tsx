import { Text, View, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";

const Setup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <ScrollView className="bg-[#ffccd5] h-full">
      <View className="relative w-full h-[220px] rounded-b-2xl">
        <Image
          source={images.setup}
          className="w-full h-[220px] z-0 opacity-90 rounded-b-2xl"
        />
      </View>
      <ScrollView className="px-4 mb-6">
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-500 font-pmedium w-full text-center">
            Add your emergency contacts (max 5)
          </Text>
        </View>

        <View className="mt-7 space-y-2 bg-rose-100 h-64 rounded-xl px-5">
          
        </View>

        <CustomButton
          title="Add Contact"
          onPress={() => {}}
          className="mt-6"
        />
      </ScrollView>
    </ScrollView>
  );
};

export default Setup;
