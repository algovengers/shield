import { Redirect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useAuth } from "@clerk/clerk-expo";

const Page = () => {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/(root)/(tabs)/home"} />;
  }
  return (
    <>
      <Redirect href="/(auth)/welcome" />
      <StatusBar backgroundColor="#080b05" style="light" />
    </>
  );
};

export default Page;
