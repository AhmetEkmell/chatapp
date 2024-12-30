import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import * as Notifications from "expo-notifications";

import { prepareNotifications } from "../lib/notifications";
import { useSocket } from "../context/SocketContext";

const ChatRoom = () => {
  const { socket } = useSocket();
  const { room, username } = useLocalSearchParams();
  
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);

  useEffect(() => {
    prepareNotifications();
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);

      if (data?.username !== username) {
        Notifications.scheduleNotificationAsync({
          content: {
            title: `${data.username} yeni bir mesaj gönderdi`,
            body: data?.message || null,
          },
          trigger: null,
        });
      }
    });

    socket.on("user_typing", (data) => {
      if (!typingUsers.includes(data.username) && data.username !== username) {
        setTypingUsers((prev) => [...prev, data.username]);
      }
    });

    socket.on("user_stop_typing", (data) => {
      setTypingUsers((prev) => prev.filter((user) => user !== data.username));
    });

    return () => {
      socket.off("receive_message");
      socket.off("user_typing");
      socket.off("user_stop_typing");
    };
  }, [socket, typingUsers, username]);

  const handleTyping = (text) => {
    setInputMessage(text);

    if (socket) {
      if (text.trim()) {
        socket.emit("typing", { roomName: room, username });
      } else {
        socket.emit("stop_typing", { roomName: room, username });
      }
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const messageData = {
      roomName: room,
      username,
      message: inputMessage,
      time: new Date().toLocaleTimeString(),
    };

    socket.emit("send_message", messageData);
    socket.emit("stop_typing", { roomName: room, username });

    setInputMessage("");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.messageContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={msg.username === username ? styles.myMessage : styles.otherMessage}>
            <Text style={styles.messageAuthor}>{msg.username === username ? "Ben" : msg.username}</Text>
            <Text style={styles.messageText}>{msg.message}</Text>
            <Text style={styles.messageTime}>{msg.time}</Text>
          </View>
        ))}
        {typingUsers.length > 0 && <Text style={styles.typing}>{typingUsers.join(", ")} yazıyor...</Text>}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mesaj yazın..."
          value={inputMessage}
          onChangeText={handleTyping}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Gönder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatRoom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  messageContainer: {
    flex: 1,
    padding: 10,
  },
  myMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#d1f5d3",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "70%",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e1f5fe",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    maxWidth: "70%",
  },
  messageAuthor: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    marginTop: 5,
    textAlign: "right",
    color: "#777",
  },
  typing: {
    fontStyle: "italic",
    color: "#555",
    marginVertical: 5,
    textAlign: "left",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
