import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-native-paper";
import {
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
} from "@expo-google-fonts/roboto";
import { changeIndex } from "../redux/gameSlice";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

export default TotalValue = () => {

  const dispatch = useDispatch();

  const totalValue = useSelector((state) => state.game.value);
  const index = useSelector((state) => state.game.storesToBuyIndex);

  let [fontsLoaded, error] = Font.useFonts({ 
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
  return (
    <View style={styles.container}>
      <Text style={styles.valueText}>${totalValue}</Text>
      <Button
              style={styles.button}
              compact
              mode="contained"
              onPress={() => {
                try {
                  dispatch(changeIndex());
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              x{index === 0 ? "1" : index === 1 ? "10" : index === 2 ? "50" : index === 3 ? 100 : null}
            </Button>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  valueText: {
    fontSize: 25,
    fontFamily: "Roboto_700Bold",
    height: 25,
    color: "#3498db",
  },
  button: {
    position: "absolute",
    left: 300,
    height: 40,
    width: 60,
    alignItems: "center",
    fontFamily: "Roboto_400Regular",
    fontSize: 12,
  }
})