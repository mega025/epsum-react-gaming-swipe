import {NavigationContainer} from "@react-navigation/native";
import {CardStyleInterpolators, createStackNavigator} from "@react-navigation/stack";
import {useFonts} from "expo-font";
import TabViewLoginRegister from "./app/presentation/views/auth/TabViewLoginRegister";
import {UserNavigation} from "./app/presentation/navigation/UserNavigation";
import {Account} from "./app/presentation/views/account/Account";
import {GameDetails} from "./app/presentation/views/details/GameDetails";
import {Game} from "./app/domain/entities/Game";
import {CompanyDetails} from "./app/presentation/views/details/CompanyDetails";
import {UserDetails} from "./app/presentation/views/details/UserDetails";
import {GetSearchUserInterface} from "./app/domain/entities/User";



export type RootStackParamsList = {
    UserNavigation: undefined;
    TabViewLoginRegister: undefined;
    GameDetails: {gameId: number, likeButton: boolean};
    CompanyDetails: {companyId: number}
    UserDetails: {userSearch: GetSearchUserInterface};
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
          <Stack.Navigator screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}>
              <Stack.Screen name="TabViewLoginRegister" component={TabViewLoginRegister}/>
              <Stack.Screen name="UserNavigation" component={UserNavigation} ></Stack.Screen>
              <Stack.Screen name="GameDetails" component={GameDetails} ></Stack.Screen>
              <Stack.Screen name="CompanyDetails" component={CompanyDetails} ></Stack.Screen>
              <Stack.Screen name="UserDetails" component={UserDetails} ></Stack.Screen>
          </Stack.Navigator>
      </NavigationContainer>
  );

}


