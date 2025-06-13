import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Home} from "../views/home/Home";
import {Image, StyleSheet} from "react-native";
import TabViewFavScreen from "../views/fav/TabViewFavScreen";
import {Search} from "../views/search/Search";
import {Account} from "../views/account/Account";
import {AppColors} from "../theme/AppTheme";
import {useEffect} from "react";
import {UseUserLocalStorage} from "../hooks/UseUserLocalStorage";
import {useNavigation} from "@react-navigation/native";
import {PropsStackNavigation} from "../interfaces/StackNav";
import {setupValidTokenInterceptor} from "../../data/sources/remote/api/ApiDelivery";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {removeUserUseCase} from "../../domain/usesCases/userLocal/removeUser"; // Para usar % de la pantalla

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
            tabBarActiveBackgroundColor: AppColors.darkPink,
            tabBarStyle: {height: 55, backgroundColor: AppColors.darkPurple},
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
                        style={stylesTabBarItems.item}/>
                )}}
                        component={TabViewFavScreen} />
            <Tab.Screen name="Search" options={{title:"Search",
                tabBarIcon: ({color})=>(
                    <Image
                        source={require("../../../assets/search.png")}
                        style={stylesTabBarItems.item}/>
                )}}
                        component={Search} />
            <Tab.Screen name="Account" options={{title:"Account",
                tabBarIcon: ({color})=>(
                    <Image
                        source={require("../../../assets/account.png")}
                        style={stylesTabBarItems.item}/>
                )}}
                        component={Account} />
        </Tab.Navigator>
    )
}

const stylesTabBarItems = StyleSheet.create({
    item: {
        width:25,
        height:25,
        paddingHorizontal: wp("2%"),
        marginTop:15,
        tintColor:"white"
    }
})