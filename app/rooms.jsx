import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSocket } from "../context/SocketContext";

const ROOMS = [
  { id: "1", name: "room1", title: "KANAL 1" },
  { id: "2", name: "room2", title: "KANAL 2" },
  { id: "3", name: "room3", title: "KANAL 3" },
];

const Rooms = () => {
  const router = useRouter();
  const { username } = useLocalSearchParams();
  const { socket } = useSocket();

  const handleJoinRoom = (room) => {
    if (socket) {
      socket.emit("join_room", { roomName: room.name, username });
      router.push(`/chat?room=${room.name}&roomID=${room.id}&username=${username}`);
    } else {
      alert("Socket bağlantısı mevcut değil!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Merhaba {username}, bir kanal seç!</Text>
      {ROOMS.map((room) => (
        <TouchableOpacity key={room.id} style={styles.button} onPress={() => handleJoinRoom(room)}>
          <Text style={styles.buttonText}>{room.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Rooms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22292e",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    borderRadius: 10,
    marginBottom: 15,
    padding: 15,
    width: "80%",
    backgroundColor: "#ffd33d",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#22292e",
  },
});
