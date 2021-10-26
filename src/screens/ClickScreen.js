import React from "react";
import store from "../redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";
import TotalValue from "../components/TotalValue";
import Footer from "../components/Footer";


export const ClickScreen = ( {navigation }) => {
  return (
    <ReduxProvider store={store}>
      <SafeAreaView style={styles.background}>
        <StatusBar
          StatusBarStyle={"auto"}
          hidden={false}
          style={styles.background}
        />
        <Text>Clicker Screen!</Text>
        <Footer />
      </SafeAreaView>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#362222"
  }
});
