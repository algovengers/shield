import { Tabs } from "expo-router";
import { Image, View, ImageSourcePropType } from "react-native";
import { icons } from "@/constants";

type TabIconProps = {
  icon: ImageSourcePropType;
  color: string;
  focused: boolean;
};

const TabIcon = ({ icon, color, focused }: TabIconProps) => {
  return (
    <View
      className={`items-center justify-center rounded-full p-2.5 ${
        focused ? "bg-rose-500" : "bg-rose-400"
      }`}
    >
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-7 h-7 flex justify-center items-center rounded-full"
      />
    </View>
  );
};

export default function Layout() {
  return (
    <>
      <View className="h-24 w-full bg-[#ffccd5] absolute bottom-0 -z-10"></View>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#ffe1e7",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#ff6380",
            borderTopWidth: 1,
            borderTopColor: "#ff6380",
            height: 70,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.home} color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="report"
          options={{
            title: "report",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.eye} color={color} focused={focused} />
            ),
          }}
        />

        <Tabs.Screen
          name="notifications"
          options={{
            title: "notifications",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.notifications}
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={icons.profile} color={color} focused={focused} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
