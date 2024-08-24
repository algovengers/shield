import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import { Link } from "expo-router";

const HomeHero = () => {
  const [sosEnabled, setSosEnabled] = useState(false);

  return (
    <View className="justify-center items-center mt-5">
      {
        !sosEnabled && (
          <Text className="font-pregular text-black mb-5 mt-2">
            SOS is disabled. To enable it please click here: {" "}
            <Link
              href="/setup"
              className="text-red-500 font-pbold"
            >
              Setup
            </Link>
          </Text>
        )
      }

      {/* SOS Button */}
      <TouchableOpacity
        onPress={() => {
          setSosEnabled(!sosEnabled);
          console.log("SOS Enabled: ", sosEnabled);
        }}
      >
        <Image
          source={sosEnabled ? images.sos : images.sosx}
          className="w-48 h-48 flex items-center justify-center pulse-animation"
          resizeMode="contain"
        />
      </TouchableOpacity>

      
    </View>
  );
};

export default HomeHero;

// Stylesheet for the HomeHero component for the pulse animation
