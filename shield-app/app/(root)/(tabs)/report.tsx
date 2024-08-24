import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";

type FormFieldProps = {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (e: string) => void;
  otherStyles?: string;
  multiline?: boolean;
};

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  multiline = false,
  otherStyles,
  ...props
}: FormFieldProps) => {
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-800 font-pmedium">{title}</Text>

      <View
        className={`w-full ${
          multiline ? "h-48" : ""
        } px-4 py-2.5 rounded-2xl bg-rose-200 border-2 border-rose-500 focus:border-rose-600 flex flex-row items-start`}
      >
        <TextInput
          className="flex-1 text-black font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#858585"
          onChangeText={handleChangeText}
          {...props}
          multiline={multiline}
        />
      </View>
    </View>
  );
};
const Report = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    proof: null as DocumentPicker.DocumentPickerAsset | null,
    description: "",
    date: "",
  });

  const openPicker = async (selectType: "image" | "video") => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg", "image/jpeg", "image/gif", "image/webp"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      setForm({
        ...form,
        proof: result.assets[0],
      });
    } else {
      setTimeout(() => {
        console.log("cancelled");
      }, 100);
    }
  };

  const ios = Platform.OS == "ios";
  const topMargin = ios ? "pt-3" : "pt-10";

  const [related, setRelated] = useState(false);

  return (
    <ScrollView className="bg-[#ffccd5] h-full">
      <View className="relative w-full h-[220px] rounded-b-2xl">
        <Image
          source={images.report}
          className="w-full h-[220px] z-0 opacity-90 rounded-b-2xl"
        />
      </View>

      <ScrollView className="px-4 mb-6">
        <FormField
          title="What's the crime in short ?"
          value={form.title}
          placeholder="Write the title for the report"
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <FormField
          title="Describe what happened"
          value={form.description}
          placeholder="Write the description for the report"
          handleChangeText={(e) => setForm({ ...form, description: e })}
          otherStyles="mt-10"
          //TextArea Input is needed so pass down ...props
          multiline={true}
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-800 font-pmedium">
            Upload a proof
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.proof ? (
              <Video
                source={{ uri: form.proof.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center">
                <View className="w-32 h-32 flex justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    alt="upload"
                    className="w-1/2 h-1/2 grayscale"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-4">
          <Text>Add a checkbox</Text>
        </View>

        <CustomButton
          title="Report Crime"
          IconLeft={() => (
            <Image
              source={icons.licon}
              resizeMode="contain"
              className="w-8 h-8 mr-4"
            />
          )}
          IconRight={() => (
            <Image
              source={icons.ricon}
              resizeMode="contain"
              className="w-8 h-8 ml-4"
            />
          )}
          onPress={() => console.log("Hellowwww")}
          className="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </ScrollView>
  );
};

export default Report;
