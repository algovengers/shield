import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { Onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Welcome = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === Onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-[#ff6363]">
      <TouchableOpacity
        onPress={() => {
          router.replace("/(auth)/sign-up");
        }}
        className="w-full flex justify-end items-end p-5"
      >
        <Text className="text-lg font-psemibold text-white/80">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[35px] h-[5px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[35px] h-[5px] mx-1 border-4 border-[#ff0051] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {Onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center py-4">
            <Image
              source={item.image}
              className="w-full h-[350px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10 px-2">
              <Text className="text-rose-100 text-4xl font-pbold mx-0 text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-md font-pregular text-center text-secondary-100 mx-4 mt-3 px-12">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mt-8 mb-8"
      />
    </SafeAreaView>
  );
};

export default Welcome;
