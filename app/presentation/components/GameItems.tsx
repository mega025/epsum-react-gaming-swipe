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
            {item.cover && (
                <Image source={{
                    uri: item.cover
                        ? transfromCoverUrl(item.cover.url)
                        : "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg"
                }} style={styles.cover} />
            )}
            <View style={styles.infoContainer}>
                <View style={styles.containerFab}>
                    <Image source={require("../../../assets/heart.png")}></Image>
                </View>
            <View style={styles.name_rating}>
                <Text style={styles.title}>{item.name}</Text>
                {item.rating ? (
                    <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
                ) : (
                    <Text style={styles.rating}>N/A</Text>
                )}
            </View>
            <View style={styles.platform_year}>
                <FlatList data={item.platforms}
                          renderItem={PlatformItem}
                          horizontal={true}
                          scrollEnabled={true}
                          nestedScrollEnabled={true}
                            style={styles.genre}/>
                <Text style={styles.year}>{item.release_dates?.[0]?.y ?? "N/A"}</Text>
            </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    infoContainer: {
        flex: 1,
        flexDirection: "column",
    },
    containerFab:{
        flex:1,
        alignItems:'center',
        alignSelf:"center",
        alignContent:"center",
        verticalAlign:"middle",
    },
    fab:{
        width: wp("12%"),
        height: hp("6%"),
    },
    item: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        alignItems: "center",
    },
    cover: {
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
        marginBottom: hp("10%"),
    },
    title: {
        flex:3,
        fontSize: RFPercentage(2),
        fontWeight: "bold",
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
        color: AppColors.white,
        fontFamily:"zen_kaku_bold",
    },
    platform_year:{
        flex:2,
        flexDirection:"row",
        alignSelf: "center",
        alignItems: "center",
    },
    year: {
        flex:1,
        fontSize: RFPercentage(1.5),
        color: AppColors.white,
        marginLeft: hp("8%"),

    },
});

    export default GameItems;
