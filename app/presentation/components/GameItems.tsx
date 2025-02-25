import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Game } from "../../domain/entities/Game";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import {AppColors} from "../theme/AppTheme";


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
            <View style={styles.name_rating}>
                <Text style={styles.title}>{item.name}</Text>
                {item.rating ? (
                    <Text style={styles.rating}>⭐ {item.rating.toFixed(1)}</Text>
                ) : (
                    <Text style={styles.rating}>N/A</Text>
                )}
            </View>
            <View style={styles.genre_year}>
                {item.genres && item.genres.length > 0 && (
                    <Text style={styles.genre}>
                        {item.genres.map(g => g.name).join(", ")}
                    </Text>
                )}

                {item.releaseDate && item.releaseDate.length > 0 && (
                    <Text style={styles.year}>
                        {item.releaseDate[0].y}
                    </Text>
                )}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
        flexDirection:"row",
        alignItems: "center",
        justifyContent:"space-between",
        marginBottom: hp("10%"),
    },
    title: {
        flex:1,
        fontSize: RFPercentage(2),
        fontWeight: "bold",
        flexWrap: "wrap",
    },
    genre: {
        fontSize: RFPercentage(1.5),
        color: AppColors.white,
    },
    rating: {
        flex:1,
        fontSize: RFPercentage(1.5),
        color: "#ff9900",
    },
    genre_year:{
        flexDirection:"row",
        alignItems: "center",
        justifyContent:"space-between",
        marginTop: hp("10%"),
    },
    year: {
        flex:1,
        fontSize: RFPercentage(1.5),
        color: AppColors.white,
    },
});

    export default GameItems;
