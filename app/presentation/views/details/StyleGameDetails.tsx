import {StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {AppColors} from "../../theme/AppTheme";


const styleGameDetails = StyleSheet.create({
    image: {
        width: wp("40%"),
        height: hp("25.9%"),
        borderRadius: wp("2.4%"),
    },

    header: {
        width: wp("100%"),
        flexDirection: "row",
        paddingTop: hp("13%"),
        paddingBottom: hp("2%"),
        paddingHorizontal: hp("2%"),
        elevation: 30,
        gap: 20,
        backgroundColor: AppColors.buttonBackground,

    },

    goBackIconTouchable: {
        start:wp("3%"),
        bottom: hp("31.5%"),
        position: "absolute",
    },

    goBackIcon: {
        width: wp("7%"),
        height: hp("3%"),
        resizeMode:"contain",
        tintColor: "white"
    },

    name: {
        fontSize: wp("4.5%"),
        color: AppColors.white,
        height: hp("22%"),
        width: "85%",
        fontFamily: "zen_kaku_regular"
    },

    rating: {
        color: AppColors.white,
        backgroundColor: AppColors.secondaryColor,
        padding: wp("2%"),
        width: wp("15%"),
        textAlign:"center",
        borderRadius: 14,
        lineHeight: hp("2%"),
        fontSize: wp("3.2%"),
    },

    infoTitles: {
        fontFamily: "zen_kaku_bold",
        lineHeight: hp("5%"),
        textTransform: "uppercase",
        color: AppColors.white,
        fontSize: wp("3.7%"),
        marginTop: hp("2.5%"),
        marginBottom: hp("1.5%"),

    },

    summary: {
        fontFamily: "zen_kaku_regular",
        color: AppColors.white,
        fontSize: wp("3.5%"),
        lineHeight: 27,
        textAlign: "justify",
    },

    involvedCompany: {
        fontFamily: "zen_kaku_regular",
        color: AppColors.white,
        lineHeight: 50,
        borderBottomWidth: 2,
        borderBottomColor: AppColors.neonPurpleTransparent,
        fontSize: wp("3.5%"),
    },

    fav:{
        width:wp("6.4%"),
        height:hp("3.3%"),
        tintColor:"#4dc51f",
        resizeMode:"contain",
        marginTop: hp("2.9%"),
    },
})

const styleSimilarGame = StyleSheet.create({
    card: {
        width: wp("37%"),
        height: hp("31.6%"),
        marginRight: wp("2.5%"),
        marginBottom: hp("5%"),
        marginTop: hp("2%"),
        borderRadius: 10,
        backgroundColor: AppColors.buttonBackground,
        elevation: 10,
    },

    image: {
        width: "100%",
        height: hp("22.7%"),
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        resizeMode: "contain",
    },

    name: {
        fontSize: wp("2.9%"),
        padding: wp("2.5%"),
        flex:1,
        textAlign: "center",
        fontFamily: "zen_kaku_regular",
        color: AppColors.white,
    },
})

export { styleGameDetails, styleSimilarGame };


