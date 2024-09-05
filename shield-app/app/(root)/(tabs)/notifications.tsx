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



const Notifications = () => {
  const [notifications, setNotifications] = useState<any>([]);
  const {getToken} =useAuth()
  useEffect(() => {    
    async function getData(){
      const token = await getToken()

      const data = await fetchAPI("/api/v1/getNotifications",{
        method: "GET",
        headers: {
        'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      console.log("Here i am ",data.data)
      setNotifications(data.data.requests)
    }
    getData()
  }, []);

  const handleAcceptRequest = async(id: string,requesterId: string) =>{

    //acceptFavRequest
    const token = await getToken()

    const data = await fetchAPI("/api/v1/acceptFavRequest",{
      method: "POST",
      headers: {
      'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        requesterId,
        favRequestId: id
      })
    })

  }

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
      {notifications.map((notification: any, index: number) => (
        <View key={index} className="mx-2 mt-4 py-2 bg-rose-100 rounded-2xl">
          <View className="flex flex-row items-center justify-between px-4 py-2">
            <View className="flex flex-row items-center">
              <Image
                source={images.sos}
                className="w-10 h-10 rounded-full"
              />
              <View className="ml-3">
                <Text className="text-lg font-bold">{notification.from.name}</Text>
                <View className="flex flex-row flex-wrap">
                <Text className="text-sm flex flex-row flex-wrap break-words">Hey I want to add you</Text>
                </View>
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
                  onPress={() => handleAcceptRequest(notification.id,notification.from.clerkId)}
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
