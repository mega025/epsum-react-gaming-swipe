import {StyleSheet} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {AppColors} from "../../theme/AppTheme";
import {Colors} from "react-native/Libraries/NewAppScreen";


const styleGameDetails = StyleSheet.create({
    image: {
        width: wp("40%"),
        height: hp("25%"),
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
        backgroundColor: AppColors.darkPurple,

    },

    goBackIconTouchable: {
        start:wp("3%"),
        bottom: hp("32%"),
        position: "absolute",
    },

    goBackIcon: {
        width: wp("7%"),
        height: hp("3%"),
        resizeMode:"contain",
        tintColor: "white"
    },

    name: {
        fontSize: wp("5.7%"),
        color: AppColors.white,
        height: hp("22%"),
        width: "85%",
        fontFamily: "zen_kaku_regular"
    },

    rating: {
        fontFamily: "zen_kaku_medium",
        color: AppColors.white,
        height: 40,
        fontSize: wp("4.2%"),
    },

    infoTitles: {
        fontFamily: "zen_kaku_bold",
        lineHeight: hp("5%"),
        textTransform: "uppercase",
        color: AppColors.white,
        fontSize: wp("4.3%"),
        marginTop: hp("2.5%"),
        marginBottom: hp("1.5%"),

    },

    summary: {
        fontFamily: "zen_kaku_regular",
        color: AppColors.white,
        fontSize: wp("4%"),
        lineHeight: 27,
        textAlign: "justify",
    },

    involvedCompany: {
        fontFamily: "zen_kaku_regular",
        color: AppColors.white,
        lineHeight: 50,
        borderBottomWidth: 2,
        borderBottomColor: AppColors.orangeColorTransparent,
        fontSize: wp("4.2%"),
    },

    fav:{
        width:wp("6.4%"),
        height:hp("3.3%"),
        tintColor:"#4dc51f",
        marginTop: hp("2.9%"),
        paddingHorizontal: hp("1.8%"),
    },
})

const styleSimilarGame = StyleSheet.create({
    card: {
        width: wp("37%"),
        height: hp("31%"),
        marginRight: wp("2.5%"),
        marginBottom: hp("5%"),
        marginTop: hp("2%"),
        borderRadius: 10,
        backgroundColor: AppColors.darkPurple,
        elevation: 10,
    },

    image: {
        width: wp("37%"),
        height: hp("20%"),
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
    },

    name: {
        fontSize: wp("3.3%"),
        padding: wp("2.5%"),
        textAlign: "center",
        fontFamily: "zen_kaku_regular",
        color: AppColors.white,
        verticalAlign: "middle",
        lineHeight: 20,
    },
})

export { styleGameDetails, styleSimilarGame };


