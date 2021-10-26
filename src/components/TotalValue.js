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
              <Text style={{fontFamily: "Roboto_400Regular_Italic"}}>x{index === 0 ? "1" : index === 1 ? "10" : index === 2 ? "50" : index === 3 ? 100 : null}</Text>
            </Button>
            
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-between",
  },
  valueText: {
    fontSize: 30,
    fontFamily: "Roboto_700Bold",
    height: 30,
    color: "#3498db",
    alignSelf: "center"
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    fontFamily: "Roboto_400Regular_Italic",
    fontSize: 12,
    width: 60,
    
  }
})