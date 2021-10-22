import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Project Idle: Copyright Benjamin Benton 2021</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    alignItems: "center",
  },
  textStyle: {
    fontSize: 8,
    fontStyle: "italic",
    color: "#3498db"
  }
})

export default Footer;