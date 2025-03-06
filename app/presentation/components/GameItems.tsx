import React from "react";
import {View, Text, Image, StyleSheet, FlatList} from "react-native";
import { Game } from "../../domain/entities/Game";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import {AppColors} from "../theme/AppTheme";
import styleHome from "../views/home/StyleHome";
import {GenreItem} from "./GenreItem";
import {PlatformItem} from "./PlatformItem";


const transfromCoverUrl = (url:string) => {
    const cutUrlFirstPart = url.substring(0, 38);
    const cutUrlSecondPart = url.substring(url.lastIndexOf("/") + 1);
    return "https:"+cutUrlFirstPart+"cover_big/"+cutUrlSecondPart;
}

const GameItems = ({ item }: { item: Game }) => {
    return (
        <View style={styles.item}>
                <Image
                    source={{
                        uri: item.cover
                            ? transfromCoverUrl(item.cover.url)
                            : "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg"
                    }}
                    style={styles.cover}
                />
            <View style={styles.infoContainer}>

            <View style={styles.name_rating}>
                <Text style={styles.title}>{item.name}</Text>
            </View>
            <View style={styles.plaformsFlatlistContainer}>
                <FlatList data={item.platforms}
                          renderItem={PlatformItem}
                          horizontal={true}
                          scrollEnabled={true}
                          nestedScrollEnabled={true}
                            style={styles.genre}/>
            </View>
            </View>
            <View style={styles.containerFav}>
                {item.rating ? (
                    <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
                ) : (
                    <Text style={styles.rating}>N/A</Text>
                )}
                <Image source={require("../../../assets/heart.png")} style={styles.fav}></Image>
                <Text style={styles.year}>{item.release_dates?.[0]?.y ?? "N/A"}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        flexDirection: "column",
    },
    containerFav:{
        alignItems:'center',
    },
    fav:{
        width:wp("6%"),
        height:hp("3%"),
        tintColor:"#4dc51f",
        padding:hp("1.5%"),
        marginTop:hp("2%"),
        marginBottom:hp("2%")
    },
    item: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        alignItems: "center",
    },
    cover: {
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
    title: {
        flex:3,
        fontSize: 15,
        height: 50,
        paddingEnd: 5,
        fontFamily: "zen_kaku_regular",
        color:AppColors.white,

    },
    genre: {
        flex:1,
        fontSize: RFPercentage(1.5),
        color: AppColors.white,
    },
    rating: {
        height: 30,
        flex:1,
        fontSize: RFPercentage(1.7),
        paddingEnd: 6,
        color: AppColors.white,
        fontFamily:"zen_kaku_bold",

    },
    plaformsFlatlistContainer:{
        flex:2,
        width: 210,
        marginEnd: 7,
        flexDirection:"row",
        alignSelf: "center",
        alignItems: "center",
    },
    year: {
        flex:1,
        fontSize: RFPercentage(1.5),
        color: AppColors.white,
        marginTop: 14,
        fontWeight: "bold",
    },
});

    export default GameItems;
