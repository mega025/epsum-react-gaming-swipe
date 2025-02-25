import { StyleSheet } from "react-native";
import { AppColors } from "../../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const styleFab = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    logo: {
        width: wp("12%"),
        height: wp("12%"),
        top: hp("1.5%"),
    },
    appName: {
        fontSize: wp("4%"),
        top: hp("3%"),
        fontFamily: "zen_kaku_light",
        color: AppColors.white,
    },
    header: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: hp("6%"),
    },
    title: {
        fontSize: wp("7.5%"),
        alignSelf: "center",
        top: hp("6%"),
        color: AppColors.white,
        fontFamily: "zen_kaku_light",
    },
});

export default styleFab;
