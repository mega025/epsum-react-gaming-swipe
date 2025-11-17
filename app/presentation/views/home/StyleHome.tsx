import { StyleSheet } from "react-native";
import { AppColors } from "../../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import {shadow} from "react-native-paper";

const stylesHome = StyleSheet.create({
    iconButton: {
        backgroundColor: AppColors.buttonBackground,
    },
    logo: {
        width: wp("13%"),
        height: wp("12%"),
        alignSelf: "center",
    },
    wrapper: {
        flex: 1,
        marginBottom: hp("9%"),
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: hp("3%"),
        zIndex: 99,
        justifyContent: 'center',
    },
    cardStyle: {
        width: wp("83%"),
        height: hp("68%"),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: AppColors.buttonBackground,
        borderRadius: 15,
    },
    loadingIconContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center",
        opacity: 1,
    },
    loading: {
        width: wp("10%"),
        height: hp("2%"),
        alignSelf: "center",
        justifyContent: "center",
    },
    image: {
        width: "100%",
        height: hp("51.05%"),
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
    },
    overlayLabelContainer: {
        width: wp("83%"),
        height: "100%",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    overlayLabelText: {
        color: "white",
        fontSize: wp("6%"),
        fontFamily:"zen_kaku_bold",
    },
    ratingText: {
        fontSize: wp("5%"),
        backgroundColor: AppColors.secondaryColor,
        color: AppColors.white,
        textAlign: "right",
        fontWeight: "bold",
        padding: wp("2%"),
        borderRadius: 8,
    },
    gameNameText: {
        fontSize: wp("3.3%"),
        width: "85%",
        lineHeight: hp("2%"),
        fontFamily: "zen_kaku_medium",
        color: AppColors.white,
    },
    releaseDateText: {
        fontSize: wp("3%"),
        color: AppColors.white,
    },
    firstRowCardContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: wp("2%"),
    },
    thirdRowCardContainer: {
        flexDirection: "row",
        height: hp("4%"),
        gap:wp("5%"),
        alignItems: "center",
        marginTop: hp("1%"),
    },
    buttonsContainer: {
        alignSelf: "center",
        flexDirection: "row",
        zIndex: 99,
        gap: wp("16%"),
        bottom: hp("2%"),
    },
});

export default stylesHome;