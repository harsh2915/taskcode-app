import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { Link } from "expo-router";

const Home = () => {
  return (
    <ImageBackground
      source={require("../../../assets/images/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Image
          source={require("../../../assets/images/icon.png")}
          style={styles.appIcon}
        />

        <Text style={styles.welcomeText}>Welcome to TaskCode</Text>

        <Text style={styles.description}>
          Stay organized and boost your productivity. Manage your tasks
          efficiently with our easy-to-use task manager.
        </Text>

        {/* Go to Task Section Button */}
        <TouchableOpacity style={styles.taskButton}>
          <Link href="/task">
            <Text style={styles.taskButtonText}>Go to Task Section</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 10,
    padding: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  appIcon: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 25,
    paddingHorizontal: 20,
  },
  taskButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  taskButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  aboutButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  aboutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default Home;
