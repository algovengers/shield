import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { categories, images, Onboarding } from "@/constants";
import Swiper from "react-native-swiper";
import { router } from "expo-router";

const HomeSlider = () => {
  const swiperRef = useRef<Swiper>(null);

  return (
    <View className="px-2 mt-8">
      <Text className="font-pbold text-xl p-4">Explore other features</Text>
      <Swiper
        ref={swiperRef}
        loop={false}
        className="h-80"
        dot={
          <View className="w-[35px] h-[5px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[35px] h-[5px] mx-1 border-4 border-[#ff0051] rounded-full" />
        }
      >
        {categories.map((item: any) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => {
              router.push(`/profile`);
            }}
            className="flex items-center justify-center py-4 rounded-xl border-red-500 border h-64"
          >
            <Image
              source={item.image}
              className="w-full h-64 rounded-xl border-red-500 border"
            />
          </TouchableOpacity>
        ))}
      </Swiper>
    </View>
  );
};

export default HomeSlider;
