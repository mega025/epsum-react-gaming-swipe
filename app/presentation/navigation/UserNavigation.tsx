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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const Tab = createBottomTabNavigator();

export function UserNavigation ({navigation = useNavigation()}: PropsStackNavigation) {
    const {user} = UseUserLocalStorage()


    return (
        <Tab.Navigator  screenOptions={{
            tabBarHideOnKeyboard: true,
            headerShown:false,
            tabBarShowLabel: false,
            tabBarActiveBackgroundColor: AppColors.backgroundColor,
            tabBarStyle: {height: hp("8%"), backgroundColor: AppColors.buttonBackground},
        }}
        >
            <Tab.Screen name="Home" options={{title:"Home",
                tabBarIcon: ({color})=>(
                    <Image
                        source={require("../../../assets/brujula2.png")}
                        style={stylesTabBarItems.item}/>
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
        width:wp("7.5%"),
        paddingHorizontal: wp("2%"),
        resizeMode:"contain",
        marginTop:15,
        tintColor:"white"
    }
})