import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";

export default TotalValue = () => {
  const totalValue = useSelector((state) => state.game.value);
  return (
    <View style={styles.container}>
      <Text style={styles.valueText}>${totalValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  valueText: {
    fontSize: 18,
    height: 20,
    color: "#3498db",
  }
})