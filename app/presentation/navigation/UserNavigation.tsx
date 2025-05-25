import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Home} from "../views/home/Home";
import {Image} from "react-native";
import TabViewFavScreen from "../views/fav/TabViewFavScreen";
import {Search} from "../views/search/Search";
import {Account} from "../views/account/Account";
import {AppColors} from "../theme/AppTheme";
import {useEffect} from "react";
import {UseUserLocalStorage} from "../hooks/UseUserLocalStorage";
import {useNavigation} from "@react-navigation/native";
import {PropsStackNavigation} from "../interfaces/StackNav";
import {removeUserUseCase} from "../../domain/usesCases/userLocal/removeUser";
import {setupValidTokenInterceptor} from "../../data/sources/remote/api/ApiDelivery";

const Tab = createBottomTabNavigator();

export function UserNavigation ({navigation = useNavigation(), route}: PropsStackNavigation) {
    const {user} = UseUserLocalStorage()

    useEffect(() => {
        setupValidTokenInterceptor(navigation)
    }, []);
    return (
        <Tab.Navigator  screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown:false,
            tabBarShowLabel: false,
            tabBarStyle: {height: 55},
            tabBarItemStyle: {justifyContent: "center", alignItems: "center", backgroundColor: AppColors.darkPurple},
        }}
        >
            <Tab.Screen name="Home" options={{title:"Home",
                tabBarIcon: ({color})=>(
                    <Image
                        source={require("../../../assets/brujula2.png")}
                        style={{width:25,height:25,marginTop:15, tintColor:"white"}}/>
                )}}
                        component={Home} />
            <Tab.Screen name="Fav" options={{title:"Fav",
                tabBarIcon: ({color})=>(
                    <Image
                        source={require("../../../assets/heart.png")}
                        style={{width:25,height:25,marginTop:15,tintColor:"white"}}/>
                )}}
                        component={TabViewFavScreen} />
            <Tab.Screen name="Search" options={{title:"Search",
                tabBarIcon: ({color})=>(
                    <Image
                        source={require("../../../assets/search.png")}
                        style={{width:25,height:25,marginTop:15,tintColor:"white"}}/>
                )}}
                        component={Search} />
            <Tab.Screen name="Account" options={{title:"Account",
                tabBarIcon: ({color})=>(
                    <Image
                        source={require("../../../assets/account.png")}
                        style={{width:25,height:25,marginTop:15,tintColor:"white"}}/>
                )}}
                        component={Account} />
        </Tab.Navigator>
    )
}