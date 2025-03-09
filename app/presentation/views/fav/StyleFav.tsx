import { StyleSheet } from "react-native";
import { AppColors } from "../../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const styleFav = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },

    header: {
        marginTop: hp("9%"),
    },
    title: {
        height: 70,
        fontSize: wp("7.5%"),
        alignSelf: "center",
        marginBottom: 20,
        verticalAlign: "bottom",
        color: AppColors.white,
        fontFamily: "zen_kaku_light",
    },

    flatListFavGames: {
        alignSelf: "center",
        color: AppColors.white,
        fontSize: 16,
        height: hp("3%"),
        marginBottom: hp("3%"),
        fontFamily: "zen_kaku_regular",
    }
});

export default styleFav;
