import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Button,
  Card,
  Title,
  Paragraph,
  useTheme,
  ProgressBar,
} from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { addToValue, subFromValue, increaseMulti } from "../redux/gameSlice";
import * as Progress from "react-native-progress";
import {
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic,
} from "@expo-google-fonts/roboto";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

export default function Counter({ name, baseValue, initCost, initSpeed }) {
  const [StoreCount, setStoreCount] = useState(0);
  const [StoreMulti, setStoreMulti] = useState(1);
  const [StorePrice, setStorePrice] = useState(initCost);
  const [StoreSpeed, setStoreSpeed] = useState(initSpeed);
  const [IsActive, setIsActive] = useState(false);

  const totalValue = useSelector((state) => state.game.value);

  const dispatch = useDispatch();

  let [fontsLoaded, error] = Font.useFonts({
    Roboto_100Thin,
    Roboto_100Thin_Italic,
    Roboto_300Light,
    Roboto_300Light_Italic,
    Roboto_400Regular,
    Roboto_400Regular_Italic,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
    Roboto_700Bold,
    Roboto_700Bold_Italic,
    Roboto_900Black,
    Roboto_900Black_Italic,
  });

  let num = 0;
  useEffect(() => {
    const interval = setInterval(() => {
      // console.log(`${name} thinks its adding: ${baseValue * StoreCount * StoreMulti}`)
      IsActive ? dispatch(addToValue(baseValue * StoreCount * StoreMulti)) : null;
      num++;
    }, StoreSpeed);
    return () => {
      clearInterval(interval);
    };
  }, [StoreCount, StoreMulti, num]);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Card style={styles.cardStyle}>
          <Title style={styles.titleText}>{name}</Title>
          <Paragraph style={styles.priceText}>Cost: {StorePrice} </Paragraph>
          <Card.Content style={styles.infoTextContainer}>
            <Paragraph style={styles.infoText}>
              {StoreMulti} : Multiplier
            </Paragraph>
            <Paragraph style={styles.infoText}>
              {StoreCount} : StoreCount
            </Paragraph>
            <Paragraph style={styles.infoText}>
              {baseValue * StoreCount * StoreMulti} : Value
            </Paragraph>
          
          <Progress.Bar
            indeterminate={true}
            indeterminateAnimationDuration={StoreSpeed}
            color={"#3498db"}
          />
          </Card.Content>
          <Card.Actions>
            <Button
              style={styles.buttons}
              mode="contained"
              onPress={async () => {
                try {
                  if (totalValue >= StorePrice) {
                    IsActive ? null : setIsActive(true);
                    setStoreCount(StoreCount + 1);
                    dispatch(subFromValue(StorePrice));
                    setStorePrice(Math.round(StorePrice + StorePrice * 0.1));
                    console.log(StorePrice);
                    await AsyncStorage.setItem("StoreCount", `${StoreCount}`);
                  }
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Buy Store
            </Button>
            <Button
              style={styles.buttons}
              compact
              mode="contained"
              onPress={async () => {
                try {
                  setStoreMulti(StoreMulti + 1);
                  await AsyncStorage.setItem("StoreMulti", `${StoreMulti}`);
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Add Multiplier
            </Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  cardStyle: {
    backgroundColor: "#423F3E",
    borderRadius: 10,
  },
  buttons: {
    flex: 1,
    margin: 10,
    backgroundColor: "#3498db",
  },
  infoTextContainer: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  infoText: {
    color: "#3498db",
    alignItems: "flex-end",
    fontFamily: "Roboto_300Light_Italic",
  },
  priceText: {
    fontFamily: "Roboto_300Light_Italic",
    position: "absolute",
    left: 17,
    top: 80,
    color: "#3498db",
  },
  titleText: {
    fontFamily: "Roboto_700Bold",
    color: "#3498db",
    fontSize: 30,
    position: "absolute",
    left: 10,
    top: 10,
  },
});
