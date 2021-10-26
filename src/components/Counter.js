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

export default function Counter({ name, storeNum, baseValue, initCost, initSpeed, setCount }) {
  const [StoreCount, setStoreCount] = useState(0);
  const [StoreMulti, setStoreMulti] = useState(1);
  const [StorePrice, setStorePrice] = useState(initCost);
  const [StoreSpeed, setStoreSpeed] = useState(initSpeed);
  const [IsActive, setIsActive] = useState(false);
  const [StoresToBuy, setStoresToBuy] = useState(1)
  
  const storeCountAchieve = [25, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 600, 700, 800, 900, 1000];

  const totalValue = useSelector((state) => state.game.value);
  const index = useSelector((state) => state.game.storesToBuyIndex);

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

  const updateValues = () => {
    switch (index) {
      case 0: setStoresToBuy(1); break;
      case 1: setStoresToBuy(10); break;
      case 2: setStoresToBuy(50); break;
      case 3: setStoresToBuy(100); break;
      default: setStoresToBuy(1); 
    }
    
    setStorePrice(Math.round(StoresToBuy * ((initCost))));
  }

  let num = 0;
  useEffect(() => {
    const interval = setInterval(() => {
      //console.log(`${name}: Index is ${index} so it should try to purchase ${StoresToBuy} for ${initCost} each for the total price of ${StorePrice}`);
      //console.log(`${name} thinks its adding: ${baseValue * StoreCount * StoreMulti}`)
      IsActive ? dispatch(addToValue(baseValue * StoreCount * StoreMulti)) : null;
      storeCountAchieve.forEach((e, index) => {
        e - 1 <= StoreCount ? setStoreMulti((index + 1) * 2) : null; 
      })
      num++;
    }, StoreSpeed);
    return () => {
      clearInterval(interval);
    };
  }, [num, StoreMulti]);

  useEffect(() => {
    const interval = setInterval(() => {
      updateValues();
    }, 100);
    return () => {
      clearInterval(interval);
    }
  }, [index, totalValue, StorePrice])

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <Card style={styles.cardStyle}>
          <Title style={styles.titleText}>{name}        {StoresToBuy}</Title>
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
          
          {IsActive ? 
            <Progress.Bar
            indeterminate={true}
            indeterminateAnimationDuration={StoreSpeed}
            color={"#3498db"}
          /> : null }
          </Card.Content>
          <Card.Actions>
            <Button
              style={styles.buttons}
              mode="contained"
              onPress={async () => {
                try {
                  if (totalValue >= StorePrice) {

                    //if the store is inactive, make it active
                    if(!IsActive) {
                      setIsActive(true);
                      setCount(storeNum);
                    }

                    //add number of stores purcahsed
                    setStoreCount(StoreCount + StoresToBuy);

                    //subtract purchase price from total
                    dispatch(subFromValue(StorePrice));

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
