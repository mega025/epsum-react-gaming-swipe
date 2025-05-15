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
        marginTop: hp("3%"),
    },

    gameCardsContainer: {
        paddingBottom:hp("36.6%"),
    },

    gameCover: {
        width: wp("15%"),
        height: hp("10%"),
        borderRadius: 5,
        marginRight: wp("2%"),
    },

    containerHeader:{
        elevation:2,
        backgroundColor: AppColors.darkPurple,
    },

    resultTextContainer: {
        backgroundColor: AppColors.darkPink,
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
    resultTextFilter: {
        fontSize: 15,
        color: "#fff",
        height: 28,
        fontFamily: "zen_kaku_regular",
    },

    emptyFlatListText : {
        fontSize: 20,
        color: "#ad2c2c",
        height: 28,
        fontFamily: "zen_kaku_regular",
    },
    clearFilterButton: {
        marginLeft: 10,
        padding: 5,
        borderRadius: 15,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    clearFilterText: {
        fontSize: 18,
        color: 'white',
    },

});

const styleSearchGameItem = StyleSheet.create({
    infoContainer: {
        flex: 1,
        flexDirection: "column",
    },
    thirdColumnContainer:{
        gap: 28
    },
    fav:{
        width:wp("6%"),
        height:hp("3%"),
        tintColor:"#4dc51f",
        alignSelf: "center",
        padding:hp("1.5%"),
    },
    rating: {
        height: 30,
        fontSize: wp("3.6%"),
        width: 60,
        textAlign: "center",
        color: AppColors.white,
        fontFamily:"zen_kaku_bold",

    },
    gameReleaseYear: {
        fontSize: RFPercentage(1.5),
        color: AppColors.white,
        width: 60,
        textAlign: "center",
        fontWeight: "bold",
    },

    gameCard: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
        alignItems: "center",
    },
    gameCover: {
        padding:10,
        width: wp("25%"),
        height: hp("15%"),
        borderRadius: 5,
        marginRight: 10,
    },
    name_rating: {
        flex: 2,
        flexDirection:"row",
        alignSelf: "center",
        alignItems: "center",
        justifyContent:"space-between",
        marginBottom: hp("5%"),
    },

    gameName: {
        flex:3,
        fontSize: 15,
        height: 50,
        paddingEnd: 5,
        fontFamily: "zen_kaku_regular",
        color:AppColors.white,
    },
    plaformsFlatlistContainer:{
        flex:2,
        width: wp("53%"),
        flexDirection:"row",
        alignSelf: "center",
        alignItems: "center",
    },
});


export {styleSearch, styleSearchGameItem};
