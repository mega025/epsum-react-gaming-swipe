import {NavigationContainer} from "@react-navigation/native";
import {LoginScreen} from "./app/presentation/views/Login";
import {createStackNavigator} from "@react-navigation/stack";
import TabViewExample from "./app/presentation/views/TabViewLoginRegister";

const Stack = createStackNavigator<RootStackParamsList>();

export type RootStackParamsList = {
  LoginScreen: undefined;
  TabViewExample: undefined;

}


export default function App() {

  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="TabViewExample" component={TabViewExample}/>
          </Stack.Navigator>
      </NavigationContainer>
  );

}


