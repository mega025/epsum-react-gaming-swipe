import {StyleSheet} from "react-native";
import {AppColors, AppFonts} from "../../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";

const stylesAuthViews = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },

    titleLogin: {
        fontSize: 40,
        color: 'white',
        marginTop: hp("20%"),
        alignSelf: 'flex-start',
        marginStart: wp("15%"),
        marginBottom: hp("5%"),
        fontFamily: "zen_kaku_light",
    },

    titleRegister: {
        fontSize: 34,
        color: 'white',
        alignSelf: 'flex-start',
        marginStart: wp("13%"),
        marginTop: hp("12%"),
        marginBottom: hp("5%"),
        fontFamily: "zen_kaku_light",
    },

    passwordHint: {
        fontFamily: "zen_kaku_regular",
        color: AppColors.white,
        fontSize: 14,
        margin: 5,
        height: 30,
    },

    formContainer: {
        width: '100%',
        alignItems: 'center',
    },

    formInputContainer: {
        marginBottom: hp("2.5%"),
    },

    formInputContainerPassword: {
        marginBottom: hp("2.5%"),
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
    },

    iconPasswordToggle: {
        width: wp("5%"),
        height: wp("5%"),
        resizeMode: 'stretch',
        backgroundColor: 'white',
    },

    formButtonContainer: {
        marginTop: hp("3%"),
    },

    formInlineInputsContainer: {
        flexDirection: "row",
        marginBottom: hp("2.5%"),
        gap: wp("2.5%"),
    },
});

export default stylesAuthViews;
