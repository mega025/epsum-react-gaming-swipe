import { StyleSheet, Dimensions, PixelRatio } from "react-native";
import { AppColors } from "../../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";


const styleSearch = StyleSheet.create({
    logo: {
        width: wp("12%"),
        height: hp("6%"),
        marginTop: hp("1%"),
    },
    container: {
        flex: 1,
        alignItems: "center",
    },
    appName: {
        fontSize: RFPercentage(2),
        marginTop: hp("1.5%"),
        color: AppColors.white,
        fontFamily: "zen_kaku_light",
    },
    header: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: hp("4%"),
    },
    title: {
        fontSize: RFPercentage(4),
        alignSelf: "center",
        color: AppColors.white,
        fontFamily: "zen_kaku_light",
    },
    containerSearchInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        paddingHorizontal: wp("3%"),
        paddingVertical: hp("1%"),
        alignSelf: "center",
        marginTop: hp("4%"),
    },
    icon: {
        width: wp("6%"),
        height: wp("6%"),
        marginLeft: wp("2%"),
        tintColor: "grey",
    },
    containerGames: {
        marginTop: hp("2%"),
    },

    item: {
        flexDirection: "row",
        padding: hp("1.5%"),
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        alignItems: "center",
    },
    cover: {
        width: wp("15%"),
        height: hp("10%"),
        borderRadius: 5,
        marginRight: wp("2%"),
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: RFPercentage(2.5),
        fontWeight: "bold",
    },
    genre: {
        fontSize: RFPercentage(2),
        color: "#666",
    },
    rating: {
        fontSize: RFPercentage(2),
        color: "#ff9900",
    },
    containerHeader:{
        elevation:2,
        backgroundColor: AppColors.colorButton,
    }
});

export default styleSearch;
