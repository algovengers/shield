import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import React, { useState } from "react";
import { images } from "@/constants";
import { useUser } from "@clerk/clerk-expo";

const Profile = () => {
  const { user } = useUser();
  const imageUrl = user?.imageUrl
    ? (user.imageUrl as ImageSourcePropType)
    : images.authlogo;

  return (
    <ScrollView className="bg-[#ffccd5] h-full relative">
      <View className="relative w-full h-[220px] rounded-b-2xl">
        <Image
          source={images.profilebg}
          className="w-full h-[220px] z-0 opacity-90 rounded-b-2xl"
        />
      </View>

      <View className="w-full justify-center items-center -mt-20">
        <View className="rounded-full border-2 border-blacl">
          <Image
            source={{
              uri: imageUrl as string,
            }}
            className="w-[200px] h-[200px] rounded-full"
          />
        </View>
      </View>

      <View>
        <Text className="text-center text-2xl mt-6 font-pbold text-neutral-700">
          {user?.fullName}
        </Text>
      </View>

      {/*Buttons for adding contact. Non - contact and fav contacts !*/}
      <View className="flex-col gap-y-8 justify-center items-center mt-6 mx-2">
        <TouchableOpacity>
          <View className="flex flex-row justify-center items-center bg-white rounded-lg p-2 px-4">
            <Image source={images.sos} className="w-8 h-8" />
            <Text className="text-neutral-700 text-lg font-pbold ml-2">
              Add Contact
            </Text>
          </View>
        </TouchableOpacity>
            

        <TouchableOpacity>
          <View className="flex-row justify-center items-center bg-white rounded-lg p-2 px-4">
            <Image source={images.sosx} className="w-8 h-8" />
            <Text className="text-neutral-700 text-lg font-pbold ml-2">
              Non-Contact
            </Text>
          </View>
        </TouchableOpacity>
      </View>

    </ScrollView>
  );
};

export default Profile;
