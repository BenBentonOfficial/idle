import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { ClickScreen } from "./ClickScreen";
import GameScreen from "./GameScreen";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import TotalValue from "../components/TotalValue";
import store from "../redux/store";
import { Provider as ReduxProvider } from "react-redux";

const Tab = createMaterialTopTabNavigator();

export const MainScreen = () => {
  return (
    <NavigationContainer initailRouteName="Clicker">
      <ReduxProvider store={store}>
        <Tab.Navigator style={{marginTop: 25, backgroundColor: "#362222"}}>
          <Tab.Screen name="Clicker" component={ClickScreen} />
          <Tab.Screen name="Game" component={GameScreen} />
        </Tab.Navigator>
        
      </ReduxProvider>
    </NavigationContainer>
  );
};
