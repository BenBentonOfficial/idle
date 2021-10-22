import React from "react";
import store from "../redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Counter from "../components/Counter";
import TotalValue from "../components/TotalValue";
import Footer from "../components/Footer";

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};


const GameScreen = () => {
  
  return (
    <ReduxProvider store={store}>
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.background}>
          <StatusBar
            StatusBarStyle={"auto"}
            hidden={false}
            style={styles.background}
            />
          <TotalValue />
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View>
              <Counter name="Top" baseValue={1} initCost={10} initSpeed={2000}/>
              <Counter name="Mid" baseValue={5} initCost={1000} initSpeed={2000}/>
              <Counter name="Mid2" baseValue={10} initCost={10000} initSpeed={2000}/>
              <Counter name="Bot" baseValue={50} initCost={100000} initSpeed={2000}/>
              <Counter name="Bot2" baseValue={100} initCost={1000000} initSpeed={2000}/>
              <Footer />
            </View>
          </ScrollView>
          </SafeAreaView>
      </PaperProvider>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#362222"
  }
});

export default GameScreen;
