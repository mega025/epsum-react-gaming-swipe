import { StyleSheet, Dimensions, PixelRatio } from "react-native";
import { AppColors } from "../../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";


const styleSearch = StyleSheet.create({
    logo: {
        width: wp("12%"),
        height: hp("4%"),
        marginTop: hp("1%"),
        tintColor: AppColors.white,
    },
    container: {
        flex: 1,
        alignItems: "center",
    },
    appName: {
        fontSize: wp("4%"),
        color: AppColors.white,
        alignSelf: "center",
        lineHeight: 23,
        marginTop: hp("0.7%"),
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
        fontSize: wp("7%"),
        alignSelf: "center",
        marginBottom: hp("1%"),
        color: AppColors.white,
        fontFamily: "zen_kaku_light",
    },
    containerSearchInput: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: wp("3%"),
        paddingVertical: hp("2%"),
        alignSelf: "center",
    },

    gameCardsContainer: {
        height: "60%",
    },

    gameCover: {
        width: wp("15%"),
        height: hp("10%"),
        borderRadius: 5,
        marginRight: wp("2%"),
    },

    containerHeader:{
        elevation:2,
        backgroundColor: AppColors.buttonBackground,
    },

    resultTextContainer: {
        backgroundColor: AppColors.buttonBackground,
        padding: 13,
        borderColor: AppColors.opacWhite,
        elevation: 10,
        alignItems: "center",
    },

    resultText: {
        fontSize: wp("4%"),
        color: "#fff",
        height: 28,
        verticalAlign: "middle",
        marginBottom: hp("0.2%"),
        fontFamily: "zen_kaku_regular",
    },
    resultTextFilter: {
        fontSize: 15,
        color: "#fff",
        lineHeight: 28,
        fontFamily: "zen_kaku_regular",
    },

    emptyFlatListText : {
        fontSize: wp("4%"),
        color: "#ad2c2c",
        height: 28,
        fontFamily: "zen_kaku_regular",
    },
    clearFilterButton: {
        marginLeft: wp("4%"),
        borderRadius: 15,
    },
    filterTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    clearFilterText: {
        fontSize: wp("3%"),
        color: AppColors.red,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: AppColors.white,
        marginBottom: 10,
    },
    emptyContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    },
    emptyText: {
        color: "#888",
        fontSize: 16,
        fontStyle: "italic",
    },
    tabsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginVertical: 10,
    },
    tabButton: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        marginHorizontal: 5,
        borderBottomWidth: 2,
        borderBottomColor: "transparent",
    },
    tabButtonSelected: {
        borderBottomColor: AppColors.opacWhite,
    },
    tabText: {
        color: "gray",
        fontSize: 16,
        lineHeight: 16,
        fontFamily: "zen_kaku_regular",
    },
    tabTextSelected: {
        color: "white",
        fontWeight: "bold",
    },

});

const styleSearchGameItem = StyleSheet.create({
    thirdColumnContainer:{
        gap: hp("3%"),
        marginStart: wp("3%"),
    },
    fav:{
        width:wp("6%"),
        height:hp("2.5%"),
        tintColor:"#4dc51f",
        alignSelf: "center",
    },
    rating: {
        fontSize: wp("3%"),
        backgroundColor: AppColors.thirdColor,
        padding: wp("2%"),
        width: wp("15%"),
        borderRadius: 15,
        textAlign: "center",
        color: AppColors.white,
    },
    gameReleaseYear: {
        fontSize: wp("3%"),
        color: AppColors.white,
        textAlign: "center",
    },
    gameCard: {
        flexDirection: "row",
        padding: wp("2%"),
        alignItems: "center",
    },
    gameCover: {
        padding:wp("1%"),
        width: wp("25%"),
        height: hp("15%"),
        borderRadius: 5,
        marginRight: 10,
    },
    name_rating: {
        flexDirection:"row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent:"space-between",
    },

    gameName: {
        flex:3,
        fontSize: wp("3.3%"),
        height: hp("10%"),
        marginTop: hp("1%"),
        paddingEnd: wp("3%"),
        fontFamily: "zen_kaku_regular",
        color:AppColors.white,
    },
    plaformsFlatlistContainer:{
        flex:2,
        width: wp("50%"),
        flexDirection:"row",
        alignSelf: "center",
        alignItems: "center",
    },
});

const styleSearchCompanyItem = StyleSheet.create({
    companyCard: {
        flexDirection: "row",
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.opacWhite,
        alignItems: "center",
    },
    companyCover: {
        margin: wp("3%"),
        width: wp("25%"),
        height: hp("15%"),
        borderRadius: 5,
        marginRight: 10,
    },
    infoContainer: {
        marginLeft:10,
        flexDirection: "column",
    },
    name: {

        marginBottom: hp("2%"),
    },
    companyName: {
        fontSize: 15,
        lineHeight: 20,
        marginStart: wp("3%"),
        fontFamily: "zen_kaku_regular",
        color:AppColors.white,
    },
    description:{
        width: wp("60%"),
        fontFamily: "zen_kaku_regular",
        color:AppColors.white,
    },

});

const styleSearchUserItem = StyleSheet.create({
    container: {
        flexDirection: "row",
        margin: wp("3%"),
        gap: wp("1%")
    },

    name: {
        fontSize: wp("3.7%"),
        lineHeight: 20,
        verticalAlign: "middle",
        fontFamily: "zen_kaku_regular",
        color:AppColors.white,
    },

    image: {
        width:wp("15%"),
        height:wp("15%"),
        borderRadius:50,
        marginEnd: wp("5%"),
        alignItems:"center",
        resizeMode:"center",
    }

})


export {styleSearch, styleSearchGameItem, styleSearchCompanyItem, styleSearchUserItem};
