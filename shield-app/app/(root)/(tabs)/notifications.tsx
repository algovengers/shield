import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import React, { useEffect, useState } from "react";
import { icons, images } from "@/constants";
import { useAuth } from "@clerk/clerk-expo";
import { fetchAPI } from "@/lib/fetch";

type NotiProps = {
  name: string;
  message: string;
  profileImage?: string;
}[];

const Notifications = () => {
  const [notifications, setNotifications] = useState<NotiProps>([]);
  const {getToken} =useAuth()
  useEffect(() => {
    setNotifications([
      {
        profileImage: images.sos,
        name: "Afeef Uddin",
        message: "I need help! please call me",
      },
      {
        profileImage: images.sos,
        name: "Afeef Uddin",
        message: "I need help! please call me",
      },
      {
        profileImage: images.sos,
        name: "Afeef Uddin",
        message: "I need help! please call me",
      },
      {
        profileImage: images.sos,
        name: "Afeef Uddin",
        message: "I need help! please call me",
      },
      {
        profileImage: images.sos,
        name: "Afeef Uddin",
        message: "I need help! please call me",
      },
      
    ]);
    
    async function getData(){
      const token = await getToken()

      const data = await fetchAPI("/api/v1/getNotifications",{
        method: "GET",
        headers: {
        'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      console.log(data)
    }
    getData()
  }, []);

  const handleRemove = (index: number) => {
    console.log("Remove Notification", index);
    const newNotifications = [...notifications];
    newNotifications.splice(index, 1);
    setNotifications(newNotifications);
  };

  return (
    <ScrollView className="bg-[#ffccd5] h-full">
      <View className="relative w-full h-[220px] rounded-b-2xl">
        <Image
          source={images.notibg}
          className="w-full h-[220px] z-0 opacity-90 rounded-b-2xl"
        />
      </View>

      {/* Notification List */}
      {notifications.map((notification, index) => (
        <View key={index} className="mx-2 mt-4 py-2 bg-rose-100 rounded-2xl">
          <View className="flex flex-row items-center justify-between px-4 py-2">
            <View className="flex flex-row items-center">
              <Image
                source={notification.profileImage as ImageSourcePropType}
                className="w-10 h-10 rounded-full"
              />
              <View className="ml-3">
                <Text className="text-lg font-bold">{notification.name}</Text>
                <Text className="text-sm">{notification.message}</Text>
              </View>
            </View>
            {/* Notification accept or cancel */}
            <View className="flex flex-row items-center">
              <View className="flex flex-row items-center">
                <TouchableOpacity onPress={() => handleRemove(index)}>
                  <Image
                    source={icons.cancel}
                    className="w-8 h-8 mr-2 rounded-full"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => console.log("Accept Notification")}
                >
                  <Image
                    source={icons.accept}
                    className="w-8 h-8 rounded-full"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Notifications;
