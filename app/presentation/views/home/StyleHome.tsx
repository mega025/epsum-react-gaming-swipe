import { StyleSheet, Dimensions } from "react-native";
import { AppColors } from "../../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const stylesHome = StyleSheet.create({
    iconButton: {
        backgroundColor: AppColors.colorButton,
    },
    logo: {
        width: wp("15%"),
        height: wp("15%"),
        bottom: hp("4%"),
        position: "absolute",
        alignSelf: "center",
    },
});

export default stylesHome;
