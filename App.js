import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { ClickScreen } from "./src/screens/ClickScreen";
import GameScreen from "./src/screens/GameScreen";
import { MainScreen } from "./src/screens/MainScreen";

const navigator = createStackNavigator(
  {
    Game: GameScreen,
    Click: ClickScreen,
    Main: MainScreen,
  },
  {
    initialRouteName: "Main",
    defaultNavigationOptions: {
      headerShown: false,
    }
  }
);

export default createAppContainer(navigator);
