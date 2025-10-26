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
import {UseUserLocalStorage} from "./app/presentation/hooks/UseUserLocalStorage";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {loadTokens} from "./app/data/sources/local/secure/TokenStorage";
import * as SplashScreen from "expo-splash-screen";
import {Asset} from "expo-asset";

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

    const {
        user,
        getUserSession
    } = UseUserLocalStorage()

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    SplashScreen.preventAutoHideAsync()

    useEffect(() => {
        const loadAssets = async () => {
            try {
                const assets = [
                    require("./assets/fonts/zen_kaku_gothic_antique_black.ttf"),
                    require("./assets/fonts/zen_kaku_gothic_antique_light.ttf"),
                    require("./assets/fonts/zen_kaku_gothic_antique_bold.ttf"),
                    require("./assets/fonts/zen_kaku_gothic_antique_medium.ttf"),
                    require("./assets/fonts/zen_kaku_gothic_antique_regular.ttf"),
                ]
                await Promise.all(assets.map(asset => Asset.fromModule(asset).downloadAsync()));
                await SplashScreen.hideAsync();
            } catch (e) {
                console.log(e)
            }
        }
        loadAssets();
    }, []);

    if (user === undefined) return null;
    return (
      <NavigationContainer>
          <Stack.Navigator
              initialRouteName={user && user.slug ? "UserNavigation" : "TabViewLoginRegister"}
              screenOptions={{
              headerShown: false,
              gestureEnabled: true,
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}>
              <Stack.Screen name="TabViewLoginRegister" component={TabViewLoginRegister}/>
              <Stack.Screen name="UserNavigation" component={UserNavigation}/>
              <Stack.Screen name="GameDetails" component={GameDetails}/>
              <Stack.Screen name="CompanyDetails" component={CompanyDetails}/>
              <Stack.Screen name="UserDetails" component={UserDetails}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}


