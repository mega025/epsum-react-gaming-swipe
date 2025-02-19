import {NavigationContainer} from "@react-navigation/native";
import {LoginScreen} from "./app/presentation/views/auth/Login";
import {createStackNavigator} from "@react-navigation/stack";
import {Home} from "./app/presentation/views/home/Home";

const Stack = createStackNavigator<RootStackParamsList>();

export type RootStackParamsList = {
  LoginScreen: undefined;
  Home:undefined;

}


export default function App() {

  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
                {/*<Stack.Screen name="LoginScreen" component={LoginScreen}/>*/}
                <Stack.Screen name="Home" component={Home}/>
          </Stack.Navigator>
      </NavigationContainer>
  );

}


