import { StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useSocket } from "../../context/SocketContext";

const Index = () => {
  const router = useRouter();
  const { isConnected, connectSocket, ipAddress } = useSocket();

  const [localIpAddress, setLocalIpAddress] = useState(ipAddress);
  const [username, setUsername] = useState("");

  const handleConnect = () => {
    if (!localIpAddress) {
      Alert.alert("IP adresi giriniz.");
      return;
    }

    connectSocket(localIpAddress);
  };

  const handleUsernameSubmit = () => {
    if (!username) {
      Alert.alert("Kullanıcı adı giriniz.");
      return;
    }

    router.push(`/rooms?username=${username}`);
  };

  return (
    <View style={styles.container}>
      {!isConnected ? (
        <>
          <Text style={styles.label}>Socket IP Adresi:</Text>
          <TextInput
            style={styles.input}
            value={localIpAddress}
            onChangeText={setLocalIpAddress}
            placeholder="Socket IP adresi"
          />
          <TouchableOpacity style={styles.button} onPress={handleConnect}>
            <Text style={styles.buttonText}>Bağlan</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Bağlantı başarılı!</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Kullanıcı Adı"
          />
          <TouchableOpacity style={styles.button} onPress={handleUsernameSubmit}>
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },

  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 20,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },

  label: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    textAlign: "left",
  },
});
