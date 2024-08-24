import HomeHero from "@/components/HomeHero";
import HomeSlider from "@/components/HomeSlider";
import { images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { SignedIn, SignedOut, useAuth, useUser } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  Image,
  ImageSourcePropType,
  SafeAreaView,
  Text,
  ScrollView,
  Platform,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";

export default function Home() {
  const { user } = useUser();
  const {getToken } = useAuth()
  
  // async function getData(){
  //   const token = await getToken()
  //   console.log("Her is the token" + token)
  //   const res = await fetchAPI('/api/v1/hii',{
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     }
  //   })
  //   console.log(res)
  // }
  // useEffect(()=>{
  //   // getData()
  // },[])

  const imageUrl = user?.imageUrl
    ? (user.imageUrl as ImageSourcePropType)
    : images.authlogo;

  const ios = Platform.OS == "ios";
  const topMargin = ios ? "pt-3" : "pt-10";

  return (
    <>
      <ScrollView className="bg-[#ffccd5]">
        <SignedIn>
          <SafeAreaView className="flex-1 bg-rose-300 w-full px-2 pb-2 rounded-b-2xl">
            <ScrollView
              showsVerticalScrollIndicator={false}
              className={topMargin}
            >
              {/* avatar */}
              <View className="mx-2 mt-5 flex-row justify-between itens-center mb-2">
                <Text className="font-bold text-3xl text-neutral-700">
                  Let's <Text className="font-pbold">Discover</Text>
                </Text>
                <TouchableOpacity
                  // Onpress go to profile
                  onPress={() => {
                    router.push("/profile");
                  }}
                >
                  <Image
                    source={{
                      uri: imageUrl as string,
                    }}
                    className="rounded-full w-10 h-10"
                  />
                </TouchableOpacity>
              </View>

              {/* Welcome name */}
              <View className="mx-2 mb-5">
                <Text className="font-pmedium text-lg text-neutral-700">
                  Welcome, {user?.fullName}
                </Text>
              </View>

              {/* searchbar */}
              <View className="mx-2 mb-4">
                <View className="flex-row items-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
                  <TextInput
                    placeholder="Search"
                    placeholderTextColor={"gray"}
                    className="flex-1 text-base pl-1 tracking-wider h-4"
                  />
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
          <SafeAreaView>
            <HomeHero />
            <HomeSlider />
          </SafeAreaView>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in">
            <Text>Sign In</Text>
          </Link>
          <Link href="/sign-up">
            <Text>Sign Up</Text>
          </Link>
        </SignedOut>
      </ScrollView>
      <StatusBar backgroundColor="#080b05" style="light" />
    </>
  );
}
