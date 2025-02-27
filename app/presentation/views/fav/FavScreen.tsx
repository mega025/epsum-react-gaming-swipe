import {ActivityIndicator, FlatList, Image, ImageBackground, Text, View} from "react-native";
import stylesHome from "../home/StyleHome";
import {XButton} from "../../components/XButton";
import {LikeButton} from "../../components/LikeButton";
import styleFav from "./StyleFav";
import viewModel from "./ViewModel";
import React, {useEffect} from "react";
import {FavGameItem} from "../../components/FavGameItem";
import styleHome from "../home/StyleHome";
import styleSearch from "../search/StyleSearch";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


export function FavScreen(){

    const {favListGames, setFavListGames, loadFavGames, showLoading} = viewModel.FavScreenViewModel();

    useEffect(() => {
        loadFavGames();
    }, []);

    return (
        <View style={styleFav.container}>
            <ImageBackground source={require("../../../../assets/background.png")}
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