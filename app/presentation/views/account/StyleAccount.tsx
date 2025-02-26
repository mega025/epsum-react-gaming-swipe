import { StyleSheet } from "react-native";
import { AppColors } from "../../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const styleAccount = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    logo: {
        width: wp("12%"),
        height: wp("12%"),
        top: hp("2%"),
    },
    appName: {
        fontSize: wp("4%"),
        top: hp("3%"),
        color: AppColors.white,
        fontFamily: "zen_kaku_light",
    },
    header: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: hp("2%"),
    },
    title: {
        fontSize: wp("7.5%"),
        alignSelf: "center",
        top: hp("3%"),
        color: AppColors.white,
        fontFamily: "zen_kaku_light",
    },
    containerEmail: {
        alignSelf: "center",
        top: hp("7%"),
    },
    textEmail: {
        fontSize: wp("4.5%"),
        color: AppColors.white,
        fontFamily: "zen_kaku_regular",
    },
    containerPhoto: {
        alignItems: "center",
        top: hp("9%"),
    },
    containerEditName: {
        flexDirection: "row",
    },
    containerName: {
        marginTop: hp("30%"),
    },
    labelName: {
        marginLeft: wp("10%"),
        fontSize: wp("5%"),
        color: AppColors.white,
        fontFamily: "zen_kaku_regular",
    },
    Name: {
        fontSize: wp("6%"),
        marginLeft: wp("10%"),
        color: AppColors.white,
        fontFamily: "zen_kaku_regular",
    },
    Edit: {
        width: wp("10%"),
        height: wp("10%"),
        alignSelf: "flex-end",
        left: wp("65%"),
        bottom: hp("1%"),
        tintColor: AppColors.white,
    },
    containerLastName: {
        marginTop: hp("4%"),
    },
    labelLastName: {
        marginLeft: wp("10%"),
        fontSize: wp("5%"),
        color: AppColors.white,
        fontFamily: "zen_kaku_regular",
    },
    LastName: {
        fontSize: wp("6%"),
        marginLeft: wp("10%"),
        color: AppColors.white,
        fontFamily: "zen_kaku_regular",
    },
    containerResetPassword: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: hp("7%"),
    },
    TextResetPassword: {
        fontSize: wp("4.5%"),
        color: AppColors.white,
        textDecorationLine: "underline",
    },
    containerLogOut: {
        alignItems: "center",
        marginTop: hp("10%"),
    },
    LogOut: {
        fontSize: wp("7%"),
        color: AppColors.red,
        fontFamily: "zen_kaku_regular",
        fontWeight: "bold",
    },
});

export default styleAccount;
