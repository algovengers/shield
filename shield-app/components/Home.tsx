import {
  Image,
  ImageSourcePropType,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface HomeProps {
  userPic?: ImageSourcePropType;
}

const Home = ({ userPic }: { userPic: string }) => {
  const ios = Platform.OS == "ios";
  const topMargin = ios ? "pt-3" : "pt-10";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className={topMargin}>
        {/* avatar */}
        <View className="mx-5 flex-row justify-between itens-center mb-10">
          <Text className="font-bold text-2xl text-neutral-700">
            Let's Discover
          </Text>
          <TouchableOpacity>
            <Image
              source={{
                uri: userPic as string,
              }}
              className="rounded-full w-10 h-10"
            />
          </TouchableOpacity>
        </View>

        {/* searchbar */}
        <View className="mx-5 mb-4">
          <View className="flex-row items-center bg-neutral-100 rounded-full p-4 space-x-2 pl-6">
            <TextInput
              placeholder="Search destination"
              placeholderTextColor={"gray"}
              className="flex-1 text-base mb-1 pl-1 tracking-wider"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
