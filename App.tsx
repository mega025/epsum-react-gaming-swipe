import {NavigationContainer} from "@react-navigation/native";
import {LoginScreen} from "./app/presentation/views/Login";
import {createStackNavigator} from "@react-navigation/stack";

export type RootStackParamsList = {
  LoginScreen: undefined;

}
const Stack = createStackNavigator<RootStackParamsList>();


export default function App() {

  return (
      <NavigationContainer>
    <Stack.Screen name="LoginScreen" component={LoginScreen}/>
      </NavigationContainer>
  );

}


