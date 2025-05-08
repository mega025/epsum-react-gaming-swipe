import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Company } from "../../domain/entities/Company";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { AppColors } from "../theme/AppTheme";

const SearchCompanyItem = ({ item }: { item: Company }) => {
    return (
        <View style={styles.companyCard}>
            <Image
                source={{
                    uri: item.logo?.url
                        ? item.logo.url
                        : "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg",
                }}
                style={styles.companyCover}  resizeMode="contain"
            />

            <View style={styles.infoContainer}>
                <View style={styles.name}>
                <Text style={styles.companyName}>{item.name}</Text>
                 </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
    infoContainer: {
        marginLeft:10,
        flexDirection: "column",
    },
    name: {

        marginBottom: hp("2%"),
    },
    companyName: {
        fontSize: 15,
        height: 50,
        fontFamily: "zen_kaku_regular",
        color:AppColors.white,
    },
    description:{
        width: wp("60%"),
        fontFamily: "zen_kaku_regular",
        color:AppColors.white,
    },

});

export default SearchCompanyItem;
