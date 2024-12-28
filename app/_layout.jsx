import { Stack, useGlobalSearchParams } from "expo-router";
import { SocketProvider } from "../context/SocketContext";

const RootLayout = () => {
  const searchParams = useGlobalSearchParams();
  const roomID = searchParams?.roomID || null;

  return (
    <SocketProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="rooms" options={{ title: "Mesaj Kanalları" }} />
        <Stack.Screen name="chat" options={{ title: `Kanal - ${roomID}` }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </SocketProvider>
  );
};

export default RootLayout;
