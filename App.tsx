import Animated from 'react-native-reanimated';

import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import TabViewExample from "./app/presentation/views/auth/TabViewLoginRegister";
import {Home} from "./app/presentation/views/home/Home";
import {LoginScreen} from "./app/presentation/views/auth/Login";
import {useFonts} from "expo-font";
import TabViewLoginRegister from "./app/presentation/views/auth/TabViewLoginRegister";
import {UserNavigation} from "./app/presentation/navigation/UserNavigation";
import {Account} from "./app/presentation/views/account/Account";


export type RootStackParamsList = {
    UserNavigation: undefined;
    TabViewLoginRegister: undefined;
    Home: undefined;
    Account: undefined;

}

const Stack = createStackNavigator<RootStackParamsList>();

export default function App() {

    const [fontsLoaded] = useFonts({
        "zen_kaku_light": require("./assets/fonts/zen_kaku_gothic_antique_light.ttf"),
        "zen_kaku_medium": require("./assets/fonts/zen_kaku_gothic_antique_medium.ttf"),
        "zen_kaku_regular": require("./assets/fonts/zen_kaku_gothic_antique_regular.ttf"),
        "zen_kaku_bold": require("./assets/fonts/zen_kaku_gothic_antique_bold.ttf"),
        "zen_kaku_black": require("./assets/fonts/zen_kaku_gothic_antique_black.ttf"),
    });


    return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
              {/* <Stack.Screen name="TabViewLoginRegister" component={TabViewLoginRegister}/> */}
              <Stack.Screen name="UserNavigation" component={UserNavigation} ></Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>
  );

}


