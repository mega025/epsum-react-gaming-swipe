import { StyleSheet, Dimensions, PixelRatio } from "react-native";
import { AppColors } from "../../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";


const styleSearch = StyleSheet.create({
    logo: {
        width: 35,
        height: 35,
        marginTop: hp("1%"),
    },
    container: {
        flex: 1,
        alignItems: "center",
    },
    appName: {
        fontSize: RFPercentage(2),
        color: AppColors.white,
        alignSelf: "center",
        marginTop: 2,
        height: 23,
        fontFamily: "zen_kaku_light",
    },

    logoContainer: {
        flexDirection: "row",
        alignSelf: "center",
        gap: 6,
        justifyContent: "center",
        marginTop: hp("5%"),
    },

    headerTitle: {
        fontSize: RFPercentage(4),
        alignSelf: "center",
        color: AppColors.white,
        fontFamily: "zen_kaku_light",
    },
    containerSearchInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: wp("3%"),
        paddingVertical: hp("1%"),
        alignSelf: "center",
        marginTop: hp("4%"),
    },

    gameCardsContainer: {
        paddingBottom:hp("33%")
    },

    gameCover: {
        width: wp("15%"),
        height: hp("10%"),
        borderRadius: 5,
        marginRight: wp("2%"),
    },

    containerHeader:{
        elevation:2,
        backgroundColor: AppColors.colorButton,
    },

    resultTextContainer: {
        backgroundColor: AppColors.colorBottomNavigator,
        padding: 13,
        borderWidth: 1,
        borderColor: AppColors.white,
        borderEndWidth: 0,
        borderStartWidth: 0,
        elevation: 10,
        alignItems: "center",
    },

    resultText: {
        fontSize: 17,
        color: "#fff",
        height: 28,
        fontFamily: "zen_kaku_regular",
    },

    emptyFlatListText : {
        fontSize: 20,
        color: "#ad2c2c",
        height: 28,
        fontFamily: "zen_kaku_regular",
    }
});

export default styleSearch;
