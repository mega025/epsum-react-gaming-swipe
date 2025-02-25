import {StyleSheet} from "react-native";
import {AppColors} from "../../theme/AppTheme";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";


const stylesHome= StyleSheet.create({
    iconButton:{
        backgroundColor:AppColors.colorButton,
    },
    logo: {
        width: wp("15%"),
        height: wp("15%"),
        bottom: hp("3.3%"),
        position: "absolute",
        alignSelf: "center",
    },
    overlayLabelContainer: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    wrapper: {
        flex: 1,
    },
    cardContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: "#cecece",
        borderRadius: 20,
        marginBottom: 80,
    },

    loadingIconContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    loading: {
        position: "absolute",
        width: 50,
        height: 20,
        alignSelf: "center",
        justifyContent: "center",
    },

    image: {
        width: '100%',
        height: 400,
        borderRadius: 10,
    },

    overlayLabelText: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold'
    },

    ratingText: {
        fontSize: 20,
        backgroundColor: "#00da08",
        color: "#FFF",
        fontWeight: "bold",
        padding: 10
    },

    platformsContainer: {
        width: 310,
    },

    genreContainer: {
        width: 205,
    },

    gameNameText: {
        fontSize: 18,
        width: 250
    },

    firstRowCardContainer: {
        flexDirection: "row",
        position:"absolute",
        alignItems:"center",
        gap: 20
    },

    secondRowCardContainer: {
        marginHorizontal: 20,
        marginTop: 60,
        elevation: 5
    },

    thirdRowCardContainer: {
        marginHorizontal: 20,
        marginTop: 30,
        flexDirection: "row",
        gap: 20,
        alignItems: "center",
    }
})

export default stylesHome;