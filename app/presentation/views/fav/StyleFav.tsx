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
        color: AppColors.white,
        fontFamily: "zen_kaku_light",
    },

    listHeader: {
        alignSelf: "center",
        color: AppColors.white,
        fontSize: 16,
        height: hp("3%"),
        marginBottom: hp("2%"),
        fontFamily: "zen_kaku_regular",
    }
});

export default styleFav;
