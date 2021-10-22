import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import GameScreen from "./src/screens/GameScreen";

const navigator = createStackNavigator(
  {
    Game: GameScreen,
  },
  {
    initialRouteName: "Game",
    defaultNavigationOptions: {
      headerShown: false,
    }
  }
);

export default createAppContainer(navigator);
