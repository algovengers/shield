import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling for more info on error handling
        console.log(JSON.stringify(signInAttempt, null, 2));
        Alert.alert("Error", "Log in failed. Please try again.");
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);
    }
  }, [isLoaded, form]);
  return (
    <ScrollView className="flex-1 bg-[#ff6363]">
      <View className="flex-1">
        <View className="relative w-full h-[250px]">
          <Image source={images.signupbg} className="w-full h-[250px] z-0" />
          <Image
            source={images.authlogo}
            className="w-48 h-48 z-0 absolute -top-2 left-2"
          />

          <Text className="text-2xl text-white font-psemibold absolute bottom-2 left-5">
            Welcome Back 👋🏻
          </Text>
        </View>

        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />

          <CustomButton
            title="Log In"
            onPress={onSignInPress}
            className="mt-6"
          />

          <OAuth />

          <Text className="text-lg text-center text-white/70 font-pregular mt-9">
            Don't have an account?{" "}
            <Link href="/sign-up">
              <Text className="text-primary-500 font-psemibold">Sign Up</Text>
            </Link>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
