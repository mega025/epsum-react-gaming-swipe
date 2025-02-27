import {ActivityIndicator, FlatList, Image, ImageBackground, Text, View} from "react-native";
import stylesHome from "../home/StyleHome";
import styleFav from "./StyleFav";
import viewModel from "./ViewModel";
import React, {useEffect} from "react";
import {FavGameItem} from "../../components/FavGameItem";
import styleHome from "../home/StyleHome";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";


export function FavScreen(){

    const {favListGames, setFavListGames, loadFavGames, showLoading} = viewModel.favScreenViewModel();
    const {user, getUserSession} = UseUserLocalStorage()

    getUserSession();

    useEffect(() => {
        console.log(user?.userId)
        if(user?.userId != undefined)
            loadFavGames(user?.userId);
    }, [user?.userId]);

    return (
        <View style={styleFav.container}>
            <ImageBackground source={require("../../../../assets/definitiveBackground.jpeg")}
                             style={{width: '100%', height: '100%'}}>
                <View style={styleFav.header}>
                    <Text style={styleFav.title}>
                        Favourite games
                    </Text>
                </View>
                <View style={stylesHome.loadingIconContainer}>
                    <ActivityIndicator style={styleHome.loading} size="large" color="#ffffff" animating={showLoading}/>
                </View>
                <View style={{marginTop: hp("5%"), marginBottom: hp("17%")}}>
                    <FlatList data={favListGames}
                              renderItem={FavGameItem}
                    />
                </View>


            </ImageBackground>
        </View>
    );
}