import {NavigationContainer} from "@react-navigation/native";
import {LoginScreen} from "./app/presentation/views/Login";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator<RootStackParamsList>();

export type RootStackParamsList = {
  LoginScreen: undefined;

}


export default function App() {

  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
          </Stack.Navigator>
      </NavigationContainer>
  );

}


