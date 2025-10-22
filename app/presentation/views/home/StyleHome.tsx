import { StyleSheet } from "react-native";
import { AppColors } from "../../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

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
        zIndex: 99,
        justifyContent: 'center',
    },
    cardStyle: {
        width: '90%',
        height: '90%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: wp("12%"),
        height: hp("3%"),
        alignSelf: "center",
        justifyContent: "center",
    },
    image: {
        width: "100%",
        height: hp("50%"),
        resizeMode:"contain",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    overlayLabelContainer: {
        width: '100%',
        height: '100%',
        paddingHorizontal: wp("4.6%"),
        paddingVertical: hp("3.8%"),
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
        backgroundColor: AppColors.neonPurple,
        color: "#FFF",
        fontWeight: "bold",
        padding: wp("2%"),
        borderRadius: 8,
        marginTop: hp("-4%"),
    },
    gameNameText: {
        fontSize: wp("3.3%"),
        width: wp("55%"),
        height: hp("6%"),
        fontFamily: "zen_kaku_medium",
        color: AppColors.white,
    },
    releaseDateText: {
        fontSize: wp("4%"),
        fontFamily: "zen_kaku_medium",
        color: AppColors.white,
    },
    firstRowCardContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: wp("7.5%"),
    },
    thirdRowCardContainer: {
        flexDirection: "row",
        gap: wp("1%"),
        alignItems: "center",
        marginTop: hp("1%"),
    },
    buttonsContainer: {
        alignSelf: "center",
        flexDirection: "row",
        zIndex: 99,
        gap: wp("16%"),
        bottom: hp("3%"),
    },
});

export default stylesHome;