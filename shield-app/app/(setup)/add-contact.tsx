import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { useAuth } from "@clerk/clerk-expo";
import { fetchAPI } from "@/lib/fetch";

const max = 5;

const Setup = () => {
  const [contact, setContact] = useState([]);
  const [keyword, setKeyword] = useState("")
  const [userData, setUserData] = useState<any>([])
  const { getToken } = useAuth()

  async function handleAdd(clerkId: string) {
    const token = await getToken()
    const data = await fetchAPI("/api/v1/createFavRequest", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        clerkId: clerkId
      })
    })
    console.log(data)
  }
  useEffect(() => {
    async function getData() {
      const token = await getToken()
      const data = await fetchAPI("/api/v1/getUsers?q=" + keyword, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      setUserData(data.data)
      console.log(data)
    }
    getData()
  }, [keyword])

  const addtoFavContact = () => {
    console.log("Add to fav contact");
  };

  return (
    <ScrollView className="bg-[#ffccd5] h-full">
      <View className="relative w-full h-[220px] rounded-b-2xl">
        <Image
          source={images.setup}
          className="w-full h-[220px] z-0 opacity-90 rounded-b-2xl"
        />
      </View>
      <SafeAreaView className="px-4 mb-6">
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-500 font-pmedium w-full text-center">
            Add your emergency favourite list
          </Text>
        </View>

        <View className="mx-2 mb-4 mt-6">
          <View className="flex-row items-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
            <TextInput
              placeholder="Search"
              placeholderTextColor={"gray"}
              className="flex-1 text-base pl-1 tracking-wider h-4"
              value={keyword} onChangeText={(text) => setKeyword(text)}
            />
          </View>
        </View>
        {
          userData.length > 0 && userData.map((d) => (

            <View className="mx-2 mt-4 py-2 bg-rose-100 rounded-2xl" key={d.clerkId}>
              <View className="flex flex-row items-center justify-between px-4 py-2">
                <View className="flex flex-row items-center">
                  <Image source={images.sos} className="w-10 h-10 rounded-full" />
                  <View className="ml-3">
                    <Text className="text-lg font-bold">{d.name}</Text>
                  </View>
                </View>

                <View className="flex flex-row items-center">
                  <View className="flex flex-row items-center">
                    <TouchableOpacity onPress={() => handleAdd(d.clerkId)}>
                      <Image
                        source={icons.accept}
                        className="w-8 h-8 rounded-full"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))
        }

        {contact && contact.length > 0 ? (
          <CustomButton
            title="Add Contact"
            onPress={() => {
              // Add contact
              console.log("Add contact");
            }}
            className="mt-6"
          />
        ) : (
          <></>
        )}

        {contact && contact.length > 0 ? (
          <CustomButton
            title="Save"
            onPress={() => {
              // Save contacts
              console.log(contact);
            }}
            className="mt-6 bg-success-400"
            textVariant="primary"
            disabled={contact.length === 0}
          />
        ) : (
          <></>
        )}
      </SafeAreaView>
    </ScrollView>
  );
};

export default Setup;
