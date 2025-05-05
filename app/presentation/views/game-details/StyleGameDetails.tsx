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
        elevation: 30,
        gap: 20,
        backgroundColor: AppColors.darkPurple,

    },

    goBackIcon: {
        width: wp("7%"),
        height: hp("3%"),
        tintColor: "white",
        position: "absolute",
        bottom: hp("30%"),
    },

    name: {
        fontSize: wp("6%"),
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
        fontFamily: "zen_kaku_medium",
        height: 40,
        color: AppColors.white,
        fontSize: wp("5%"),
        marginTop: hp("2.5%"),
    },

    summary: {
        fontFamily: "zen_kaku_regular",
        color: AppColors.white,
        fontSize: wp("4%"),
        textAlign: "justify",
    },

    involvedCompany: {
        fontFamily: "zen_kaku_regular",
        color: AppColors.white,
        lineHeight: 30,
        fontSize: wp("4%"),
    }
})

export default styleGameDetails;