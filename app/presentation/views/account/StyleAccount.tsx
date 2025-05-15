import { StyleSheet } from "react-native";
import { AppColors } from "../../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const styleAccount = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },

    passwordHint: {
        fontFamily: "zen_kaku_regular",
        color: AppColors.white,
        fontSize: 14,
        height: 20,
        marginTop: wp("-3"),
        marginStart: wp("2%"),
        alignSelf: "flex-start",
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
        top: hp("6%"),
        color: AppColors.white,
        fontFamily: "zen_kaku_light",
    },
    containerEmail: {
        alignSelf: "center",
        top: hp("8%"),
    },
    textEmail: {
        fontSize: wp("4.5%"),
        height: hp("4%"),
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
        width: "100%",
    },
    labelName: {
        marginLeft: wp("10%"),
        fontSize: wp("4.9%"),
        color: AppColors.white,
        fontFamily: "zen_kaku_regular",
    },
    Name: {
        fontSize: wp("7.3%"),
        marginTop: 6,
        width: 290,
        height: 42,
        marginLeft: wp("10%"),
        color: AppColors.white,
        fontFamily: "zen_kaku_light",
    },
    editButton: {
        width: wp("8%"),
        height: wp("8%"),
        alignSelf: "flex-end",
        marginTop: wp("1%"),
        tintColor: AppColors.white,
    },
    containerLastName: {
        marginTop: hp("4%"),
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
        fontFamily: "zen_kaku_regular",
        height:25,

    },
    containerLogOut: {
        alignItems: "center",
        marginTop: hp("8%"),
    },
    LogOut: {
        fontSize: wp("7%"),
        color: AppColors.red,
        fontFamily: "zen_kaku_regular",
        fontWeight: "bold",
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.75)",
    },
    modalView: {
        backgroundColor: AppColors.darkPink,
        borderRadius: 10,
        padding: 20,
        gap: 20,
        width: 350,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalAcceptButton: {
        alignItems: "center",
        width: "25%",
        marginTop: 15,
        padding: 10,
        backgroundColor: "#0d5700",
        borderRadius: 10,
    },

    modalCancelButton: {
        alignItems: "center",
        width: "25%",
        marginTop: 15,
        padding: 10,
        backgroundColor: "#5b0000",
        borderRadius: 10,
    },
    containerButton:{
        flexDirection: "row",
        gap: 120
    },
    modalButtonTextStyle: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "zen_kaku_regular",
        height:20,
    },
    textPopUp:{
        fontSize: wp("4.5%"),
        color: AppColors.white,
        textAlign: "center",
        fontFamily: "zen_kaku_medium",
        height:hp("3%"),
        verticalAlign: "middle"
    },

    gameNamePopUp:{
        fontSize: wp("5%"),
        color: AppColors.white,
        textAlign: "center",
        fontFamily: "zen_kaku_medium",
        height: "auto",
        lineHeight: hp("3%"),
        verticalAlign: "middle"
    }
});

export default styleAccount;
