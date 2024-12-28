import React from "react";
import { StyleSheet, View } from "react-native";
import { Link, Stack } from "expo-router";

const NotFoundScreen = () => {
  return (
    <React.Fragment>
      <Stack.Screen options={{ title: "Aradağınız Sayfa Bulunamadı!" }} />
      <View style={styles.container}>
        <Link style={styles.button} href="/">
          Ana Sayfaya Git
        </Link>
      </View>
    </React.Fragment>
  );
};

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
});
