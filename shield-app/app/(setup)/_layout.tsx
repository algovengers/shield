import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="setup" options={{ headerShown: false }} />
      <Stack.Screen name="add-contact" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
