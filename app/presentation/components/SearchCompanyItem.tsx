import React, {useCallback, useState} from "react";
import {View, Text, Image, StyleSheet, FlatList, TouchableOpacity} from "react-native";
import { Company } from "../../domain/entities/Company";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import {AppColors} from "../theme/AppTheme";
import {PlatformItem} from "./PlatformItem";
import viewModelHome from "../views/home/ViewModel";
import viewModelFav from "../views/fav/ViewModel";
import {UseUserLocalStorage} from "../hooks/UseUserLocalStorage";
import Toast from "react-native-toast-message";
import {useFocusEffect} from "@react-navigation/native";

const SearchCompanyItem = ({ item }: { item: Company }) => {

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

    const [companyLiked, setCompanyLiked] = useState(false);

    useFocusEffect(
        useCallback(() => {
            if(user?.userId != undefined) {
                loadFavGames(user?.userId)
            }
        }, [user?.userId])
    );

    const checkIfGameFromApiIsLiked = (item: Company) => {
        return favListGames.some(game => game.name === item.name);
    }

    return (
        <View style={styles.companyCard}>
                <Image
                    source={{
                        uri: item.logo?.image_id
                            ? item.logo?.image_id
                            : "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg"
                    }}
                    style={styles.companyCover}
                />
            <View style={styles.infoContainer}>
                <View style={styles.name_des}>
                    <Text style={styles.companyName}>{item.name}</Text>
                </View>
                <View style={styles.descriptionContainer}>
                    <Text>{item.description}</Text>

                </View>
            </View>
            <View style={styles.thirdColumnContainer}>
                {/*<TouchableOpacity onPress={async () => {
                    if (!companyLiked && !checkIfGameFromApiIsLiked(item)) {
                        setCompanyLiked(true);
                        try {
                            await addGameToFav(transformGameIntoFavGameInterface(item), user?.userId ? user?.userId : 0);
                            await loadFavGames(user?.userId ? user?.userId : 0)

                        } catch (error) {
                            Toast.show({
                                "type": "error",
                                "text1": "Error while trying to save the game",
                            })
                        }
                    } else {
                        setCompanyLiked(false);
                        try {
                            await deleteGameFromFav(
                                getPositionGameList(item.name),
                                user?.userId ? user?.userId : 0
                            );
                            await loadFavGames(user?.userId ? user?.userId : 0)

                        } catch (error) {
                            Toast.show({
                                "type": "error",
                                "text1": "Error while trying to delete game",
                            })
                        }
                    }
                }}>
                    <Image style={styles.fav} source={
                        companyLiked || checkIfGameFromApiIsLiked(item)
                        ? require("../../../assets/filled-heart.png")
                        : require("../../../assets/heart.png")}/>
                </TouchableOpacity>]*/}
                <Text style={styles.companyCountry}>{item.country}</Text>
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
    companyCountry: {
        fontSize: RFPercentage(1.5),
        color: AppColors.white,
        width: 60,
        textAlign: "center",
        fontWeight: "bold",
    },

    companyCard: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        alignItems: "center",
    },
    companyCover: {
        padding:10,
        width: wp("25%"),
        height: hp("15%"),
        borderRadius: 5,
        marginRight: 10,
    },
    name_des: {
        flex: 2,
        flexDirection:"row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent:"space-between",
        marginBottom: hp("5%"),
    },

    companyName: {
        flex:3,
        fontSize: 15,
        height: 50,
        paddingEnd: 5,
        fontFamily: "zen_kaku_regular",
        color:AppColors.white,
    },
    descriptionContainer:{
        flex:2,
        width: wp("53%"),
        flexDirection:"row",
        alignSelf: "center",
        alignItems: "center",
    },
});

    export default SearchCompanyItem;
