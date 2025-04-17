import React, {useCallback, useEffect, useState} from "react";
import {View, Text, Image, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import { Game } from "../../domain/entities/Game";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import {AppColors} from "../theme/AppTheme";
import styleHome from "../views/home/StyleHome";
import {GenreItem} from "./GenreItem";
import {PlatformItem} from "./PlatformItem";
import viewModelHome from "../views/home/ViewModel";
import viewModelFav from "../views/fav/ViewModel";
import {UseUserLocalStorage} from "../hooks/UseUserLocalStorage";
import Toast from "react-native-toast-message";
import {useFocusEffect} from "@react-navigation/native";

const SearchGameItem = ({ item }: { item: Game }) => {

    const {user} = UseUserLocalStorage()

    const {
        addGameToFav,
        transformGameIntoFavGameInterface,
        transformCoverUrl
    } = viewModelHome.homeViewModel()

    const {
        deleteGameFromFav,
        getPositionGameList,
        loadFavGames,
        favListGames,
    } = viewModelFav.favScreenViewModel()

    const [gameLiked, setGameLiked] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if(user?.slug != undefined) {
                loadFavGames(user?.slug)
            }
        }, [user?.slug])
    );

    const checkIfGameFromApiIsLiked = (item: Game) => {
        return favListGames.some(game => game.name === item.name);
    }

    return (
        <View style={styles.gameCard}>
                <Image
                    source={{
                        uri: item.cover
                            ? transformCoverUrl(item.cover.url)
                            : "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg"
                    }}
                    style={styles.gameCover}
                />
            <View style={styles.infoContainer}>
                <View style={styles.name_rating}>
                    <Text style={styles.gameName}>{item.name}</Text>
                </View>
                <View style={styles.plaformsFlatlistContainer}>
                    <FlatList data={item.platforms}
                              renderItem={PlatformItem}
                              horizontal={true}
                              fadingEdgeLength={80}
                              showsHorizontalScrollIndicator={false}
                              scrollEnabled={true}
                              nestedScrollEnabled={true}
                    />
                </View>
            </View>
            <View style={styles.thirdColumnContainer}>
                {item.rating ? (
                    <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
                ) : (
                    <Text style={styles.rating}>N/A</Text>
                )}
                <TouchableOpacity onPress={async () => {
                    if (!gameLiked && !checkIfGameFromApiIsLiked(item)) {
                        setGameLiked(true);
                        try {
                            await addGameToFav(transformGameIntoFavGameInterface(item), user?.slug ? user?.slug : "");
                            await loadFavGames(user?.slug ? user?.slug : "")

                        } catch (error) {
                            Toast.show({
                                "type": "error",
                                "text1": "Error while trying to save the game",
                            })
                        }
                    } else {
                        setGameLiked(false);
                        try {
                            await deleteGameFromFav(
                                getPositionGameList(item.name),
                                user?.slug ? user?.slug : ""
                            );
                            await loadFavGames(user?.slug ? user?.slug : "")

                        } catch (error) {
                            Toast.show({
                                "type": "error",
                                "text1": "Error while trying to delete game",
                            })
                        }
                    }
                }}>
                    <Image style={styles.fav} source={
                        gameLiked || checkIfGameFromApiIsLiked(item)
                        ? require("../../../assets/filled-heart.png")
                        : require("../../../assets/heart.png")}/>
                </TouchableOpacity>
                <Text style={styles.gameReleaseYear}>{item.release_dates?.[0]?.y ?? "N/A"}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        flexDirection: "column",
    },
    thirdColumnContainer:{
        gap: 28
    },
    fav:{
        width:wp("6%"),
        height:hp("3%"),
        tintColor:"#4dc51f",
        alignSelf: "center",
        padding:hp("1.5%"),
    },
    rating: {
        height: 30,
        fontSize: RFPercentage(1.7),
        width: 60,
        textAlign: "center",
        color: AppColors.white,
        fontFamily:"zen_kaku_bold",

    },
    gameReleaseYear: {
        fontSize: RFPercentage(1.5),
        color: AppColors.white,
        width: 60,
        textAlign: "center",
        fontWeight: "bold",
    },

    gameCard: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        alignItems: "center",
    },
    gameCover: {
        padding:10,
        width: wp("25%"),
        height: hp("15%"),
        borderRadius: 5,
        marginRight: 10,
    },
    name_rating: {
        flex: 2,
        flexDirection:"row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent:"space-between",
        marginBottom: hp("5%"),
    },

    gameName: {
        flex:3,
        fontSize: 15,
        height: 50,
        paddingEnd: 5,
        fontFamily: "zen_kaku_regular",
        color:AppColors.white,
    },
    plaformsFlatlistContainer:{
        flex:2,
        width: wp("53%"),
        flexDirection:"row",
        alignSelf: "center",
        alignItems: "center",
    },
});

    export default SearchGameItem;
