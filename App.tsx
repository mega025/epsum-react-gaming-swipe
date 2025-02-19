import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import TabViewExample from "./app/presentation/views/auth/TabViewLoginRegister";
import {Home} from "./app/presentation/views/home/Home";
import {LoginScreen} from "./app/presentation/views/auth/Login";

const Stack = createStackNavigator<RootStackParamsList>();

export type RootStackParamsList = {
  LoginScreen: undefined;
  TabViewExample: undefined;
  Home: undefined;

}


export default function App() {

  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="TabViewExample" component={TabViewExample}/>
              <Stack.Screen name="Home" component={Home}/>
          </Stack.Navigator>
      </NavigationContainer>
  );

}


