import {
    ActivityIndicator,
    FlatList,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import stylesHome from "../home/StyleHome";
import styleFav from "./StyleFav";
import viewModel from "./ViewModel";
import React, {useCallback, useEffect, useMemo} from "react";
import styleHome from "../home/StyleHome";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {UseUserLocalStorage} from "../../hooks/UseUserLocalStorage";
import {FavGame} from "../../../domain/entities/FavGame";
import {AppColors} from "../../theme/AppTheme";
import {useFocusEffect} from "@react-navigation/native";


export function FavScreen(){
    const {favListGames, loadFavGames, showLoading, getPositionGameList, deleteGameFromFav} = viewModel.favScreenViewModel();
    const {user} = UseUserLocalStorage()
    const favGameRenderItem = useCallback(({item}: {item: FavGame}) =>
        <View style={stylesFavGameItem.card}>
            <View style={stylesFavGameItem.container}>
                <Image source={{uri : item.imageUrl}} style={stylesFavGameItem.image}/>
                <Text style={{...stylesHome.gameNameText, width: 170}}>{item.name}</Text>
                <TouchableOpacity style={stylesFavGameItem.deleteIcon}
                                  onPress={() => deleteGameFromFav(getPositionGameList(item), user?.userId ? user.userId : 0)}>
                    <Image source={require("../../../../assets/borrar.png")} style={stylesFavGameItem.deleteIcon} />
                </TouchableOpacity>
            </View>
        </View>
        , [] )

    useFocusEffect(
        useCallback(() => {
            console.log('Fav Screen focused');
            if(user?.userId != undefined) {
                console.log(user?.userId)
                loadFavGames(user?.userId)
            }
        }, [user?.userId])
    );

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
                <View style={{marginTop: hp("1%"), marginBottom: hp("17%"), borderTopColor: "#ffffff", borderTopWidth: 1, paddingTop: 10}}>
                    <FlatList data={favListGames}
                              removeClippedSubviews={true}
                              contentContainerStyle={{flexDirection: "column-reverse"}}
                              renderItem={favGameRenderItem}
                              extraData={favListGames}
                              ListHeaderComponent={<Text style={{...styleFav.listHeader, display: showLoading ? "none" : "flex"}}>Add more games!</Text>}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

const stylesFavGameItem = StyleSheet.create({
    card: {
        alignSelf: "center",
        justifyContent: "center",
        width: "90%",
        height: 190,
        backgroundColor: "#cecece",
        borderRadius: 20,
        elevation: 5,
        marginBottom: 20,
    },

    container: {
        position: "absolute",
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
    },

    image : {
        width: 130,
        height: 190,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },

    deleteIcon: {
        width: 20,
        height: 20,
    }
})