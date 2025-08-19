import { StyleSheet } from "react-native";
import { AppColors } from "../../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const stylesHome = StyleSheet.create({
    iconButton: {
        backgroundColor: AppColors.darkPurple,
    },
    logo: {
        width: wp("13%"),
        height: wp("12%"),
        alignSelf: "center",
    },
    overlayLabelContainer: {
        width: wp("77%"),
        height: hp("73%"),
        borderRadius: hp("2.5%"),
        justifyContent: "center",
        alignItems: "center",
    },
    wrapper: {
        flex: 1,
        marginBottom: hp("9%"),
    },
    cardContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },
    card: {
        backgroundColor: AppColors.gray,
        borderRadius: 20,
        elevation: 10,
        position: "absolute",
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
        height: hp("50.6%"),
        resizeMode:"contain",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
    },
    overlayLabelText: {
        color: "white",
        fontSize: wp("8%"),
        fontWeight: "bold",
    },
    ratingText: {
        fontSize: wp("5%"),
        backgroundColor: AppColors.orangeColor,
        color: "#FFF",
        fontWeight: "bold",
        padding: wp("2%"),
        borderRadius: 8,
    },
    platformsContainer: {
        width: wp("65%"),
    },
    genreContainer: {
        width: wp("50%"),
    },
    gameNameText: {
        fontSize: wp("4%"),
        width: wp("55%"),
        height: hp("8%"),
        verticalAlign: "middle",
        fontFamily: "zen_kaku_medium",
    },
    firstRowCardContainer: {
        flexDirection: "row",
        position: "absolute",
        alignItems: "center",
        gap: wp("4%"),
    },
    secondRowCardContainer: {
        marginTop: hp("10%"),
        position: "absolute",
        elevation: 5,
    },
    thirdRowCardContainer: {
        marginTop: hp("15%"),
        flexDirection: "row",
        gap: wp("5%"),
        position: "absolute",
        alignItems: "center",
    },
    buttonsContainer: {
        alignSelf: "center",
        flexDirection: "row",
        gap: wp("16%"),
        top: wp("86%"),
    },
});

export default stylesHome;