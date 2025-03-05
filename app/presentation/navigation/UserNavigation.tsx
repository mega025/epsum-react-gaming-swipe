import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Home} from "../views/home/Home";
import {Image} from "react-native";
import {FavScreen} from "../views/fav/FavScreen";
import {Search} from "../views/search/Search";
import {Account} from "../views/account/Account";
import {AppColors} from "../theme/AppTheme";

const Tab = createBottomTabNavigator();

export const UserNavigation=() =>{
return (
    <Tab.Navigator  screenOptions={{
        tabBarHideOnKeyboard: false,
        headerShown:false,
        tabBarShowLabel: false,
        tabBarStyle: { height: 55 },
        tabBarItemStyle: { justifyContent: "center", alignItems: "center",backgroundColor:AppColors.colorButton },
    }}
    >
        <Tab.Screen name="Search" options={{title:"Search",
            tabBarIcon: ({color})=>(
                <Image
                    source={require("../../../assets/search.png")}
                    style={{width:25,height:25,marginTop:15,tintColor:"grey"}}/>
            )} }
                    component={Search} />
        <Tab.Screen name="Home" options={{title:"Home",
            tabBarIcon: ({color})=>(
                <Image
                    source={require("../../../assets/brujula2.png")}
                    style={{width:25,height:25,marginTop:15,tintColor:"grey"}}/>
            )} }
                    component={Home} />
        <Tab.Screen name="Fav" options={{title:"Fav",
            tabBarIcon: ({color})=>(
                <Image
                    source={require("../../../assets/heart.png")}
                    style={{width:25,height:25,marginTop:15,tintColor:"grey"}}/>
            )} }
                    component={FavScreen} />

        <Tab.Screen name="Account" options={{title:"Account",
            tabBarIcon: ({color})=>(
                <Image
                    source={require("../../../assets/account.png")}
                    style={{width:25,height:25,marginTop:15,tintColor:"grey"}}/>
            )} }
                    component={Account} />
    </Tab.Navigator>
)
}